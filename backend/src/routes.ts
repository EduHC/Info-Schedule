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
routes.get("/users/:id", UsersController.findOne);
routes.get("/owners", OwnersController.findAll);
routes.get("/owners/:id", OwnersController.findOne);
routes.get("/groups", GroupsController.findAll);
routes.get("/groups/:id", GroupsController.findOne);
routes.get("/workschedules/:id", WorkschedulesController.findAll);
routes.get("/workschedules/:id/:id_owner", WorkschedulesController.findOne);
routes.get("/profiles", ProfilesController.findAll);
routes.get("/profiles/:id", ProfilesController.findOne);
routes.get("/usersprofiles/:id", UsersProfilesController.findAllProfilesOfOneUser);
routes.get("/groupsusers/:id", GroupsUsersController.findAllUsersOfOneGroup);
routes.get("/workschedulesgroups/:id", WorkschedulesGroupsController.findAllGroupsOfOneWorkschedule);

routes.post("/users", UsersController.create);
routes.post("/owners", OwnersController.create);
routes.post("/groups", GroupsController.create);
routes.post("/workschedules", WorkschedulesController.create);
routes.post("/profiles", ProfilesController.create);
routes.post("/usersprofiles", UsersProfilesController.attachProfilesToOneUser);
routes.post("/groupsusers", GroupsUsersController.attachUsersToOneGroup);
routes.post("/workschedulesgroups", WorkschedulesGroupsController.attachGroupsToOneWorkschedule);

routes.put("/users/:id", UsersController.update);
routes.put("/owners/:id", OwnersController.update);
routes.put("/groups/:id", GroupsController.update);
routes.put("/workschedules/:id", WorkschedulesController.update);
routes.put("/profiles/:id", ProfilesController.update);
routes.put("/usersprofiles", UsersProfilesController.updateUserProfiles);
routes.put("/groupsusers", GroupsUsersController.unattachUsersOfOneGroup);

routes.delete("/users/:id", UsersController.delete);
routes.delete("/owners/:id", OwnersController.delete);
routes.delete("/groups/:id", GroupsController.delete);
routes.delete("/workschedules/:id", WorkschedulesController.delete);
routes.delete("/profiles/:id", ProfilesController.delete);

export default routes;