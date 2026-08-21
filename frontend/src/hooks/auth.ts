import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, loginUser, logoutUser, registerUser } from "../api/auth";
import type { loginInput, registerInput } from "../schemas/auth";
import { toast } from "sonner";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false
  });
}

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: registerInput) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["me"]});
      toast.success("Registered successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to register");
    }
  });
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: loginInput) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["me"]});
      toast.success("Loginned successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to login");
    }
  });
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["me"]});
      toast.success("Logged out");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to logout");
    }
  });
}
