// components/shop/DiscountFilter.tsx
"use client";

interface DiscountFilterProps {
    value: number | null;
    onChange: (discount: number | null) => void;
}

export const DiscountFilter = ({ value, onChange }: DiscountFilterProps) => {
    const discounts = [10, 20, 30, 40, 50];

    return (
        <div className="space-y-2">
            {discounts.map((discount) => (
                <label key={discount} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="discount"
                        checked={value === discount}
                        onChange={() => onChange(discount)}
                        className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-sm text-gray-700">{discount}% বা তার বেশি</span>
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