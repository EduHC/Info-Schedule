import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { GroupsUsers } from "../models/GroupsUsers";
import { Groups } from "../models/Groups";
import { Users } from "../models/Users";
import * as Yup from "yup";
import { BaseError, ValidationError } from "../errors/Errors";
import { HttpStatusCode } from "../utils/HttpStatusCode";

export default {
  async attachUsersToOneGroup(req: Request, res: Response, next: NextFunction) {
    const { id_group, users } = req.body;

    const schema = Yup.object().shape({
      id_group: Yup.number().integer().required(),
      users: Yup.array().of(
        Yup.number().positive()
      ).min(1).required()
    });

    await schema.validate({ id_group, users })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
    });

    try {
      const groupsRepository = getRepository(Groups);
      const usersRepository = getRepository(Users);
  
      const group = await groupsRepository.findOne(id_group);
  
      if (!group) {
        throw new BaseError("Grupo não encontrado!", `O grupo ${id_group} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }
  
      const groupsUsersRepository = getRepository(GroupsUsers);
      
      for (let i = 0; i < users.length; i++) {
        const userExists = await usersRepository.findOne(users[i]);

        if (!userExists) {
          throw new BaseError("Usuário não encontrado!", `O usuário ${users[i]} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
        }
      }

      users.forEach(async (user: any) => {
        const newGroupUser = groupsUsersRepository.create({
          id_group: id_group,
          id_user: user
        });

        await groupsUsersRepository.save(newGroupUser);
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Usuários adicionados ao grupo com sucesso!" });
  },

  async findAllUsersOfOneGroup(req: Request, res: Response) {
    const { id_group } = req.params;

    const groupsRepository = getRepository(Groups);

    const group = await groupsRepository.findOne(id_group);

    if (!group) {
      return res.status(400).json({ message: "Grupo informado não existe" });
    }

    const groupsUsersRepository = getRepository(GroupsUsers);
    let groupUsers = {};

    try {
      groupUsers = await groupsUsersRepository.find({ where: { id_group: id_group }, loadRelationIds: true })
    } catch (err) {
      return res.json(err);
    }

    return res.json(groupUsers);
  },

  async unattachUsersOfOneGroup(req: Request, res: Response, next: NextFunction) {
    const { users, id_group } = req.body;

    const schema = Yup.object().shape({
      id_group: Yup.number().integer().required(),
      users: Yup.array().of(
        Yup.number().positive().integer()
      ).min(1).required()
    });

    await schema.validate({ users, id_group })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      }).finally(() => {
        return;
      });

    try {
      const groupsRepository = getRepository(Groups);
      const groupsUsersRepository = getRepository(GroupsUsers);
      const usersRepository = getRepository(Users);
  
      const group = await groupsRepository.findOne(id_group);
  
      if (!group) {
        throw new BaseError("Grupo não encontrado!", `O grupo ${id_group} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }
  
      for (let i = 0; i < users.length; i++) {
        const userExists = await usersRepository.findOne(users[i]);

        if (!userExists) {
          throw new BaseError("Usuário não encontrado!", `O usuário ${users[i]} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
        }
      }

      users.forEach(async (user: any) => {
        await groupsUsersRepository.delete({ id_user: user, id_group: id_group });  
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Usuários removidos do grupo!" })
  },
}
