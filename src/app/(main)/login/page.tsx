/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    LogIn,
    BookOpen,
    ShoppingBag,
    Heart,
    Star,
    Truck,
    Shield,
    Clock,
    Facebook,
    Chrome,
    Apple,
    Users,
    Award,
    Zap,
    Gem,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   INPUT FIELD COMPONENT
═══════════════════════════════════════════════ */
const InputField = ({
    icon: Icon,
    type,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    showToggle,
    onToggle,
}: any) => (
    <div className="space-y-1.5">
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon size={18} />
            </div>
            <input
                type={type}
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
                    onClick={onToggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {type === "password" ? <Eye size={18} /> : <EyeOff size={18} />}
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

/* ═══════════════════════════════════════════════
   STATS CARD COMPONENT
═══════════════════════════════════════════════ */
const StatsCard = ({ icon: Icon, value, label }: { icon: any; value: string; label: string }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Icon size={20} className="text-amber-600" />
            </div>
            <div>
                <div className="text-xl font-black text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════ */
export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [showPassword, setShowPassword] = useState(false);
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
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                setLoginSuccess(true);
                setTimeout(() => {
                    // Redirect to dashboard
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
        <div className="min-h-screen bg-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 animate-float">
                    <BookOpen size={24} className="text-amber-200/30" />
                </div>
                <div className="absolute top-40 right-20 animate-float animation-delay-2000">
                    <ShoppingBag size={32} className="text-amber-200/30" />
                </div>
                <div className="absolute bottom-40 left-20 animate-float animation-delay-4000">
                    <Heart size={28} className="text-amber-200/30" />
                </div>
                <div className="absolute bottom-20 right-40 animate-float animation-delay-1000">
                    <Star size={20} className="text-amber-200/30" />
                </div>
            </div>

            <div className="relative max-w-[1400px] mx-auto min-h-screen flex items-center justify-center p-4 lg:p-8">
                <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
                        {/* Left Side - Features/Brand */}
                        <div className="relative hidden lg:block bg-gradient-to-br from-amber-50 to-orange-50 p-12 overflow-hidden">
                            {/* Animated Background */}
                            <div className="absolute inset-0">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
                            </div>

                            <div className="relative z-10 h-full flex flex-col">
                                {/* Logo */}
                                <div className="flex items-center gap-2 mb-12">
                                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <span className="text-2xl font-black text-gray-900">Reading</span>
                                </div>

                                {/* Hero Text */}
                                <div className="mb-12">
                                    <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                                        পড়ার আনন্দ <br />
                                        <span className="text-amber-500">অফুরান সম্ভার</span>
                                    </h1>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        ৫০,০০০+ বইয়ের বিশাল সংগ্রহ। ইসলামিক বই, উপন্যাস, বিজ্ঞান, ইতিহাস সহ সব ধরনের বই।
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-12">
                                    <StatsCard icon={Users} value="২৫০০০+" label="সক্রিয় সদস্য" />
                                    <StatsCard icon={ShoppingBag} value="৫০০০০+" label="বই বিক্রিত" />
                                    <StatsCard icon={Truck} value="৬৪ জেলা" label="ডেলিভারি" />
                                    <StatsCard icon={Award} value="১০ বছর" label="অভিজ্ঞতা" />
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-12">
                                    {[
                                        { icon: Zap, text: "ফ্রি ডেলিভারি ৫০০৳+ অর্ডারে" },
                                        { icon: Shield, text: "নিরাপদ পেমেন্ট (SSL কমার্স)" },
                                        { icon: Clock, text: "২৪/৭ কাস্টমার সাপোর্ট" },
                                        { icon: Gem, text: "সদস্যদের জন্য বিশেষ ছাড়" },
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                                <feature.icon size={16} className="text-amber-600" />
                                            </div>
                                            <span className="text-sm text-gray-700">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Testimonials */}
                                <div className="mt-auto">
                                    <div className="flex items-center gap-2 mb-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-xs font-bold text-amber-700">
                                                U
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-1 ml-2">
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <span className="text-xs text-gray-500 ml-1">৪.৯ (৫০০০+ রিভিউ)</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 italic">
                                        "বেস্ট অনলাইন বুকশপ! অর্ডার দেওয়ার ২ দিনের মধ্যে বই হাতে পেয়ে গিয়াম।"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="relative p-8 lg:p-12 flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-black text-gray-900 mb-2">স্বাগতম</h2>
                                    <p className="text-gray-500">আপনার অ্যাকাউন্টে লগইন করুন</p>
                                </div>

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
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="পাসওয়ার্ড"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.password}
                                        touched={touched.password}
                                        showToggle
                                        onToggle={() => setShowPassword(!showPassword)}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
}