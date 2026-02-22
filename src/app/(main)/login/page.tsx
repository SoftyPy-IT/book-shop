// app/login/page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
    Mail,
    Lock,
    CheckCircle2,
    LogIn,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import AuthLayout from "@/components/auth/AuthLayout";
import InputField from "@/components/auth/InputField";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "email":
                if (!value.trim()) return "ইমেইল বা ফোন নম্বর দিন";
                return "";
            case "password":
                if (!value) return "পাসওয়ার্ড দিন";
                if (value.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
                return "";
            default:
                return "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (!formData.email.trim()) {
            newErrors.email = "ইমেইল বা ফোন নম্বর দিন";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "পাসওয়ার্ড দিন";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setLoginSuccess(true);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            }, 1500);
        }
    };

    if (loginSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">স্বাগতম!</h2>
                    <p className="text-gray-500 mb-4">সফলভাবে লগইন হয়েছে</p>
                    <p className="text-sm text-gray-400">আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthLayout
            title="স্বাগতম"
            subtitle="আপনার অ্যাকাউন্টে লগইন করুন"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                    icon={Mail}
                    type="text"
                    name="email"
                    placeholder="ইমেইল বা ফোন নম্বর"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                />

                <InputField
                    icon={Lock}
                    type="password"
                    name="password"
                    placeholder="পাসওয়ার্ড"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    showToggle
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                            className="w-4 h-4 accent-amber-500 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-600">মনে রাখুন</span>
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                    >
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                        "w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                        isLoading
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25"
                    )}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            লগইন হচ্ছে...
                        </>
                    ) : (
                        <>
                            লগইন করুন
                            <LogIn size={16} />
                        </>
                    )}
                </button>
            </form>

            {/* Social Login */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-4 bg-white text-gray-400">অথবা</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                    { icon: Facebook, label: "Facebook", color: "hover:bg-blue-50 hover:text-blue-600" },
                    { icon: Chrome, label: "Google", color: "hover:bg-red-50 hover:text-red-600" },
                    { icon: Apple, label: "Apple", color: "hover:bg-gray-50 hover:text-gray-900" },
                ].map((provider, i) => (
                    <button
                        key={i}
                        className={cn(
                            "p-3 border-2 border-gray-200 rounded-xl text-gray-500 transition-all hover:scale-105",
                            provider.color
                        )}
                    >
                        <provider.icon size={20} className="mx-auto" />
                    </button>
                ))}
            </div>

            <div className="text-center text-sm text-gray-500">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                    href="/register"
                    className="text-amber-600 hover:text-amber-700 font-bold"
                >
                    রেজিস্টার করুন
                </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                <Link href="/terms" className="hover:text-gray-600">শর্তাবলী</Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-gray-600">প্রাইভেসি</Link>
                <span>•</span>
                <Link href="/help" className="hover:text-gray-600">সাহায্য</Link>
            </div>
        </AuthLayout>
    );
}

// Import these at the top
import { Facebook, Chrome, Apple } from "lucide-react";