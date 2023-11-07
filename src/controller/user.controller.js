import { userService } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../errors/catch-async.js";
import { CustomError } from "../errors/custom-error.js";
class UserController {
    signUp = catchAsync(async (req, res) => {
        const { body } = req;

        const userInput = {
            email: body.email,
            preferredFirstName: body.preferredName,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password
        };

        await userService.signUp(userInput);
        res.status(201).json({
            message: "Success"
        });
    });

    login = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            password: body.password
        };

        const jwt = await userService.login(input);
        res.status(200).json({
            token: jwt
        });
    });
}

export const userController = new UserController();
