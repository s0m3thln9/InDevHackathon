import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"

const loginSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
})

type LoginFormData = yup.InferType<typeof loginSchema>

export const LoginForm = () => {
  const [formData, setFormData] = useState<Partial<LoginFormData>>({})
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    setFormData(data)
  }

  const handleGoogleAuth = () => {
    console.log("Google auth")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
          Почта
        </label>
        <input
          type="email"
          {...register("email")}
          className={`mt-1 block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
            errors.email ? "border-[#EF4444]" : "border"
          } px-4 py-3 text-sm`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-[#EF4444]">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
          Пароль
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
              errors.password ? "border-[#EF4444]" : "border"
            } px-4 py-3 pr-10 text-sm`}
            placeholder="Не менее 6 символов"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#7C3AED] transition-colors"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-[#EF4444]">
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED] transition-all duration-200 shadow-md hover:shadow-[#7C3AED]/30"
      >
        Войти
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#374151]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-[#1F2937] text-[#9CA3AF]">или</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-3 bg-[#111827] border border-[#374151] rounded-lg shadow-sm py-2.5 px-4 text-sm font-medium text-[#F9FAFB] hover:bg-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] transition-colors duration-200"
      >
        <FaGoogle />
        <span>Войти через Google</span>
      </button>
      <div className="text-center text-sm pt-2">
        <span className="text-[#9CA3AF]">Нет аккаунта? </span>
        <button
          type="button"
          className="text-[#3B82F6] hover:text-[#60A5FA] font-medium focus:outline-none focus:underline transition-colors"
        >
          Зарегистроваться
        </button>
      </div>
    </form>
  )
}
