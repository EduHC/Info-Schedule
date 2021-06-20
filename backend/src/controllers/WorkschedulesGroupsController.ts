import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { WorkschedulesGroups } from "../models/WorkschedulesGroups";
import { Groups } from "../models/Groups";
import { Workschedules } from  "../models/Workschedules";
import * as Yup from "yup";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { BaseError, ValidationError } from "../errors/Errors";

export default {
  async attachGroupsToOneWorkschedule(req: Request, res: Response, next: NextFunction) {
    const { id_workschedule, groups } = req.body;

    const schema = Yup.object().shape({
      id_workschedule: Yup.number().integer().required(),
      groups: Yup.array().of(
            Yup.number().positive()
        ).min(1).required()
    });
    
    await schema.validate({ groups, id_workschedule })
    .catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });

    try {
      const workschedulesRepository = getRepository(Workschedules);
      const workschedulesGroupsRepository = getRepository(WorkschedulesGroups);
      const groupsRepository = getRepository(Groups);

      const workscheduleExists = await workschedulesRepository.findOne(id_workschedule);
  
      if (!workscheduleExists) {
        throw new BaseError("Escala não encontrada!", `A escala ${id_workschedule} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }
  
      for (let i = 0; i < groups.length; i++) {
        const groupExists = await groupsRepository.findOne({ where: { id_group : groups[i] }});

        if (!groupExists) {
          throw new BaseError("Grupo não encontrado!", `O grupo ${groups[i]} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
        }
      }

      groups.forEach(async (group: any) => {
        const newWorkscheduleGroup = workschedulesGroupsRepository.create({
          id_group: group,
          id_workschedule: id_workschedule 
        });

        await workschedulesGroupsRepository.save(newWorkscheduleGroup);
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(201).json({ message: "Grupos associados com sucesso!" });
  },

  async findAllGroupsOfOneWorkschedule(req: Request, res: Response, next: NextFunction) {
    const { id_workschedule } = req.params;
    let workscheduleGroup = [];

    try {
      const workschedulesRepository = getRepository(Workschedules);
      const workschedulesGroupsRepository = getRepository(WorkschedulesGroups);

      const workscheduleExists = await workschedulesRepository.findOne(id_workschedule);
  
      if (!workscheduleExists) {
        throw new BaseError("Escala não encontrada!", `A escala ${id_workschedule} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

      workscheduleGroup = await workschedulesGroupsRepository.find({ where: {id_workschedule: id_workschedule},  loadRelationIds: true })

      if (workscheduleGroup.length === 0) {
        return res.status(200).json({ message: "A escala não possuí nenhum grupo relacionado a ela!" });
      }

    } catch (err) {
      next(err);
      return;
    }
    
    return res.json(workscheduleGroup);
  },

  async updateGroupsOfOneWorkschedule(req: Request, res: Response, next: NextFunction) {
    const { groups, id_workschedule } = req.body;

    const schema = Yup.object().shape({
      id_workschedule: Yup.number().integer().required(),
      groups: Yup.array().of(
            Yup.number().positive()
        ).min(1).required()
    });
    
    await schema.validate({ groups, id_workschedule })
    .catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });

    try {
      const workschedulesRepository = getRepository(Workschedules);
      const groupsRepository = getRepository(Groups);
      const workschedulesGroupsRepository = getRepository(WorkschedulesGroups);
    
      const workscheduleExists = await workschedulesRepository.findOne(id_workschedule);
  
      if (!workscheduleExists) {
        throw new BaseError("Escala não encontrada!", `A escala ${id_workschedule} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }
  
      for (let i = 0; i < groups.length; i++) {
        const groupExists = await groupsRepository.findOne({ where: { id_group : groups[i] }});

        if (!groupExists) {
          throw new BaseError("Grupo não encontrado!", `O grupo ${groups[i]} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
        }
      }

      groups.forEach(async (group: any) => {
        await workschedulesGroupsRepository.delete({ id_workschedule: id_workschedule, id_group: group });
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "escala atualizada!" })
  },
}