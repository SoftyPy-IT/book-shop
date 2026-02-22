// components/shop/RatingFilter.tsx
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
    value: number | null;
    onChange: (rating: number | null) => void;
}

export const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
    const ratings = [5, 4, 3, 2, 1];

    return (
        <div className="space-y-2">
            {ratings.map((rating) => (
                <label key={rating} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="rating"
                            checked={value === rating}
                            onChange={() => onChange(rating)}
                            className="w-4 h-4 accent-amber-500"
                        />
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={cn(
                                        i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">& up</span>
                </label>
            ))}
            {value && (
                <button
                    onClick={() => onChange(null)}
                    className="text-xs text-amber-600 hover:text-amber-700 mt-2"
                >
                    Clear
                </button>
            )}
        </div>
    );
};