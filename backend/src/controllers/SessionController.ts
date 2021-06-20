import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import { UsersProfiles } from "../models/UsersProfiles";
import { sign } from "jsonwebtoken";
import UserProfilesView from "../views/UserProfilesView";
import * as Yup from "yup";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { BaseError, ValidationError } from "../errors/Errors";

export default {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;

    const schema = Yup.object().shape({
      login: Yup.string().required(),
      password: Yup.string().required()
    });

    await schema.validate({ login, password })
    .catch(({ name, errors } : Yup.ValidationError) => {
      next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
    })
    .finally(() => {
      return;
    });

    let token: any;

    try { 
      const usersRepository = getRepository(Users);
      const usersProfilesRepository = getRepository(UsersProfiles);
  
      const user: Users = await usersRepository.findOne({ where: { login: login, password: password }, loadRelationIds: true });
      const profiles: UsersProfiles[] = await usersProfilesRepository.find({ where: { id_user: user?.id_user } });

      if ( !user ) {
        throw new BaseError("Ops!", `Usuário ou Senha incorretos`, true, HttpStatusCode.BAD_REQUEST);
      }

      if ( profiles.length === 0 ) {
        throw new BaseError("Ocorrência inesperada", `Esse usuário não possuí nenhum perfil, por favor vincular a algum.`, true, HttpStatusCode.BAD_REQUEST);
      }

      token = sign({
        payload: {
          name: user.name,
          id_owner: user.id_owner,
          id_user: user.id_user,
          profile: UserProfilesView.render(profiles)
        }
      }, "requiem", {
        subject: login,
        expiresIn: "1d"
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ token: token });
  }
}