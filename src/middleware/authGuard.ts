import jwt from "jsonwebtoken";
import { config } from "../config";
import type { NextFunction, Request, Response } from "express";

export const authGuard = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }

      // টোকেন ভেরিফাই করা হচ্ছে
      const decoded = jwt.verify(
        token,
        config.ACCESS_TOKEN_SECRET,
      ) as jwt.JwtPayload;

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};
