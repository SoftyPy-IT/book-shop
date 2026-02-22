// components/shop/ShopHeader.tsx
"use client";

import Link from "next/link";
import { BookOpen, Search, ShoppingCart, User } from "lucide-react";

interface ShopHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const ShopHeader = ({ searchQuery, onSearchChange }: ShopHeaderProps) => {
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-[1600px] mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen className="text-amber-500" size={24} />
                        <span className="text-xl font-black text-gray-900">Reading</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="৫০,০০০+ বই খুঁজুন..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <User size={20} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                            <ShoppingCart size={20} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};