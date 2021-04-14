import { Router } from "express";

import UsersController from "./controllers/UsersController";
import OwnersController from "./controllers/OwnersController";

const routes = Router();

routes.get("/users", UsersController.findAll);
routes.get("/users/:id", UsersController.findOne);
routes.get("/owners", OwnersController.findAll);
routes.get("/owners/:id", OwnersController.findOne);

routes.post("/users", UsersController.create);
routes.post("/owners", OwnersController.create);

routes.put("/users/:id", UsersController.update);
routes.put("/owners/:id", OwnersController.update);

routes.delete("/users/:id", UsersController.delete);
routes.delete("/owners/:id", OwnersController.delete);

export default routes;