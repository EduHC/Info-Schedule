import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import { UsersProfiles } from "../models/UsersProfiles";
import { sign } from "jsonwebtoken";
import UserProfilesView from "../views/UsserProfilesView";

export default {
  async authenticate(req: Request, res: Response) {
    const { login, password } = req.body;

    const usersRepository = getRepository(Users);
    const usersProfilesRepository = getRepository(UsersProfiles);

    let token;

    try { 
      const user = await usersRepository.findOne({ where: { login: login, password: password }});
      const profiles: any[] = await usersProfilesRepository.find({ where: { id_user: user?.id_user } });

      if ( !user ) {
        return res.status(200).json({ token: "Usuário ou senha errados!" });
      }

      console.log({
        payload: {
          id_owner: user.id_owner,
          id_user: user.id_user,
          profile: UserProfilesView.render(profiles)
        }
      });

      token = sign({
        payload: {
          id_owner: user.id_owner,
          id_user: user.id_user,
          profile: UserProfilesView.render(profiles)
        }
      }, "requiem", {
        subject: login,
        expiresIn: "1d"
      });

    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ token: token });
  }
}