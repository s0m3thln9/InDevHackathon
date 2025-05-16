import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@shared/lib"

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"

type ButtonProps = {
  variant?: ButtonVariant
  icon?: ReactNode
  fullWidth?: boolean
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  variant = "primary",
  icon,
  fullWidth = true,
  isLoading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-3 rounded-lg font-medium",
    "py-2.5 px-4 focus:outline-none transition-all duration-200",
    "disabled:opacity-70 disabled:cursor-not-allowed",
    fullWidth && "w-full",
    isLoading && "cursor-wait",
    className
  )

  const variantClasses = {
    primary: cn(
      "bg-[#7C3AED] hover:bg-[#6D28D9] text-white",
      "shadow-md hover:shadow-[#7C3AED]/30",
      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7C3AED]"
    ),
    secondary: cn(
      "bg-[#111827] border border-[#374151] text-[#F9FAFB]",
      "hover:bg-[#1F2937]",
      "focus-visible:ring-1 focus-visible:ring-[#3B82F6]"
    ),
    ghost: cn("text-[#3B82F6] hover:text-[#60A5FA]", "focus-visible:underline"),
    outline: cn(
      "border border-[#374151] text-[#F9FAFB] hover:bg-[#1F2937]",
      "focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
    ),
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant])}
      disabled={isLoading}
      {...props}
    >
      {icon && (
        <span className={cn("text-base", isLoading && "opacity-70")}>
          {icon}
        </span>
      )}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Spinner className="h-4 w-4" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// Мини-компонент спиннера для загрузки
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)
