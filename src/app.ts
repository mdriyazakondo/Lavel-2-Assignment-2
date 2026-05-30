import express from "express";
import cors from "cors";
import { authRouter } from "./modules/users/user.route.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", authRouter);

export default app;
