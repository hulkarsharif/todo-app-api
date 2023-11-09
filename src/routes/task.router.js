import { Router } from "express";
import { taskController } from "../controller/task.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);
taskRouter.get("/:id", userMiddleware.authenticate, taskController.getOne);
taskRouter.patch("/:id", userMiddleware.authenticate, taskController.update);
taskRouter.get("/", userMiddleware.authenticate, taskController.getAll);

taskRouter.patch(
    "/:id/archive",
    userMiddleware.authenticate,
    taskController.archive
);
taskRouter.patch(
    "/:id/reactivate",
    userMiddleware.authenticate,
    taskController.reactivate
);

export { taskRouter };
