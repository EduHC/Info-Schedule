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
      groupUsers = await groupsUsersRepository.find({ where: {id_group: id} })
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(groupUsers);
  },

  async updateUsersOfOneGroup(req: Request, res: Response) {
    const { users, id_action, id_group } = req.body;

    if (!Array.isArray(users)) {
      return res.status(401).json({ 
        message: "Objeto profiles informado em formato incorreto! É preciso ser um array" 
      });
    }

    if (users.length === 0) {
      return res.status(401).json({ message: "É necessário informar ao menos 1 perfil!" });
    }

    const groupsUsersRepository = getRepository(GroupsUsers);

    try {
      switch(id_action){
        case 1:
          // Action 1 será para atualização, incremento de perfis
          users.forEach(async user => {
            const newUserProfile = groupsUsersRepository.create({
              id_user: user,
              id_group: id_group
            }); 

            await groupsUsersRepository.save(newUserProfile);
          });
        break;
            
        case 2: 
          // Action 2 será para atualização, remoção de perfis
          users.forEach(async user => {
            await groupsUsersRepository.delete({ id_user: user, id_group: id_group });
          });
        break;
        default:
          return res.status(401).json({ message: "Ação desconhecida, favor informar uma válida!" });
      }     
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Perfis do usuári atualizados!" })
  },
}