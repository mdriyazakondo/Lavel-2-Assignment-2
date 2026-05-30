import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserService(req.body);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      success: false,
      data: null,
    });
  }
};

const getAllUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserService();
    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
      success: false,
      data: null,
    });
  }
};

const singleUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.singleUserService(id as string);
    res.status(200).json({
      message: "User retrieved successfully",
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user",
      success: false,
      data: null,
    });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUserService(id as string, req.body);
    res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      success: false,
      data: null,
    });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUserService(id as string);
    res.status(200).json({
      message: "User deleted successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      success: false,
      data: null,
    });
  }
};

export const userController = {
  createUserController,
  getAllUserController,
  singleUserController,
  updateUserController,
  deleteUserController,
};
