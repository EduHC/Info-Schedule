import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Groups } from  "../models/Groups";
import GroupsView from "../views/GroupsView";

export default {
  async create(req: Request, res: Response) {
    const { name, start_hour, end_hour, id_owner } = req.body;

    const groupData = {
      id_owner,
      name,
      start_hour,
      end_hour
    };

    const groupsRepository = getRepository(Groups);
    let group = {};
  
    try {
      group = groupsRepository.create(groupData);
      await groupsRepository.save(group);
      
    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "grupo criado"});
  },

  async findAll(req: Request, res: Response) {

    const groupsRepository = getRepository(Groups);
    let groups = {};

    try {
      groups = await groupsRepository.query(`
        SELECT infGroups.id_group, 
               infGroups.start_hour, 
               infGroups.end_hour, 
               users.id_user, 
               users.name
          FROM inf_entity_groups AS infGroups
         INNER JOIN inf_association_groups_users AS groups_users
            ON infGroups.id_group = groups_users.id_group
         INNER JOIN inf_entity_users AS users
            ON groups_users.id_user = users.id_user
         ORDER BY infGroups.id_group DESC;
      `);
    } catch (err) {
      return res.json(err);
    }

    return res.json(GroupsView.render(groups));
  },

  async findOne(req: Request, res: Response) {
    const { id_group } = req.params;

    const groupsRepository = getRepository(Groups);
    let group = {};

    try {
      group = await groupsRepository.query(`
        SELECT infGroups.id_group, 
               infGroups.start_hour, 
               infGroups.end_hour, 
               users.id_user, 
               users.name
          FROM inf_entity_groups AS infGroups
         INNER JOIN inf_association_groups_users AS groups_users
            ON infGroups.id_group = groups_users.id_group
         INNER JOIN inf_entity_users AS users
            ON groups_users.id_user = users.id_user
         WHERE infGroups.id_group = ${id_group}
         ORDER BY infGroups.id_group DESC;
      `);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json(GroupsView.render(group));
  },

  async update(req: Request, res: Response) {
    const { name, start_hour, end_hour } = req.body;
    const { id } = req.params;

    const groupsRepository = getRepository(Groups);

    try { 
      const groupData = await groupsRepository.findOne(id);

      await groupsRepository.update(id, {
        name: name ? name : groupData?.name,
        start_hour: start_hour ? start_hour : groupData?.start_hour,
        end_hour: end_hour ? end_hour : groupData?.end_hour
      });

    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Grupo atualizado" })
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const groupsRepository = getRepository(Groups);

    try {
      await groupsRepository.delete(id);
    } catch (err) {
      return res.json(err);
    }
    return res.status(200).json({ message: "Grupo deletado" })
  }
}