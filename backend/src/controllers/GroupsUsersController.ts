import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { GroupsUsers } from "../models/GroupsUsers";
import { Groups } from "../models/Groups";
import { Users } from "../models/Users";
import * as Yup from "yup";

export default {
  async attachUsersToOneGroup(req: Request, res: Response) {
    const { id_group, users } = req.body;

    const schema = Yup.object().shape({
      id_group: Yup.number().integer().required(),
      users: Yup.array().of(
            Yup.number().positive()
        ).min(1).required()
    });

    const data = {
      id_group: id_group,
      users: users
    };
    
    if (!schema.validate(data)) {
      return res.json({ message: "Informação enviada de forma incorreta" });
    }

    const groupsRepository = getRepository(Groups);
    const usersRepository = getRepository(Users);

    const group = await groupsRepository.findOne(id_group);

    if (!group) {
      return res.status(400).json({ message: "Grupo informado não existe" });
    }

    const groupsUsersRepository = getRepository(GroupsUsers);

    try {
      users.forEach(async (user: any) => {
        const userExists = await usersRepository.findOne(user);

        if (!userExists) {
          return res.status(400).json({ message: "Usuário não existente informado" });
        }

        const newGroupUser = groupsUsersRepository.create({
          id_group: id_group,
          id_user: user
        });

        await groupsUsersRepository.save(newGroupUser);
      });

    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Usuários adicionados ao grupo com sucesso!" });
  },

  async findAllUsersOfOneGroup(req: Request, res: Response) {
    const { id } = req.params;

    const groupsRepository = getRepository(Groups);

    const group = await groupsRepository.findOne(id);

    if (!group) {
      return res.status(400).json({ message: "Grupo informado não existe" });
    }

    const groupsUsersRepository = getRepository(GroupsUsers);
    let groupUsers = {};

    try {
      groupUsers = await groupsUsersRepository.find({ where: {id_group: id}, loadRelationIds: true })
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(groupUsers);
  },

  async unattachUsersOfOneGroup(req: Request, res: Response) {
    const { users, id_group } = req.body;

    const schema = Yup.object().shape({
      id_group: Yup.number().integer().required(),
      users: Yup.array().of(
        Yup.number().positive().integer()
      ).min(1).required()
    });
    
    const data = {
      id_group: id_group,
      users: users
    };
    
    console.log(data);

    if (!await schema.isValid(data)) {
      return res.json({ message: "Informação enviada de forma incorreta" });
    } 

    /* TESTANDO A IMPLEMENTAÇÃO DISTO AINDA
    await schema.validate(data).catch((err: Yup.ValidationError) =>{
      console.log("validando")
      return res.status(400).json({
        Cause: err.name,
        Message: err.message
      });
    }); */
    
    const groupsRepository = getRepository(Groups);
    const groupsUsersRepository = getRepository(GroupsUsers);
    const usersRepository = getRepository(Users);

    const group = await groupsRepository.findOne(id_group);

    if (!group) {
      return res.status(400).json({ message: "Grupo informado não existe" });
    }

  /*  users.forEach(async (user: any) => {
      const userExists = await usersRepository.findOne(user);

      if (!userExists) {
        return res.status(400).json({ message: "Usuário não existente informado" });
      }
      
      await groupsUsersRepository.delete({ id_user: user, id_group: id_group });
    }); */

    console.log(users.length);
    console.log(users[0]);

    for (let control = 0; control >= users.lenght; control ++) {
      const userExists = await usersRepository.findOne(users[control]);

      console.log(users[control]);

      if (!userExists) {
        return res.status(400).json({ message: "Usuário não existente informado" });
      }

      await groupsUsersRepository.delete({ id_user: users[control], id_group: id_group });
    }

    return res.status(200).json({ message: "Usuários removidos do grupo!" })
  },
}

