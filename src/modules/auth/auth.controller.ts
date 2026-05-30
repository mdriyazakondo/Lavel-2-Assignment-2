import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginService(req.body);
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const authController = {
  loginController,
};
