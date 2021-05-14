import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { WorkschedulesGroups } from "../models/WorkschedulesGroups";
import { Groups } from "../models/Groups";
import * as Yup from "yup";

export default {
  async attachUsersToOneGroup(req: Request, res: Response) {
    const { id_workschedule, groups } = req.body;

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

    const group = await groupsRepository.findOne(id_group);

    if (!group) {
      return res.status(400).json({ message: "Grupo informado não existe" });
    }

    const groupsUsersRepository = getRepository(GroupsUsers);

    try {
      users.forEach(async (user: any) => {
        const newGroupUser = groupsUsersRepository.create({
          id_group: id_group,
          id_user: user
        });

        await groupsUsersRepository.save(newGroupUser);
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