import { LoginForm } from "@features/login"

export const Login = () => {
  return (
    <div className="w-full h-[100svh] flex items-center justify-center bg-[#111827] bg-gradient-to-b from-[#1e1b4b]/30 to-[#111827]">
      <div className="max-w-md mx-auto p-6 bg-[#1F2937] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6 text-center">
          Авторизация
        </h2>
        <LoginForm />
      </div>
    </div>
  )
}
