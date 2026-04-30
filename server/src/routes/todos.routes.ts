import { RequestHandler, Router } from "express"; // RequestHandler added
import {
  createTodo,
  getTodoById,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createTodoSchema,
  todoQuerySchema,
  updateTodoSchema,
} from "../validators/todo.validator";
import { objectIdParamSchema } from "../validators/common.validator";

const todosRouter = Router();

todosRouter.get(
  "/",
  validate({ query: todoQuerySchema }),
  getTodos as unknown as RequestHandler, // added
);
todosRouter.post("/", validate({ body: createTodoSchema }), createTodo);
todosRouter.get("/:id", validate({ params: objectIdParamSchema }), getTodoById);
todosRouter.delete(
  "/:id",
  validate({ params: objectIdParamSchema }),
  deleteTodo,
);
todosRouter.put(
  "/:id",
  validate({ params: objectIdParamSchema, body: updateTodoSchema }),
  updateTodo,
);

export { todosRouter };
