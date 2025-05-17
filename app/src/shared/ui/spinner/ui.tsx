import { cn } from "@shared/lib"

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full",
      className
    )}
  />
)
