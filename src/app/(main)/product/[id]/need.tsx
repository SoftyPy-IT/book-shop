// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import { useState, useRef, useCallback } from "react";
// import {
//     Heart,
//     Share2,
//     ShoppingCart,
//     Eye,
//     Star,
//     ChevronUp,
//     ChevronDown,
//     ZoomIn,
//     ZoomOut,
//     Plus,
//     Minus,
//     Truck,
//     RotateCcw,
//     Shield,
//     ShieldCheck,
//     CreditCard,
//     Gift,
//     MousePointerClick,
//     GitCompareArrows,
//     Box,
//     Send,
//     Camera,
//     CheckCircle2,
//     ChevronRight,
// } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// /* ═══════════════════════════════════════════════
//    STATIC DATA
// ═══════════════════════════════════════════════ */

// const PRODUCT_IMAGES = [
//     {
//         src: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&q=90",
//         alt: "Cosmic Orange – Front & Back",
//     },
//     {
//         src: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=90",
//         alt: "Black Titanium – Side View",
//     },
//     {
//         src: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=90",
//         alt: "Silver Titanium – Front",
//     },
//     {
//         src: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=90",
//         alt: "Camera System Detail",
//     },
//     {
//         src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=90",
//         alt: "In-the-Box Contents",
//     },
// ];

// const COLOR_OPTIONS = [
//     { name: "Cosmic Orange", img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=200&q=80" },
//     { name: "Black Titanium", img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=200&q=80" },
//     { name: "Silver Titanium", img: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=200&q=80" },
// ];

// const RATING_BREAKDOWN = [
//     { star: 5, count: 128, pct: 82 },
//     { star: 4, count: 21, pct: 13 },
//     { star: 3, count: 6, pct: 4 },
//     { star: 2, count: 1, pct: 1 },
//     { star: 1, count: 0, pct: 0 },
// ];

// const MOCK_REVIEWS = [
//     { name: "Md Mahedi Hasan", date: "August 28, 2025", rating: 5, comment: "Absolutely stunning phone. The Cosmic Orange color is even more beautiful in person. Camera quality is next level!" },
//     { name: "Sarah Ahmed", date: "July 15, 2025", rating: 4, comment: "Great device overall. Battery life is impressive. Delivery was fast too." },
// ];

// const VISIBLE_THUMBS = 4;

// /* ═══════════════════════════════════════════════
//    IMAGE GALLERY (LEFT)
// ═══════════════════════════════════════════════ */
// function ImageGallery({ images, badge }: { images: typeof PRODUCT_IMAGES; badge?: string }) {
//     const [activeIdx, setActiveIdx] = useState(0);
//     const [thumbOffset, setThumbOffset] = useState(0);
//     const [isZoomed, setIsZoomed] = useState(false);
//     const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
//     const mainRef = useRef<HTMLDivElement>(null);

//     const maxOffset = Math.max(0, images.length - VISIBLE_THUMBS);

//     const scrollThumbs = (dir: "up" | "down") =>
//         setThumbOffset((p) => dir === "up" ? Math.max(0, p - 1) : Math.min(maxOffset, p + 1));

//     const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//         if (!mainRef.current) return;
//         const { left, top, width, height } = mainRef.current.getBoundingClientRect();
//         setZoomPos({
//             x: Math.min(100, Math.max(0, ((e.clientX - left) / width) * 100)),
//             y: Math.min(100, Math.max(0, ((e.clientY - top) / height) * 100)),
//         });
//     }, []);

//     const visibleThumbs = images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS);

//     return (
//         <div className="flex gap-3 w-full select-none">
//             {/* Thumbnail column */}
//             <div className="hidden md:flex flex-col items-center gap-2 w-[72px] flex-shrink-0">
//                 <button
//                     onClick={() => scrollThumbs("up")}
//                     disabled={thumbOffset === 0}
//                     className={cn(
//                         "w-full h-8 flex items-center justify-center rounded-xl border transition-all",
//                         thumbOffset === 0
//                             ? "border-transparent text-gray-200 cursor-not-allowed"
//                             : "border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-500 shadow-sm"
//                     )}
//                 >
//                     <ChevronUp size={15} />
//                 </button>

//                 <div className="flex flex-col gap-2 w-full">
//                     {visibleThumbs.map((img, i) => {
//                         const realIdx = i + thumbOffset;
//                         const active = realIdx === activeIdx;
//                         return (
//                             <button
//                                 key={realIdx}
//                                 onClick={() => setActiveIdx(realIdx)}
//                                 className={cn(
//                                     "w-full aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white flex-shrink-0",
//                                     active
//                                         ? "border-orange-400 ring-2 ring-orange-100 shadow-md"
//                                         : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
//                                 )}
//                             >
//                                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
//                             </button>
//                         );
//                     })}
//                 </div>

//                 <button
//                     onClick={() => scrollThumbs("down")}
//                     disabled={thumbOffset >= maxOffset}
//                     className={cn(
//                         "w-full h-8 flex items-center justify-center rounded-xl border transition-all",
//                         thumbOffset >= maxOffset
//                             ? "border-transparent text-gray-200 cursor-not-allowed"
//                             : "border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-500 shadow-sm"
//                     )}
//                 >
//                     <ChevronDown size={15} />
//                 </button>

//                 {/* Dot nav */}
//                 <div className="flex flex-col gap-1 mt-1">
//                     {images.map((_, i) => (
//                         <button
//                             key={i}
//                             onClick={() => { setActiveIdx(i); setThumbOffset(Math.min(Math.max(0, i - 1), maxOffset)); }}
//                             className={cn("w-1 rounded-full transition-all duration-200", i === activeIdx ? "h-4 bg-orange-400" : "h-1.5 bg-gray-200 hover:bg-gray-300")}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* Main image */}
//             <div className="flex-1 flex flex-col gap-3">
//                 <div
//                     ref={mainRef}
//                     className={cn(
//                         "relative w-full aspect-square rounded-3xl overflow-hidden bg-[#f8f8f8]",
//                         "border border-gray-100 shadow-xl shadow-gray-200/50",
//                         isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
//                     )}
//                     onMouseEnter={() => setIsZoomed(true)}
//                     onMouseLeave={() => setIsZoomed(false)}
//                     onMouseMove={handleMouseMove}
//                 >
//                     {badge && (
//                         <div className="absolute top-4 left-4 z-20 bg-[#c5a47e] text-white rounded-xl px-3 py-1.5 shadow-md text-center min-w-[52px]">
//                             <div className="text-base font-black leading-none">{badge}</div>
//                             <div className="text-[8px] font-bold uppercase tracking-widest">OFF</div>
//                         </div>
//                     )}

//                     <div className={cn("absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-sm transition-opacity", isZoomed ? "opacity-0" : "opacity-100")}>
//                         <ZoomIn size={13} className="text-gray-500" />
//                     </div>
//                     <div className={cn("absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-sm transition-opacity", isZoomed ? "opacity-100" : "opacity-0")}>
//                         <ZoomOut size={13} className="text-gray-500" />
//                     </div>

//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                         src={images[activeIdx].src}
//                         alt={images[activeIdx].alt}
//                         className="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
//                         style={{ transform: isZoomed ? "scale(2.4)" : "scale(1)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
//                     />
//                     <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-3xl pointer-events-none" />
//                 </div>

//                 {/* Mobile strip */}
//                 <div className="flex md:hidden gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
//                     {images.map((img, i) => (
//                         <button key={i} onClick={() => setActiveIdx(i)}
//                             className={cn("w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border-2 bg-white transition-all", i === activeIdx ? "border-orange-400 ring-2 ring-orange-100" : "border-gray-200 opacity-60 hover:opacity-100")}>
//                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                             <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
//                         </button>
//                     ))}
//                 </div>

//                 {/* Pill dots */}
//                 <div className="flex items-center justify-center gap-1.5">
//                     {images.map((_, i) => (
//                         <button key={i} onClick={() => setActiveIdx(i)}
//                             className={cn("rounded-full transition-all duration-300", i === activeIdx ? "w-6 h-2 bg-orange-400" : "w-2 h-2 bg-gray-200 hover:bg-gray-300")} />
//                     ))}
//                 </div>

//                 {/* Caption */}
//                 <p className="text-center text-[10px] text-gray-400 tracking-wide">{images[activeIdx].alt}</p>

//                 {/* Trust chips */}
//                 <div className="grid grid-cols-3 gap-2 mt-1">
//                     {[
//                         { icon: <Truck size={14} />, label: "Free Delivery", sub: "Orders 500+ BDT" },
//                         { icon: <RotateCcw size={14} />, label: "7-Day Return", sub: "Easy returns" },
//                         { icon: <Shield size={14} />, label: "Secure Pay", sub: "100% safe" },
//                     ].map((c) => (
//                         <div key={c.label} className="flex flex-col items-center text-center p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm gap-1">
//                             <div className="text-orange-500">{c.icon}</div>
//                             <span className="text-[9px] font-bold text-gray-700 leading-tight">{c.label}</span>
//                             <span className="text-[8px] text-gray-400">{c.sub}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* ═══════════════════════════════════════════════
//    SMALL HELPER COMPONENTS
// ═══════════════════════════════════════════════ */
// const Badge = ({ text }: { text: string }) => (
//     <span className="bg-[#fdf0e6] text-[#c5a47e] text-[10px] font-black px-3 py-1 rounded-full border border-[#f3d4b1] uppercase tracking-wide">{text}</span>
// );

// const SelectionButton = ({ active, text, onClick }: any) => (
//     <button onClick={onClick}
//         className={cn("flex-1 py-2 px-3 text-[10px] font-bold rounded-xl border transition-all",
//             active ? "bg-[#fdf0e6] border-[#c5a47e] text-[#8a6d4d]" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300")}>
//         {text}
//     </button>
// );

// const MetaBox = ({ icon, label, value, isLink }: any) => (
//     <div className="bg-[#f5f5f7] p-4 rounded-2xl flex flex-col items-center text-center border border-zinc-100 shadow-sm gap-1.5">
//         <div className="text-zinc-400">{icon}</div>
//         <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight leading-none">{label}</span>
//         <span className={cn("text-[11px] font-black", isLink ? "text-blue-500 underline" : "text-zinc-800")}>{value}</span>
//     </div>
// );

// const CareItem = ({ title, price }: { title: string; price: string }) => (
//     <label className="flex items-center justify-between p-4 hover:bg-zinc-50 cursor-pointer transition-colors">
//         <div className="flex items-start gap-3 flex-1">
//             <input type="checkbox" className="mt-0.5 w-4 h-4 accent-zinc-800 rounded" />
//             <span className="text-[10px] font-bold text-zinc-700 leading-tight uppercase tracking-tight">{title}</span>
//         </div>
//         <div className="text-right min-w-[70px] ml-3">
//             <span className="text-[9px] font-black text-zinc-500 block">BDT</span>
//             <span className="text-[11px] font-black text-zinc-900">{price}</span>
//         </div>
//     </label>
// );

// /* ═══════════════════════════════════════════════
//    REVIEW SECTION
// ═══════════════════════════════════════════════ */
// function ReviewSection() {
//     const [hoverRating, setHoverRating] = useState(0);
//     const [selectedRating, setSelectedRating] = useState(0);
//     const [reviewText, setReviewText] = useState("");
//     const [reviewName, setReviewName] = useState("");
//     const [reviewEmail, setReviewEmail] = useState("");
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = () => {
//         if (!selectedRating || !reviewText || !reviewName) return;
//         setSubmitted(true);
//         setTimeout(() => setSubmitted(false), 3000);
//         setReviewText(""); setReviewName(""); setReviewEmail(""); setSelectedRating(0);
//     };

//     const totalReviews = RATING_BREAKDOWN.reduce((a, b) => a + b.count, 0);
//     const avgRating = (RATING_BREAKDOWN.reduce((a, b) => a + b.star * b.count, 0) / totalReviews).toFixed(1);

//     return (
//         <div className="mt-12">
//             <h2 className="text-xl font-black text-[#1d1d1f] mb-8 flex items-center gap-2">
//                 <Star size={18} className="text-amber-400 fill-amber-400" /> Customer Ratings & Reviews
//             </h2>
//             <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
//                 {/* Rating overview */}
//                 <div className="space-y-5">
//                     <div className="bg-white rounded-3xl border border-gray-100 p-7 text-center shadow-sm">
//                         <div className="text-6xl font-black text-[#c5a47e] mb-2">{avgRating}</div>
//                         <div className="flex justify-center mb-2">
//                             {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="text-amber-400 fill-amber-400" />)}
//                         </div>
//                         <p className="text-xs text-gray-400">Based on {totalReviews} reviews</p>
//                     </div>
//                     <div className="space-y-2">
//                         {RATING_BREAKDOWN.map(({ star, count, pct }) => (
//                             <div key={star} className="flex items-center gap-2.5">
//                                 <span className="text-xs font-bold text-gray-400 w-3">{star}</span>
//                                 <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
//                                 <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
//                                     <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
//                                 </div>
//                                 <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Write review + existing */}
//                 <div className="space-y-6">
//                     {/* Write review form */}
//                     <div className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm">
//                         <h3 className="text-sm font-black mb-5 text-[#1d1d1f]">Write Your Review</h3>

//                         {/* Star picker */}
//                         <div className="mb-5">
//                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Your Rating</p>
//                             <div className="flex items-center gap-2">
//                                 {[1, 2, 3, 4, 5].map((s) => (
//                                     <button key={s} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setSelectedRating(s)} className="transition-transform hover:scale-125">
//                                         <Star size={30} className={cn("transition-colors duration-150", s <= (hoverRating || selectedRating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-100")} />
//                                     </button>
//                                 ))}
//                                 {(hoverRating || selectedRating) > 0 && (
//                                     <span className="text-xs font-bold text-amber-600 ml-2">
//                                         {["", "Poor", "Fair", "Good", "Great", "Excellent"][hoverRating || selectedRating]}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Comment */}
//                         <div className="mb-4">
//                             <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Your Comment *</label>
//                             <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
//                                 placeholder="Share your experience with this product..."
//                                 rows={3}
//                                 className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 p-4 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-orange-200 resize-none transition-colors" />
//                         </div>

//                         {/* Image upload */}
//                         <div className="mb-4">
//                             <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Upload Image (Optional)</label>
//                             <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl px-4 py-2.5 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all">
//                                 <Camera size={15} className="text-orange-400 flex-shrink-0" />
//                                 <span className="text-xs text-gray-400">Choose files</span>
//                                 <input type="file" accept="image/*" multiple className="hidden" />
//                             </label>
//                         </div>

//                         {/* Name + Email */}
//                         <div className="grid grid-cols-2 gap-3 mb-5">
//                             <div>
//                                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Your Name *</label>
//                                 <input value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Full name"
//                                     className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-orange-200 transition-colors" />
//                             </div>
//                             <div>
//                                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email *</label>
//                                 <input type="email" value={reviewEmail} onChange={(e) => setReviewEmail(e.target.value)} placeholder="you@email.com"
//                                     className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-orange-200 transition-colors" />
//                             </div>
//                         </div>

//                         <button onClick={handleSubmit} disabled={!selectedRating || !reviewText || !reviewName}
//                             className={cn("w-full h-12 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300",
//                                 selectedRating && reviewText && reviewName
//                                     ? "bg-[#111416] text-white hover:bg-[#c5a47e] shadow-lg"
//                                     : "bg-gray-100 text-gray-300 cursor-not-allowed")}>
//                             {submitted ? <><CheckCircle2 size={16} /> Submitted!</> : <><Send size={16} /> Submit Review</>}
//                         </button>
//                     </div>

//                     {/* Existing reviews */}
//                     <div className="space-y-4">
//                         {MOCK_REVIEWS.map((review, i) => (
//                             <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
//                                 <div className="flex items-start gap-3 mb-3">
//                                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
//                                         {review.name.charAt(0)}
//                                     </div>
//                                     <div className="flex-1">
//                                         <div className="flex items-center justify-between">
//                                             <p className="text-sm font-black text-[#1d1d1f]">{review.name}</p>
//                                             <div className="flex">
//                                                 {[...Array(review.rating)].map((_, s) => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
//                                             </div>
//                                         </div>
//                                         <p className="text-[10px] text-gray-400 mt-0.5">{review.date}</p>
//                                     </div>
//                                 </div>
//                                 <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* ═══════════════════════════════════════════════
//    MAIN PAGE (DEFAULT EXPORT)
// ═══════════════════════════════════════════════ */
// export default function ProductDetailPage() {
//     const [selectedColor, setSelectedColor] = useState("Cosmic Orange");
//     const [selectedRegion, setSelectedRegion] = useState("JP/MEA (Dual e-Sim)");
//     const [selectedStorage, setSelectedStorage] = useState("256GB");
//     const [qty, setQty] = useState(1);
//     const [wishlist, setWishlist] = useState(false);
//     const [isAgreed, setIsAgreed] = useState(true);

//     return (
//         <div className="bg-white min-h-screen text-[#1d1d1f] antialiased" style={{ fontFamily: "system-ui, sans-serif" }}>
//             <div className="max-w-[1300px] mx-auto px-4 py-8">

//                 {/* Breadcrumb */}
//                 <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
//                     {["Home", "Smartphones", "Apple", "iPhone 17 Pro Max"].map((item, i, arr) => (
//                         <span key={item} className="flex items-center gap-1.5">
//                             <span className="hover:text-orange-500 cursor-pointer transition-colors">{item}</span>
//                             {i < arr.length - 1 && <ChevronRight size={12} />}
//                         </span>
//                     ))}
//                 </nav>

//                 {/* ── MAIN GRID ── */}
//                 <div className="flex flex-col lg:flex-row gap-12 items-start">

//                     {/* LEFT: Image Gallery */}
//                     <div className="w-full lg:w-[480px] lg:flex-shrink-0 lg:sticky lg:top-8">
//                         <ImageGallery images={PRODUCT_IMAGES} badge="36%" />
//                     </div>

//                     {/* RIGHT: Product Info */}
//                     <div className="flex-1 space-y-5 min-w-0">

//                         {/* ── Header card ── */}
//                         <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-zinc-100">
//                             <div className="flex justify-between items-start mb-4">
//                                 <span className="text-[10px] font-black uppercase text-zinc-400 bg-white px-3 py-1 rounded-full border border-zinc-200 tracking-wider">
//                                     Brand: Apple
//                                 </span>
//                                 <div className="flex gap-2">
//                                     <Link href="/product-compare">
//                                         <button className="flex items-center gap-1.5 text-[10px] font-bold h-9 px-3 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 transition-all">
//                                             <GitCompareArrows size={13} /> Compare
//                                         </button>
//                                     </Link>
//                                     <button onClick={() => setWishlist(!wishlist)}
//                                         className={cn("h-9 w-9 rounded-xl border flex items-center justify-center transition-all",
//                                             wishlist ? "bg-red-50 border-red-300 text-red-500" : "bg-white border-zinc-200 text-zinc-500 hover:border-red-300")}>
//                                         <Heart size={15} fill={wishlist ? "currentColor" : "none"} />
//                                     </button>
//                                     <button className="h-9 w-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:border-zinc-300 transition-all">
//                                         <Share2 size={15} />
//                                     </button>
//                                 </div>
//                             </div>

//                             <h1 className="text-2xl font-black mb-1">iPhone 17 Pro Max</h1>
//                             <p className="text-sm text-zinc-500 mb-3">Apple A19 Pro · 6.9" LTPO OLED · 48MP Triple Camera</p>

//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 <Badge text={selectedColor} />
//                                 <Badge text={selectedRegion} />
//                                 <Badge text={selectedStorage} />
//                             </div>

//                             {/* Rating row */}
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="flex">
//                                     {[1, 2, 3, 4, 5].map(s => <Star key={s} size={13} className="text-amber-400 fill-amber-400" />)}
//                                 </div>
//                                 <span className="text-xs font-black text-zinc-700">4.8</span>
//                                 <span className="text-xs text-zinc-400">· 156 reviews</span>
//                                 <span className="ml-auto text-xs text-orange-500 font-bold flex items-center gap-1">
//                                     <Eye size={12} /> 20 people viewing now
//                                 </span>
//                             </div>

//                             {/* Specs */}
//                             <div className="space-y-2 text-[11px] leading-relaxed text-zinc-600 pt-4 border-t border-zinc-200/60">
//                                 <p><strong className="text-zinc-800">Display:</strong> 6.9" LTPO Super Retina XDR OLED, 120Hz, 3000 nits peak</p>
//                                 <p><strong className="text-zinc-800">Camera:</strong> 48MP triple with periscope zoom, LiDAR, 4K Dolby Vision</p>
//                                 <p><strong className="text-zinc-800">Processor:</strong> Apple A19 Pro (3nm) with 6-core GPU</p>
//                                 <p><strong className="text-zinc-800">Battery:</strong> Up to 5088mAh, 50% in 20 min + MagSafe/Qi2</p>
//                             </div>
//                         </div>

//                         {/* ── Color / Region / Storage ── */}
//                         <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-zinc-100 space-y-5">
//                             {/* Color */}
//                             <div>
//                                 <p className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-wider">Color: <span className="text-zinc-600">{selectedColor}</span></p>
//                                 <div className="flex gap-3">
//                                     {COLOR_OPTIONS.map((c) => (
//                                         <button key={c.name} onClick={() => setSelectedColor(c.name)}
//                                             className={cn("w-14 h-14 p-1 rounded-xl overflow-hidden border-2 bg-white transition-all",
//                                                 selectedColor === c.name ? "border-orange-400 ring-2 ring-orange-100 shadow-md" : "border-zinc-200 hover:border-zinc-300 opacity-70 hover:opacity-100")}>
//                                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                                             <img src={c.img} alt={c.name} className="w-full h-full object-cover rounded-lg" />
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Region */}
//                             <div>
//                                 <p className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-wider">Region / Variant</p>
//                                 <div className="grid grid-cols-2 gap-2">
//                                     {["JP/MEA (Dual e-Sim)", "Global (Sim + e-Sim)", "HK / CH (Dual Sim)", "USA (Dual e-Sim)"].map((r) => (
//                                         <SelectionButton key={r} active={selectedRegion === r} text={r} onClick={() => setSelectedRegion(r)} />
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Storage */}
//                             <div>
//                                 <p className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-wider">Storage</p>
//                                 <div className="flex gap-2">
//                                     {["256GB", "512GB", "1TB", "2TB"].map((s) => (
//                                         <SelectionButton key={s} active={selectedStorage === s} text={s} onClick={() => setSelectedStorage(s)} />
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ── Meta bento ── */}
//                         <div className="grid grid-cols-3 gap-2">
//                             <MetaBox icon={<MousePointerClick size={18} />} label="Min. Booking" value="15,000 BDT" />
//                             <MetaBox icon={<Gift size={18} />} label="Purchase Points" value="100 Points" />
//                             <MetaBox icon={<CreditCard size={18} />} label="EMI Available" value="See Details" isLink />
//                         </div>

//                         {/* ── Pricing ── */}
//                         <div className="grid grid-cols-2 gap-3">
//                             {[
//                                 { active: true, label: "Offer Price", price: "1,66,990", desc: "Cash / Card / MFS Payment" },
//                                 { active: false, label: "Regular Price", price: "1,86,577", desc: "EMI from BDT 15,548/mo" },
//                             ].map(({ active, label, price, desc }) => (
//                                 <label key={label}
//                                     className={cn("p-4 rounded-2xl border-2 cursor-pointer transition-all", active ? "bg-white border-orange-200 shadow-sm" : "bg-transparent border-transparent opacity-50")}>
//                                     <div className="flex items-center gap-2 mb-1">
//                                         <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0", active ? "border-orange-500" : "border-zinc-300")}>
//                                             {active && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
//                                         </div>
//                                         <span className="text-[10px] font-bold text-zinc-500 uppercase">{label}:</span>
//                                         <span className="text-[11px] font-black text-orange-600">৳ {price}</span>
//                                     </div>
//                                     <p className="text-[9px] text-zinc-400 pl-6">{desc}</p>
//                                 </label>
//                             ))}
//                         </div>

//                         {/* Delivery estimate */}
//                         <p className="text-[11px] font-bold text-zinc-500 px-1">
//                             Estimated delivery: <span className="underline decoration-dotted underline-offset-4 text-zinc-700">0–3 days</span>
//                         </p>

//                         {/* ── Quantity ── */}
//                         <div className="flex items-center gap-4 px-1">
//                             <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Qty</span>
//                             <div className="flex items-center bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
//                                 <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty === 1}
//                                     className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 disabled:opacity-30 transition-colors">
//                                     <Minus size={13} />
//                                 </button>
//                                 <span className="w-10 text-center text-sm font-black">{qty}</span>
//                                 <button onClick={() => setQty(q => q + 1)}
//                                     className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
//                                     <Plus size={13} />
//                                 </button>
//                             </div>
//                             <span className="text-[10px] text-zinc-400">63 items in stock</span>
//                         </div>

//                         {/* ── Dazzle Care ── */}
//                         <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
//                             <div className="bg-[#111416] px-5 py-3.5 flex items-center gap-2.5">
//                                 <ShieldCheck className="text-[#c5a47e]" size={18} />
//                                 <span className="text-white font-black text-[11px] uppercase tracking-widest">Dazzle Care</span>
//                             </div>
//                             <div className="divide-y divide-zinc-100">
//                                 <CareItem title="Dazzle Ultimate Care+ 1 year" price="25,031" />
//                                 <CareItem title="DC+ & DSC+ Bundle (1 year brand-new replacement)" price="15,012" />
//                                 <CareItem title="Dazzle Screen Care+: 730 days display" price="10,002" />
//                                 <CareItem title="Dazzle Care+ for Apple (1 Year Guarantee)" price="8,332" />
//                             </div>
//                         </div>

//                         {/* ── CTA ── */}
//                         <div className="space-y-4 pt-2">
//                             <label className="flex items-center gap-2 cursor-pointer">
//                                 <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="w-4 h-4 accent-green-600 rounded" />
//                                 <span className="text-[11px] text-zinc-500">
//                                     I agree to Dazzle's <span className="text-blue-500 underline cursor-pointer">terms & conditions</span>
//                                 </span>
//                             </label>

//                             <div className="text-4xl font-black text-[#c5a47e]">BDT 1,66,990</div>

//                             <div className="grid grid-cols-2 gap-3">
//                                 <button className="h-14 bg-[#111416] text-white rounded-2xl font-black uppercase text-[11px] tracking-wider hover:bg-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20">
//                                     <ShoppingCart size={16} /> Add To Cart
//                                 </button>
//                                 <button className="h-14 bg-[#c5a47e] text-white rounded-2xl font-black uppercase text-[11px] tracking-wider hover:bg-[#b5926a] flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#c5a47e]/30">
//                                     Buy Now
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-2 gap-3 pb-4">
//                                 <div className="bg-emerald-500 text-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-md shadow-emerald-200">
//                                     <Box size={20} className="mb-1" />
//                                     <span className="text-[10px] font-black uppercase tracking-tight">In Stock</span>
//                                 </div>
//                                 <div className="bg-zinc-100 text-zinc-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-zinc-200">
//                                     <CreditCard size={20} className="mb-1 text-zinc-400" />
//                                     <span className="text-[10px] font-black uppercase tracking-tight">1 Year Apple</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ── REVIEW SECTION ── */}
//                 <ReviewSection />
//             </div>
//         </div>
//     );
// }