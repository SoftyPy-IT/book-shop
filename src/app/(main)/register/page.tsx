/* eslint-disable @typescript-eslint/no-explicit-any */
// app/register/page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Lock,
    CheckCircle2,
    AlertCircle,
    UserPlus,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import AuthLayout from "@/components/auth/AuthLayout";
import InputField from "@/components/auth/InputField";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [step, setStep] = useState(1);

    const validateField = (name: string, value: string, formData: any): string => {
        switch (name) {
            case "name":
                if (!value.trim()) return "নাম দিন";
                if (value.trim().length < 3) return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                return "";
            case "email":
                if (!value.trim()) return "ইমেইল দিন";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "সঠিক ইমেইল দিন";
                return "";
            case "phone":
                if (!value.trim()) return "ফোন নম্বর দিন";
                if (!/^(01[3-9]\d{8})$/.test(value)) return "সঠিক ফোন নম্বর দিন (যেমন: 01712345678)";
                return "";
            case "password":
                if (!value) return "পাসওয়ার্ড দিন";
                if (value.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
                if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) return "পাসওয়ার্ডে অক্ষর ও সংখ্যা থাকতে হবে";
                return "";
            case "confirmPassword":
                if (!value) return "পাসওয়ার্ড আবার দিন";
                if (value !== formData.password) return "পাসওয়ার্ড মিলছে না";
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
            const error = validateField(name, value, { ...formData, [name]: value });
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value, formData);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateStep = (stepNumber: number): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (stepNumber === 1) {
            if (!formData.name.trim()) {
                newErrors.name = "নাম দিন";
                isValid = false;
            } else if (formData.name.trim().length < 3) {
                newErrors.name = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                isValid = false;
            }
            if (!formData.email.trim()) {
                newErrors.email = "ইমেইল দিন";
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "সঠিক ইমেইল দিন";
                isValid = false;
            }
            if (!formData.phone.trim()) {
                newErrors.phone = "ফোন নম্বর দিন";
                isValid = false;
            } else if (!/^(01[3-9]\d{8})$/.test(formData.phone)) {
                newErrors.phone = "সঠিক ফোন নম্বর দিন";
                isValid = false;
            }
        } else if (stepNumber === 2) {
            if (!formData.password) {
                newErrors.password = "পাসওয়ার্ড দিন";
                isValid = false;
            } else if (formData.password.length < 6) {
                newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
                isValid = false;
            } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
                newErrors.password = "পাসওয়ার্ডে অক্ষর ও সংখ্যা থাকতে হবে";
                isValid = false;
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "পাসওয়ার্ড আবার দিন";
                isValid = false;
            } else if (formData.confirmPassword !== formData.password) {
                newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
                isValid = false;
            }
            if (!formData.agree) {
                newErrors.agree = "শর্তাবলী মেনে নিতে হবে";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(1)) {
            setStep(2);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(2)) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setRegisterSuccess(true);
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }, 1500);
        }
    };

    if (registerSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">রেজিস্ট্রেশন সফল!</h2>
                    <p className="text-gray-500 mb-4">আপনার অ্যাকাউন্ট তৈরি হয়েছে</p>
                    <p className="text-sm text-gray-400">লগইন পৃষ্ঠায় পুনঃনির্দেশিত হচ্ছে...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthLayout
            title="নতুন অ্যাকাউন্ট"
            subtitle="রেজিস্টার করে শপিং শুরু করুন"
        >
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                            step >= s ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-400"
                        )}>
                            {s}
                        </div>
                        {s === 1 && (
                            <div className={cn(
                                "flex-1 h-1 mx-2 transition-all",
                                step > 1 ? "bg-amber-500" : "bg-gray-200"
                            )} />
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-5">
                {step === 1 ? (
                    <>
                        <InputField
                            icon={User}
                            type="text"
                            name="name"
                            placeholder="আপনার নাম"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            touched={touched.name}
                        />

                        <InputField
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="ইমেইল"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
                        />

                        <InputField
                            icon={Phone}
                            type="tel"
                            name="phone"
                            placeholder="মোবাইল নম্বর"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.phone}
                            touched={touched.phone}
                        />

                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full h-12 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                        >
                            পরবর্তী
                            <ArrowRight size={16} />
                        </button>
                    </>
                ) : (
                    <>
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

                        <InputField
                            icon={Lock}
                            type="password"
                            name="confirmPassword"
                            placeholder="পাসওয়ার্ড আবার দিন"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            showToggle
                        />

                        {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="space-y-2">
                                <div className="flex gap-1 h-1">
                                    {[1, 2, 3, 4].map((level) => {
                                        let strength = 0;
                                        if (formData.password.length >= 6) strength++;
                                        if (/(?=.*[A-Za-z])/.test(formData.password)) strength++;
                                        if (/(?=.*\d)/.test(formData.password)) strength++;
                                        if (formData.password.length >= 8) strength++;

                                        return (
                                            <div
                                                key={level}
                                                className={cn(
                                                    "flex-1 rounded-full transition-all",
                                                    level <= strength ? "bg-emerald-500" : "bg-gray-200"
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-400">
                                    শক্তিশালী পাসওয়ার্ড: অক্ষর ও সংখ্যার সমন্বয়
                                </p>
                            </div>
                        )}

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="w-5 h-5 accent-amber-500 rounded border-gray-300 mt-0.5"
                            />
                            <span className="text-sm text-gray-600 leading-relaxed">
                                আমি <Link href="/terms" className="text-amber-600 hover:text-amber-700 font-medium">শর্তাবলী</Link> এবং{" "}
                                <Link href="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">প্রাইভেসি পলিসি</Link> মেনে নিচ্ছি
                            </span>
                        </label>
                        {errors.agree && touched.agree && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle size={10} />
                                {errors.agree}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 h-12 border-2 border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                            >
                                পিছনে
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                                    isLoading
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25"
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        হচ্ছে...
                                    </>
                                ) : (
                                    <>
                                        রেজিস্টার
                                        <UserPlus size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </form>

            <div className="text-center text-sm text-gray-500 mt-6">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link
                    href="/login"
                    className="text-amber-600 hover:text-amber-700 font-bold"
                >
                    লগইন করুন
                </Link>
            </div>
        </AuthLayout>
    );
}