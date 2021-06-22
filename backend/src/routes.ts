import { Router } from "express";

import UsersController from "./controllers/UsersController";
import OwnersController from "./controllers/OwnersController";
import GroupsController from "./controllers/GroupsController";
import WorkschedulesController from "./controllers/WorkschedulesController";
import SessionController from "./controllers/SessionController";
import ProfilesController from "./controllers/ProfilesController";
import UsersProfilesController from "./controllers/UsersProfilesController";
import GroupsUsersController from "./controllers/GroupsUsersController";
import WorkschedulesGroupsController from "./controllers/WorkschedulesGroupsController";

const routes = Router();

routes.post("/authenticate", SessionController.authenticate);

routes.get("/users", UsersController.findAll);
routes.get("/users/:id_user", UsersController.findOne);
routes.get("/owners", OwnersController.findAll);
routes.get("/owners/:id_owner", OwnersController.findOne);
routes.get("/groups", GroupsController.findAll);
routes.get("/groups/:id_group", GroupsController.findOne);
routes.get("/workschedules", WorkschedulesController.findAll);
routes.get("/workschedules/:id_workschedule", WorkschedulesController.findOne);
routes.get("/profiles", ProfilesController.findAll);
routes.get("/profiles/:id_profile", ProfilesController.findOne);
routes.get("/usersprofiles/:id_user", UsersProfilesController.findAllProfilesOfOneUser);
routes.get("/groupsusers/:id_group", GroupsUsersController.findAllUsersOfOneGroup);
routes.get("/workschedulesgroups/:id_workschedule", WorkschedulesGroupsController.findAllGroupsOfOneWorkschedule);

routes.post("/users", UsersController.create);
routes.post("/owners", OwnersController.create);
routes.post("/groups", GroupsController.create);
routes.post("/workschedules", WorkschedulesController.create);
routes.post("/profiles", ProfilesController.create);
routes.post("/usersprofiles", UsersProfilesController.attachProfilesToOneUser);
routes.post("/groupsusers", GroupsUsersController.attachUsersToOneGroup);
routes.post("/workschedulesgroups", WorkschedulesGroupsController.attachGroupsToOneWorkschedule);

routes.put("/users/:id_user", UsersController.update);
routes.put("/owners/:id_owner", OwnersController.update);
routes.put("/groups/:id_group", GroupsController.update);
routes.put("/workschedules/:id_workschedule", WorkschedulesController.update);
routes.put("/profiles/:id_profile", ProfilesController.update);
routes.put("/usersprofiles", UsersProfilesController.unattachProfilesOfOneUser);
routes.put("/groupsusers", GroupsUsersController.unattachUsersOfOneGroup);
routes.put("/workschedulesgroups", WorkschedulesGroupsController.unattachGroupsOfOneWorkschedule);

routes.delete("/users/:id_user", UsersController.delete);
routes.delete("/owners/:id_owner", OwnersController.delete);
routes.delete("/groups/:id_group", GroupsController.delete);
routes.delete("/workschedules/:id_workschedule", WorkschedulesController.delete);
routes.delete("/profiles/:id_profile", ProfilesController.delete);

export default routes;