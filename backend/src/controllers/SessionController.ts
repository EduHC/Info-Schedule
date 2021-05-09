import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import { sign } from "jsonwebtoken";

export default {
  async authenticate(req: Request, res: Response) {
    const { login, password } = req.body;

    const usersRepository = getRepository(Users);
    let token;

    try { 
      const user = await usersRepository.findOne({ where: { login: login, password: password }});

      if ( !user ) {
        return res.status(200).json({ token: "Usuário ou senha errados!" });
      }

      token = sign({}, "requiem", {
        subject: login,
        expiresIn: "1d"
      });

    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({token: token});
  }
}