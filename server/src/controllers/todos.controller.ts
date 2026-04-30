import type { Request, Response } from "express";
import * as todosService from "../services/todos.service";
import { TodoQuery } from "../validators/todo.validator";

const getTodos = async (req: Request<{}, {}, {}, TodoQuery>, res: Response) => {
  const result = await todosService.getTodos(req.query);
  res.json(result);
};

const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await todosService.getTodoById(id as string);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

const createTodo = async (req: Request, res: Response) => {
  const todo = req.body;

  const newTodo = await todosService.createTodo(todo);
  res.status(201).json(newTodo); // 201 = created
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await todosService.deleteTodo(id as string);
  return res.status(204).send();
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todoData = req.body;

  const updatedTodo = await todosService.updateTodo(id as string, todoData);
  res.status(200).json({ success: true, data: updatedTodo });
};

export { getTodos, createTodo, deleteTodo, getTodoById, updateTodo };
