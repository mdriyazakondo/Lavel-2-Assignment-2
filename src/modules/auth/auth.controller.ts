import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginService(req.body);

    const { refreshToken } = result;

 

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
    });

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

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const result = await authService.refreshTokenService(refreshToken);

    const { accessToken } = result;
    res.status(200).json({
      message: "Token refreshed successfully",
      success: true,
      data: { accessToken },
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
  refreshTokenController,
};
