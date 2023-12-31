import express from "express";
import { userRouter } from "./routes/user.router.js";
import { taskRouter } from "./routes/task.router.js";

import dotenv from "dotenv";
import { GlobalError } from "./middlewares/global-error.middleware.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4060;

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
