import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const loginSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
})

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: yup.InferType<typeof loginSchema>) => {
    try {
      setIsSubmitting(true)
      setServerError("")
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Авторизация:", response.data)
    } catch (error) {
      setServerError("Неверный email или пароль")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleAuth = () => {
    console.log("Google auth")
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {serverError && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Почта"
          type="email"
          {...register("email")}
          variant={errors.email ? "error" : "default"}
          error={errors.email?.message}
          placeholder="your@email.com"
        />
        <div className="relative">
          <Input
            label="Пароль"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            variant={errors.password ? "error" : "default"}
            error={errors.password?.message}
            placeholder="Введите ваш пароль"
            className="pr-10"
          />
          <div className="absolute right-3 top-[42px]">
            <Button
              variant="icon"
              onClick={() => setShowPassword(!showPassword)}
              iconState={showPassword ? "hide" : "show"}
              className="!p-2"
            />
          </div>
        </div>
        <Button type="submit" loading={isSubmitting}>
          Войти
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#374151]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#1F2937] text-[#9CA3AF]">или</span>
          </div>
        </div>
        <Button variant="google" icon={<FaGoogle />} onClick={handleGoogleAuth}>
          Войти через Google
        </Button>
        <div className="text-center text-sm pt-2">
          <span className="text-[#9CA3AF]">Нет аккаунта? </span>
          <Button variant="text" onClick={() => navigate("/register")}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
