import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import * as Yup from "yup";
import UsersView from "../views/UsersView";

export default {
  async create(req: Request, res: Response) {
    const { name, login, password, id_owner } = req.body;

    // Definindo a estrutura do objeto e seus atributos a serem validados
    const schema = Yup.object().shape({
      id_owner: Yup.number().required().integer().positive(),
      name: Yup.string().required(),
      login: Yup.string().required(),
      password: Yup.string().required()
    });
   
    const userData = {
      id_owner,
      name,
      login,
      password
    };

    if (!schema.validate(userData)) {
      return res.status(401).json({ message: "Dado informado incorretamente",   });
    }

    const usersRepository = getRepository(Users);
    let user = {};

    try {
      user = usersRepository.create(userData);
      await usersRepository.save(user);
    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "Usuário criado!", user});
  },

  async findAll(req: Request, res: Response) {
    const usersRepository = getRepository(Users);
    let users = [];

    try {
      users = await usersRepository.find();
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(UsersView.renderMany(users));
  },

  async findOne(req: Request, res: Response){
    const { id } = req.params;

    const usersRepository = getRepository(Users);
    let user;

    try {
      user = await usersRepository.findOneOrFail({ loadRelationIds: true, where: { id_user: id } });
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json(UsersView.render(user));
  },

  async update(req: Request, res: Response) {
    const { name, login, password } = req.body;
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      login: Yup.string(),
      password: Yup.string()
    });

    const userData = {
      name: name,
      login: login,
      password: password
    }

    if (!schema.validate(userData)) {
      return res.status(400).json({ message: "Dados informado incorretamente" });
    }

    const usersRepository = getRepository(Users);
    
    try {
      const userData = await usersRepository.findOne(id);

      if (!userData) {
        return res.status(400).json({ message: "Usuário não econtrado!" });
      }

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

    const userData = await usersRepository.findOne(id);

    if (!userData) {
      return res.status(400).json({ message: "Usuário não econtrado!" });
    }

    try {
      await usersRepository.delete(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Usuário deletado"});
  }
}