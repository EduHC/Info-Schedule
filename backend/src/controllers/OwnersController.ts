import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Owners } from "../models/Owners";

export default {
  async create(req: Request, res: Response) {
    const { name, company_name, CNPJ, phone } = req.body;
    
    const ownerData = {
      name,
      company_name,
      CNPJ,
      phone
    };

    const ownersRepository = getRepository(Owners);

    try {
      const owner = await ownersRepository.create(ownerData);
      await ownersRepository.save(owner);

    } catch (err) {
      return res.json(err);
    }
    
    return res.status(201).json( "Criado" );
  },

  async findAll(req: Request, res: Response) {
    const ownersRepository = getRepository(Owners);
    let owners = {};

    try {
     owners = await ownersRepository.find();
    } catch (err) {
      return res.json(err);
    }
  
    return res.json(owners);
  },

  async findOne(req: Request, res: Response){
    const { id } = req.params;

    const ownersRepository = getRepository(Owners);
    let owners = {};

    try {
      owners = await ownersRepository.findOneOrFail(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json(owners);
  },

  async update(req: Request, res: Response) {
    const { name, company_name, CNPJ, phone } = req.body;
    const { id } = req.params;

    const ownersRepository = getRepository(Owners);

    try {
      const ownerData = await ownersRepository.findOne(id);

      await ownersRepository.update(id, {
        name: name ? name : ownerData?.name,
        company_name: company_name ? company_name : ownerData?.company_name,
        CNPJ: CNPJ ? CNPJ : ownerData?.CNPJ,
        phone: phone ? phone : ownerData?.phone
      });
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Empresa atualizada!" })
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const ownersRepository = getRepository(Owners);

    try {
      ownersRepository.delete(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Empresa deletada" })
  }
}