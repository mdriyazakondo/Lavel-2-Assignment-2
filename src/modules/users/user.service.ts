import { pool } from "../../db/index";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserService = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;

  const hashPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,age,role)
           VALUES($1,$2,$3,$4,COALESCE($5, 'user'))
           RETURNING id,name,email,age,role,created_at,updated_at`,

    [name, email, hashPassword, age, role],
  );

  return result;
};

const getAllUserService = async () => {
  const result = await pool.query(
    `SELECT id,name,email,age,role,created_at,updated_at FROM users
    ORDER BY created_at DESC
    `,
  );
  return result;
};

const singleUserService = async (id: string) => {
  const result = await pool.query(
    `SELECT id,name,email,age,role,created_at,updated_at FROM users WHERE id = $1`,
    [id],
  );
  return result;
};
const updateUserService = async (id: string, payload: IUser) => {
  const { name, email, age, role } = payload;

  const result = await pool.query(
    `
    UPDATE users SET
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      age = COALESCE($3, age),
      role = COALESCE($4, role),
      updated_at = NOW()
    WHERE id = $5
    RETURNING id,name,email,age,role,created_at,updated_at
    `,
    [name, email, age, role, id],
  );

  return result;
};

const deleteUserService = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  createUserService,
  getAllUserService,
  singleUserService,
  updateUserService,
  deleteUserService,
};
