/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Heart,
    Share2,
    ShoppingCart,
    Eye,
    Star,
    ChevronRight,
    Plus,
    Minus,
    Truck,
    RotateCcw,
    Shield,
    BookOpen,
    Users,
    Award,
    Camera,
    Send,
    GitCompareArrows,
    CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import product from '@/assets/product/product.jpeg'

const relatedBooks = [
    { title: "আল-কুরআনের সহজ বাংলা অনুবাদ", price: 222, original: 333, rating: 5, count: 1, img: product },
    { title: "ইসলামি আদর্শ", price: 400, original: 560, rating: 4, count: 3, img: product },
    { title: "একনজরে উম্মাহর ইতিহাস ও খত", price: 400, original: 700, rating: 5, count: 2, img: product },
    { title: "দীনের পথে যাত্রা", price: 360, original: 600, rating: 4, count: 5, img: product },
];

const mockReviews = [
    { name: "Md Mahedi Hasan", date: "August 28, 2025", rating: 5, comment: "Shobaike pora usit. Alhamdulillah khub valo ekta boi.", avatar: "/img/avatar1.jpg" },
];

const ratingBreakdown = [
    { star: 5, count: 1, pct: 100 },
    { star: 4, count: 0, pct: 0 },
    { star: 3, count: 0, pct: 0 },
    { star: 2, count: 0, pct: 0 },
    { star: 1, count: 0, pct: 0 },
];

/* ─────────────────────────── MAIN COMPONENT ─────────────────────── */
export default function BookProductDetail() {
    const [qty, setQty] = useState(1);
    const [wishlist, setWishlist] = useState(false);
    const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewName, setReviewName] = useState("");
    const [reviewEmail, setReviewEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Zoom state — keep from original
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        setZoomPos({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
    };

    const handleSubmitReview = () => {
        if (!selectedRating || !reviewText || !reviewName) return;
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setReviewText(""); setReviewName(""); setReviewEmail(""); setSelectedRating(0);
    };

    return (
        <div
            className="min-h-screen text-[#1c1713]"
            style={{
                background: "linear-gradient(160deg, #fdf8f3 0%, #faf4ec 40%, #f5ede0 100%)",
                fontFamily: "'Georgia', 'Noto Serif Bengali', serif",
            }}
        >
            {/* Breadcrumb */}
            <div className="max-w-[1280px] mx-auto px-6 pt-6">
                <nav className="flex items-center gap-2 text-xs text-amber-700/60 mb-8">
                    {["হোম", "ইসলামিক বই", "কুরআন ও হাদিস"].map((item, i, arr) => (
                        <span key={item} className="flex items-center gap-2">
                            <span className="hover:text-amber-800 cursor-pointer transition-colors">{item}</span>
                            {i < arr.length - 1 && <ChevronRight size={12} />}
                        </span>
                    ))}
                </nav>

                {/* ══ MAIN PRODUCT GRID ══ */}
                <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 items-start">

                    {/* ── LEFT: IMAGE PANEL ── */}
                    <div className="lg:sticky lg:top-8 space-y-4">
                        {/* Main image with zoom — kept from original */}
                        <div
                            className={cn(
                                "relative w-full aspect-[3/4] rounded-3xl overflow-hidden",
                                "bg-gradient-to-br from-[#f0e6d3] to-[#e8d9c0]",
                                "shadow-[0_20px_60px_-10px_rgba(139,90,43,0.25)]",
                                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                            )}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onMouseMove={handleMouseMove}
                        >
                            {/* Discount badge */}
                            <div className="absolute top-5 left-5 z-20 bg-[#b5451b] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                                ৩৩% ছাড়
                            </div>
                            {/* Stock badge */}
                            <div className="absolute top-5 right-5 z-20 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-xl">
                                স্টকে আছে
                            </div>

                            <Image
                                src={product}
                                alt="আল-কুরআনের সহজ বাংলা অনুবাদ"
                                fill
                                priority
                                className="object-contain p-8 transition-transform duration-300 ease-out will-change-transform"
                                style={{
                                    transform: isZoomed ? "scale(2.2)" : "scale(1)",
                                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                }}
                            />

                            {/* Gloss overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
                        </div>

                        {/* Info chips below image */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: <Truck size={16} />, label: "বিনামূল্যে ডেলিভারি", sub: "৫০০৳+ অর্ডারে" },
                                { icon: <RotateCcw size={16} />, label: "৭ দিনের রিটার্ন", sub: "সহজ রিটার্ন" },
                                { icon: <Shield size={16} />, label: "নিরাপদ পেমেন্ট", sub: "১০০% সুরক্ষিত" },
                            ].map((chip) => (
                                <div key={chip.label} className="flex flex-col items-center text-center p-3 bg-white/70 backdrop-blur rounded-2xl border border-amber-100/80 shadow-sm gap-1">
                                    <div className="text-amber-700">{chip.icon}</div>
                                    <span className="text-[10px] font-bold text-[#1c1713] leading-tight">{chip.label}</span>
                                    <span className="text-[9px] text-amber-700/60">{chip.sub}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: PRODUCT INFO ── */}
                    <div className="space-y-6 pb-16">

                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                                    ইসলামিক বই
                                </span>
                                <div className="flex items-center gap-2">
                                    <Link href="/product-compare">
                                        <Button variant="ghost" size="sm" className="text-[11px] font-bold text-amber-800 hover:bg-amber-50 gap-1 h-8">
                                            <GitCompareArrows size={13} /> তুলনা করুন
                                        </Button>
                                    </Link>
                                    <button
                                        onClick={() => setWishlist(!wishlist)}
                                        className={cn(
                                            "h-9 w-9 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                            wishlist ? "bg-red-50 border-red-300 text-red-500" : "bg-white border-amber-200 text-amber-600 hover:border-red-300"
                                        )}
                                    >
                                        <Heart size={16} fill={wishlist ? "currentColor" : "none"} />
                                    </button>
                                    <button className="h-9 w-9 rounded-full border-2 border-amber-200 bg-white flex items-center justify-center text-amber-600 hover:border-amber-400 transition-all">
                                        <Share2 size={15} />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-3xl font-black leading-tight mb-2" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                আল-কুরআনের সহজ বাংলা অনুবাদ
                            </h1>
                            <p className="text-sm text-amber-800/60 mb-4">লেখক: ড. মো. ইব্রাহীম খলিল</p>

                            {/* Rating summary */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-[#1c1713]">5.0</span>
                                <span className="text-xs text-amber-700/50">· 1টি রিভিউ</span>
                                <span className="ml-auto text-xs text-emerald-600 font-bold flex items-center gap-1">
                                    <Eye size={12} /> ২০ জন দেখছেন এখন
                                </span>
                            </div>

                            {/* Price block */}
                            <div className="flex items-end gap-4 mb-6 p-5 bg-white/80 backdrop-blur rounded-2xl border border-amber-100 shadow-sm">
                                <div>
                                    <div className="text-xs text-amber-700/60 mb-1 uppercase tracking-wide">বিশেষ মূল্য</div>
                                    <div className="text-5xl font-black text-[#b5451b]">৳২২২</div>
                                </div>
                                <div className="pb-2">
                                    <div className="text-xl text-amber-300 line-through font-medium">৳৩৩৩</div>
                                    <div className="text-xs text-emerald-600 font-bold">৳১১১ সাশ্রয়</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/60 backdrop-blur rounded-2xl border border-amber-100 p-5">
                            <p className="text-sm leading-relaxed text-[#3d2e1e]/80" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                আল-কুরআনের অনেকগুলো বাংলা অনুবাদ রয়েছে। এগুলোর মধ্যে কিছু কঠিন ভাষায় লেখা তাই অনেকের কাছে বোধগম্য হয় না। এই বইটিতে সহজ সাবলীল বাংলায় কুরআনের অনুবাদ করা হয়েছে।
                            </p>
                            <button className="text-xs font-bold text-amber-700 mt-3 hover:text-amber-900 transition-colors">
                                বিস্তারিত পড়ুন →
                            </button>
                        </div>

                        {/* Book specs */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: <BookOpen size={18} />, label: "পৃষ্ঠা", value: "৩২০" },
                                { icon: <Award size={18} />, label: "সংস্করণ", value: "৩য়" },
                                { icon: <Users size={18} />, label: "প্রকাশক", value: "মাকতাবা" },
                            ].map(({ icon, label, value }) => (
                                <div key={label} className="flex flex-col items-center text-center bg-white/70 rounded-2xl p-4 border border-amber-100 shadow-sm gap-1.5">
                                    <div className="text-amber-700">{icon}</div>
                                    <span className="text-[9px] uppercase tracking-widest text-amber-700/50 font-bold">{label}</span>
                                    <span className="text-sm font-black text-[#1c1713]">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Quantity + CTA */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-700/60">পরিমাণ</span>
                                <div className="flex items-center bg-white/80 rounded-xl border border-amber-200 overflow-hidden shadow-sm">
                                    <button
                                        className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-30"
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        disabled={qty === 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-12 text-center text-sm font-black text-[#1c1713]">{qty}</span>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors"
                                        onClick={() => setQty(q => q + 1)}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <span className="text-xs text-amber-700/60">৬৩টি স্টকে আছে</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="h-14 rounded-2xl bg-[#1c1713] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#b5451b] transition-colors duration-300 shadow-lg shadow-[#1c1713]/20">
                                    <ShoppingCart size={18} /> কার্টে যোগ করুন
                                </button>
                                <button className="h-14 rounded-2xl bg-[#b5451b] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#8f3614] transition-colors duration-300 shadow-lg shadow-[#b5451b]/20">
                                    এখনই কিনুন
                                </button>
                            </div>

                            {/* Ektiyone Button */}
                            <button className="w-full h-12 rounded-2xl border-2 border-dashed border-amber-300 text-amber-800 font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors">
                                📦 একটিয়ানে বতুন
                            </button>

                            <div className="text-xs text-center text-amber-700/50 pt-1">
                                ডেলিভারি: <span className="font-bold text-amber-800">বৃহস্পতিবার, ২৬ ফেব্রু ২০২৬ পর্যন্ত</span> · কাছন অন ডেলিভারি উপলব্ধ
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══ TABS: DETAILS / REVIEWS ══ */}
                <div className="mt-16 mb-20">
                    {/* Tab bar */}
                    <div className="flex border-b-2 border-amber-100 mb-10 gap-1">
                        {(["details", "reviews"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                                    activeTab === tab
                                        ? "text-[#b5451b]"
                                        : "text-amber-700/40 hover:text-amber-700/70"
                                )}
                            >
                                {tab === "details" ? "বিস্তারিত তথ্য" : "রিভিউ ও রেটিং"}
                                {activeTab === tab && (
                                    <span className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-[#b5451b] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* ── DETAILS TAB ── */}
                    {activeTab === "details" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-5">
                                <h3 className="text-lg font-black">বইয়ের বিবরণ</h3>
                                <p className="text-sm leading-loose text-[#3d2e1e]/70" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                    আল-কুরআনের অনেকগুলো বাংলা অনুবাদ রয়েছে। এগুলোর মধ্যে কিছু কঠিন ভাষায় লেখা তাই অনেকের কাছে সহজে বোধগম্য হয় না। কিছু রয়েছে ভারি পান্ডিত্যিক। কিছু রয়েছে ভারি ভার্বাল। একই আয়াতে দুই বা ততোধিক ভিন্নমত...
                                </p>
                                <table className="w-full text-sm border-collapse">
                                    {[
                                        ["প্রকাশনী", "মাকতাবাতুল আসলাফ"],
                                        ["লেখক", "ড. মো. ইব্রাহীম খলিল"],
                                        ["পৃষ্ঠা সংখ্যা", "৩২০"],
                                        ["ভাষা", "বাংলা"],
                                        ["ISBN", "978-984-123-456-7"],
                                        ["সংস্করণ", "তৃতীয় সংস্করণ, ২০২৪"],
                                    ].map(([k, v]) => (
                                        <tr key={k} className="border-b border-amber-100 last:border-0">
                                            <td className="py-3 pr-6 text-amber-700/50 font-bold text-xs uppercase tracking-wider w-40">{k}</td>
                                            <td className="py-3 text-[#1c1713] font-medium">{v}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            {/* Related books */}
                            <div>
                                <h3 className="text-lg font-black mb-5">সম্পর্কিত বই</h3>
                                <div className="space-y-3">
                                    {relatedBooks.map((book) => (
                                        <div key={book.title} className="flex items-center gap-4 p-3 bg-white/70 rounded-2xl border border-amber-100 hover:shadow-md transition-all cursor-pointer group">
                                            <div className="w-14 h-16 bg-amber-50 rounded-xl overflow-hidden flex-shrink-0 border border-amber-100">
                                                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                                                    <BookOpen size={20} className="text-amber-400" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold leading-snug text-[#1c1713] line-clamp-2 group-hover:text-[#b5451b] transition-colors">{book.title}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(Math.round(book.rating))].map((_, i) => (
                                                        <Star key={i} size={9} className="text-amber-400 fill-amber-400" />
                                                    ))}
                                                    <span className="text-[9px] text-amber-700/40 ml-1">({book.count})</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-sm font-black text-[#b5451b]">৳{book.price}</div>
                                                <div className="text-[10px] text-amber-300 line-through">৳{book.original}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── REVIEWS TAB ── */}
                    {activeTab === "reviews" && (
                        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">

                            {/* Rating Overview */}
                            <div className="space-y-6">
                                <div className="bg-white/80 rounded-3xl border border-amber-100 p-8 text-center shadow-sm">
                                    <div className="text-7xl font-black text-[#b5451b] mb-2">5.0</div>
                                    <div className="flex justify-center mb-3">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} className="text-amber-400 fill-amber-400" />)}
                                    </div>
                                    <p className="text-xs text-amber-700/50">১টি রিভিউর উপর ভিত্তি করে</p>
                                </div>
                                <div className="space-y-2.5">
                                    {ratingBreakdown.map(({ star, count, pct }) => (
                                        <div key={star} className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-amber-700/60 w-4">{star}</span>
                                            <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                                            <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-400 rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-amber-700/40 w-4">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Write Review + Existing Reviews */}
                            <div className="space-y-8">
                                {/* Write a review */}
                                <div className="bg-white/80 rounded-3xl border border-amber-100 p-7 shadow-sm">
                                    <h3 className="text-base font-black mb-6 flex items-center gap-2">
                                        <Star size={16} className="text-amber-500" />
                                        আপনার মতামত দিন
                                    </h3>

                                    {/* Star selector */}
                                    <div className="mb-6">
                                        <p className="text-xs font-bold text-amber-700/60 uppercase tracking-wider mb-3">রেটিং দিন</p>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <button
                                                    key={s}
                                                    onMouseEnter={() => setHoverRating(s)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setSelectedRating(s)}
                                                    className="transition-transform hover:scale-125 focus:outline-none"
                                                >
                                                    <Star
                                                        size={32}
                                                        className={cn(
                                                            "transition-colors duration-150",
                                                            s <= (hoverRating || selectedRating)
                                                                ? "text-amber-400 fill-amber-400"
                                                                : "text-amber-200 fill-amber-100"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                            {(hoverRating || selectedRating) > 0 && (
                                                <span className="self-center text-xs font-bold text-amber-700 ml-2">
                                                    {["", "খুব খারাপ", "খারাপ", "মোটামুটি", "ভালো", "চমৎকার"][hoverRating || selectedRating]}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-wider mb-2">মন্তব্য *</label>
                                        <textarea
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            placeholder="বইটি সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                                            rows={4}
                                            className="w-full rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4 text-sm text-[#1c1713] placeholder:text-amber-700/30 focus:outline-none focus:border-amber-300 resize-none transition-colors"
                                            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                                        />
                                    </div>

                                    {/* Image upload */}
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-wider mb-2">ছবি আপলোড (ঐচ্ছিক)</label>
                                        <label className="flex items-center gap-3 border-2 border-dashed border-amber-200 rounded-2xl px-4 py-3 cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all">
                                            <Camera size={16} className="text-amber-500 flex-shrink-0" />
                                            <span className="text-xs text-amber-700/50">ছবি বেছে নিন</span>
                                            <input type="file" accept="image/*" multiple className="hidden" />
                                        </label>
                                    </div>

                                    {/* Name & Email */}
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        <div>
                                            <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-wider mb-2">আপনার নাম *</label>
                                            <input
                                                value={reviewName}
                                                onChange={(e) => setReviewName(e.target.value)}
                                                placeholder="নাম লিখুন"
                                                className="w-full rounded-xl border-2 border-amber-100 bg-amber-50/50 px-4 py-3 text-sm text-[#1c1713] placeholder:text-amber-700/30 focus:outline-none focus:border-amber-300 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-wider mb-2">ইমেইল *</label>
                                            <input
                                                type="email"
                                                value={reviewEmail}
                                                onChange={(e) => setReviewEmail(e.target.value)}
                                                placeholder="email@example.com"
                                                className="w-full rounded-xl border-2 border-amber-100 bg-amber-50/50 px-4 py-3 text-sm text-[#1c1713] placeholder:text-amber-700/30 focus:outline-none focus:border-amber-300 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmitReview}
                                        disabled={!selectedRating || !reviewText || !reviewName}
                                        className={cn(
                                            "w-full h-12 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2",
                                            selectedRating && reviewText && reviewName
                                                ? "bg-[#b5451b] text-white hover:bg-[#8f3614] shadow-lg shadow-[#b5451b]/25"
                                                : "bg-amber-100 text-amber-400 cursor-not-allowed"
                                        )}
                                    >
                                        {submitted ? (
                                            <><CheckCircle2 size={16} /> জমা হয়েছে!</>
                                        ) : (
                                            <><Send size={16} /> রিভিউ জমা দিন</>
                                        )}
                                    </button>
                                </div>

                                {/* Existing reviews */}
                                <div className="space-y-4">
                                    <h3 className="text-base font-black">পাঠকদের মতামত</h3>
                                    {mockReviews.map((review, i) => (
                                        <div key={i} className="bg-white/80 rounded-3xl border border-amber-100 p-6 shadow-sm">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-base flex-shrink-0">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-black text-[#1c1713]">{review.name}</p>
                                                        <div className="flex">
                                                            {[...Array(review.rating)].map((_, s) => (
                                                                <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-[11px] text-amber-700/40 mt-0.5">{review.date}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#3d2e1e]/70 leading-relaxed" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}