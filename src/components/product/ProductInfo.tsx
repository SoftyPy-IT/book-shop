// components/product/ProductInfo.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Heart,
    Share2,
    Eye,
    Star,
    Plus,
    Minus,
    ShoppingCart,
    BookOpen,
    Award,
    Calendar,
    Globe,
    Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./helpers/Badge";
import { SelectionButton } from "./helpers/SelectionButton";
import { MetaBox } from "./helpers/MetaBox";
import type { ColorOption } from "@/types/product";

const COLOR_OPTIONS: ColorOption[] = [
    { name: "হার্ডকভার", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80" },
    { name: "পেপারব্যাক", img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&q=80" },
    { name: "পকেট সাইজ", img: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=200&q=80" },
];

interface ProductInfoProps {
    onWishlistChange?: (wishlist: boolean) => void;
}

export default function ProductInfo({ onWishlistChange }: ProductInfoProps) {
    const [selectedEdition, setSelectedEdition] = useState("হার্ডকভার");
    const [selectedLanguage, setSelectedLanguage] = useState("বাংলা (অনুবাদ)");
    const [qty, setQty] = useState(1);
    const [wishlist, setWishlist] = useState(false);
    const [isAgreed, setIsAgreed] = useState(true);

    const handleWishlist = () => {
        const newState = !wishlist;
        setWishlist(newState);
        onWishlistChange?.(newState);
    };

    return (
        <div className="space-y-5">
            {/* Header card */}
            <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-amber-100">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 tracking-wider">
                        ইসলামিক বই
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleWishlist}
                            className={cn(
                                "h-9 w-9 rounded-xl border flex items-center justify-center transition-all",
                                wishlist
                                    ? "bg-red-50 border-red-300 text-red-500"
                                    : "bg-white border-amber-200 text-amber-600 hover:border-red-300"
                            )}
                        >
                            <Heart size={15} fill={wishlist ? "currentColor" : "none"} />
                        </button>
                        <button className="h-9 w-9 rounded-xl border border-amber-200 bg-white flex items-center justify-center text-amber-600 hover:border-amber-400 transition-all">
                            <Share2 size={15} />
                        </button>
                    </div>
                </div>

                <h1 className="text-3xl font-black mb-1" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    আল-কুরআনের সহজ বাংলা অনুবাদ
                </h1>
                <p className="text-sm text-amber-800/60 mb-3">লেখক: ড. মো. ইব্রাহীম খলিল | প্রকাশক: মাকতাবাতুল আসলাফ</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge text={selectedEdition} />
                    <Badge text={selectedLanguage} />
                    <Badge text="৩য় সংস্করণ" />
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={13} className="text-amber-500 fill-amber-500" />)}
                    </div>
                    <span className="text-xs font-black text-gray-700">৫.০</span>
                    <span className="text-xs text-amber-700/50">· ১৫৬টি রিভিউ</span>
                    <span className="ml-auto text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <Eye size={12} /> ২০ জন দেখছেন এখন
                    </span>
                </div>

                {/* Book specs */}
                <div className="space-y-2 text-sm leading-relaxed text-gray-700 pt-4 border-t border-amber-200/60">
                    <p><strong className="text-gray-800">পৃষ্ঠা সংখ্যা:</strong> ৩২০ পৃষ্ঠা</p>
                    <p><strong className="text-gray-800">ভাষা:</strong> বাংলা (আরবি টেক্সট সহ)</p>
                    <p><strong className="text-gray-800">প্রকাশকাল:</strong> ২০২৪, তৃতীয় সংস্করণ</p>
                    <p><strong className="text-gray-800">আইএসবিএন:</strong> ৯৭৮-৯৮৪-১২৩-৪৫৬-৭</p>
                </div>
            </div>

            {/* Edition / Language */}
            <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-amber-100 space-y-5">
                {/* Edition */}
                <div>
                    <p className="text-xs font-black uppercase text-amber-700/60 mb-3 tracking-wider">
                        সংস্করণ: <span className="text-gray-800">{selectedEdition}</span>
                    </p>
                    <div className="flex gap-3">
                        {COLOR_OPTIONS.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setSelectedEdition(c.name)}
                                className={cn(
                                    "w-16 h-20 p-1 rounded-xl overflow-hidden border-2 bg-white transition-all",
                                    selectedEdition === c.name
                                        ? "border-amber-600 ring-2 ring-amber-200 shadow-md"
                                        : "border-amber-200 hover:border-amber-300 opacity-70 hover:opacity-100"
                                )}
                            >
                                <img src={c.img} alt={c.name} className="w-full h-full object-cover rounded-lg" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language */}
                <div>
                    <p className="text-xs font-black uppercase text-amber-700/60 mb-3 tracking-wider">ভাষা সংস্করণ</p>
                    <div className="grid grid-cols-2 gap-2">
                        {["বাংলা (অনুবাদ)", "আরবি (টেক্সট)", "বাংলা + আরবি", "ইংরেজি অনুবাদ"].map((r) => (
                            <SelectionButton
                                key={r}
                                active={selectedLanguage === r}
                                text={r}
                                onClick={() => setSelectedLanguage(r)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Meta bento */}
            <div className="grid grid-cols-4 gap-2">
                <MetaBox icon={<BookOpen size={18} />} label="পৃষ্ঠা" value="৩২০" />
                <MetaBox icon={<Award size={18} />} label="সংস্করণ" value="৩য়" />
                <MetaBox icon={<Calendar size={18} />} label="প্রকাশ" value="২০২৪" />
                <MetaBox icon={<Globe size={18} />} label="ভাষা" value="বাংলা" />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3">
                {[
                    { active: true, label: "বিশেষ মূল্য", price: "২২২", desc: "নগদ / কার্ড / মোবাইল ব্যাংকিং" },
                    { active: false, label: "মূল্য", price: "৩৩৩", desc: "সাশ্রয় ১১১৳ (৩৩% ছাড়)" },
                ].map(({ active, label, price, desc }) => (
                    <div
                        key={label}
                        className={cn(
                            "p-4 rounded-2xl border-2 transition-all",
                            active ? "bg-white border-amber-300 shadow-sm" : "bg-transparent border-transparent opacity-50"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className={cn(
                                "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                active ? "border-amber-600" : "border-gray-300"
                            )}>
                                {active && <div className="w-2 h-2 bg-amber-600 rounded-full" />}
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase">{label}:</span>
                            <span className="text-lg font-black text-amber-700">৳ {price}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 pl-6">{desc}</p>
                    </div>
                ))}
            </div>

            {/* Delivery estimate */}
            <p className="text-sm font-bold text-gray-600 px-1">
                ডেলিভারি অনুমান: <span className="underline decoration-dotted underline-offset-4 text-amber-700">
                    বৃহস্পতিবার, ২৬ ফেব্রু ২০২৬ এর মধ্যে
                </span>
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700/60">পরিমাণ</span>
                <div className="flex items-center bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm">
                    <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        disabled={qty === 1}
                        className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-50 disabled:opacity-30 transition-colors"
                    >
                        <Minus size={13} />
                    </button>
                    <span className="w-10 text-center text-sm font-black">{qty}</span>
                    <button
                        onClick={() => setQty(q => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                        <Plus size={13} />
                    </button>
                </div>
                <span className="text-xs text-amber-700/60">৬৩টি স্টকে আছে</span>
            </div>

            {/* CTA */}
            <div className="space-y-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={() => setIsAgreed(!isAgreed)}
                        className="w-4 h-4 accent-amber-700 rounded"
                    />
                    <span className="text-xs text-gray-600">
                        আমি <span className="text-amber-700 underline cursor-pointer">শর্তাবলী</span> মেনে নিচ্ছি
                    </span>
                </label>

                <div className="text-4xl font-black text-amber-800">৳ ২২২</div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="h-14 bg-gray-900 text-white rounded-2xl font-black uppercase text-sm tracking-wider hover:bg-gray-800 flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-900/20">
                        <ShoppingCart size={18} /> কার্টে যোগ করুন
                    </button>
                    <button className="h-14 bg-amber-700 text-white rounded-2xl font-black uppercase text-sm tracking-wider hover:bg-amber-800 flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-700/30">
                        <Link href='/checkout'>এখনই কিনুন</Link>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-4">
                    <div className="bg-emerald-600 text-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-md shadow-emerald-200">
                        <BookOpen size={20} className="mb-1" />
                        <span className="text-xs font-black uppercase tracking-tight">স্টকে আছে</span>
                    </div>
                    <div className="bg-amber-50 text-amber-800 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-amber-200">
                        <Shield size={20} className="mb-1" />
                        <span className="text-xs font-black uppercase tracking-tight">প্রমাণিত বিক্রেতা</span>
                    </div>
                </div>
            </div>

            {/* Book Description */}
            <div className="bg-white/60 backdrop-blur rounded-2xl border border-amber-100 p-5 mt-6">
                <h3 className="text-lg font-black mb-3" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    বইয়ের বিবরণ
                </h3>
                <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    আল-কুরআনের অনেকগুলো বাংলা অনুবাদ রয়েছে। এগুলোর মধ্যে কিছু কঠিন ভাষায় লেখা তাই অনেকের কাছে বোধগম্য হয় না।
                    এই বইটিতে সহজ সাবলীল বাংলায় কুরআনের অনুবাদ করা হয়েছে। প্রতিটি আয়াতের সহজ ও স্পষ্ট অনুবাদ দেওয়ার চেষ্টা করা হয়েছে,
                    যাতে যে কেউ সহজে কুরআনের অর্থ বুঝতে পারেন। পাশাপাশি প্রয়োজনীয় টীকা ও ব্যাখ্যাও সংযোজিত হয়েছে।
                </p>
            </div>
        </div>
    );
}