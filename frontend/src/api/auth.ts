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

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
}

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
}
