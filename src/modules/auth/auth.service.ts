import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../../db";
import { config } from "../../config";

const loginService = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const result = await pool.query(
    `SELECT id, name, email, password, age, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email],
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid Credentials");
  }

  const userData = result.rows[0];

  const isPasswordValid = await bcrypt.compare(password, userData.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

  const jwtPayload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  delete userData.password;

  return { ...userData, accessToken };
};

export const authService = {
  loginService,
};
