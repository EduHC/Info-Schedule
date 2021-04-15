import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Groups } from  "../models/Groups"

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
      group = await groupsRepository.create(groupData);
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
      groups = await groupsRepository.find();
    } catch (err) {
      return res.json(err);
    }

    return res.json(groups);
  },

  async findOne(req: Request, res: Response) {
    const { id } = req.params;

    const groupsRepository = getRepository(Groups);
    let group = {};

    try {
      group = await groupsRepository.findOneOrFail(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json(group);
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