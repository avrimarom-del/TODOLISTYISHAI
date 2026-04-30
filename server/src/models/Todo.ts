import mongoose, { Schema, model } from "mongoose";
import { Todo } from "../types/Todo";

const TodoSchema = new Schema<Todo>(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      trim: true,
      maxlength: [100, "Title cnnot be more than 100 charachters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A todo must belong to a user"],
    },
    priority: {
      type: Number,
      required: [true, "Priority is required"],
      enum: [1, 2, 3],
      default: 2,
    },
  },
  { timestamps: true },
);

const TodoModel = mongoose.model<Todo>("Todo", TodoSchema);

export { TodoModel };
