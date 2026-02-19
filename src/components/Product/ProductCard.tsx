/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Assuming these are available in your project structure
import product1 from "@/assets/product/product.jpeg";
import product2 from "@/assets/product/product2.jpeg";
import product3 from "@/assets/product/product3.webp";
import product4 from "@/assets/product/product5.webp";
import product5 from "@/assets/product/product4.webp";
import product6 from "@/assets/product/product6.jpg";
import { Badge } from "../ui/badge";

const products = [
    { id: 1, title: "আল-কুরআনের সহজ বাংলা অনুবাদ", author: "ড. মো. ইব্রাহিম খলিল", discount: "33%", rating: 5.0, reviews: 1, price: 222.0, originalPrice: 333.0, image: product1 },
    { id: 2, title: "ইংলিশ টাচে অফিস পারফেকশন", author: "মোঃ নাজমুল হোসাইন", discount: "17%", rating: 5.0, reviews: 1, price: 555.0, originalPrice: 666.0, image: product2 },
    { id: 3, title: "মুসলিম উইমেন্স ডায়েরি", author: "মূল: সুমাইয়া আমিরি", discount: "33%", rating: 4.0, reviews: 1, price: 200.0, originalPrice: 300.0, image: product3 },
    { id: 4, title: "ইসলামি আদাব", author: "হযরত মাওলানা মুহাম্মদ আশেক এলাহী", discount: "20%", rating: 4.0, reviews: 1, price: 400.0, originalPrice: 500.0, image: product4 },
    { id: 5, title: "একনজরে উম্মাহর ইতিহাস ৩ খন্ড", author: "মাওলানা আব্দুল্লাহ আল ফারুক", discount: "43%", rating: 5.0, reviews: 1, price: 400.0, originalPrice: 700.0, image: product5 },
    { id: 6, title: "দ্বীনের পথে যাত্রা", author: "মাওলানা তানজীল আমীর", discount: "40%", rating: 5.0, reviews: 1, price: 360.0, originalPrice: 600.0, image: product6 },
    // Duplicate for infinite loop simulation
    { id: 7, title: "আল-কুরআনের সহজ বাংলা অনুবাদ", author: "ড. মো. ইব্রাহিম খলিল", discount: "33%", rating: 5.0, reviews: 1, price: 222.0, originalPrice: 333.0, image: product1 },
    { id: 8, title: "ইংলিশ টাচে অফিস পারফেকশন", author: "মোঃ নাজমুল হোসাইন", discount: "17%", rating: 5.0, reviews: 1, price: 555.0, originalPrice: 666.0, image: product2 },
    { id: 9, title: "মুসলিম উইমেন্স ডায়েরি", author: "মূল: সুমাইয়া আমিরি", discount: "33%", rating: 4.0, reviews: 1, price: 200.0, originalPrice: 300.0, image: product3 },
    { id: 10, title: "ইসলামি আদাব", author: "হযরত মাওলানা মুহাম্মদ আশেক এলাহী", discount: "20%", rating: 4.0, reviews: 1, price: 400.0, originalPrice: 500.0, image: product4 },
    { id: 11, title: "একনজরে উম্মাহর ইতিহাস ৩ খন্ড", author: "মাওলানা আব্দুল্লাহ আল ফারুক", discount: "43%", rating: 5.0, reviews: 1, price: 400.0, originalPrice: 700.0, image: product5 },
    { id: 12, title: "দ্বীনের পথে যাত্রা", author: "মাওলানা তানজীল আমীর", discount: "40%", rating: 5.0, reviews: 1, price: 360.0, originalPrice: 600.0, image: product6 },
];

export default function ExactProductSlider({ title }: any) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let scrollPos = 0;

        const scroll = () => {
            if (!isHovered) {
                scrollPos += 0.8; // Adjust speed here
                if (scrollPos >= scrollContainer.scrollWidth / 2) {
                    scrollPos = 0;
                }
                scrollContainer.scrollLeft = scrollPos;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    return (
        <section className="w-full bg-white  px-4">

            <div className="max-w-[1400px] mt-14 mx-auto relative group">
                <div className="flex justify-between items-center shadow-sn mb-3 px-2 py-3 rounded-lg border border-2">
                    <h3 className="font-bold">{title}</h3>
                    <span className="font-bold">View More </span>
                </div>
                <button
                    className="absolute -left-2 top-[40%] -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => { if (scrollRef.current) scrollRef.current.scrollLeft -= 300 }}
                >
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <button
                    className="absolute -right-2 top-[40%] -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => { if (scrollRef.current) scrollRef.current.scrollLeft += 300 }}
                >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                {/* Slider Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden pb-4 scroll-smooth"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {products.map((product, idx) => (
                        <div key={`${product.id}-${idx}`} className="min-w-[calc(100%/2-12px)] md:min-w-[calc(100%/3-12px)] lg:min-w-[calc(100%/6-14px)]">
                            <Card className="py-2 border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white">
                                <CardContent className="p-0 flex flex-col h-full">
                                    {/* Image Area */}
                                    <div className="relative aspect-[4/5] bg-[#F8F9FA] overflow-hidden  rounded-lg">
                                        {product.discount && (
                                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-0.5 rounded-md z-10 shadow-sm">
                                                {product.discount} ছাড়
                                            </Badge>
                                        )}
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-cover px-2 rounded-lg mb-2 "
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className=" my-5 px-2 flex flex-col flex-grow">
                                        <h3 className="text-[13px] font-bold text-gray-800 line-clamp-1 mb-1" title={product.title}>
                                            {product.title}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-orange-400 text-orange-400" : "text-gray-200"}`} />
                                            ))}
                                            <span className="text-[10px] text-gray-500 ml-1">
                                                {product.rating.toFixed(1)} ({product.reviews})
                                            </span>
                                        </div>

                                        {/* Pricing */}
                                        <div className="flex items-center gap-2 mb-5">
                                            <span className="text-blue-600 font-bold text-sm">
                                                ৳ {product.price.toFixed(2)}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-gray-300 line-through text-[11px]">
                                                    ৳ {product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-auto flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                className="flex-grow h-9 rounded-lg text-[12px] border-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                                            >
                                                বিস্তারিত দেখুন
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="w-9 h-9 rounded-lg border-gray-100 group/cart hover:border-red-500 hover:bg-white transition-colors"
                                            >
                                                <ShoppingCart className="w-4 h-4 text-red-500 group-hover/cart:scale-110 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
