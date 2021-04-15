import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Workschedules } from "../models/Workschedules";

export default {
  async create(req: Request, res: Response) {
    const { id_owner, date } = req.body;

    const workscheduleData = {
      id_owner,
      date
    };

    const workschedulesRepository = getRepository(Workschedules);
    let workschedule = {};

    try {
      workschedule = await workschedulesRepository.create(workscheduleData);
      await workschedulesRepository.save(workschedule);
    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "Escala criada", workschedule })
  },

  async findAll(req: Request, res: Response) {
    const workschedulesRepository = getRepository(Workschedules);
    let workschedules = {};

    try {
      workschedules = await workschedulesRepository.find();
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(workschedules);
  },

  async findOne(req: Request, res: Response) {
    const { id } = req.params;

    const workschedulesRepository = getRepository(Workschedules);
    let workschedule = {};

    try {
      workschedule = await workschedulesRepository.findOneOrFail(id);
    } catch (err) {
      return res.json(err);
    }
    
    return res.status(200).json(workschedule);
  },

  async update(req: Request, res: Response) {
    const { date } = req.body;
    const { id } = req.params;

    const workschedulesRepository = getRepository(Workschedules);

    try {
      await workschedulesRepository.update(id, {
        date: date
      });
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Escala atualizada" })
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const workschedulesRepository = getRepository(Workschedules);

    try {
      await workschedulesRepository.delete(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Escala deletada!" })
  }
}