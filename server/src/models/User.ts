import { Schema, model } from "mongoose";
import { User } from "../types/User";
import isEmail from "validator/lib/isEmail";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // which error it will send
      trim: true,
      lowercase: true,
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
  },
  { timestamps: true },
);

// userSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password
//   }
// })

const UserModel = model<User>("User", userSchema);

export { UserModel };
