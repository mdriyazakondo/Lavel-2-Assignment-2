import express from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middleware/auth";

const router = express.Router();

router.post("/", userController.createUserController);

router.get("/", authMiddleware("admin"), userController.getAllUserController);

router.get("/:id", userController.singleUserController);
router.put("/:id", userController.updateUserController);
router.delete("/:id", userController.deleteUserController);

export const authRouter = router;
