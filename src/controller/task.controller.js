import { catchAsync } from "../errors/catch-async.js";
import { CustomError } from "../errors/custom-error.js";
import { taskService } from "../services/task.service.js";

class TaskController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;
        const input = {
            name: body.name,
            description: body.description
        };

        if (!input.name || !input.description) {
            throw new CustomError("Name and Description are required", 400);
        }

        const task = await taskService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });
}

export const taskController = new TaskController();
