import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/auth"
import { loginSchema, type loginInput } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const loginMutation = useLogin();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = (data: loginInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => nav("/")
    });
  }

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage
