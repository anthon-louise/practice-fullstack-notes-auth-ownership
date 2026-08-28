import { useForm } from "react-hook-form"
import { registerSchema, type registerInput } from "../schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"

const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {email: "", password: ""}
  })

  return (
    <div>
    </div>
  )
}

export default RegisterPage
