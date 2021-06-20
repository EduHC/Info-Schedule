import { Request, Response, NextFunction } from "express";
import { EntityNotFoundError, getRepository, RepositoryNotFoundError } from "typeorm";
import { Users } from "../models/Users";
import * as Yup from "yup";
import UsersView from "../views/UsersView";
import { BaseError,ValidationError } from "../errors/Errors";
import { HttpStatusCode } from "../utils/HttpStatusCode";

export default {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, login, password, id_owner } = req.body;

    // Definindo a estrutura do objeto e seus atributos a serem validados
    const schema = Yup.object().shape({
      id_owner: Yup.number().required().integer().positive(),
      name: Yup.string().required(),
      login: Yup.string().required(),
      password: Yup.string().required()
    });
    
    await schema.validate({ name, login, password, id_owner }).catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });
        
    let user: Users;

    try {
      const usersRepository = getRepository(Users);
      
      user = usersRepository.create({ name, login, password, id_owner });
      await usersRepository.save(user);
    } catch (err) {
      next(new BaseError("Situação inesperada.", `Erro ao tentar retornar usuários`, true, HttpStatusCode.INTERNAL_SERVER));
      return;
    }

    return res.status(201).json(UsersView.render(user));
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    let users: Users[] = [];

    try {
      const usersRepository = getRepository(Users);
      
      users = await usersRepository.find();

      if (users.length === 0 ){
        return res.status(200).json({ message: "Nenhum usuário encontrado." });
      }

    } catch (err) {
      next(new BaseError("Situação inesperada.", `Erro ao tentar retornar usuários`, true, HttpStatusCode.INTERNAL_SERVER));
      return;
    }
    
    return res.json(UsersView.renderMany(users));
  },

  async findOne(req: Request, res: Response, next: NextFunction){
    const { id_user: id } = req.params;

    let user: Users;

    try {
      const usersRepository = getRepository(Users);
      user = await usersRepository.findOneOrFail({ loadRelationIds: true, where: { id_user: id } });

    } catch (err) {
      if (err instanceof EntityNotFoundError) 
        err = new BaseError("Usuário não encontrado", `Usuário ${id} não encontrado.`, true, HttpStatusCode.NOT_FOUND);

      next(err);
      return;
    }

    return res.status(200).json(UsersView.render(user));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { name, login, password } = req.body;
    const { id_user } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      login: Yup.string(),
      password: Yup.string()
    });

    await schema.validate({ name, login, password }).catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    }).finally(() => {
      return;
    });
    
    try {
      const usersRepository = getRepository(Users);
      const userData = await usersRepository.findOne(id_user);

      if (!userData) {
        throw new BaseError("Usuário não encontrado", `Usuário ${id_user} não encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      await usersRepository.update(id_user, {
        name: name ? name : userData?.name,
        login: login ? login : userData?.login,
        password: password ? password : userData?.password
      });
    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json("Usuário atualizado!");
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id_user } = req.params;

    try {
      const usersRepository = getRepository(Users);

      const userData = await usersRepository.findOne(id_user);

      if (!userData) {
        throw new BaseError("Usuário não encontrado", `Usuário ${id_user} não encontrado`, true, HttpStatusCode.BAD_REQUEST);
      }

      await usersRepository.delete(id_user);
    
    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Usuário deletado"});
  }
}