import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/auth"
import { loginSchema, type loginInput } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <h3>Login</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Email" {...register("email")}/>
          {errors.email &&
            <p>
              {errors.email.message}
            </p>}
        </div>

        <div>
          <input type="password" placeholder="Password" {...register("password")} />
          {errors.password &&
            <p>
              {errors.password.message}
            </p>}
        </div>

        <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        <Link to="/register">Need an account? Register</Link>
      </form>
      
    </div>
  )
}

export default LoginPage
