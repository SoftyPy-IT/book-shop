/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import {
    Mail,
    Lock,
    User,
    Phone,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
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
    Smartphone,
    MapPin,
    Camera,
    Upload,
    X,
    ChevronRight,
    Award,
    Users,
    Sparkles,
    Gem,
    Zap,
    Globe,
    Menu,
    Search,
    Moon,
    Sun,
    LogIn,
    UserPlus,
    Key,
    Fingerprint,
    MessageCircle,
    Instagram,
    Twitter,
    Linkedin,
    Github,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════ */
interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    agree?: string;
}

/* ═══════════════════════════════════════════════
   FEATURE CARD COMPONENT
═══════════════════════════════════════════════ */
const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
        <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-300">
                <Icon size={24} className="text-amber-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
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
   LOGIN FORM
═══════════════════════════════════════════════ */
const LoginForm = ({ onToggleForm }: { onToggleForm: () => void }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
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
        const newErrors: FormErrors = {};
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
                }, 1500);
            }, 1500);
        }
    };

    return (
        <div className="w-full max-w-md">
            {loginSuccess ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">স্বাগতম!</h2>
                    <p className="text-gray-500">সফলভাবে লগইন হয়েছে</p>
                </div>
            ) : (
                <>
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
                            <button
                                type="button"
                                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </button>
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
                        <button
                            onClick={onToggleForm}
                            className="text-amber-600 hover:text-amber-700 font-bold"
                        >
                            রেজিস্টার করুন
                        </button>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                        <Link href="/terms" className="hover:text-gray-600">শর্তাবলী</Link>
                        <span>•</span>
                        <Link href="/privacy" className="hover:text-gray-600">প্রাইভেসি</Link>
                        <span>•</span>
                        <Link href="/help" className="hover:text-gray-600">সাহায্য</Link>
                    </div>
                </>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════
   REGISTER FORM
═══════════════════════════════════════════════ */
const RegisterForm = ({ onToggleForm }: { onToggleForm: () => void }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                if (!/^(01[3-9]\d{8})$/.test(value)) return "সঠিক ফোন নম্বর দিন";
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
        const newErrors: FormErrors = {};
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
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                setRegisterSuccess(true);
                setTimeout(() => {
                    onToggleForm(); // Switch to login
                }, 2000);
            }, 1500);
        }
    };

    if (registerSuccess) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle2 size={40} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">রেজিস্ট্রেশন সফল!</h2>
                <p className="text-gray-500 mb-4">আপনার অ্যাকাউন্ট তৈরি হয়েছে</p>
                <p className="text-sm text-gray-400">লগইন পৃষ্ঠায় পুনঃনির্দেশিত হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-2">নতুন অ্যাকাউন্ট</h2>
                <p className="text-gray-500">রেজিস্টার করে শপিং শুরু করুন</p>
            </div>

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

                        <InputField
                            icon={Lock}
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="পাসওয়ার্ড আবার দিন"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            showToggle
                            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
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
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <button
                    onClick={onToggleForm}
                    className="text-amber-600 hover:text-amber-700 font-bold"
                >
                    লগইন করুন
                </button>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   MAIN AUTH PAGE
═══════════════════════════════════════════════ */
export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
                                    <span className="text-2xl font-black text-gray-900">
                                        Reading</span>
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

                        {/* Right Side - Forms */}
                        <div className="relative p-8 lg:p-12 flex items-center justify-center">
                            <div className="w-full max-w-md">
                                {isLogin ? (
                                    <LoginForm onToggleForm={() => setIsLogin(false)} />
                                ) : (
                                    <RegisterForm onToggleForm={() => setIsLogin(true)} />
                                )}
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