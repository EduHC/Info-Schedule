import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Owners } from "../models/Owners";
import OwnersView from "../views/OwnersView";
import * as Yup from "yup";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { BaseError, ValidationError } from "../errors/Errors";

export default {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, company_name, CNPJ, phone } = req.body;
    
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      company_name: Yup.string().required(),
      CNPJ: Yup.string().required(),
      phone: Yup.string().required()
    });

    await schema.validate({ name, company_name, CNPJ, phone })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
    });

    let owner = {};

    try {
      const ownersRepository = getRepository(Owners);
  
      owner = ownersRepository.create({ name, company_name, CNPJ, phone });
      await ownersRepository.save(owner);

    } catch (err) {
      next(err);
      return;
    }
    
    return res.status(201).json(owner);
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    let owners = [];

    try {
      const ownersRepository = getRepository(Owners);
      owners = await ownersRepository.find();

      if (owners.length === 0) {
        return res.status(200).json({ message: "Nenhuma empresa encontrada", owners });
      }
      
    } catch (err) {
      next(err);
      return;
    }
  
    return res.json(OwnersView.renderMany(owners));
  },

  async findOne(req: Request, res: Response, next: NextFunction){
    const { id_owner } = req.params;
    let owner: Owners;

    try {
      const ownersRepository = getRepository(Owners);
      owner = await ownersRepository.findOne(id_owner);

      if (!owner) {
        throw new BaseError("Empresa não encontrada!", `A empresa ${id_owner} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json(OwnersView.render(owner));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { name, company_name, CNPJ, phone } = req.body;
    const { id_owner } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      company_name: Yup.string(),
      CNPJ: Yup.string(),
      phone: Yup.string()
    });

    await schema.validate({ name, company_name, CNPJ, phone })
      .catch(({ name, errors } : Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
    });

    try {
      const ownersRepository = getRepository(Owners);
      const ownerData = await ownersRepository.findOne(id_owner);
      const owner = await ownersRepository.findOne(id_owner);

      if (!owner) {
        throw new BaseError("Empresa não encontrada!", `A empresa ${id_owner} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

      await ownersRepository.update(id_owner, {
        name: name ? name : ownerData?.name,
        company_name: company_name ? company_name : ownerData?.company_name,
        CNPJ: CNPJ ? CNPJ : ownerData?.CNPJ,
        phone: phone ? phone : ownerData?.phone
      });
    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Empresa atualizada!" })
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id_owner } = req.params;

    try {
      const ownersRepository = getRepository(Owners);
      
      const owner = await ownersRepository.findOne(id_owner);

      if (!owner) {
        throw new BaseError("Empresa não encontrada!", `A empresa ${id_owner} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }
      
      ownersRepository.delete(id_owner);

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Empresa deletada" })
  }
}