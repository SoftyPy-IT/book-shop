/* eslint-disable react/no-unescaped-entities */
// components/auth/AuthLayout.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    BookOpen,
    ShoppingBag,
    Heart,
    Star,
    Truck,
    Shield,
    Clock,
    Users,
    Award,
    Zap,
    Gem,
} from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

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

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
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
                        {/* Left Side - Features/Brand (Static) */}
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

                        {/* Right Side - Dynamic Form */}
                        <div className="relative p-8 lg:p-12 flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-black text-gray-900 mb-2">{title}</h2>
                                    <p className="text-gray-500">{subtitle}</p>
                                </div>
                                {children}
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