import { Router } from "express";
import { taskController } from "../controller/task.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);

export { taskRouter };
