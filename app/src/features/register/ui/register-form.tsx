import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"

const registerStep1Schema = yup.object({
  email: yup.string().email("Некорректный email").required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
})

const registerStep2Schema = yup.object({
  fullName: yup.string().required("Обязательное поле"),
  phone: yup.string().required("Обязательное поле"),
  birthDate: yup.date().required("Обязательное поле"),
  passportNumber: yup.string().required("Обязательное поле"),
})

type RegisterStep1Data = yup.InferType<typeof registerStep1Schema>
type RegisterStep2Data = yup.InferType<typeof registerStep2Schema>
type RegisterFormData = RegisterStep1Data & RegisterStep2Data

export const RegisterForm = () => {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    getValues: getStep1Values,
    formState: { errors: errorsStep1 },
  } = useForm<RegisterStep1Data>({
    resolver: yupResolver(registerStep1Schema),
  })

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
  } = useForm<RegisterStep2Data>({
    resolver: yupResolver(registerStep2Schema),
  })

  const onSubmitStep1 = () => {
    setStep(2)
  }

  const onSubmitStep2 = async (step2Data: RegisterStep2Data) => {
    const step1Data = getStep1Values()
    const completeData: RegisterFormData = { ...step1Data, ...step2Data }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/registration",
        {
          email: completeData.email,
          password: completeData.password,
          full_name: completeData.fullName,
          passport_number: completeData.passportNumber,
          birth_date: completeData.birthDate,
          phone: completeData.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Успешная регистрация:", response.data)
    } catch (error) {
      console.error("Ошибка регистрации:", error)
    }
  }

  const handleGoogleAuth = () => {
    console.log("Google auth")
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Почта
            </label>
            <input
              type="email"
              {...registerStep1("email")}
              className={`mt-1 block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                errorsStep1.email ? "border-[#EF4444]" : "border"
              } px-4 py-3 text-sm`}
              placeholder="your@email.com"
            />
            {errorsStep1.email && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep1.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...registerStep1("password")}
                className={`block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                  errorsStep1.password ? "border-[#EF4444]" : "border"
                } px-4 py-3 pr-10 text-sm`}
                placeholder="Не менее 6 символов"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#7C3AED] transition-colors"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errorsStep1.password && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep1.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Повторите пароль
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...registerStep1("confirmPassword")}
                className={`block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                  errorsStep1.confirmPassword ? "border-[#EF4444]" : "border"
                } px-4 py-3 pr-10 text-sm`}
                placeholder="Повторите ваш пароль"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#7C3AED] transition-colors"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </button>
            </div>
            {errorsStep1.confirmPassword && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep1.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED] transition-all duration-200 shadow-md hover:shadow-[#7C3AED]/30"
          >
            Продолжить
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
            <span>Регистрация через Google</span>
          </button>
          <div className="text-center text-sm pt-2">
            <span className="text-[#9CA3AF]">Есть аккаунт? </span>
            <button
              type="button"
              className="text-[#3B82F6] hover:text-[#60A5FA] font-medium focus:outline-none focus:underline transition-colors"
            >
              Войти
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center text-[#9CA3AF] hover:text-[#7C3AED] transition-colors mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Назад
          </button>
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              ФИО
            </label>
            <input
              type="text"
              {...registerStep2("fullName")}
              className={`mt-1 block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                errorsStep2.fullName ? "border-[#EF4444]" : "border"
              } px-4 py-3 text-sm`}
              placeholder="Иванов Иван Иванович"
            />
            {errorsStep2.fullName && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep2.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Телефон
            </label>
            <input
              type="tel"
              {...registerStep2("phone")}
              className={`mt-1 block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                errorsStep2.phone ? "border-[#EF4444]" : "border"
              } px-4 py-3 text-sm`}
              placeholder="+7 (XXX) XXX-XX-XX"
            />
            {errorsStep2.phone && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep2.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Дата рождения
            </label>
            <input
              type="date"
              {...registerStep2("birthDate")}
              className={`mt-1 block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                errorsStep2.birthDate ? "border-[#EF4444]" : "border"
              } px-4 py-3 text-sm`}
            />
            {errorsStep2.birthDate && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep2.birthDate.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Номер паспорта
            </label>
            <input
              type="text"
              {...registerStep2("passportNumber")}
              className={`mt-1 block w-full rounded-lg bg-[#111827] border-[#374151] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                errorsStep2.passportNumber ? "border-[#EF4444]" : "border"
              } px-4 py-3 text-sm`}
              placeholder="Серия и номер"
            />
            {errorsStep2.passportNumber && (
              <p className="mt-2 text-sm text-[#EF4444]">
                {errorsStep2.passportNumber.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED] transition-all duration-200 shadow-md hover:shadow-[#7C3AED]/30"
          >
            Зарегистрироваться
          </button>
        </form>
      )}
    </div>
  )
}
