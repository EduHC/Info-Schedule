import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsersProfiles } from "../models/UsersProfiles";
import { Profiles } from "../models/Profiles";
import { Users } from "../models/Users";
import * as Yup from "yup";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { BaseError, ValidationError } from "../errors/Errors";

export default {
  async attachProfilesToOneUser(req: Request, res: Response, next: NextFunction) {
    const { id_user, profiles  } = req.body;

    const schema = Yup.object().shape({
      id_user: Yup.number().integer().required(),
      profiles: Yup.array().of(
        Yup.number().positive()
      ).min(1).required()
    });
    
    await schema.validate({ id_user, profiles })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
      }); 

    try {
      const usersRepository = getRepository(Users);
      const profilesRepository = getRepository(Profiles);
      const usersProfilesRepository = getRepository(UsersProfiles);
      
      const userExists = usersRepository.findOne(id_user);

      if (!userExists) {
        throw new BaseError("Usuário não encontrado!", `O usuário ${id_user} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      for (let i = 0; i < profiles.length; i++) {
        const profileExists = profilesRepository.findOne(profiles[i]);

        if (!profileExists) {
          throw new BaseError("Perfil não encontrado!", `O perfil ${profiles[i]} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
        }
      }

      profiles.forEach(async (profile: any) => {
        const newUserProfile = usersProfilesRepository.create({
          id_user: id_user,
          id_profile: profile
        });

        await usersProfilesRepository.save(newUserProfile);
      });
    } catch (err) {
      next(err);
      return;
    }

    return res.status(201).json({ message: "Perfil(is) adicionado(s) ao usuário!" });
  },

  async findAllProfilesOfOneUser(req: Request, res: Response, next: NextFunction) {
    const { id_user } = req.params;

    let userProfiles = [];

    try {
      const usersRepository = getRepository(Users);
      const usersProfilesRepository = getRepository(UsersProfiles);

      const userExists = usersRepository.findOne(id_user);

      if (!userExists) {
        throw new BaseError("Usuário não encontrado!", `O usuário ${id_user} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      userProfiles = await usersProfilesRepository.find({ where: {id_user: id_user} });

      if (userProfiles.length === 0) {
        return res.status(200).json({ message: "Nenhum perfil associado a este usuário." });
      }
    } catch (err) {
      next(err);
      return;
    }
    
    return res.json(userProfiles);
  },

  async unattachProfilesOfOneUser(req: Request, res: Response, next: NextFunction) {
    const { profiles, id_user } = req.body;

    const schema = Yup.object().shape({
      id_user: Yup.number().integer().required(),
      profiles: Yup.array().of(
        Yup.number().positive()
      ).min(1).required()
    });

    await schema.validate({ profiles, id_user })
    .catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });
    
    try {
      const usersRepository = getRepository(Users);
      const profilesRepository = getRepository(Profiles);
      const usersProfilesRepository = getRepository(UsersProfiles);

      const userExists = usersRepository.findOne(id_user);

      if (!userExists) {
        throw new BaseError("Usuário não encontrado!", `O usuário ${id_user} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      for (let i = 0; i < profiles.length; i++) {
        const profileExists = profilesRepository.findOne(profiles[i]);

        if (!profileExists) {
          throw new BaseError("Perfil não encontrado!", `O perfil ${profiles[i]} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
        }
      }
    
      profiles.forEach(async (profile: any) => {
        await usersProfilesRepository.delete({ id_user: id_user, id_profile: profile });
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Perfis do usuári atualizados!" })
  },
}