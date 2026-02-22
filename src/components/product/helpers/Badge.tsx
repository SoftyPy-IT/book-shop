
import { cn } from "@/lib/utils";

interface BadgeProps {
    text: string;
    className?: string;
}

export const Badge = ({ text, className }: BadgeProps) => (
    <span className={cn(
        "bg-amber-50 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wide",
        className
    )}>
        {text}
    </span>
);