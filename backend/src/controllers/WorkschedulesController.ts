import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Workschedules } from "../models/Workschedules";
import WorkscheduleView from "../views/WorkschedulesView";

export default {
  async create(req: Request, res: Response) {
    const { id_owner, date } = req.body;

    const workscheduleData = {
      id_owner,
      date
    };

    const workschedulesRepository = getRepository(Workschedules);
    let workschedule = {};

    try {
      workschedule = await workschedulesRepository.create(workscheduleData);
      await workschedulesRepository.save(workschedule);
    } catch (err) {
      return res.json(err);
    }

    return res.status(201).json({ message: "Escala criada", workschedule })
  },

  async findAll(req: Request, res: Response) {
    const { id } = req.params;
    
    const workschedulesRepository = getRepository(Workschedules);
    let workschedules = {};

    try {
      workschedules = await workschedulesRepository.query(`
      SELECT workschedule.id_workschedule,
             workschedule.date, 
             workschedule_groups.id_group, 
             infGroups.start_hour, 
             infGroups.end_hour, 
             users.id_user, 
             users.name
        FROM inf_entity_workschedules AS workschedule
       INNER JOIN inf_association_workschedules_groups AS workschedule_groups
          ON workschedule_groups.id_workschedule = workschedule.id_workschedule
       INNER JOIN inf_entity_groups AS infGroups
          ON workschedule_groups.id_group = infGroups.id_group
       INNER JOIN inf_association_groups_users AS groups_users
          ON groups_users.id_group = infGroups.id_group
       INNER JOIN inf_entity_users AS users
          ON users.id_user = groups_users.id_user
       WHERE workschedule.id_owner = ${id}
       ORDER BY workschedule.id_workschedule, infGroups.id_group ASC;
  `);
    } catch (err) {
      return res.json(err);
    }
    
    return res.json(WorkscheduleView.render(workschedules));
  },

  async findOne(req: Request, res: Response) {
    const { id, id_owner } = req.params;

    const workschedulesRepository = getRepository(Workschedules);
    let workschedule = {};

    try {
      workschedule = await workschedulesRepository.query(`
          SELECT workschedule.id_workschedule,
                 workschedule.date, 
                 workschedule_groups.id_group, 
                 infGroups.start_hour, 
                 infGroups.end_hour, 
                 users.id_user, 
                 users.name
            FROM inf_entity_workschedules AS workschedule
           INNER JOIN inf_association_workschedules_groups AS workschedule_groups
              ON workschedule_groups.id_workschedule = workschedule.id_workschedule
           INNER JOIN inf_entity_groups AS infGroups
              ON workschedule_groups.id_group = infGroups.id_group
           INNER JOIN inf_association_groups_users AS groups_users
              ON groups_users.id_group = infGroups.id_group
           INNER JOIN inf_entity_users AS users
              ON users.id_user = groups_users.id_user
           WHERE workschedule.id_owner = ${id_owner}
             AND workschedule.id_workschedule = ${id}
           ORDER BY workschedule.id_workschedule, infGroups.id_group ASC;
      `);
    } catch (err) {
      return res.json(err); 
    }

    //console.log(workschedule);
    return res.status(200).json(WorkscheduleView.render(workschedule));
  },

  async update(req: Request, res: Response) {
    const { date } = req.body;
    const { id } = req.params;

    const workschedulesRepository = getRepository(Workschedules);

    try {
      await workschedulesRepository.update(id, {
        date: date
      });
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Escala atualizada" })
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const workschedulesRepository = getRepository(Workschedules);

    try {
      await workschedulesRepository.delete(id);
    } catch (err) {
      return res.json(err);
    }

    return res.status(200).json({ message: "Escala deletada!" })
  },
}