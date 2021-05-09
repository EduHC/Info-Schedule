import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsersProfiles } from "../models/UsersProfiles";

export default {
  async attachProfilesToOneUser(req: Request, res: Response) {
    const { id_user, profiles  } = req.body;

    if (!Array.isArray(profiles)) {
      return res.status(401).json({ message: "Objeto profiles informado em formato incorreto! É preciso ser um array" });
    }

    if (profiles.length === 0) {
      return res.status(401).json({ message: "É necessário informar ao menos 1 perfil!" });
    }

    const usersProfilesRepository = getRepository(UsersProfiles);

    try {
      profiles.forEach(profile => {
        const newUserProfile = usersProfilesRepository.create({
          id_user: id_user,
          id_profile: profile
        });

        usersProfilesRepository.save(newUserProfile);
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

    if (!Array.isArray(profiles)) {
      return res.status(401).json({ 
        message: "Objeto profiles informado em formato incorreto! É preciso ser um array" 
      });
    }

    if (profiles.length === 0) {
      return res.status(401).json({ message: "É necessário informar ao menos 1 perfil!" });
    }

    const usersProfilesRepository = getRepository(UsersProfiles);

    try {
      switch(id_action){
        case 1:
          // Action 1 será para atualização, incremento de perfis
          profiles.forEach(profile => {
            const newUserProfile = usersProfilesRepository.create({
              id_user: id_user,
              id_profile: profile
            }); 

            usersProfilesRepository.save(newUserProfile);
          });
        break;
            
        case 2: 
          // Action 2 será para atualização, remoção de perfis
          profiles.forEach(profile => {
            usersProfilesRepository.delete({ id_user: id_user, id_profile: profile });
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