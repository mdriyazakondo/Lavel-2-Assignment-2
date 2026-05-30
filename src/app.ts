import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/users/user.route";
import authRoute from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandeler";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/users", authRouter);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

export default app;
