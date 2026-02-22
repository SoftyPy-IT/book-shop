// components/home/TopRatingBooksAlt.tsx
"use client";

import {
    ChevronRight,
    Heart,
    ShoppingCart,
    Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const books = [
    {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 24.99,
        originalPrice: 34.99,
        rating: 5,
        reviews: 15234,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 19.99,
        rating: 5,
        reviews: 28456,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
    },
    {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        price: 22.99,
        originalPrice: 29.99,
        rating: 4,
        reviews: 8976,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80"
    },
    {
        id: 4,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 26.99,
        rating: 5,
        reviews: 12345,
        image: "https://images.unsplash.com/photo-1516979187457-5abb4500b0a5?w=400&q=80"
    }
];

export default function TopRatingBook() {
    const [wishlist, setWishlist] = useState<number[]>([]);

    const toggleWishlist = (id: number) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simple Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Top Rating Books
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Highest rated books by our readers
                        </p>
                    </div>
                    <Link
                        href="/shop?sort=rating"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                        View More Books
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="group">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => toggleWishlist(book.id)}
                                        className="bg-white p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Heart
                                            className="w-4 h-4"
                                            fill={wishlist.includes(book.id) ? "currentColor" : "none"}
                                        />
                                    </button>
                                    <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Discount Badge */}
                                {book.originalPrice && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        -{Math.round((1 - book.price / book.originalPrice) * 100)}%
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    by {book.author}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < book.rating
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        ({book.reviews.toLocaleString()})
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        ${book.price.toFixed(2)}
                                    </span>
                                    {book.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${book.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full mt-3 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}