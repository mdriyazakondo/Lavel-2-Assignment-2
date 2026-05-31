import { pool } from "../../db";
import type { TIssue } from "./issues.interface";

/**
 * CREATE ISSUE
 */
const createIssue = async (payload: TIssue) => {
  const { title, description, issue_type, reporter_id } = payload;

  const insertResult = await pool.query(
    `
    INSERT INTO issues (title, description, issue_type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [title, description, issue_type, reporter_id],
  );

  const issueId = insertResult.rows[0].id;

  const result = await pool.query(
    `
    SELECT
      i.*,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'email', u.email,
        'role', u.role
      ) AS reporter
    FROM issues i
    JOIN users u ON i.reporter_id = u.id
    WHERE i.id = $1
    `,
    [issueId],
  );

  return result.rows[0];
};

/**
 * GET ALL ISSUES
 */
const getAllIssues = async () => {
  const result = await pool.query(`
    SELECT
      i.*,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'email', u.email,
        'role', u.role
      ) AS reporter
    FROM issues i
    JOIN users u ON i.reporter_id = u.id
    ORDER BY i.created_at DESC
  `);

  return result.rows;
};

/**
 * GET SINGLE ISSUE
 */
const getSingleIssue = async (id: string) => {
  const result = await pool.query(
    `
    SELECT
      i.*,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'email', u.email,
        'role', u.role
      ) AS reporter
    FROM issues i
    JOIN users u ON i.reporter_id = u.id
    WHERE i.id = $1
    `,
    [id],
  );

  return result.rows[0];
};

/**
 * UPDATE ISSUE (PARTIAL UPDATE)
 */
const updateIssue = async (id: string, payload: TIssue) => {
  const { title, description, issue_type, status } = payload;

  const result = await pool.query(
    `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      issue_type = COALESCE($3, issue_type),
      status = COALESCE($4, status),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
    `,
    [title, description, issue_type, status, id],
  );

  return result.rows[0];
};

/**
 * DELETE ISSUE
 */
const deleteIssue = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM issues WHERE id = $1 RETURNING *`,
    [id],
  );

  return result.rows[0];
};

export const issueService = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
