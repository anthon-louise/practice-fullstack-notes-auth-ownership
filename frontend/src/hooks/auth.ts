import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, registerUser } from "../api/auth";
import type { registerInput } from "../schemas/auth";
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
