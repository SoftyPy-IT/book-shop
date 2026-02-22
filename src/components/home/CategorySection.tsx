// components/home/CategorySectionAlt.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
    {
        id: "islamic",
        name: "ইসলামিক বই",
        nameEn: "Islamic Books",
        icon: "📖",
        count: "১,২৫০+",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-600"
    },
    {
        id: "literature",
        name: "সাহিত্য",
        nameEn: "Literature",
        icon: "✍️",
        count: "২,৩৪০+",
        bgColor: "bg-amber-50",
        textColor: "text-amber-600"
    },
    {
        id: "children",
        name: "শিশুতোষ",
        nameEn: "Children",
        icon: "🧸",
        count: "৯৮০+",
        bgColor: "bg-pink-50",
        textColor: "text-pink-600"
    },
    {
        id: "academic",
        name: "একাডেমিক",
        nameEn: "Academic",
        icon: "🎓",
        count: "১,৮৫০+",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600"
    },
    {
        id: "self-help",
        name: "সেলফ হেল্প",
        nameEn: "Self Help",
        icon: "⚡",
        count: "৫৬০+",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600"
    },
    {
        id: "fiction",
        name: "ফিকশন",
        nameEn: "Fiction",
        icon: "🌌",
        count: "১,৪৫০+",
        bgColor: "bg-cyan-50",
        textColor: "text-cyan-600"
    }
];

export default function CategorySectionAlt() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simple Title */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Popular Category
                    </h2>
                    <Link
                        href="/shop"
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                    >
                        সবগুলো দেখুন
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="block"
                        >
                            <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-4xl mb-3">
                                        {category.icon}
                                    </span>
                                    <h3 className="font-medium text-gray-900 mb-1">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        {category.nameEn}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {category.count} বই
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}