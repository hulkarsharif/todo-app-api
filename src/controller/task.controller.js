import { catchAsync } from "../errors/catchAsync.js";
import { CustomError } from "../errors/customError.js";
import { taskService } from "../services/task.service.js";

class TaskController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            title: body.title,
            description: body.description,
            due: body.due
        };

        if (!input.title || !input.description || !input.due) {
            throw new CustomError(
                "Title, Description  and Due date  are required",
                400
            );
        }

        const task = await taskService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });

    getOne = catchAsync(async (req, res) => {
        const { userId, params } = req;

        const task = await taskService.getOne(params.id, userId);

        res.status(200).json({
            data: task
        });
    });

    update = catchAsync(async (req, res) => {
        const { body, params, userId } = req;
        const update = {};

        if (body.title) {
            update.title = body.title;
        }
        if (body.description) {
            update.description = body.description;
        }
        if (body.due) {
            update.due = body.due;
        }

        if (!update.title && !update.description && !update.due) {
            throw new CustomError("No update data provided", 400);
        }

        await taskService.update(params.id, userId, update);
        res.status(204).send();
    });

    getAll = catchAsync(async (req, res) => {
        const { userId } = req;

        const tasks = await taskService.getAll(userId);
        res.status(200).json({
            data: tasks
        });
    });

    archive = catchAsync(async (req, res) => {
        const { params, userId } = req;

        await taskService.changeStatus(params.id, userId, "ARCHIVED");
        res.status(204).send();
    });

    reactivate = catchAsync(async (req, res) => {
        const { params, userId } = req;

        await taskService.changeStatus(params.id, userId, "INPROGRESS");
        res.status(204).send();
    });
}

export const taskController = new TaskController();
