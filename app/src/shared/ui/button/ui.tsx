import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@shared/lib"
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa"

type ButtonVariant = "primary" | "google" | "icon" | "text"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
  iconState?: "show" | "hide"
  customIcon?: {
    show: ReactNode
    hide: ReactNode
  }
  loading?: boolean
}

export const Button = ({
  type = "button",
  onClick,
  className,
  children,
  disabled = false,
  variant = "primary",
  icon,
  iconState = "show",
  customIcon,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center font-medium focus:outline-none transition-colors duration-200",
        {
          "w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED] shadow-md hover:shadow-[#7C3AED]/30":
            variant === "primary",

          "w-full bg-[#111827] border border-[#374151] rounded-lg shadow-sm py-2.5 px-4 text-sm text-[#F9FAFB] hover:bg-[#1F2937] focus:ring-1 focus:ring-[#3B82F6]":
            variant === "google",

          "absolute inset-y-0 right-0 pr-3 text-[#9CA3AF] hover:text-[#7C3AED]":
            variant === "icon",

          "inline-block text-[#3B82F6] hover:text-[#60A5FA] focus:underline":
            variant === "text",
        },
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {variant === "google" && !icon && <FaGoogle className="mr-3" />}
      {icon && <span className={variant !== "icon" ? "mr-3" : ""}>{icon}</span>}

      {variant === "icon" ? (
        customIcon ? (
          iconState === "show" ? (
            customIcon.show
          ) : (
            customIcon.hide
          )
        ) : iconState === "show" ? (
          <FaEye size={16} />
        ) : (
          <FaEyeSlash size={16} />
        )
      ) : (
        children
      )}
    </button>
  )
}
