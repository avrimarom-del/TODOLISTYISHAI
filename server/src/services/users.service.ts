import { HttpError } from "../errors/HttpError";
import { UserModel } from "../models/User";
import { User } from "../types/User";
import { TodoModel } from "../models/Todo";

// errorMiddleware works
const getUsers = async () => await UserModel.find({});

// errorMiddleware works
const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new HttpError("User not found in database", 404);
  }
  return user;
};

const createUser = async (userData: User) => {
  return await UserModel.create(userData);
};

// errorMiddleware works
const deleteUser = async (id: string) => {
  const userToDelete = await UserModel.findByIdAndDelete(id);
  await TodoModel.deleteMany({ id });

  if (!userToDelete) {
    throw new HttpError("User not found in database", 404);
  }
  return { message: "User deleted successfully" };
};

// errorMiddleware works
const updateUser = async (id: string, userData: User) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new HttpError("User not found in database", 404);
  }

  return updatedUser;
};

export { getUsers, deleteUser, getUserById, updateUser, createUser };
