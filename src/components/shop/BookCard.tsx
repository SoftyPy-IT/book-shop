// components/shop/BookCard.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Eye,
    Heart,
    ShoppingCart,
    Star,
    Trophy,
    Sparkles,
    GemIcon,
    BookOpen,
    Calendar,
    Globe,
    Pen,
    Crown,
    Award,
    Rocket,
    Percent,
} from "lucide-react";
import { Book } from "@/types/shop";
import { TAGS } from "@/types/shop";

interface BookCardProps {
    book: Book;
    viewMode: "grid" | "list";
}

export const BookCard = ({ book, viewMode }: BookCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const discount = book.discount > 0 ? book.discount : Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
    const savings = book.originalPrice - book.price;

    const getTagStyles = (tag: string) => {
        const styles = {
            bestseller: "bg-amber-100 text-amber-700",
            new: "bg-blue-100 text-blue-700",
            limited: "bg-purple-100 text-purple-700",
            signed: "bg-green-100 text-green-700",
            "first-edition": "bg-yellow-100 text-yellow-700",
            "award-winning": "bg-red-100 text-red-700",
            "pre-order": "bg-orange-100 text-orange-700",
            discounted: "bg-emerald-100 text-emerald-700",
        };
        return styles[tag as keyof typeof styles] || "bg-gray-100 text-gray-700";
    };

    if (viewMode === "list") {
        return (
            <div
                className="group relative bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full md:w-48 h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Tags */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {book.isBestseller && (
                                <span className="bg-amber-500 text-white text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    <Trophy size={8} /> BESTSELLER
                                </span>
                            )}
                            {book.isNew && (
                                <span className="bg-blue-500 text-white text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    <Sparkles size={8} /> NEW
                                </span>
                            )}
                            {book.isLimited && (
                                <span className="bg-purple-500 text-white text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    <GemIcon size={8} /> LIMITED
                                </span>
                            )}
                        </div>

                        {/* Discount Badge */}
                        {discount > 0 && (
                            <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-xl px-2 py-1 text-center shadow-lg">
                                <div className="text-sm font-black leading-none">{discount}%</div>
                                <div className="text-[6px] font-bold uppercase tracking-widest">OFF</div>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                            </div>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={cn(
                                    "p-2 rounded-xl transition-all",
                                    isWishlisted
                                        ? "bg-red-50 text-red-500"
                                        : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                )}
                            >
                                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={cn(
                                            i < Math.floor(book.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-gray-900">{book.rating}</span>
                            <span className="text-xs text-gray-400">({book.reviewCount}টি রিভিউ)</span>
                        </div>

                        {/* Book Details */}
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="flex items-center gap-1">
                                <BookOpen size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-600">{book.pages} পৃষ্ঠা</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-600">{book.publicationYear}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Globe size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-600">{book.language}</span>
                            </div>
                        </div>

                        {/* Publisher & Format */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {book.publisher}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {book.format}
                            </span>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-2xl font-black text-gray-900">৳{book.price}</span>
                                    <span className="text-sm text-gray-400 line-through">৳{book.originalPrice}</span>
                                    {savings > 0 && (
                                        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-bold">
                                            সাশ্রয় ৳{savings}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">
                                    {book.inStock ? `${book.stockCount}টি স্টকে আছে` : 'স্টকে নেই'}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25">
                                    <ShoppingCart size={18} />
                                </button>
                                <Link href={`/product/${book.id}`}>
                                    <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all">
                                        <Eye size={18} />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Tags */}
                        {book.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                                {book.tags.map((tag) => {
                                    const tagInfo = TAGS.find(t => t.id === tag);
                                    return (
                                        <span
                                            key={tag}
                                            className={cn(
                                                "text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1",
                                                getTagStyles(tag)
                                            )}
                                        >
                                            {tagInfo?.icon && <tagInfo.icon size={8} />}
                                            {tagInfo?.name}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="group relative bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Section */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                )}>
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <button className="flex-1 h-10 bg-white rounded-xl text-sm font-bold hover:bg-amber-500 hover:text-white transition-all">
                            Quick View
                        </button>
                        <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                            <ShoppingCart size={16} />
                        </button>
                    </div>
                </div>

                {/* Tags */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {book.isBestseller && (
                        <span className="bg-amber-500 text-white text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <Trophy size={8} /> BESTSELLER
                        </span>
                    )}
                    {book.isNew && (
                        <span className="bg-blue-500 text-white text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <Sparkles size={8} /> NEW
                        </span>
                    )}
                    {book.isLimited && (
                        <span className="bg-purple-500 text-white text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <GemIcon size={8} /> LIMITED
                        </span>
                    )}
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-xl px-2 py-1 text-center shadow-lg">
                        <div className="text-sm font-black leading-none">{discount}%</div>
                        <div className="text-[6px] font-bold uppercase tracking-widest">OFF</div>
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(
                        "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                        isWishlisted
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-gray-400 hover:bg-red-500 hover:text-white"
                    )}
                >
                    <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={cn(
                                    i < Math.floor(book.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-900">{book.rating}</span>
                    <span className="text-[10px] text-gray-400">({book.reviewCount})</span>
                </div>

                {/* Title & Author */}
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {book.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{book.author}</p>

                {/* Publisher */}
                <p className="text-[10px] text-gray-400 mb-3 line-clamp-1">{book.publisher}</p>

                {/* Price */}
                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-black text-gray-900">৳{book.price}</span>
                            <span className="text-[10px] text-gray-400 line-through">৳{book.originalPrice}</span>
                        </div>
                        {savings > 0 && (
                            <p className="text-[8px] text-emerald-600 font-bold">সাশ্রয় ৳{savings}</p>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className={cn(
                        "text-[8px] font-bold px-2 py-1 rounded-full",
                        book.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                        {book.inStock ? "স্টকে" : "স্টকে নেই"}
                    </div>
                </div>

                {/* Tags */}
                {book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                        {book.tags.slice(0, 2).map((tag) => {
                            const tagInfo = TAGS.find(t => t.id === tag);
                            return (
                                <span
                                    key={tag}
                                    className={cn(
                                        "text-[6px] font-bold px-1.5 py-0.5 rounded-full",
                                        getTagStyles(tag)
                                    )}
                                >
                                    {tagInfo?.name}
                                </span>
                            );
                        })}
                        {book.tags.length > 2 && (
                            <span className="text-[6px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                                +{book.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};