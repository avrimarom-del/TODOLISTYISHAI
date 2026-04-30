import { Router } from "express";
import {
  createUser,
  getUserById,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/users.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/users.validator";
import { objectIdParamSchema } from "../validators/common.validator";

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", validate({ body: createUserSchema }), createUser);

usersRouter.get("/:id", validate({ params: objectIdParamSchema }), getUserById);

usersRouter.put(
  "/:id",
  validate({ params: objectIdParamSchema, body: updateUserSchema }),
  updateUser,
);

usersRouter.delete(
  "/:id",
  validate({ params: objectIdParamSchema }),
  deleteUser,
);

export { usersRouter };
