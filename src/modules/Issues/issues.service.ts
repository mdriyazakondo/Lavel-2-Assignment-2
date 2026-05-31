import { pool } from "../../db";
import type { TIssue } from "./issues.interface";

const createIssueTableQuery = async (payload: TIssue) => {
  const { title, description, type, reporter_id } = payload;
  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, type, reporter_id],
  );
  return result.rows[0];
};

const getAllIssuesQuery = async () => {
  const result = await pool.query(
    `SELECT * FROM issues ORDER BY created_at DESC`,
  );
  return result.rows;
};

const singleIssueQuery = async (id: string) => {
  const result = await pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateIssueQuery = async (id: string, payload: TIssue) => {
  const { title, description, type, status } = payload;
  const result = await pool.query(
    `UPDATE issues SET title = $1, description = $2, type = $3, status = $4 WHERE id = $5 RETURNING *`,
    [title, description, type, status, id],
  );
  return result.rows[0];
};

const deleteIssueQuery = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM issues WHERE id = $1 RETURNING *`,
    [id],
  );
  return result.rows[0];
};

export const issueService = {
  createIssueTableQuery,
  singleIssueQuery,
  updateIssueQuery,
  deleteIssueQuery,
  getAllIssuesQuery,
};
