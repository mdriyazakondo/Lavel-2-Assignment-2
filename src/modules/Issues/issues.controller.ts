import type { Request, Response } from "express";
import { issueService } from "./issues.service";

//create issue controller
const createIssueController = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssue(req.body);
    res.status(201).json({
      message: "Issue created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//get all issues controller
const getAllIssuesController = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssues();
    res.status(200).json({
      message: "Issues retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get single issue controller
const singleIssueController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await issueService.getSingleIssue(id as string);
    res.status(200).json({
      message: "Issue retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// update issue controller
const updateIssueController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await issueService.updateIssue(id as string, req.body);
    res.status(200).json({
      message: "Issue updated successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// delete issue controller

const deleteIssueController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await issueService.deleteIssue(id as string);
    res.status(200).json({
      message: "Issue deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const issueController = {
  createIssueController,
  getAllIssuesController,
  singleIssueController,
  updateIssueController,
  deleteIssueController,
};
