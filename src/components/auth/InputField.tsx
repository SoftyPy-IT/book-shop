// components/auth/InputField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFieldProps {
    icon: any;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    touched?: boolean;
    showToggle?: boolean;
}

export default function InputField({
    icon: Icon,
    type,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    showToggle = false,
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showToggle ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1.5">
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon size={18} />
                </div>
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={cn(
                        "w-full h-12 pl-11 pr-12 bg-gray-50 border-2 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all",
                        error && touched
                            ? "border-red-200 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                    )}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && touched && (
                <p className="text-xs text-red-500 flex items-center gap-1 pl-2">
                    <AlertCircle size={10} />
                    {error}
                </p>
            )}
        </div>
    );
}