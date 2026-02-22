"use client";

import { Star, BookOpen } from "lucide-react";
import type { RelatedBook } from "@/types/product";

const RELATED_BOOKS: RelatedBook[] = [
    { title: "তাফসীর ইবনে কাসীর (সম্পূর্ণ সেট)", price: 1250, original: 1800, rating: 5, count: 45, author: "ইবনে কাসীর" },
    { title: "সহীহ বুখারী (আরবি-বাংলা)", price: 890, original: 1200, rating: 5, count: 78, author: "ইমাম বুখারী" },
    { title: "রিয়াযুস সালিহীন", price: 450, original: 650, rating: 4, count: 32, author: "ইমাম নববী" },
    { title: "মিশকাতুল মাসাবীহ", price: 680, original: 950, rating: 5, count: 23, author: "শাহ ওয়ালীউল্লাহ" },
];

export default function RelatedBooks() {
    return (
        <div className="mt-16">
            <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                সম্পর্কিত বই
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {RELATED_BOOKS.map((book, i) => (
                    <div
                        key={i}
                        className="bg-white/80 backdrop-blur rounded-2xl border border-amber-100 p-4 hover:shadow-lg transition-all cursor-pointer group"
                    >
                        <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl mb-3 flex items-center justify-center">
                            <BookOpen size={40} className="text-amber-400" />
                        </div>
                        <h4
                            className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-amber-700 transition-colors"
                            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                        >
                            {book.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{book.author}</p>
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, s) => (
                                <Star
                                    key={s}
                                    size={10}
                                    className={s < book.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"}
                                />
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
    );
}