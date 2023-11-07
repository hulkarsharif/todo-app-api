import { catchAsync } from "../errors/catch-async.js";
import { CustomError } from "../errors/custom-error.js";
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
                "Name, Description  and Due date  are required",
                400
            );
        }

        const task = await taskService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });
}

export const taskController = new TaskController();
