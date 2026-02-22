// components/product/ReviewSection.tsx
"use client";

import { useState } from "react";
import {
    Star,
    MessageCircle,
    ThumbsUp,
    Flag,
    MoreHorizontal,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Review, RatingBreakdown } from "@/types/product";

const RATING_BREAKDOWN: RatingBreakdown[] = [
    { star: 5, count: 128, pct: 82 },
    { star: 4, count: 21, pct: 13 },
    { star: 3, count: 6, pct: 4 },
    { star: 2, count: 1, pct: 1 },
    { star: 1, count: 0, pct: 0 },
];

const MOCK_REVIEWS: Review[] = [
    {
        name: "মোঃ মাহেদী হাসান",
        date: "২৮ আগস্ট, ২০২৫",
        rating: 5,
        comment: "আলহামদুলিল্লাহ, বইটির অনুবাদ খুবই সহজ ও সাবলীল। কুরআন বোঝার জন্য এটি একটি অসাধারণ প্রচেষ্টা। প্রতিটি মুসলিমের বইটি পড়া উচিত।",
        helpful: 24,
        avatar: "MH"
    },
    {
        name: "সারা আহমেদ",
        date: "১৫ জুলাই, ২০২৫",
        rating: 4,
        comment: "বইটির কোয়ালিটি ভালো। পৃষ্ঠার মানও চমৎকার। অনুবাদ সহজ হওয়ায় যে কেউ সহজে কুরআন বুঝতে পারবেন।",
        helpful: 12,
        avatar: "SA"
    },
    {
        name: "আব্দুর রহমান",
        date: "৩ জুন, ২০২৫",
        rating: 5,
        comment: "অনেকদিন ধরে এমন একটি সহজ অনুবাদের অপেক্ষায় ছিলাম। ডেলিভারিও দ্রুত পেয়েছি। ধন্যবাদ।",
        helpful: 8,
        avatar: "AR"
    },
    {
        name: "ফাতেমা আক্তার",
        date: "২১ মে, ২০২৫",
        rating: 5,
        comment: "আমার পরিবারের সবাই বইটি পড়ছে। সবারই খুব ভালো লেগেছে। আল্লাহ প্রকাশককে উত্তম বিনিময় দিন।",
        helpful: 31,
        avatar: "FA"
    },
    {
        name: "মোঃ ইব্রাহীম",
        date: "১২ এপ্রিল, ২০২৫",
        rating: 4,
        comment: "বইটি খুবই ভালো। তবে আরো কিছু টিকা যোগ করলে ভালো হতো।",
        helpful: 5,
        avatar: "MI"
    },
    {
        name: "নাসরিন সুলতানা",
        date: "৫ মার্চ, ২০২৫",
        rating: 5,
        comment: "অসাধারণ! প্রতিটি আয়াতের সহজ অনুবাদ। যারা আরবি জানেন না তাদের জন্য এটি একটি মহামূল্যবান সম্পদ।",
        helpful: 17,
        avatar: "NS"
    },
];

export default function ReviewSection() {
    const [sortBy, setSortBy] = useState("সবচেয়ে সহায়ক");
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>(
        MOCK_REVIEWS.reduce((acc, _, idx) => ({ ...acc, [idx]: MOCK_REVIEWS[idx].helpful }), {})
    );

    const totalReviews = RATING_BREAKDOWN.reduce((a, b) => a + b.count, 0);
    const avgRating = (RATING_BREAKDOWN.reduce((a, b) => a + b.star * b.count, 0) / totalReviews).toFixed(1);

    const handleHelpful = (idx: number) => {
        setHelpfulCounts(prev => ({
            ...prev,
            [idx]: (prev[idx] || 0) + 1
        }));
    };

    const reviewsToShow = showAllReviews ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 3);

    return (
        <div className="mt-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" size={24} />
                    রিভিউ ও রেটিং
                </h2>
                <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                    রিভিউ লিখুন
                    <MessageCircle size={16} />
                </button>
            </div>

            {/* Rating Overview */}
            <div className="flex items-start gap-8 p-6 bg-white rounded-2xl border border-gray-100 mb-8">
                {/* Average Rating */}
                <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-gray-900">{avgRating}</div>
                    <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={18} className="text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{totalReviews}টি রিভিউ</p>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const rating = RATING_BREAKDOWN.find(r => r.star === star);
                        const count = rating?.count || 0;
                        const percentage = (count / totalReviews) * 100;

                        return (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700 w-8">{star} ★</span>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-400 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-500 w-12">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">সাজান:</span>
                    {["সবচেয়ে সহায়ক", "সর্বশেষ", "সর্বোচ্চ রেটিং", "সর্বনিম্ন রেটিং"].map((option) => (
                        <button
                            key={option}
                            onClick={() => setSortBy(option)}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                                sortBy === option
                                    ? "bg-amber-100 text-amber-700"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <span className="text-xs text-gray-400">{MOCK_REVIEWS.length}টি রিভিউ</span>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviewsToShow.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {review.avatar}
                            </div>

                            <div className="flex-1">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900">{review.name}</span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={14}
                                                    className={star <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                                                />
                                            ))}
                                        </div>
                                        <button className="text-gray-300 hover:text-gray-500">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                                    {review.comment}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleHelpful(idx)}
                                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition-colors group"
                                    >
                                        <ThumbsUp size={14} className="group-hover:scale-110 transition-transform" />
                                        <span>সহায়ক ({helpfulCounts[idx]})</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition-colors">
                                        <MessageCircle size={14} />
                                        <span>রিপ্লাই</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition-colors">
                                        <Flag size={14} />
                                        <span>রিপোর্ট</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {!showAllReviews && MOCK_REVIEWS.length > 3 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowAllReviews(true)}
                        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                    >
                        আরও {MOCK_REVIEWS.length - 3}টি রিভিউ দেখুন
                        <ChevronDown size={16} />
                    </button>
                </div>
            )}

            {/* Write Review Box */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">আপনার রিভিউ লিখুন</h3>
                <div className="space-y-4">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">আপনার রেটিং:</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} className="group">
                                    <Star size={20} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <textarea
                        placeholder="বইটি সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                        rows={4}
                        className="w-full rounded-xl border border-gray-200 p-4 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />

                    {/* Name and Email */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="আপনার নাম"
                            className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
                        />
                        <input
                            type="email"
                            placeholder="ইমেইল"
                            className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors">
                        রিভিউ জমা দিন
                    </button>
                </div>
            </div>
        </div>
    );
}