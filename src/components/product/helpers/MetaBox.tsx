
import { cn } from "@/lib/utils";

interface MetaBoxProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    isLink?: boolean;
}

export const MetaBox = ({ icon, label, value, isLink }: MetaBoxProps) => (
    <div className="bg-[#faf4ec] p-4 rounded-2xl flex flex-col items-center text-center border border-amber-100 shadow-sm gap-1.5">
        <div className="text-amber-700">{icon}</div>
        <span className="text-[9px] font-bold text-amber-700/60 uppercase tracking-tight leading-none">{label}</span>
        <span className={cn("text-[11px] font-black", isLink ? "text-amber-700 underline" : "text-gray-800")}>{value}</span>
    </div>
);