import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";

export default {
  async create(req: Request, res: Response) {
    const { name, login, password, email, phone } = req.body;
    
    const userData = {
      name,
      login,
      password,
      email,
      phone
    };

    const usersRepository = getRepository(Users);

    const user = usersRepository.create(userData);

    usersRepository.save(user);

    return res.status(201).json("Usuário criado!");
  },

  async findAll(req: Request, res: Response) {
    const usersRepository = getRepository(Users);

    const users = await usersRepository.find();

    return res.json(users);
  },

  async findOne(req: Request, res: Response){
    const { id } = req.params;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOneOrFail(id);

    return res.status(200).json(user);
  },

  async update(req: Request, res: Response) {
    const { name, login, password, email, phone } = req.body;
    const { id } = req.params;

    const usersRepository = getRepository(Users);

    const userData = await usersRepository.findOne(id);

    await usersRepository.update(id, {
      name: name ? name : userData?.name,
      login: login ? login : userData?.login,
      password: password ? password : userData?.password,
      email: email ? email : userData?.email,
      phone: phone ? phone : userData?.phone
    });

    return res.status(200).json("Usuário atualizado!");
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getRepository(Users);

    await usersRepository.delete(id);

    return res.status(200).json("Usuário deletado");
  }
}