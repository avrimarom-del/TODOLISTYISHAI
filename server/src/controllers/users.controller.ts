import * as usersService from "../services/users.service";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/User";

const getUsers = async (req: Request, res: Response) => {
  const result = await usersService.getUsers();
  res.status(200).json(result);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await usersService.getUserById(id as string);
  res.status(200).json({ result });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await usersService.deleteUser(id as string);
  res.status(200).json({ message: "User deleted successfully" });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;
  const result = await usersService.updateUser(id as string, userData);

  res.status(200).json(result);
};

const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await usersService.createUser(userData);
  res.status(201).json(newUser);
};

export { getUsers, deleteUser, getUserById, updateUser, createUser };
