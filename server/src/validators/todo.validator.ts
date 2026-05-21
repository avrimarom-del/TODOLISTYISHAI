import z from "zod";
import { objectIdSchema } from "./common.validator";
import { reversePriorityMap } from "../services/todos.service";

//body
const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 characters")
    .max(100, "Title is too long (max 100)"),

  description: z.string().trim().max(500, "Description is too long").optional(),

  priority: z
    .enum(["low", "medium", "high"])
    .default("medium")
    .transform((v) => reversePriorityMap[v]),

  userId: objectIdSchema,

  completed: z.boolean().default(false),
});

const updateTodoSchema = createTodoSchema.partial();

const todoQuerySchema = z.object({
  completed: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  priority: z
    .enum(["low", "medium", "high"])
    .transform((v) => reversePriorityMap[v])
    .optional(),
  sortBy: z.enum(["priority", "createdAt"]).default("createdAt"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

type TodoQuery = z.infer<typeof todoQuerySchema>;

export { createTodoSchema, updateTodoSchema, todoQuerySchema, TodoQuery };
