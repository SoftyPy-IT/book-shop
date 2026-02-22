
import { cn } from "@/lib/utils";

interface SelectionButtonProps {
    active: boolean;
    text: string;
    onClick: () => void;
}

export const SelectionButton = ({ active, text, onClick }: SelectionButtonProps) => (
    <button
        onClick={onClick}
        className={cn(
            "flex-1 py-2 px-3 text-[10px] font-bold rounded-xl border transition-all",
            active
                ? "bg-amber-50 border-amber-600 text-amber-800"
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
        )}
    >
        {text}
    </button>
);