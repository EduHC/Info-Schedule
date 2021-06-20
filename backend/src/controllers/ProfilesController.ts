import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Profiles } from "../models/Profiles";
import * as Yup from "yup";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { BaseError, ValidationError } from "../errors/Errors";

export default {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required()
    });

    await schema.validate({ name })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
      });

    let profile: Profiles;

    try {
      const profilesRepository = getRepository(Profiles);
    
      profile = profilesRepository.create({ name });
      
      await profilesRepository.save(profile);

    } catch (err) {
      next(err);
      return;
    } 

    return res.status(201).json({ message: "Perfil criado com sucesso!", profile });
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    let profiles: Profiles[];

    try {
      const profilesRepository = getRepository(Profiles);
      profiles = await profilesRepository.find();

      if (profiles.length === 0) {
        return res.status(200).json({ message: "Nenhum perfil encontrado." });
      }

    } catch (err) {
      next(err);
      return;
    }

    return res.json(profiles);
  },

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id_profile } = req.params;
    let profile: Profiles;

    try {   
      
      const profilesRepository = getRepository(Profiles);
      profile = await profilesRepository.findOne(id_profile);

      if (!profile) {
        throw new BaseError("Perfil não encontrado!", `O perfil ${id_profile} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

    } catch (err) {
      next(err);
      return;
    }

    return res.json(profile);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const { id_profile } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().required()
    });

    await schema.validate({ name })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
      });

    try {
      const profilesRepository = getRepository(Profiles);

      const profileActualData = await profilesRepository.findOne(id_profile);

      if (! profileActualData) {
        throw new BaseError("Perfil não encontrado!", `O perfil ${id_profile} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      await profilesRepository.update(id_profile, {
        name: name ? name : profileActualData?.name
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json("Perfil atualizado!");
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id_profile } = req.params;

    try { 
      const profilesRepository = getRepository(Profiles);

      let profile: Profiles = await profilesRepository.findOne(id_profile);

      if (!profile) {
        throw new BaseError("Perfil não encontrado!", `O perfil ${id_profile} não foi encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      await profilesRepository.delete(id_profile);

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Perfil deletado" });
  }
}