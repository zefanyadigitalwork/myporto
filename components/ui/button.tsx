import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const v = cva("inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50", {
  variants: { variant: { solid: "bg-brass text-ink hover:bg-stone", outline: "border border-ink/30 hover:bg-ink hover:text-stone", dark: "bg-pine text-stone hover:bg-ink" } },
  defaultVariants: { variant: "solid" },
});
export function Button({ className, variant, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof v>) {
  return <button className={cn(v({ variant }), className)} {...p} />;
}
export const buttonClass = (variant?: "solid" | "outline" | "dark") => v({ variant });
