import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { WorkschedulesGroups } from "../models/WorkschedulesGroups";
import { Groups } from "../models/Groups";
import { Workschedules } from  "../models/Workschedules";
import * as Yup from "yup";

export default {
  async attachGroupsToOneWorkschedule(req: Request, res: Response) {
    const { id_workschedule, groups } = req.body;

    const schema = Yup.object().shape({
      id_workschedule: Yup.number().integer().required(),
      groups: Yup.array().of(
            Yup.number().positive()
        ).min(1).required()
    });

    const data = {
      id_workshedule: id_workschedule,
      groups: groups
    };
    
    if (!schema.validate(data)) {
      return res.json({ message: "Informação enviada de forma incorreta" });
    }

    const workschedulesRepository = getRepository(Workschedules);

    const workschedule = await workschedulesRepository.findOne(id_workschedule);

    if (!workschedule) {
      return res.status(400).json({ message: "Escala informada não existe" });
    }

    const workschedulesGroupsRepository = getRepository(WorkschedulesGroups);

    try {
      groups.forEach(async (group: any) => {
        const newWorkscheduleGroup = workschedulesGroupsRepository.create({
          id_group: group,
          id_workschedule: id_workschedule 
        });

        await workschedulesGroupsRepository.save(newWorkscheduleGroup);
      });

    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "Grupos associados com sucesso!" });
  },

  async findAllGroupsOfOneWorkschedule(req: Request, res: Response) {
    const { id } = req.params;

    const workschedulesRepository = getRepository(Workschedules);

    const workschedule = await workschedulesRepository.findOne(id);

    if (!workschedule) {
      return res.status(400).json({ message: "Escala informada não existe" });
    }

    const workschedulesGroupsRepository = getRepository(WorkschedulesGroups);
    let workscheduleGroup = {};

    try {
      workscheduleGroup = await workschedulesGroupsRepository.find({ where: {id_workschedule: id},  loadRelationIds: true })
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(workscheduleGroup);
  },

  async updateGroupsOfOneWorkschedule(req: Request, res: Response) {
    const { groups, id_action, id_workschedule } = req.body;

    if (!Array.isArray(groups)) {
      return res.status(401).json({ 
        message: "Objeto grupo informado em formato incorreto! É preciso ser um array" 
      });
    }

    if (groups.length === 0) {
      return res.status(401).json({ message: "É necessário informar ao menos 1 grupo!" });
    }

    const workschedulesgGroupsRepository = getRepository(WorkschedulesGroups);

    try {
      switch(id_action){
        case 1:
          // Action 1 será para atualização, incremento de grupos
          groups.forEach(async group => {
            const newWorkscheduleGroup = workschedulesgGroupsRepository.create({
              id_workschedule: id_workschedule,
              id_group: group
              
            }); 

            await workschedulesgGroupsRepository.save(newWorkscheduleGroup);
          });
        break;
            
        case 2: 
          // Action 2 será para atualização, remoção de perfis
          groups.forEach(async group => {
            await workschedulesgGroupsRepository.delete({ id_group: group, id_workschedule: id_workschedule });
          });
        break;
        default:
          return res.status(401).json({ message: "Ação desconhecida, favor informar uma rota válida!" });
      }     
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "escala atualizada!" })
  },
}