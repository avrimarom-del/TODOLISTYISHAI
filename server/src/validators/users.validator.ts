import z from "zod";

const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "name must be longer than 2 chars")
    .max(30, "name must be shorter than 30 chars"),
  email: z
    .email("valid email is required")
    .max(200, "email must be shorter than 200"),
  password: z.string().min(6, "password must be longer than 6 chars"),
});

const updateUserSchema = createUserSchema.omit({ password: true }).partial();

export { createUserSchema, updateUserSchema };
