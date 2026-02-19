/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef, useCallback } from "react";
import {
    Heart,
    Share2,
    ShoppingCart,
    Eye,
    Star,
    ChevronUp,
    ChevronDown,
    ZoomIn,
    ZoomOut,
    Plus,
    Minus,
    Truck,
    RotateCcw,
    Shield,
    CreditCard,
    Gift,
    BookOpen,
    Users,
    Award,
    Camera,
    Send,
    CheckCircle2,
    ChevronRight,
    Globe,
    Calendar,
    FileText,
    Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   STATIC DATA - BOOK SHOP
═══════════════════════════════════════════════ */

// Book cover images - using high quality book-related Unsplash images
const PRODUCT_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=90",
        alt: "আল-কুরআনের সহজ বাংলা অনুবাদ - Front Cover",
    },
    {
        src: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=90",
        alt: "আল-কুরআনের সহজ বাংলা অনুবাদ - Back Cover",
    },
    {
        src: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&q=90",
        alt: "আল-কুরআনের সহজ বাংলা অনুবাদ - Inside Pages",
    },
    {
        src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=90",
        alt: "আল-কুরআনের সহজ বাংলা অনুবাদ - Book Binding",
    },
    {
        src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=90",
        alt: "আল-কুরআনের সহজ বাংলা অনুবাদ - Sample Page",
    },
];

const RELATED_BOOKS = [
    { title: "তাফসীর ইবনে কাসীর (সম্পূর্ণ সেট)", price: 1250, original: 1800, rating: 5, count: 45, author: "ইবনে কাসীর" },
    { title: "সহীহ বুখারী (আরবি-বাংলা)", price: 890, original: 1200, rating: 5, count: 78, author: "ইমাম বুখারী" },
    { title: "রিয়াযুস সালিহীন", price: 450, original: 650, rating: 4, count: 32, author: "ইমাম নববী" },
    { title: "মিশকাতুল মাসাবীহ", price: 680, original: 950, rating: 5, count: 23, author: "শাহ ওয়ালীউল্লাহ" },
];

const COLOR_OPTIONS = [
    { name: "হার্ডকভার", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80" },
    { name: "পেপারব্যাক", img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&q=80" },
    { name: "পকেট সাইজ", img: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=200&q=80" },
];

const RATING_BREAKDOWN = [
    { star: 5, count: 128, pct: 82 },
    { star: 4, count: 21, pct: 13 },
    { star: 3, count: 6, pct: 4 },
    { star: 2, count: 1, pct: 1 },
    { star: 1, count: 0, pct: 0 },
];

const MOCK_REVIEWS = [
    { name: "মোঃ মাহেদী হাসান", date: "২৮ আগস্ট, ২০২৫", rating: 5, comment: "আলহামদুলিল্লাহ, বইটির অনুবাদ খুবই সহজ ও সাবলীল। কুরআন বোঝার জন্য এটি একটি অসাধারণ প্রচেষ্টা। প্রতিটি মুসলিমের বইটি পড়া উচিত।" },
    { name: "সারা আহমেদ", date: "১৫ জুলাই, ২০২৫", rating: 4, comment: "বইটির কোয়ালিটি ভালো। পৃষ্ঠার মানও চমৎকার। অনুবাদ সহজ হওয়ায় যে কেউ সহজে কুরআন বুঝতে পারবেন।" },
    { name: "আব্দুর রহমান", date: "৩ জুন, ২০২৫", rating: 5, comment: "অনেকদিন ধরে এমন একটি সহজ অনুবাদের অপেক্ষায় ছিলাম। ডেলিভারিও দ্রুত পেয়েছি। ধন্যবাদ।" },
];

const VISIBLE_THUMBS = 4;

/* ═══════════════════════════════════════════════
   IMAGE GALLERY (LEFT) - BOOK OPTIMIZED
═══════════════════════════════════════════════ */
function ImageGallery({ images, badge }: { images: typeof PRODUCT_IMAGES; badge?: string }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [thumbOffset, setThumbOffset] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const mainRef = useRef<HTMLDivElement>(null);

    const maxOffset = Math.max(0, images.length - VISIBLE_THUMBS);

    const scrollThumbs = (dir: "up" | "down") =>
        setThumbOffset((p) => dir === "up" ? Math.max(0, p - 1) : Math.min(maxOffset, p + 1));

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!mainRef.current) return;
        const { left, top, width, height } = mainRef.current.getBoundingClientRect();
        setZoomPos({
            x: Math.min(100, Math.max(0, ((e.clientX - left) / width) * 100)),
            y: Math.min(100, Math.max(0, ((e.clientY - top) / height) * 100)),
        });
    }, []);

    const visibleThumbs = images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS);

    return (
        <div className="flex gap-3 w-full select-none">
            {/* Thumbnail column */}
            <div className="hidden md:flex flex-col items-center gap-2 w-[72px] flex-shrink-0">
                <button
                    onClick={() => scrollThumbs("up")}
                    disabled={thumbOffset === 0}
                    className={cn(
                        "w-full h-8 flex items-center justify-center rounded-xl border transition-all",
                        thumbOffset === 0
                            ? "border-transparent text-gray-200 cursor-not-allowed"
                            : "border-amber-200 bg-white text-amber-600 hover:border-amber-400 hover:text-amber-700 shadow-sm"
                    )}
                >
                    <ChevronUp size={15} />
                </button>

                <div className="flex flex-col gap-2 w-full">
                    {visibleThumbs.map((img, i) => {
                        const realIdx = i + thumbOffset;
                        const active = realIdx === activeIdx;
                        return (
                            <button
                                key={realIdx}
                                onClick={() => setActiveIdx(realIdx)}
                                className={cn(
                                    "w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white flex-shrink-0",
                                    active
                                        ? "border-amber-600 ring-2 ring-amber-200 shadow-md"
                                        : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
                                )}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => scrollThumbs("down")}
                    disabled={thumbOffset >= maxOffset}
                    className={cn(
                        "w-full h-8 flex items-center justify-center rounded-xl border transition-all",
                        thumbOffset >= maxOffset
                            ? "border-transparent text-gray-200 cursor-not-allowed"
                            : "border-amber-200 bg-white text-amber-600 hover:border-amber-400 hover:text-amber-700 shadow-sm"
                    )}
                >
                    <ChevronDown size={15} />
                </button>

                {/* Dot nav */}
                <div className="flex flex-col gap-1 mt-1">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setActiveIdx(i); setThumbOffset(Math.min(Math.max(0, i - 1), maxOffset)); }}
                            className={cn("w-1 rounded-full transition-all duration-200", i === activeIdx ? "h-4 bg-amber-600" : "h-1.5 bg-gray-200 hover:bg-gray-300")}
                        />
                    ))}
                </div>
            </div>

            {/* Main image */}
            <div className="flex-1 flex flex-col gap-3">
                <div
                    ref={mainRef}
                    className={cn(
                        "relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[#faf4ec]",
                        "border border-amber-100 shadow-xl shadow-amber-900/5",
                        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                    )}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                >
                    {badge && (
                        <div className="absolute top-4 left-4 z-20 bg-emerald-600 text-white rounded-xl px-3 py-1.5 shadow-md text-center min-w-[52px]">
                            <div className="text-base font-black leading-none">{badge}</div>
                            <div className="text-[8px] font-bold uppercase tracking-widest">ছাড়</div>
                        </div>
                    )}

                    <div className={cn("absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center shadow-sm transition-opacity", isZoomed ? "opacity-0" : "opacity-100")}>
                        <ZoomIn size={13} className="text-amber-700" />
                    </div>
                    <div className={cn("absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center shadow-sm transition-opacity", isZoomed ? "opacity-100" : "opacity-0")}>
                        <ZoomOut size={13} className="text-amber-700" />
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={images[activeIdx].src}
                        alt={images[activeIdx].alt}
                        className="w-full h-full object-contain p-4 transition-transform duration-200 ease-out will-change-transform"
                        style={{ transform: isZoomed ? "scale(2.2)" : "scale(1)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-3xl pointer-events-none" />
                </div>

                {/* Mobile strip */}
                <div className="flex md:hidden gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setActiveIdx(i)}
                            className={cn("w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border-2 bg-white transition-all", i === activeIdx ? "border-amber-600 ring-2 ring-amber-200" : "border-gray-200 opacity-60 hover:opacity-100")}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>

                {/* Pill dots */}
                <div className="flex items-center justify-center gap-1.5">
                    {images.map((_, i) => (
                        <button key={i} onClick={() => setActiveIdx(i)}
                            className={cn("rounded-full transition-all duration-300", i === activeIdx ? "w-6 h-2 bg-amber-600" : "w-2 h-2 bg-gray-200 hover:bg-gray-300")} />
                    ))}
                </div>

                {/* Caption */}
                <p className="text-center text-[10px] text-amber-700/60 tracking-wide">{images[activeIdx].alt}</p>

                {/* Trust chips */}
                <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                        { icon: <Truck size={14} />, label: "ফ্রি ডেলিভারি", sub: "৫০০৳+ অর্ডারে" },
                        { icon: <RotateCcw size={14} />, label: "৭ দিন রিটার্ন", sub: "সহজ রিটার্ন" },
                        { icon: <Shield size={14} />, label: "নিরাপদ পেমেন্ট", sub: "১০০% সুরক্ষিত" },
                    ].map((c) => (
                        <div key={c.label} className="flex flex-col items-center text-center p-2.5 bg-white/80 backdrop-blur rounded-2xl border border-amber-100 shadow-sm gap-1">
                            <div className="text-amber-700">{c.icon}</div>
                            <span className="text-[9px] font-bold text-gray-700 leading-tight">{c.label}</span>
                            <span className="text-[8px] text-amber-700/60">{c.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   SMALL HELPER COMPONENTS
═══════════════════════════════════════════════ */
const Badge = ({ text }: { text: string }) => (
    <span className="bg-amber-50 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wide">{text}</span>
);

const SelectionButton = ({ active, text, onClick }: any) => (
    <button onClick={onClick}
        className={cn("flex-1 py-2 px-3 text-[10px] font-bold rounded-xl border transition-all",
            active ? "bg-amber-50 border-amber-600 text-amber-800" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300")}>
        {text}
    </button>
);

const MetaBox = ({ icon, label, value, isLink }: any) => (
    <div className="bg-[#faf4ec] p-4 rounded-2xl flex flex-col items-center text-center border border-amber-100 shadow-sm gap-1.5">
        <div className="text-amber-700">{icon}</div>
        <span className="text-[9px] font-bold text-amber-700/60 uppercase tracking-tight leading-none">{label}</span>
        <span className={cn("text-[11px] font-black", isLink ? "text-amber-700 underline" : "text-gray-800")}>{value}</span>
    </div>
);

/* ═══════════════════════════════════════════════
   REVIEW SECTION - BENGALI
═══════════════════════════════════════════════ */
function ReviewSection() {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewName, setReviewName] = useState("");
    const [reviewEmail, setReviewEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!selectedRating || !reviewText || !reviewName) return;
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setReviewText(""); setReviewName(""); setReviewEmail(""); setSelectedRating(0);
    };

    const totalReviews = RATING_BREAKDOWN.reduce((a, b) => a + b.count, 0);
    const avgRating = (RATING_BREAKDOWN.reduce((a, b) => a + b.star * b.count, 0) / totalReviews).toFixed(1);

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-black text-[#1c1713] mb-8 flex items-center gap-2" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                <Star size={20} className="text-amber-500 fill-amber-500" /> পাঠকদের রিভিউ ও রেটিং
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
                {/* Rating overview */}
                <div className="space-y-5">
                    <div className="bg-white/80 backdrop-blur rounded-3xl border border-amber-100 p-7 text-center shadow-sm">
                        <div className="text-6xl font-black text-amber-800 mb-2">{avgRating}</div>
                        <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="text-amber-500 fill-amber-500" />)}
                        </div>
                        <p className="text-xs text-amber-700/60">{totalReviews}টি রিভিউর উপর ভিত্তি করে</p>
                    </div>
                    <div className="space-y-2">
                        {RATING_BREAKDOWN.map(({ star, count, pct }) => (
                            <div key={star} className="flex items-center gap-2.5">
                                <span className="text-xs font-bold text-amber-700/60 w-3">{star}</span>
                                <Star size={10} className="text-amber-500 fill-amber-500 flex-shrink-0" />
                                <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-amber-700/60 w-6 text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Write review + existing */}
                <div className="space-y-6">
                    {/* Write review form */}
                    <div className="bg-white/80 backdrop-blur rounded-3xl border border-amber-100 p-7 shadow-sm">
                        <h3 className="text-lg font-black mb-5 text-[#1c1713]" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>আপনার মতামত দিন</h3>

                        {/* Star picker */}
                        <div className="mb-5">
                            <p className="text-xs font-bold text-amber-700/60 uppercase tracking-widest mb-2.5">রেটিং দিন</p>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button key={s} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setSelectedRating(s)} className="transition-transform hover:scale-125">
                                        <Star size={30} className={cn("transition-colors duration-150", s <= (hoverRating || selectedRating) ? "text-amber-500 fill-amber-500" : "text-amber-200 fill-amber-100")} />
                                    </button>
                                ))}
                                {(hoverRating || selectedRating) > 0 && (
                                    <span className="text-xs font-bold text-amber-700 ml-2">
                                        {["", "খারাপ", "মোটামুটি", "ভালো", "খুব ভালো", "চমৎকার"][hoverRating || selectedRating]}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-widest mb-2">মন্তব্য *</label>
                            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                                placeholder="বইটি সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                                rows={3}
                                className="w-full rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4 text-sm text-gray-800 placeholder:text-amber-700/30 focus:outline-none focus:border-amber-300 resize-none transition-colors"
                                style={{ fontFamily: "'Noto Serif Bengali', serif" }} />
                        </div>

                        {/* Image upload */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-widest mb-2">ছবি আপলোড (ঐচ্ছিক)</label>
                            <label className="flex items-center gap-3 border-2 border-dashed border-amber-200 rounded-2xl px-4 py-2.5 cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all">
                                <Camera size={15} className="text-amber-600 flex-shrink-0" />
                                <span className="text-xs text-amber-700/60">ছবি বেছে নিন</span>
                                <input type="file" accept="image/*" multiple className="hidden" />
                            </label>
                        </div>

                        {/* Name + Email */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div>
                                <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-widest mb-2">আপনার নাম *</label>
                                <input value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="নাম লিখুন"
                                    className="w-full rounded-xl border-2 border-amber-100 bg-amber-50/50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-amber-700/30 focus:outline-none focus:border-amber-300 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-amber-700/60 uppercase tracking-widest mb-2">ইমেইল *</label>
                                <input type="email" value={reviewEmail} onChange={(e) => setReviewEmail(e.target.value)} placeholder="email@example.com"
                                    className="w-full rounded-xl border-2 border-amber-100 bg-amber-50/50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-amber-700/30 focus:outline-none focus:border-amber-300 transition-colors" />
                            </div>
                        </div>

                        <button onClick={handleSubmit} disabled={!selectedRating || !reviewText || !reviewName}
                            className={cn("w-full h-12 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300",
                                selectedRating && reviewText && reviewName
                                    ? "bg-amber-700 text-white hover:bg-amber-800 shadow-lg shadow-amber-700/25"
                                    : "bg-amber-100 text-amber-300 cursor-not-allowed")}>
                            {submitted ? <><CheckCircle2 size={16} /> জমা হয়েছে!</> : <><Send size={16} /> রিভিউ জমা দিন</>}
                        </button>
                    </div>

                    {/* Existing reviews */}
                    <div className="space-y-4">
                        {MOCK_REVIEWS.map((review, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur rounded-3xl border border-amber-100 p-6 shadow-sm">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-black text-[#1c1713]" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>{review.name}</p>
                                            <div className="flex">
                                                {[...Array(review.rating)].map((_, s) => <Star key={s} size={12} className="text-amber-500 fill-amber-500" />)}
                                            </div>
                                        </div>
                                        <p className="text-xs text-amber-700/60 mt-0.5">{review.date}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE - BOOK SHOP
═══════════════════════════════════════════════ */
export default function BookProductDetail() {
    const [selectedEdition, setSelectedEdition] = useState("হার্ডকভার");
    const [selectedLanguage, setSelectedLanguage] = useState("বাংলা (অনুবাদ)");
    const [qty, setQty] = useState(1);
    const [wishlist, setWishlist] = useState(false);
    const [isAgreed, setIsAgreed] = useState(true);

    return (
        <div

            className="bg-white min-h-screen text-[#1d1d1f] antialiased" style={{ fontFamily: "system-ui, sans-serif" }}
        >
            <div className="max-w-[1300px] mx-auto px-4 py-8">

                {/* Breadcrumb - Bengali */}
                <nav className="flex items-center gap-1.5 text-xs text-amber-700/60 mb-8">
                    {["হোম", "ইসলামিক বই", "কুরআন ও হাদিস", "আল-কুরআনের সহজ বাংলা অনুবাদ"].map((item, i, arr) => (
                        <span key={item} className="flex items-center gap-1.5">
                            <span className="hover:text-amber-800 cursor-pointer transition-colors">{item}</span>
                            {i < arr.length - 1 && <ChevronRight size={12} />}
                        </span>
                    ))}
                </nav>

                {/* ── MAIN GRID ── */}
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* LEFT: Image Gallery */}
                    <div className="w-full lg:w-[480px] lg:flex-shrink-0 lg:sticky lg:top-8">
                        <ImageGallery images={PRODUCT_IMAGES} badge="৩৩%" />
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="flex-1 space-y-5 min-w-0">

                        {/* ── Header card ── */}
                        <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-amber-100">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 tracking-wider">
                                    ইসলামিক বই
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={() => setWishlist(!wishlist)}
                                        className={cn("h-9 w-9 rounded-xl border flex items-center justify-center transition-all",
                                            wishlist ? "bg-red-50 border-red-300 text-red-500" : "bg-white border-amber-200 text-amber-600 hover:border-red-300")}>
                                        <Heart size={15} fill={wishlist ? "currentColor" : "none"} />
                                    </button>
                                    <button className="h-9 w-9 rounded-xl border border-amber-200 bg-white flex items-center justify-center text-amber-600 hover:border-amber-400 transition-all">
                                        <Share2 size={15} />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>আল-কুরআনের সহজ বাংলা অনুবাদ</h1>
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

                        {/* ── Edition / Language ── */}
                        <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-amber-100 space-y-5">
                            {/* Edition */}
                            <div>
                                <p className="text-xs font-black uppercase text-amber-700/60 mb-3 tracking-wider">সংস্করণ: <span className="text-gray-800">{selectedEdition}</span></p>
                                <div className="flex gap-3">
                                    {COLOR_OPTIONS.map((c) => (
                                        <button key={c.name} onClick={() => setSelectedEdition(c.name)}
                                            className={cn("w-16 h-20 p-1 rounded-xl overflow-hidden border-2 bg-white transition-all",
                                                selectedEdition === c.name ? "border-amber-600 ring-2 ring-amber-200 shadow-md" : "border-amber-200 hover:border-amber-300 opacity-70 hover:opacity-100")}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                                        <SelectionButton key={r} active={selectedLanguage === r} text={r} onClick={() => setSelectedLanguage(r)} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Meta bento ── */}
                        <div className="grid grid-cols-4 gap-2">
                            <MetaBox icon={<BookOpen size={18} />} label="পৃষ্ঠা" value="৩২০" />
                            <MetaBox icon={<Award size={18} />} label="সংস্করণ" value="৩য়" />
                            <MetaBox icon={<Calendar size={18} />} label="প্রকাশ" value="২০২৪" />
                            <MetaBox icon={<Globe size={18} />} label="ভাষা" value="বাংলা" />
                        </div>

                        {/* ── Pricing ── */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { active: true, label: "বিশেষ মূল্য", price: "২২২", desc: "নগদ / কার্ড / মোবাইল ব্যাংকিং" },
                                { active: false, label: "মূল্য", price: "৩৩৩", desc: "সাশ্রয় ১১১৳ (৩৩% ছাড়)" },
                            ].map(({ active, label, price, desc }) => (
                                <div key={label}
                                    className={cn("p-4 rounded-2xl border-2 transition-all", active ? "bg-white border-amber-300 shadow-sm" : "bg-transparent border-transparent opacity-50")}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0", active ? "border-amber-600" : "border-gray-300")}>
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
                            ডেলিভারি অনুমান: <span className="underline decoration-dotted underline-offset-4 text-amber-700">বৃহস্পতিবার, ২৬ ফেব্রু ২০২৬ এর মধ্যে</span>
                        </p>

                        {/* ── Quantity ── */}
                        <div className="flex items-center gap-4 px-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-700/60">পরিমাণ</span>
                            <div className="flex items-center bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty === 1}
                                    className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-50 disabled:opacity-30 transition-colors">
                                    <Minus size={13} />
                                </button>
                                <span className="w-10 text-center text-sm font-black">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors">
                                    <Plus size={13} />
                                </button>
                            </div>
                            <span className="text-xs text-amber-700/60">৬৩টি স্টকে আছে</span>
                        </div>

                        {/* ── CTA ── */}
                        <div className="space-y-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="w-4 h-4 accent-amber-700 rounded" />
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
                                    এখনই কিনুন
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

                            {/* Ektiyone Button */}
                            <button className="w-full h-12 rounded-2xl border-2 border-dashed border-amber-300 text-amber-800 font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors">
                                📦 একটিয়ানে বাতুন
                            </button>
                        </div>

                        {/* Book Description */}
                        <div className="bg-white/60 backdrop-blur rounded-2xl border border-amber-100 p-5 mt-6">
                            <h3 className="text-lg font-black mb-3" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>বইয়ের বিবরণ</h3>
                            <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                আল-কুরআনের অনেকগুলো বাংলা অনুবাদ রয়েছে। এগুলোর মধ্যে কিছু কঠিন ভাষায় লেখা তাই অনেকের কাছে বোধগম্য হয় না।
                                এই বইটিতে সহজ সাবলীল বাংলায় কুরআনের অনুবাদ করা হয়েছে। প্রতিটি আয়াতের সহজ ও স্পষ্ট অনুবাদ দেওয়ার চেষ্টা করা হয়েছে,
                                যাতে যে কেউ সহজে কুরআনের অর্থ বুঝতে পারেন। পাশাপাশি প্রয়োজনীয় টীকা ও ব্যাখ্যাও সংযোজিত হয়েছে।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Books */}
                <div className="mt-16">
                    <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>সম্পর্কিত বই</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {RELATED_BOOKS.map((book, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur rounded-2xl border border-amber-100 p-4 hover:shadow-lg transition-all cursor-pointer group">
                                <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl mb-3 flex items-center justify-center">
                                    <BookOpen size={40} className="text-amber-400" />
                                </div>
                                <h4 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-amber-700 transition-colors" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>{book.title}</h4>
                                <p className="text-xs text-gray-500 mb-2">{book.author}</p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} size={10} className={s < book.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"} />
                                    ))}
                                    <span className="text-[10px] text-gray-400 ml-1">({book.count})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-black text-amber-700">৳{book.price}</span>
                                    <span className="text-xs text-gray-400 line-through">৳{book.original}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── REVIEW SECTION ── */}
                <ReviewSection />
            </div>
        </div>
    );
}