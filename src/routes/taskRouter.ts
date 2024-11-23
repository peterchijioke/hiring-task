import { Router } from "express";
import {  TaskValidator } from "../validators";
import { TaskController } from "../controllers";
import { checkAuth } from "../utils";

export const taskRouter:Router = Router();

taskRouter.post(
  "/",
  checkAuth,
  TaskValidator.taskValidator,
  TaskController.createController
);
taskRouter.get(
  "/",
  checkAuth,
  TaskController.getController
);
taskRouter.patch(
  "/:id",
  checkAuth,
  TaskController.updateController
);
taskRouter.delete(
  "/:id",
  checkAuth,
  TaskController.deleteController
);
