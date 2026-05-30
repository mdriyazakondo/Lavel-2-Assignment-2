import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", userController.createUserController);
router.get("/", userController.getAllUserController);
router.get("/:id", userController.singleUserController);
router.put("/:id", userController.updateUserController);
router.delete("/:id", userController.deleteUserController);

export const authRouter = router;
