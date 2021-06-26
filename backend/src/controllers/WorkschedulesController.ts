import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { BaseError, ValidationError } from "../errors/Errors";
import { Workschedules } from "../models/Workschedules";
import { Owners } from "../models/Owners";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import WorkscheduleView from "../views/WorkschedulesView";
import * as Yup from "yup";

export default {
  async create(req: Request, res: Response, next: NextFunction) {
    const { id_owner, date } = req.body;

    const schema = Yup.object().shape({
      id_owner: Yup.number().required().integer().positive(),
      date: Yup.string().required()
    });

    await schema.validate({ id_owner, date })
      .catch(({ name, errors }: Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
      });

    let workschedule: Workschedules;

    try {
      const ownersRepository = getRepository(Owners);
      const workschedulesRepository = getRepository(Workschedules);

      let owner = ownersRepository.findOne(id_owner);

      if (!owner) {
        throw new BaseError("Empresa não encontrada!", `A empresa ${id_owner} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

      workschedule = workschedulesRepository.create({ id_owner, date });
      await workschedulesRepository.save(workschedule);
    } catch (err) {
      next(err);
      return;
    }

    return res.status(201).json({ message: "Escala criada", workschedule })
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    let workschedules = [];

    try {
      const workschedulesRepository = getRepository(Workschedules);

      workschedules = await workschedulesRepository.query(`
      SELECT workschedule.id_workschedule,
             workschedule.date, 
             workschedule_groups.id_group, 
             infGroups.start_hour, 
             infGroups.end_hour,
             infGroups.name AS groupName, 
             users.id_user, 
             users.name
        FROM inf_association_workschedules_groups AS workschedule_groups
       RIGHT JOIN inf_entity_workschedules AS workschedule
          ON workschedule_groups.id_workschedule = workschedule.id_workschedule
        LEFT JOIN inf_entity_groups AS infGroups
          ON workschedule_groups.id_group = infGroups.id_group
        LEFT JOIN inf_association_groups_users AS groups_users
          ON groups_users.id_group = infGroups.id_group
        LEFT JOIN inf_entity_users AS users
          ON users.id_user = groups_users.id_user
       ORDER BY workschedule.id_workschedule, infGroups.id_group, users.id_user DESC;
      `);

      if (workschedules.length === 0) {
        return res.status(200).json({ message: "Nenhuma escala encontrada." });
      }

    } catch (err) {
      next(err);
      return;
    }

    return res.json(WorkscheduleView.render(workschedules));
  },

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id_workschedule } = req.params;

    let workschedule = [];

    try {
      const workschedulesRepository = getRepository(Workschedules);

      workschedule = await workschedulesRepository.query(`
          SELECT workschedule.id_workschedule,
                 workschedule.date, 
                 workschedule_groups.id_group, 
                 infGroups.start_hour, 
                 infGroups.end_hour,
                 infGroups.name AS groupName, 
                 users.id_user, 
                 users.name
            FROM inf_association_workschedules_groups AS workschedule_groups
           RIGHT JOIN inf_entity_workschedules AS workschedule
              ON workschedule_groups.id_workschedule = workschedule.id_workschedule
            LEFT JOIN inf_entity_groups AS infGroups
              ON workschedule_groups.id_group = infGroups.id_group
            LEFT JOIN inf_association_groups_users AS groups_users
              ON groups_users.id_group = infGroups.id_group
            LEFT JOIN inf_entity_users AS users
              ON users.id_user = groups_users.id_user
           WHERE workschedule.id_workschedule = ${id_workschedule}
           ORDER BY workschedule.id_workschedule, infGroups.id_group ASC;
      `);

      if (workschedule.length === 0) {
        throw new BaseError("Escala não encontrada!", `A escala ${id_workschedule} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json(WorkscheduleView.render(workschedule));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { date } = req.body;
    const { id_workschedule } = req.params;

    const schema = Yup.object().shape({
      id_owner: Yup.number().required().integer().positive()
    });

    await schema.validate({  date })
      .catch(({ name, errors }: Yup.ValidationError) => {
        next(new ValidationError(name, errors, true, HttpStatusCode.BAD_REQUEST, "Dados enviados incorretamente"));
      })
      .finally(() => {
        return;
      });

    try {
      const workschedulesRepository = getRepository(Workschedules);

      let workscheduleExists = await workschedulesRepository.findOne(id_workschedule);

      if (!workscheduleExists) {
        throw new BaseError("Escala não encontrada!", `A escala ${id_workschedule} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

      await workschedulesRepository.update(id_workschedule, {
        date: date
      });

    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Escala atualizada" })
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id_workschedule } = req.params;

    try {

      const workschedulesRepository = getRepository(Workschedules);

      let workscheduleExists = await workschedulesRepository.findOne(id_workschedule);

      if (!workscheduleExists) {
        throw new BaseError("Escala não encontrada!", `A escala ${id_workschedule} não foi encontrada`, true, HttpStatusCode.BAD_REQUEST);
      }

      await workschedulesRepository.delete(id_workschedule);
    
    } catch (err) {
      next(err);
      return;
    }

    return res.status(200).json({ message: "Escala deletada!" })
  },
}