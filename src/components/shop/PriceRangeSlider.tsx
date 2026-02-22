// components/shop/PriceRangeSlider.tsx
"use client";

import { useState } from "react";

interface PriceRangeSliderProps {
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
}

export const PriceRangeSlider = ({ min, max, value, onChange }: PriceRangeSliderProps) => {
    const [localValue, setLocalValue] = useState(value);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), localValue[1] - 1);
        setLocalValue([newMin, localValue[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), localValue[0] + 1);
        setLocalValue([localValue[0], newMax]);
    };

    const handleChangeComplete = () => {
        onChange(localValue);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">৳{localValue[0]}</span>
                <span className="text-xs text-gray-400">-</span>
                <span className="text-sm font-bold text-gray-900">৳{localValue[1]}</span>
            </div>
            <div className="relative h-2">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
                <div
                    className="absolute h-2 bg-amber-500 rounded-full"
                    style={{
                        left: `${((localValue[0] - min) / (max - min)) * 100}%`,
                        right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
                    }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={localValue[0]}
                    onChange={handleMinChange}
                    onMouseUp={handleChangeComplete}
                    onTouchEnd={handleChangeComplete}
                    className="absolute w-full -top-1 h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={localValue[1]}
                    onChange={handleMaxChange}
                    onMouseUp={handleChangeComplete}
                    onTouchEnd={handleChangeComplete}
                    className="absolute w-full -top-1 h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
            </div>
        </div>
    );
};