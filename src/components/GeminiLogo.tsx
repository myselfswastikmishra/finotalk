
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GeminiLogo({ className, ...props }: HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M7 2h10" className="text-finance-gold" />
      <path d="M5 6h14" className="text-finance-gold-light" />
      <path d="M2 10h20" className="text-finance-green" />
      <path d="M5 14h14" className="text-finance-green-light" />
      <path d="M7 18h10" className="text-finance-gold" />
      <path d="M12 22V2" className="text-finance-green" />
    </svg>
  );
}
