import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";

export default {
  async create(req: Request, res: Response) {
    const { name, login, password, email, phone, id_owner } = req.body;
    
    const userData = {
      id_owner,
      name,
      login,
      password,
      email,
      phone
    };

    const usersRepository = getRepository(Users);
    let user = {};

    try {
      user = await usersRepository.create(userData);
      await usersRepository.save(user);
    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "Usuário criado!", user});
  },

  async findAll(req: Request, res: Response) {
    const usersRepository = getRepository(Users);
    let users = {};

    try {
      users = await usersRepository.find();
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(users);
  },

  async findOne(req: Request, res: Response){
    const { id } = req.params;

    const usersRepository = getRepository(Users);
    let user = {};

    try {
      user = await usersRepository.findOneOrFail(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json(user);
  },

  async update(req: Request, res: Response) {
    const { name, login, password } = req.body;
    const { id } = req.params;

    const usersRepository = getRepository(Users);
    
    try {
      const userData = await usersRepository.findOne(id);

      await usersRepository.update(id, {
        name: name ? name : userData?.name,
        login: login ? login : userData?.login,
        password: password ? password : userData?.password
      });
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json("Usuário atualizado!");
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getRepository(Users);

    try {
      await usersRepository.delete(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Usuário deletado"});
  }
}