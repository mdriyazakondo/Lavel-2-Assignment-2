import express from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middleware/auth";
import { UserRole } from "../../utility";

const router = express.Router();

router.post("/", userController.createUserController);

router.get(
  "/",
  authMiddleware(UserRole.MAINTAINER),
  userController.getAllUserController,
);

router.get(
  "/:id",
  authMiddleware(UserRole.CONTRIBUTOR),
  userController.singleUserController,
);

router.put(
  "/:id",
  authMiddleware(UserRole.CONTRIBUTOR),
  userController.updateUserController,
);

router.delete(
  "/:id",
  authMiddleware(UserRole.MAINTAINER),
  userController.deleteUserController,
);

export const authRouter = router;
