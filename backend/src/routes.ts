import { Router } from "express";

import UsersController from "./controllers/UsersController";
import OwnersController from "./controllers/OwnersController";
import GroupsController from "./controllers/GroupsController";
import WorkschedulesController from "./controllers/WorkschedulesController";

const routes = Router();

routes.get("/users", UsersController.findAll);
routes.get("/users/:id", UsersController.findOne);
routes.get("/owners", OwnersController.findAll);
routes.get("/owners/:id", OwnersController.findOne);
routes.get("/groups", GroupsController.findAll);
routes.get("/groups/:id", GroupsController.findOne);
routes.get("/workschedules", WorkschedulesController.findAll);
routes.get("/workschedules/:id", WorkschedulesController.findOne);

routes.post("/users", UsersController.create);
routes.post("/owners", OwnersController.create);
routes.post("/groups", GroupsController.create);
routes.post("/workschedules", WorkschedulesController.create);

routes.put("/users/:id", UsersController.update);
routes.put("/owners/:id", OwnersController.update);
routes.put("/groups/:id", GroupsController.update);
routes.put("/workschedules/:id", WorkschedulesController.update);

routes.delete("/users/:id", UsersController.delete);
routes.delete("/owners/:id", OwnersController.delete);
routes.delete("/groups/:id", GroupsController.delete);
routes.delete("/workschedules/:id", WorkschedulesController.delete);

export default routes;