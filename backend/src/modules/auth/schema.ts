import z from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be atleast six characters")
});

export const loginSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
});
