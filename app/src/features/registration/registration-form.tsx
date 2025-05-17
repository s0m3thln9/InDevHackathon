import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { useNavigate } from "react-router-dom"
import { registerUser } from "@features/registration/model"
import { useAppDispatch } from "@shared/lib"

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

export const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

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

  const onSubmitStep1 = () => setStep(2)

  const onSubmitStep2 = async (step2Data: RegisterStep2Data) => {
    const step1Data = getStep1Values()
    const completeData: RegisterFormData = { ...step1Data, ...step2Data }

    try {
      await dispatch(
        registerUser({
          email: completeData.email,
          password: completeData.password,
          username: completeData.fullName,
        })
      ).unwrap()
      navigate("/")
    } catch (error) {
      console.error("Ошибка регистрации:", error)
    }
  }

  const handleGoogleAuth = () => {
    console.log("Google auth")
    setStep(2)
  }

  const handleBack = () => setStep(1)

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
          <Input
            label="Почта"
            type="email"
            {...registerStep1("email")}
            variant={errorsStep1.email ? "error" : "default"}
            error={errorsStep1.email?.message}
            placeholder="your@email.com"
          />
          <div className="relative">
            <Input
              label="Пароль"
              type={showPassword ? "text" : "password"}
              {...registerStep1("password")}
              variant={errorsStep1.password ? "error" : "default"}
              error={errorsStep1.password?.message}
              placeholder="Не менее 6 символов"
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
          <div className="relative">
            <Input
              label="Повторите пароль"
              type={showConfirmPassword ? "text" : "password"}
              {...registerStep1("confirmPassword")}
              variant={errorsStep1.confirmPassword ? "error" : "default"}
              error={errorsStep1.confirmPassword?.message}
              placeholder="Повторите ваш пароль"
              className="pr-10"
            />
            <div className="absolute right-3 top-[42px]">
              <Button
                variant="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                iconState={showConfirmPassword ? "hide" : "show"}
                className="!p-2"
              />
            </div>
          </div>
          <Button type="submit">Продолжить</Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#374151]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#1F2937] text-[#9CA3AF]">или</span>
            </div>
          </div>
          <Button variant="google" icon={<FaGoogle />}>
            Регистрация через Google
          </Button>
          <div className="text-center text-sm pt-2">
            <span className="text-[#9CA3AF]">Есть аккаунт? </span>
            <Button variant="text" onClick={() => navigate("/login")}>
              Войти
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
          <Button onClick={handleBack} variant="text" className="mb-4">
            Назад
          </Button>
          <Input
            label="ФИО"
            type="text"
            {...registerStep2("fullName")}
            variant={errorsStep2.fullName ? "error" : "default"}
            error={errorsStep2.fullName?.message}
            placeholder="Иванов Иван Иванович"
          />
          <Input
            label="Телефон"
            type="tel"
            {...registerStep2("phone")}
            variant={errorsStep2.phone ? "error" : "default"}
            error={errorsStep2.phone?.message}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          <Input
            label="Дата рождения"
            type="date"
            {...registerStep2("birthDate")}
            variant={errorsStep2.birthDate ? "error" : "default"}
            error={errorsStep2.birthDate?.message}
          />
          <Input
            label="Номер паспорта"
            type="text"
            {...registerStep2("passportNumber")}
            variant={errorsStep2.passportNumber ? "error" : "default"}
            error={errorsStep2.passportNumber?.message}
            placeholder="Серия и номер"
          />
          <Button type="submit">Зарегистрироваться</Button>
        </form>
      )}
    </div>
  )
}
