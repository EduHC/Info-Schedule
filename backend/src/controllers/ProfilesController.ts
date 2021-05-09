import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Profiles } from "../models/Profiles";

export default {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const profilesRepository = getRepository(Profiles);
    let profile = {};

    const profileData = {
      name: name
    }

    try {
      profile = profilesRepository.create(profileData);
      
      await profilesRepository.save(profile);

    } catch (err) {
      return res.status(400).json(err);
    } 

    return res.status(201).json({ message: "Perfil criado com sucesso!", profile });
  },

  async findAll(req: Request, res: Response) {
    const profilesRepository = getRepository(Profiles);

    let profiles = {};

    try {
      profiles = await profilesRepository.find();
    } catch (err) {
      return res.status(400).json(err);
    }

    return res.json(profiles);
  },

  async findOne(req: Request, res: Response) {
    const { id } = req.params;

    const profilesRepository = getRepository(Profiles);
    let profile = {};

    try {   
      profile = await profilesRepository.findOneOrFail(id);
    } catch (err) {
      return res.status(400).json(err);
    }

    return res.json(profile);
  },

  async update(req: Request, res: Response) {
    const { name } = req.body;
    const { id } = req.params;

    const profilesRepository = getRepository(Profiles);

    try {
      const profileData = await profilesRepository.findOneOrFail(id);

      await profilesRepository.update(id, {
        name: name ? name : profileData?.name
      });
    } catch (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json("Perfil atualizado!");
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const profilesRepository = getRepository(Profiles);

    try { 
      await profilesRepository.delete(id);
    } catch (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json({ message: "Perfil deletado" });
  }
}