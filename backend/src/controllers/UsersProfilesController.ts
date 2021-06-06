import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsersProfiles } from "../models/UsersProfiles";
import * as Yup from "yup";

export default {
  async attachProfilesToOneUser(req: Request, res: Response) {
    const { id_user, profiles  } = req.body;

    const schema = Yup.object().shape({
      id_user: Yup.number().integer().required(),
      profiles: Yup.array().min(1).required()
    });

    const data = {
      id_user: id_user,
      profiles: profiles
    };
    
    if (!await schema.isValid(data)) {
      return res.json({ message: "Informação enviada de forma incorreta" });
    } 

    const usersProfilesRepository = getRepository(UsersProfiles);

    try {
      profiles.forEach(async (profile: any) => {
        const newUserProfile = usersProfilesRepository.create({
          id_user: id_user,
          id_profile: profile
        });

        await usersProfilesRepository.save(newUserProfile);
      });
    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "Perfil(is) adicionado(s) ao usuário!" });
  },

  async findAllProfilesOfOneUser(req: Request, res: Response) {
    const { id } = req.params;

    const usersProfilesRepository = getRepository(UsersProfiles);
    let userProfiles = {};

    try {
      userProfiles = await usersProfilesRepository.find({ where: {id_user: id} })
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(userProfiles);
  },

  async updateUserProfiles(req: Request, res: Response) {
    const { profiles, id_action, id_user } = req.body;

    const schema = Yup.object().shape({
      id_user: Yup.number().integer().required(),
      profiles: Yup.array().min(1).required(),
      id_action: Yup.number().integer().required()
    });
    
    const data = {
      id_user: id_user,
      id_action,
      profiles: profiles
    };
    
    if (!await schema.isValid(data)) {
      return res.json({ message: "Informação enviada de forma incorreta" });
    }

    const usersProfilesRepository = getRepository(UsersProfiles);

    try {
      switch(id_action){
        case 1:
          // Action 1 será para atualização, incremento de perfis
          profiles.forEach((profile: any) => {
            const newUserProfile = usersProfilesRepository.create({
              id_user: id_user,
              id_profile: profile
            }); 

            usersProfilesRepository.save(newUserProfile);
          });
        break;
            
        case 2: 
          // Action 2 será para atualização, remoção de perfis
          profiles.forEach((profile: any) => {
            usersProfilesRepository.delete({ id_user: id_user, id_profile: profile });
          });
        break;
        default:
          return res.status(400).json({ message: "Ação desconhecida, favor informar uma válida!" });
      }     
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Perfis do usuári atualizados!" })
  },
}