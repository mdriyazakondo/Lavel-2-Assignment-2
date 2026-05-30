import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";

type UserRole = "admin" | "user" | "contributor";

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const decoded = jwt.verify(
        token,
        config.ACCESS_TOKEN_SECRET,
      ) as jwt.JwtPayload;

      const userData = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [decoded.email],
      );

      if (roles.length > 0 && !roles.includes(userData.rows[0].role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      (req as any).decoded = decoded;

      console.log(userData);
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
