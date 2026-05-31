import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";

type UserRole = "maintainer" | "contributor";

const maintainer = (...roles: UserRole[]) => {
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

      console.log(userData.rows[0]);

      (req as any).decoded = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default maintainer;
