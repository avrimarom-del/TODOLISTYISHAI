import { Document, Schema } from "mongoose";

interface Todo extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
}

export { Todo };
