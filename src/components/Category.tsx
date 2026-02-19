"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const categories = [
    { name: "ফ্রিল্যান্সিং ও আউটসোর্সিং", slug: "freelancing" },
    { name: "বিশ্বরাজনীতি", slug: "world-politics" },
    { name: "কবিতা", slug: "poetry" },
    { name: "বইমেলা ২০২৫", slug: "book-fair-2025" },
    { name: "কুরআন ও হাদিস বিষয়ক বই", slug: "quran-hadith" },
    { name: "শিশু-কিশোর", slug: "children" },
    { name: "দেশ-বিদেশ", slug: "country-foreign" },
    { name: "ইতিহাস ও ঐতিহ্য", slug: "history-heritage" },
    { name: "বিজ্ঞান ও প্রযুক্তি", slug: "science-tech" },
    { name: "উপন্যাস", slug: "novels" },
    { name: "গল্পসংকলন", slug: "story-collections" },
    { name: "আত্মজীবনী", slug: "autobiography" },
];

interface Category {
    name: string;
    slug: string;
}

interface CategorySliderProps {
    categories?: Category[];
    className?: string;
    basePath?: string;
}

export function CategorySlider({
    categories: cats = categories,
    className,
    basePath = "/category",
}: CategorySliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el || isScrolling) return;

        setIsScrolling(true);
        const scrollAmount = direction === "left" ? -300 : 300;

        el.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });

        // Reset scrolling state after animation completes
        setTimeout(() => {
            setIsScrolling(false);
        }, 500);
    };

    return (
        <div className="w-full bg-white mt-5">
            <div
                className={cn(
                    "flex items-center gap-2 max-w-[1400px]  mx-auto",
                    className
                )}
            >
                {/* Left Arrow */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-10 w-10 shrink-0 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200",
                        !canScrollLeft && "opacity-0 pointer-events-none"
                    )}
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    disabled={!canScrollLeft || isScrolling}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Scrollable Category List */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-x-auto scroll-smooth py-3"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch"
                    }}
                >
                    <style>{`
                        div::-webkit-scrollbar { 
                            display: none; 
                        }
                    `}</style>
                    <div className="flex items-center gap-2 min-w-max">
                        {cats.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`${basePath}/${cat.slug}`}
                                className={cn(
                                    "whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-all duration-200",
                                    "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
                                    "focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl"
                                )}
                                style={{ fontFamily: "'SolaimanLipi', 'Noto Serif Bengali', serif" }}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-10 w-10 shrink-0 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200",
                        !canScrollRight && "opacity-0 pointer-events-none"
                    )}
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                    disabled={!canScrollRight || isScrolling}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}