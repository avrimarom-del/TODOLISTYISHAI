import { HttpError } from "../errors/HttpError";
import { TodoModel } from "../models/Todo";
import { UserModel } from "../models/User";
import { Todo } from "../types/Todo";
import { TodoQuery } from "../validators/todo.validator";

const priorityMap: Record<number, string> = {
  1: "low",
  2: "medium",
  3: "high",
};

const reversePriorityMap: Record<string, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

// errorMiddleware works
const getTodos = async (todoQuery: TodoQuery) => {
  const query: Record<string, unknown> = {};

  if (todoQuery.completed !== undefined) {
    query.completed = todoQuery.completed;
  }
  if (todoQuery.priority) {
    query.priority = todoQuery.priority;
  }
  // {sortBy: "createdAt", sortDirection: asc } => {createtAt: 1}
  const sort: Record<string, 1 | -1> = {};
  sort[todoQuery.sortBy] = todoQuery.sortDirection === "asc" ? 1 : -1;

  const skip = (todoQuery.page - 1) * todoQuery.limit;

  const [todos, totalItems] = await Promise.all([
    TodoModel.find(query).sort(sort).skip(skip).limit(todoQuery.limit),
    TodoModel.countDocuments(query),
  ]);

  const formattedData = todos.map((todo) => {
    const todoObj = todo.toObject(); // Convert Mongoose doc to plain JS object
    return {
      ...todoObj,
      priority:
        priorityMap[todoObj.priority as keyof typeof priorityMap] || "medium",
    };
  });

  return {
    data: formattedData,
    meta: {
      totalItems,
      page: todoQuery.page,
      limit: todoQuery.limit,
      totalPages: Math.ceil(totalItems / todoQuery.limit),
    },
  };
};

// errorMiddleware works
const getTodoById = async (id: string) => {
  const todoById = await TodoModel.findById(id);
  if (!todoById) {
    throw new HttpError("Not found", 404);
  }
  return todoById;
};

const createTodo = async (todo: Todo) => {
  const userExsists = await UserModel.findById(todo.userId);

  if (!userExsists) {
    throw new HttpError(
      "Cannot create todo: Soldier (User) does not exist in the system.",
      404,
    );
  }

  const newTodo = await TodoModel.create(todo);
  const todoObj = newTodo.toObject();
  return {
    ...todoObj,
    priority:
      priorityMap[todoObj.priority as keyof typeof priorityMap] || "medium",
  };
};

// errorMiddleware works
const deleteTodo = async (id: string) => {
  const deletedTodo = await TodoModel.findByIdAndDelete(id);

  if (!deletedTodo) {
    throw new HttpError("Todo not found", 404);
  }
  return deletedTodo;
};

// errorMiddleware works
const updateTodo = async (id: string, todoData: Todo) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, todoData, {
    new: true,
    runValidators: true,
  });

  if (!updatedTodo) {
    throw new HttpError("Todo not found", 404);
  }
  console.log(updatedTodo);
  return { ...updatedTodo, priority: priorityMap[updatedTodo.priority] };
};
export {
  getTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
  priorityMap,
  reversePriorityMap,
};
