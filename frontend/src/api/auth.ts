import type { loginInput, registerInput } from "../schemas/auth";
import { api } from "./axios";

export const registerUser = async (data: registerInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export const loginUser = async (data: loginInput) => {
  const res = await api.post("/auth/login", data)
  return res.data;
}
