import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import { BaseError, ValidationError } from "../errors/Errors";
import { Groups } from  "../models/Groups";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import GroupsView from "../views/GroupsView";

export default {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, start_hour, end_hour, id_owner } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      id_owner: Yup.number().required().integer().positive(),
      start_hour: Yup.string().required(),
      end_hour: Yup.string().required()
    });

    const groupData = {
      id_owner,
      name,
      start_hour,
      end_hour
    };

    await schema.validate(groupData).catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });

    let group = {};

    try {
      const groupsRepository = getRepository(Groups);
      
      group = groupsRepository.create(groupData);
      group = await groupsRepository.save(group);
      
    } catch (err) {
      next(err);
      return;
    }

    return res.status(201).json({ message: "grupo criado", group});
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    let groups = {};

    try {
      const groupsRepository = getRepository(Groups);

      groups = await groupsRepository.query(`
        SELECT infGroups.id_group, 
               infGroups.start_hour, 
               infGroups.end_hour,
               infGroups.name AS groupName, 
               users.id_user, 
               users.name
          FROM inf_association_groups_users AS groups_users
         RIGHT JOIN inf_entity_groups AS infGroups
            ON infGroups.id_group = groups_users.id_group
          LEFT JOIN inf_entity_users AS users
            ON groups_users.id_user = users.id_user
         ORDER BY infGroups.id_group, users.id_user DESC;
      `);
    } catch (err) {
      next(new BaseError("Situação inesperada!", `Erro ao tentar buscar os grupos.`, true, HttpStatusCode.BAD_REQUEST))
      return;
    }

    return res.json(GroupsView.render(groups));
  },

  async findOne(req: Request, res: Response,  next: NextFunction) {
    const { id_group } = req.params;
    let group;

    try {
      const groupsRepository = getRepository(Groups);

      group = await groupsRepository.query(`
        SELECT infGroups.id_group, 
               infGroups.start_hour, 
               infGroups.end_hour,
               infGroups.name AS groupName, 
               users.id_user, 
               users.name
          FROM inf_association_groups_users AS groups_users
         RIGHT JOIN inf_entity_groups AS infGroups
            ON infGroups.id_group = groups_users.id_group
          LEFT JOIN inf_entity_users AS users
            ON groups_users.id_user = users.id_user
         WHERE infGroups.id_group = ${id_group}
         ORDER BY infGroups.id_group DESC;
      `);
      
      if (group.length === 0) {
        throw new BaseError("Grupo não encontrado!", `O grupo ${id_group} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json(GroupsView.render(group));
  },

  async update(req: Request, res: Response,  next: NextFunction) {
    const { name, start_hour, end_hour } = req.body;
    const { id_group } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      start_hour: Yup.string(),
      end_hour: Yup.string()
    });

    await schema.validate({ name, start_hour, end_hour }).catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });

    try { 
      const groupsRepository = getRepository(Groups);
      const groupActualData = await groupsRepository.findOne(id_group);

      if (!groupActualData) {
        throw new BaseError("Grupo não encontrado!", `O grupo ${id_group} não encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      await groupsRepository.update(id_group, {
        name: name ? name : groupActualData?.name,
        start_hour: start_hour ? start_hour : groupActualData?.start_hour,
        end_hour: end_hour ? end_hour : groupActualData?.end_hour
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Grupo atualizado" })
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id_group } = req.params;

    try {
      const groupsRepository = getRepository(Groups);
      
      const group = await groupsRepository.findOne(id_group);

      if (!group) {
        throw new BaseError("Grupo não encontrado!", `O grupo ${id_group} não encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      await groupsRepository.delete(id_group);

    } catch (err) {
      next(err);
      return;
    }
    return res.status(200).json({ message: "Grupo deletado" })
  }
}