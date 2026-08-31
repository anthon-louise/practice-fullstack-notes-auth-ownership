import { useForm } from "react-hook-form"
import { registerSchema, type registerInput } from "../schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "../hooks/auth"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const registerMutation = useRegister();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {email: "", password: ""}
  })

  const onSubmit = (data: registerInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => nav("/")
    })
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Email" {...register("email")} />
          {errors.email && <p>
            {errors.email.message}</p>}
        </div>

        <div>
          <input placeholder="Password" type="password" {...register("password")} />
          {errors.password && <p>
            {errors.password.message}</p>}
        </div>

        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
