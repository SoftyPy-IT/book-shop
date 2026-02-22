"use client";

import { useState, useRef, useCallback } from "react";
import {
    ChevronUp,
    ChevronDown,
    ZoomIn,
    ZoomOut,
    Truck,
    RotateCcw,
    Shield,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PDFReaderModal from "./PDFReaderModal";
import type { BookImage } from "@/types/product";

const VISIBLE_THUMBS = 4;

interface ImageGalleryProps {
    images: BookImage[];
    badge?: string;
}

export default function ImageGallery({ images, badge }: ImageGalleryProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [thumbOffset, setThumbOffset] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    const maxOffset = Math.max(0, images.length - VISIBLE_THUMBS);

    const scrollThumbs = (dir: "up" | "down") =>
        setThumbOffset((p) => dir === "up" ? Math.max(0, p - 1) : Math.min(maxOffset, p + 1));

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!mainRef.current || !isZoomed) return;
        const { left, top, width, height } = mainRef.current.getBoundingClientRect();
        setZoomPos({
            x: Math.min(100, Math.max(0, ((e.clientX - left) / width) * 100)),
            y: Math.min(100, Math.max(0, ((e.clientY - top) / height) * 100)),
        });
    }, [isZoomed]);

    const visibleThumbs = images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS);

    return (
        <>
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

                        {/* Sample Read Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg hover:shadow-amber-600/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-amber-400/30 backdrop-blur-sm"
                        >
                            <BookOpen size={16} />
                            <span style={{ fontFamily: "'Noto Serif Bengali', serif" }}>একটু পড়ে দেখুন</span>
                        </button>

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

                    {/* Mobile Sample Read Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="md:hidden w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-black text-sm shadow-lg hover:shadow-amber-600/30 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                    >
                        <BookOpen size={18} />
                        <span style={{ fontFamily: "'Noto Serif Bengali', serif" }}>একটু পড়ে দেখুন</span>
                    </button>
                </div>
            </div>

            {/* PDF Reader Modal */}
            <PDFReaderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}