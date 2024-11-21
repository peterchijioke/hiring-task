import { Router } from "express";
import { AuthValidator, TaskValidator } from "../validators";
import { AuthController, TaskController } from "../controllers";
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
