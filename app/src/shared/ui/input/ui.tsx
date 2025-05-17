import { type InputHTMLAttributes } from "react"
import { cn } from "@shared/lib"

type InputVariant = "default" | "error"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: InputVariant
  fullWidth?: boolean
}

export function Input({
  label,
  error,
  className,
  variant = "default",
  fullWidth = true,
  ...props
}: InputProps) {
  return (
    <div className={cn({ block: fullWidth })}>
      {label && (
        <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "rounded-lg bg-[#111827] text-[#F9FAFB] shadow-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] px-4 py-3 text-sm",
          {
            "border-[#374151]": variant === "default",
            "border-[#EF4444]": variant === "error",
            border: true,
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-[#EF4444]">{error}</p>}
    </div>
  )
}
