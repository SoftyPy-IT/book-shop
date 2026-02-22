/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { ChevronRight } from "lucide-react";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewSection from "@/components/product/ReviewSection";
import RelatedBooks from "@/components/product/RelatedBooks";


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

export default function BookProductDetail() {
    return (
        <div className="bg-white min-h-screen text-[#1d1d1f] antialiased">
            <div className="max-w-[1300px] mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-amber-700/60 mb-8">
                    {["হোম", "ইসলামিক বই", "কুরআন ও হাদিস", "আল-কুরআনের সহজ বাংলা অনুবাদ"].map((item, i, arr) => (
                        <span key={item} className="flex items-center gap-1.5">
                            <span className="hover:text-amber-800 cursor-pointer transition-colors">{item}</span>
                            {i < arr.length - 1 && <ChevronRight size={12} />}
                        </span>
                    ))}
                </nav>


                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left: Image Gallery */}
                    <div className="w-full lg:w-[480px] lg:flex-shrink-0 lg:sticky lg:top-8">
                        <ImageGallery images={PRODUCT_IMAGES} badge="৩৩%" />
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex-1 min-w-0">
                        <ProductInfo />
                    </div>
                </div>

                {/* Related Books */}
                <RelatedBooks />

                {/* Review Section */}
                <ReviewSection />
            </div>
        </div>
    );
}