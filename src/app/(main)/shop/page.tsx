/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { cn } from "@/lib/utils";
import {
    ArrowUpDown,
    Atom,
    Award,
    Baby,
    Binary,
    BookMarked,
    BookOpen,
    Brain,
    Building,
    Calendar,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Coins,
    Crown,
    DraftingCompass,
    Eye,
    Feather,
    FileText,
    Filter,
    FlaskConical,
    Gem as GemIcon,
    Globe,
    Globe2,
    GraduationCap,
    Grid3x3,
    Headphones,
    Heart,
    HeartHandshake,
    Landmark,
    Layers,
    List,
    MarsStroke,
    Microscope,
    MousePointerSquareDashed,
    Music,
    Notebook,
    Package,
    Paintbrush,
    Pen,
    Percent,
    Puzzle,
    RefreshCw,
    Rocket,
    Scale,
    ScrollText,
    Search,
    ShoppingCart,
    Sparkles,
    Star,
    Tag,
    TrendingUp,
    Trophy,
    Users,
    X,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
═══════════════════════════════════════════════ */

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    subCategory: string;
    publisher: string;
    language: string;
    pages: number;
    publicationYear: number;
    isbn: string;
    inStock: boolean;
    stockCount: number;
    soldCount: number;
    discount: number;
    isBestseller: boolean;
    isNew: boolean;
    isFeatured: boolean;
    isPreOrder: boolean;
    isLimited: boolean;
    isSigned: boolean;
    isFirstEdition: boolean;
    tags: string[];
    format: string;
    dimensions: string;
    weight: string;
    country: string;
    awards?: string[];
}

interface FilterState {
    categories: string[];
    subCategories: string[];
    publishers: string[];
    languages: string[];
    formats: string[];
    priceRange: [number, number];
    rating: number | null;
    discount: number | null;
    stock: boolean;
    bestseller: boolean;
    newArrivals: boolean;
    featured: boolean;
    preOrder: boolean;
    limitedEdition: boolean;
    signed: boolean;
    firstEdition: boolean;
    yearRange: [number, number];
    pageRange: [number, number];
    tags: string[];
    countries: string[];
}

interface SortOption {
    label: string;
    value: string;
    icon: any;
}

/* ═══════════════════════════════════════════════
   CONSTANTS & MOCK DATA
═══════════════════════════════════════════════ */

// Categories Tree
const CATEGORIES = [
    {
        id: "islamic",
        name: "ইসলামিক বই",
        icon: MousePointerSquareDashed,
        count: 1250,
        subCategories: [
            { id: "quran", name: "কুরআন ও তাফসীর", count: 320, icon: BookMarked },
            { id: "hadith", name: "হাদিস", count: 280, icon: ScrollText },
            { id: "fiqh", name: "ফিকহ", count: 195, icon: Scale },
            { id: "seerah", name: "সীরাত", count: 145, icon: Feather },
            { id: "islamic-history", name: "ইসলামি ইতিহাস", count: 210, icon: Landmark },
            { id: "dua", name: "দোয়া ও যিকির", count: 100, icon: HeartHandshake },
        ],
    },
    {
        id: "literature",
        name: "সাহিত্য",
        icon: BookOpen,
        count: 2340,
        subCategories: [
            { id: "novel", name: "উপন্যাস", count: 890, icon: Notebook },
            { id: "story", name: "গল্প", count: 450, icon: ScrollText },
            { id: "poetry", name: "কবিতা", count: 320, icon: Feather },
            { id: "drama", name: "নাটক", count: 180, icon: MarsStroke },
            { id: "essay", name: "প্রবন্ধ", count: 250, icon: FileText },
            { id: "biography", name: "জীবনী", count: 250, icon: Users },
        ],
    },
    {
        id: "academic",
        name: "একাডেমিক",
        icon: GraduationCap,
        count: 1850,
        subCategories: [
            { id: "science", name: "বিজ্ঞান", count: 420, icon: Atom },
            { id: "math", name: "গণিত", count: 280, icon: Binary },
            { id: "physics", name: "পদার্থবিজ্ঞান", count: 190, icon: Atom },
            { id: "chemistry", name: "রসায়ন", count: 170, icon: FlaskConical },
            { id: "biology", name: "জীববিজ্ঞান", count: 230, icon: Microscope },
            { id: "history", name: "ইতিহাস", count: 310, icon: Landmark },
            { id: "geography", name: "ভূগোল", count: 150, icon: Globe2 },
            { id: "economics", name: "অর্থনীতি", count: 100, icon: Coins },
        ],
    },
    {
        id: "children",
        name: "শিশুতোষ",
        icon: Heart,
        count: 980,
        subCategories: [
            { id: "baby", name: "শিশু শিক্ষা", count: 280, icon: Baby },
            { id: "kids-story", name: "ছোটদের গল্প", count: 350, icon: BookOpen },
            { id: "rhymes", name: "ছড়া", count: 150, icon: Music },
            { id: "coloring", name: "রং করা", count: 120, icon: Paintbrush },
            { id: "activity", name: "এক্টিভিটি", count: 80, icon: Puzzle },
        ],
    },
    {
        id: "self-help",
        name: "সেলফ হেল্প",
        icon: TrendingUp,
        count: 560,
        subCategories: [
            { id: "motivation", name: "মোটিভেশন", count: 180, icon: Zap },
            { id: "leadership", name: "নেতৃত্ব", count: 120, icon: Crown },
            { id: "success", name: "সফলতা", count: 140, icon: Trophy },
            { id: "psychology", name: "মনোবিজ্ঞান", count: 120, icon: Brain },
        ],
    },
    {
        id: "fiction",
        name: "ফিকশন",
        icon: Sparkles,
        count: 1450,
        subCategories: [
            { id: "science-fiction", name: "সায়েন্স ফিকশন", count: 280, icon: Rocket },
            { id: "fantasy", name: "ফ্যান্টাসি", count: 320, icon: DraftingCompass },
            { id: "mystery", name: "রহস্য", count: 250, icon: Puzzle },
            { id: "thriller", name: "থ্রিলার", count: 290, icon: Zap },
            { id: "romance", name: "রোমান্স", count: 310, icon: Heart },
        ],
    },
];

// Publishers
const PUBLISHERS = [
    { id: "makhtaba", name: "মাকতাবাতুল আসলাফ", count: 450 },
    { id: "adarsha", name: "আদর্শ প্রকাশনী", count: 380 },
    { id: "somoy", name: "সময় প্রকাশন", count: 520 },
    { id: "firsta", name: "ফার্স্টা বুকস", count: 290 },
    { id: "anupom", name: "অনুপম প্রকাশনী", count: 340 },
    { id: "kakoli", name: "কাকলী প্রকাশনী", count: 210 },
    { id: "shikha", name: "শিখা প্রকাশনী", count: 180 },
    { id: "prothoma", name: "প্রথমা প্রকাশন", count: 620 },
    { id: "bengal", name: "বেঙ্গল পাবলিকেশন", count: 280 },
    { id: "university", name: "ইউনিভার্সিটি প্রেস", count: 390 },
];

// Languages
const LANGUAGES = [
    { id: "bengali", name: "বাংলা", count: 4250 },
    { id: "english", name: "ইংরেজি", count: 1850 },
    { id: "arabic", name: "আরবি", count: 520 },
    { id: "urdu", name: "উর্দু", count: 180 },
    { id: "hindi", name: "হিন্দি", count: 120 },
    { id: "french", name: "ফরাসি", count: 80 },
];

// Formats
const FORMATS = [
    { id: "hardcover", name: "হার্ডকভার", icon: BookOpen, count: 3250 },
    { id: "paperback", name: "পেপারব্যাক", icon: BookOpen, count: 4120 },
    { id: "pocket", name: "পকেট সাইজ", icon: BookOpen, count: 890 },
    { id: "ebook", name: "ই-বুক", icon: BookOpen, count: 1250 },
    { id: "audio", name: "অডিও বুক", icon: Headphones, count: 320 },
    { id: "box-set", name: "বক্স সেট", icon: Package, count: 180 },
    { id: "limited", name: "লিমিটেড সংস্করণ", icon: GemIcon, count: 95 },
];

// Sort Options
const SORT_OPTIONS: SortOption[] = [
    { label: "সর্বাধিক প্রাসঙ্গিক", value: "relevance", icon: Sparkles },
    { label: "সর্বাধিক বিক্রিত", value: "bestselling", icon: TrendingUp },
    { label: "সর্বনিম্ন মূল্য", value: "price-asc", icon: ArrowUpDown },
    { label: "সর্বোচ্চ মূল্য", value: "price-desc", icon: ArrowUpDown },
    { label: "সর্বোচ্চ রেটিং", value: "rating", icon: Star },
    { label: "সর্বাধিক রিভিউ", value: "reviews", icon: Users },
    { label: "নতুন আসা", value: "newest", icon: Calendar },
    { label: "পুরনো", value: "oldest", icon: Calendar },
    { label: "নাম (আ-য)", value: "name-asc", icon: ArrowUpDown },
    { label: "নাম (য-আ)", value: "name-desc", icon: ArrowUpDown },
];

// Tags
const TAGS = [
    { id: "bestseller", name: "বেস্টসেলার", icon: Trophy, color: "amber" },
    { id: "new", name: "নতুন", icon: Sparkles, color: "blue" },
    { id: "limited", name: "লিমিটেড", icon: GemIcon, color: "purple" },
    { id: "signed", name: "স্বাক্ষরিত", icon: Pen, color: "green" },
    { id: "first-edition", name: "প্রথম সংস্করণ", icon: Crown, color: "gold" },
    { id: "award-winning", name: "পুরস্কারপ্রাপ্ত", icon: Award, color: "red" },
    { id: "pre-order", name: "প্রি-অর্ডার", icon: Rocket, color: "orange" },
    { id: "discounted", name: "ছাড়", icon: Percent, color: "emerald" },
];

// Generate mock books
const generateBooks = (count: number): Book[] => {
    const books: Book[] = [];
    const categories = CATEGORIES.flatMap(c =>
        c.subCategories.map(sc => ({ main: c.name, sub: sc.name }))
    );

    for (let i = 1; i <= count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const publisher = PUBLISHERS[Math.floor(Math.random() * PUBLISHERS.length)];
        const language = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
        const format = FORMATS[Math.floor(Math.random() * FORMATS.length)];
        const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 5 : 0;
        const rating = (Math.random() * 2) + 3; // 3-5
        const reviewCount = Math.floor(Math.random() * 500) + 10;
        const stockCount = Math.floor(Math.random() * 100);
        const soldCount = Math.floor(Math.random() * 1000) + 100;
        const year = Math.floor(Math.random() * 10) + 2015;
        const pages = Math.floor(Math.random() * 400) + 100;

        books.push({
            id: i,
            title: `বইয়ের নাম ${i} - ${category.sub}`,
            author: `লেখক ${Math.floor(Math.random() * 50) + 1}`,
            price: Math.floor(Math.random() * 800) + 200,
            originalPrice: Math.floor(Math.random() * 1200) + 400,
            rating: Number(rating.toFixed(1)),
            reviewCount,
            image: `https://images.unsplash.com/photo-${[
                "1544716278-ca5e3f4abd8c",
                "1589998059171-988d887df646",
                "1526243741027-444d633d7365",
                "1532012197267-da84d127e765",
                "1456513080510-7bf3a84b82f8",
                "1495440636094-8c0bc4e9c5d1",
                "1516979187457-5abb4500b0a5",
                "1524995999526-46c3d5f0c1f1",
                "1535905559758-ffcdb9f5a9e5",
                "1481625063339-e3292b65686b",
            ][i % 10]}?w=400&q=80`,
            category: category.main,
            subCategory: category.sub,
            publisher: publisher.name,
            language: language.name,
            pages,
            publicationYear: year,
            isbn: `978-984-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10)}`,
            inStock: stockCount > 0,
            stockCount,
            soldCount,
            discount,
            isBestseller: soldCount > 500,
            isNew: year > 2023,
            isFeatured: rating > 4.5,
            isPreOrder: year > 2024,
            isLimited: stockCount < 10,
            isSigned: Math.random() > 0.9,
            isFirstEdition: year < 2018 && Math.random() > 0.8,
            tags: [
                ...(soldCount > 500 ? ["bestseller"] : []),
                ...(year > 2023 ? ["new"] : []),
                ...(stockCount < 10 ? ["limited"] : []),
                ...(Math.random() > 0.9 ? ["signed"] : []),
                ...(year < 2018 && Math.random() > 0.8 ? ["first-edition"] : []),
                ...(rating > 4.8 ? ["award-winning"] : []),
                ...(year > 2024 ? ["pre-order"] : []),
                ...(discount > 20 ? ["discounted"] : []),
            ],
            format: format.name,
            dimensions: `${Math.floor(Math.random() * 10) + 12}cm x ${Math.floor(Math.random() * 8) + 15}cm`,
            weight: `${Math.floor(Math.random() * 500) + 200}gm`,
            country: ["বাংলাদেশ", "ভারত", "পাকিস্তান", "যুক্তরাজ্য", "মার্কিন যুক্তরাষ্ট্র"][Math.floor(Math.random() * 5)],
            awards: rating > 4.9 ? ["বাংলা একাডেমি পুরস্কার", "মাসওয়ালা বুক অ্যাওয়ার্ড"].slice(0, Math.floor(Math.random() * 2) + 1) : undefined,
        });
    }
    return books;
};

const BOOKS = generateBooks(200);

/* ═══════════════════════════════════════════════
   PRICE RANGE SLIDER COMPONENT
═══════════════════════════════════════════════ */
const PriceRangeSlider = ({ min, max, value, onChange }: { min: number; max: number; value: [number, number]; onChange: (value: [number, number]) => void }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), localValue[1] - 1);
        setLocalValue([newMin, localValue[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), localValue[0] + 1);
        setLocalValue([localValue[0], newMax]);
    };

    const handleChangeComplete = () => {
        onChange(localValue);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">৳{localValue[0]}</span>
                <span className="text-xs text-gray-400">-</span>
                <span className="text-sm font-bold text-gray-900">৳{localValue[1]}</span>
            </div>
            <div className="relative h-2">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
                <div
                    className="absolute h-2 bg-amber-500 rounded-full"
                    style={{
                        left: `${((localValue[0] - min) / (max - min)) * 100}%`,
                        right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
                    }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={localValue[0]}
                    onChange={handleMinChange}
                    onMouseUp={handleChangeComplete}
                    onTouchEnd={handleChangeComplete}
                    className="absolute w-full -top-1 h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={localValue[1]}
                    onChange={handleMaxChange}
                    onMouseUp={handleChangeComplete}
                    onTouchEnd={handleChangeComplete}
                    className="absolute w-full -top-1 h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   RATING FILTER COMPONENT
═══════════════════════════════════════════════ */
const RatingFilter = ({ value, onChange }: { value: number | null; onChange: (rating: number | null) => void }) => {
    const ratings = [5, 4, 3, 2, 1];

    return (
        <div className="space-y-2">
            {ratings.map((rating) => (
                <label key={rating} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="rating"
                            checked={value === rating}
                            onChange={() => onChange(rating)}
                            className="w-4 h-4 accent-amber-500"
                        />
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={cn(
                                        i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">& up</span>
                </label>
            ))}
            {value && (
                <button
                    onClick={() => onChange(null)}
                    className="text-xs text-amber-600 hover:text-amber-700 mt-2"
                >
                    Clear
                </button>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════
   DISCOUNT FILTER COMPONENT
═══════════════════════════════════════════════ */
const DiscountFilter = ({ value, onChange }: { value: number | null; onChange: (discount: number | null) => void }) => {
    const discounts = [10, 20, 30, 40, 50];

    return (
        <div className="space-y-2">
            {discounts.map((discount) => (
                <label key={discount} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="discount"
                        checked={value === discount}
                        onChange={() => onChange(discount)}
                        className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-sm text-gray-700">{discount}% বা তার বেশি</span>
                </label>
            ))}
            {value && (
                <button
                    onClick={() => onChange(null)}
                    className="text-xs text-amber-600 hover:text-amber-700 mt-2"
                >
                    Clear
                </button>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════
   CATEGORY TREE COMPONENT
═══════════════════════════════════════════════ */
const CategoryTree = ({
    categories,
    selected,
    onSelect,
    expanded,
    onToggle
}: {
    categories: typeof CATEGORIES;
    selected: string[];
    onSelect: (categoryId: string) => void;
    expanded: string[];
    onToggle: (categoryId: string) => void;
}) => {
    return (
        <div className="space-y-2">
            {categories.map((category) => {
                const Icon = category.icon;
                const isExpanded = expanded.includes(category.id);
                const isSelected = selected.includes(category.id);
                const hasChildren = category.subCategories.length > 0;

                return (
                    <div key={category.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                            {hasChildren && (
                                <button
                                    onClick={() => onToggle(category.id)}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                            )}
                            <label className="flex items-center gap-2 flex-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onSelect(category.id)}
                                    className="w-4 h-4 accent-amber-500 rounded"
                                />
                                <Icon size={16} className="text-amber-500" />
                                <span className="text-sm text-gray-700 flex-1">{category.name}</span>
                                <span className="text-xs text-gray-400">{category.count}</span>
                            </label>
                        </div>

                        {isExpanded && hasChildren && (
                            <div className="ml-8 space-y-1 mt-1">
                                {category.subCategories.map((sub) => {
                                    const SubIcon = sub.icon;
                                    const isSubSelected = selected.includes(sub.id);
                                    return (
                                        <label key={sub.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isSubSelected}
                                                onChange={() => onSelect(sub.id)}
                                                className="w-3.5 h-3.5 accent-amber-500 rounded"
                                            />
                                            <SubIcon size={14} className="text-gray-400" />
                                            <span className="text-xs text-gray-600 flex-1">{sub.name}</span>
                                            <span className="text-[10px] text-gray-400">{sub.count}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

/* ═══════════════════════════════════════════════
   BOOK CARD COMPONENT
═══════════════════════════════════════════════ */
const BookCard = ({ book, viewMode }: { book: Book; viewMode: "grid" | "list" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const discount = book.discount > 0 ? book.discount : Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
    const savings = book.originalPrice - book.price;

    if (viewMode === "list") {
        return (
            <div
                className="group relative bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex">
                    {/* Image Section */}
                    <div className="relative w-48 h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
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
                        <div className="flex items-center justify-between mt-auto">
                            <div>
                                <div className="flex items-center gap-2">
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
                                                tag === "bestseller" && "bg-amber-100 text-amber-700",
                                                tag === "new" && "bg-blue-100 text-blue-700",
                                                tag === "limited" && "bg-purple-100 text-purple-700",
                                                tag === "signed" && "bg-green-100 text-green-700",
                                                tag === "first-edition" && "bg-yellow-100 text-yellow-700",
                                                tag === "award-winning" && "bg-red-100 text-red-700",
                                                tag === "pre-order" && "bg-orange-100 text-orange-700",
                                                tag === "discounted" && "bg-emerald-100 text-emerald-700",
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
                                        tag === "bestseller" && "bg-amber-100 text-amber-700",
                                        tag === "new" && "bg-blue-100 text-blue-700",
                                        tag === "limited" && "bg-purple-100 text-purple-700",
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

/* ═══════════════════════════════════════════════
   MAIN SHOP PAGE
═══════════════════════════════════════════════ */
export default function ShopPage() {
    // View State
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter State
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        subCategories: [],
        publishers: [],
        languages: [],
        formats: [],
        priceRange: [200, 1000],
        rating: null,
        discount: null,
        stock: false,
        bestseller: false,
        newArrivals: false,
        featured: false,
        preOrder: false,
        limitedEdition: false,
        signed: false,
        firstEdition: false,
        yearRange: [2015, 2025],
        pageRange: [100, 500],
        tags: [],
        countries: [],
    });

    // UI State
    const [expandedCategories, setExpandedCategories] = useState<string[]>(CATEGORIES.map(c => c.id));
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<string>("relevance");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(24);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [showQuickView, setShowQuickView] = useState(false);

    // Get min/max values
    const minPrice = Math.min(...BOOKS.map(b => b.price));
    const maxPrice = Math.max(...BOOKS.map(b => b.price));
    const minYear = Math.min(...BOOKS.map(b => b.publicationYear));
    const maxYear = Math.max(...BOOKS.map(b => b.publicationYear));
    const minPages = Math.min(...BOOKS.map(b => b.pages));
    const maxPages = Math.max(...BOOKS.map(b => b.pages));

    // Filter books
    const filteredBooks = useMemo(() => {
        return BOOKS.filter(book => {
            // Search
            if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Categories
            if (filters.categories.length > 0 && !filters.categories.includes(book.category)) {
                return false;
            }

            // SubCategories
            if (filters.subCategories.length > 0 && !filters.subCategories.includes(book.subCategory)) {
                return false;
            }

            // Publishers
            if (filters.publishers.length > 0 && !filters.publishers.includes(book.publisher)) {
                return false;
            }

            // Languages
            if (filters.languages.length > 0 && !filters.languages.includes(book.language)) {
                return false;
            }

            // Formats
            if (filters.formats.length > 0 && !filters.formats.includes(book.format)) {
                return false;
            }

            // Price Range
            if (book.price < filters.priceRange[0] || book.price > filters.priceRange[1]) {
                return false;
            }

            // Rating
            if (filters.rating && book.rating < filters.rating) {
                return false;
            }

            // Discount
            if (filters.discount) {
                const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
                if (discount < filters.discount) {
                    return false;
                }
            }

            // Stock
            if (filters.stock && !book.inStock) {
                return false;
            }

            // Special Filters
            if (filters.bestseller && !book.isBestseller) return false;
            if (filters.newArrivals && !book.isNew) return false;
            if (filters.featured && !book.isFeatured) return false;
            if (filters.preOrder && !book.isPreOrder) return false;
            if (filters.limitedEdition && !book.isLimited) return false;
            if (filters.signed && !book.isSigned) return false;
            if (filters.firstEdition && !book.isFirstEdition) return false;

            // Year Range
            if (book.publicationYear < filters.yearRange[0] || book.publicationYear > filters.yearRange[1]) {
                return false;
            }

            // Pages Range
            if (book.pages < filters.pageRange[0] || book.pages > filters.pageRange[1]) {
                return false;
            }

            // Tags
            if (filters.tags.length > 0 && !filters.tags.some(tag => book.tags.includes(tag))) {
                return false;
            }

            // Countries
            if (filters.countries.length > 0 && !filters.countries.includes(book.country)) {
                return false;
            }

            return true;
        });
    }, [filters, searchQuery]);

    // Sort books
    const sortedBooks = useMemo(() => {
        const sorted = [...filteredBooks];

        switch (sortBy) {
            case "bestselling":
                sorted.sort((a, b) => b.soldCount - a.soldCount);
                break;
            case "price-asc":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case "reviews":
                sorted.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case "newest":
                sorted.sort((a, b) => b.publicationYear - a.publicationYear);
                break;
            case "oldest":
                sorted.sort((a, b) => a.publicationYear - b.publicationYear);
                break;
            case "name-asc":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "name-desc":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // relevance - default order
                break;
        }

        return sorted;
    }, [filteredBooks, sortBy]);

    // Pagination
    const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
    const paginatedBooks = sortedBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Active Filter Count
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.categories.length) count += filters.categories.length;
        if (filters.subCategories.length) count += filters.subCategories.length;
        if (filters.publishers.length) count += filters.publishers.length;
        if (filters.languages.length) count += filters.languages.length;
        if (filters.formats.length) count += filters.formats.length;
        if (filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice) count++;
        if (filters.rating) count++;
        if (filters.discount) count++;
        if (filters.stock) count++;
        if (filters.bestseller) count++;
        if (filters.newArrivals) count++;
        if (filters.featured) count++;
        if (filters.preOrder) count++;
        if (filters.limitedEdition) count++;
        if (filters.signed) count++;
        if (filters.firstEdition) count++;
        if (filters.yearRange[0] > minYear || filters.yearRange[1] < maxYear) count++;
        if (filters.pageRange[0] > minPages || filters.pageRange[1] < maxPages) count++;
        if (filters.tags.length) count += filters.tags.length;
        if (filters.countries.length) count += filters.countries.length;
        return count;
    }, [filters, minPrice, maxPrice, minYear, maxYear, minPages, maxPages]);

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            categories: [],
            subCategories: [],
            publishers: [],
            languages: [],
            formats: [],
            priceRange: [minPrice, maxPrice],
            rating: null,
            discount: null,
            stock: false,
            bestseller: false,
            newArrivals: false,
            featured: false,
            preOrder: false,
            limitedEdition: false,
            signed: false,
            firstEdition: false,
            yearRange: [minYear, maxYear],
            pageRange: [minPages, maxPages],
            tags: [],
            countries: [],
        });
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-white max-w-7xl mx-auto ">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <BookOpen className="text-amber-500" size={24} />
                            <span className="text-xl font-black text-gray-900">Reading </span>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="৫০,০০০+ বই খুঁজুন..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto px-4 py-8">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex items-center gap-3 mb-4">
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="flex-1 h-12 bg-gray-100 rounded-xl flex items-center justify-center gap-2 font-bold text-gray-700"
                    >
                        <Filter size={18} />
                        ফিল্টার
                        {activeFilterCount > 0 && (
                            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 h-12 bg-gray-100 rounded-xl px-4 text-sm font-bold text-gray-700 focus:outline-none"
                    >
                        {SORT_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <div className={cn(
                        "hidden lg:block w-80 flex-shrink-0 space-y-6",
                        isFilterOpen ? "block" : "hidden"
                    )}>
                        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-4 scrollbar-thin scrollbar-thumb-gray-200">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                    <Filter size={18} className="text-amber-500" />
                                    ফিল্টার
                                </h2>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={resetFilters}
                                        className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1"
                                    >
                                        <RefreshCw size={12} />
                                        সব清除
                                    </button>
                                )}
                            </div>

                            {/* Search */}
                            <div className="mb-6 lg:hidden">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="খুঁজুন..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Layers size={16} className="text-amber-500" />
                                    ক্যাটাগরি
                                </h3>
                                <CategoryTree
                                    categories={CATEGORIES}
                                    selected={[...filters.categories, ...filters.subCategories]}
                                    onSelect={(id) => {
                                        const isMain = CATEGORIES.some(c => c.id === id);
                                        if (isMain) {
                                            setFilters(prev => ({
                                                ...prev,
                                                categories: prev.categories.includes(id)
                                                    ? prev.categories.filter(c => c !== id)
                                                    : [...prev.categories, id]
                                            }));
                                        } else {
                                            setFilters(prev => ({
                                                ...prev,
                                                subCategories: prev.subCategories.includes(id)
                                                    ? prev.subCategories.filter(s => s !== id)
                                                    : [...prev.subCategories, id]
                                            }));
                                        }
                                    }}
                                    expanded={expandedCategories}
                                    onToggle={(id) => {
                                        setExpandedCategories(prev =>
                                            prev.includes(id)
                                                ? prev.filter(c => c !== id)
                                                : [...prev, id]
                                        );
                                    }}
                                />
                            </div>

                            {/* Price Range */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Tag size={16} className="text-amber-500" />
                                    মূল্য সীমা
                                </h3>
                                <PriceRangeSlider
                                    min={minPrice}
                                    max={maxPrice}
                                    value={filters.priceRange}
                                    onChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                                />
                            </div>

                            {/* Rating */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Star size={16} className="text-amber-500" />
                                    রেটিং
                                </h3>
                                <RatingFilter
                                    value={filters.rating}
                                    onChange={(rating) => setFilters(prev => ({ ...prev, rating }))}
                                />
                            </div>

                            {/* Discount */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Percent size={16} className="text-amber-500" />
                                    ছাড়
                                </h3>
                                <DiscountFilter
                                    value={filters.discount}
                                    onChange={(discount) => setFilters(prev => ({ ...prev, discount }))}
                                />
                            </div>

                            {/* Publishers */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Building size={16} className="text-amber-500" />
                                    প্রকাশক
                                </h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {PUBLISHERS.map((publisher) => (
                                        <label key={publisher.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.publishers.includes(publisher.name)}
                                                    onChange={(e) => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            publishers: e.target.checked
                                                                ? [...prev.publishers, publisher.name]
                                                                : prev.publishers.filter(p => p !== publisher.name)
                                                        }));
                                                    }}
                                                    className="w-4 h-4 accent-amber-500 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{publisher.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{publisher.count}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Globe size={16} className="text-amber-500" />
                                    ভাষা
                                </h3>
                                <div className="space-y-2">
                                    {LANGUAGES.map((language) => (
                                        <label key={language.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.languages.includes(language.name)}
                                                    onChange={(e) => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            languages: e.target.checked
                                                                ? [...prev.languages, language.name]
                                                                : prev.languages.filter(l => l !== language.name)
                                                        }));
                                                    }}
                                                    className="w-4 h-4 accent-amber-500 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{language.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{language.count}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Formats */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <BookOpen size={16} className="text-amber-500" />
                                    ফরম্যাট
                                </h3>
                                <div className="space-y-2">
                                    {FORMATS.map((format) => (
                                        <label key={format.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.formats.includes(format.name)}
                                                    onChange={(e) => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            formats: e.target.checked
                                                                ? [...prev.formats, format.name]
                                                                : prev.formats.filter(f => f !== format.name)
                                                        }));
                                                    }}
                                                    className="w-4 h-4 accent-amber-500 rounded"
                                                />
                                                <format.icon size={14} className="text-gray-400" />
                                                <span className="text-sm text-gray-700">{format.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{format.count}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Special Filters */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Sparkles size={16} className="text-amber-500" />
                                    বিশেষ
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        { key: "stock", label: "স্টকে আছে", icon: Check },
                                        { key: "bestseller", label: "বেস্টসেলার", icon: Trophy },
                                        { key: "newArrivals", label: "নতুন আসা", icon: Sparkles },
                                        { key: "featured", label: "বিশেষ সংকলন", icon: Star },
                                        { key: "preOrder", label: "প্রি-অর্ডার", icon: Rocket },
                                        { key: "limitedEdition", label: "লিমিটেড সংস্করণ", icon: GemIcon },
                                        { key: "signed", label: "স্বাক্ষরিত", icon: Pen },
                                        { key: "firstEdition", label: "প্রথম সংস্করণ", icon: Crown },
                                    ].map(({ key, label, icon: Icon }) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters[key as keyof FilterState] as boolean}
                                                onChange={(e) => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        [key]: e.target.checked
                                                    }));
                                                }}
                                                className="w-4 h-4 accent-amber-500 rounded"
                                            />
                                            <Icon size={14} className="text-gray-400" />
                                            <span className="text-sm text-gray-700">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Publication Year */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar size={16} className="text-amber-500" />
                                    প্রকাশকাল
                                </h3>
                                <PriceRangeSlider
                                    min={minYear}
                                    max={maxYear}
                                    value={filters.yearRange}
                                    onChange={(value) => setFilters(prev => ({ ...prev, yearRange: value }))}
                                />
                            </div>

                            {/* Pages */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Layers size={16} className="text-amber-500" />
                                    পৃষ্ঠা সংখ্যা
                                </h3>
                                <PriceRangeSlider
                                    min={minPages}
                                    max={maxPages}
                                    value={filters.pageRange}
                                    onChange={(value) => setFilters(prev => ({ ...prev, pageRange: value }))}
                                />
                            </div>

                            {/* Tags */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Tag size={16} className="text-amber-500" />
                                    ট্যাগ
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {TAGS.map((tag) => {
                                        const Icon = tag.icon;
                                        const isSelected = filters.tags.includes(tag.id);
                                        return (
                                            <button
                                                key={tag.id}
                                                onClick={() => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        tags: isSelected
                                                            ? prev.tags.filter(t => t !== tag.id)
                                                            : [...prev.tags, tag.id]
                                                    }));
                                                }}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all",
                                                    isSelected
                                                        ? `bg-${tag.color}-100 text-${tag.color}-700`
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                )}
                                            >
                                                <Icon size={10} />
                                                {tag.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Active Filters */}
                            {activeFilterCount > 0 && (
                                <div className="bg-amber-50 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-amber-800 mb-2">সক্রিয় ফিল্টার</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {filters.categories.map(cat => (
                                            <span key={cat} className="text-[10px] bg-white text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                {cat}
                                                <X size={8} className="cursor-pointer" onClick={() => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        categories: prev.categories.filter(c => c !== cat)
                                                    }));
                                                }} />
                                            </span>
                                        ))}
                                        {filters.subCategories.map(sub => (
                                            <span key={sub} className="text-[10px] bg-white text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                {sub}
                                                <X size={8} className="cursor-pointer" onClick={() => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        subCategories: prev.subCategories.filter(s => s !== sub)
                                                    }));
                                                }} />
                                            </span>
                                        ))}
                                        {filters.rating && (
                                            <span className="text-[10px] bg-white text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                {filters.rating}+ স্টার
                                                <X size={8} className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, rating: null }))} />
                                            </span>
                                        )}
                                        {filters.discount && (
                                            <span className="text-[10px] bg-white text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                {filters.discount}%+ ছাড়
                                                <X size={8} className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, discount: null }))} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Filter Drawer */}
                    {isMobileFilterOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
                            <div className="absolute top-0 right-0 bottom-0 w-80 bg-white overflow-y-auto p-6 animate-slideIn">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                        <Filter size={18} className="text-amber-500" />
                                        ফিল্টার
                                    </h2>
                                    <button onClick={() => setIsMobileFilterOpen(false)}>
                                        <X size={20} className="text-gray-500" />
                                    </button>
                                </div>

                                {/* Copy all filter sections from desktop here */}
                                {/* ... */}

                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full h-12 bg-amber-500 text-white rounded-xl font-bold mt-6"
                                >
                                    প্রয়োগ করুন
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 px-4 h-10 bg-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    <Filter size={16} />
                                    ফিল্টার
                                    {activeFilterCount > 0 && (
                                        <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-10 bg-gray-100 rounded-xl px-4 text-sm font-bold text-gray-700 focus:outline-none"
                                >
                                    {SORT_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">
                                    {sortedBooks.length} টি বই পাওয়া গেছে
                                </span>
                                <div className="flex items-center gap-1 border border-gray-200 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            viewMode === "grid" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        <Grid3x3 size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            viewMode === "list" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Stats - Mobile */}
                        <div className="lg:hidden flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500">
                                {sortedBooks.length} টি বই
                            </span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="h-8 bg-gray-100 rounded-lg px-2 text-xs font-bold text-gray-700 focus:outline-none"
                            >
                                <option value={12}>১২টি</option>
                                <option value={24}>২৪টি</option>
                                <option value={36}>৩৬টি</option>
                                <option value={48}>৪৮টি</option>
                            </select>
                        </div>

                        {/* Products */}
                        {paginatedBooks.length === 0 ? (
                            <div className="text-center py-20">
                                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">কোন বই পাওয়া যায়নি</h3>
                                <p className="text-gray-500 mb-6">আপনার ফিল্টার অনুযায়ী কোনো বই নেই</p>
                                <button
                                    onClick={resetFilters}
                                    className="px-6 h-12 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors"
                                >
                                    ফিল্টার রিসেট করুন
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={cn(
                                    "gap-4",
                                    viewMode === "grid"
                                        ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                                        : "space-y-4"
                                )}>
                                    {paginatedBooks.map(book => (
                                        <BookCard key={book.id} book={book} viewMode={viewMode} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1;
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 2 && page <= currentPage + 2)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={cn(
                                                            "min-w-[40px] h-10 rounded-xl font-bold transition-colors",
                                                            currentPage === page
                                                                ? "bg-amber-500 text-white"
                                                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                                        )}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (
                                                page === currentPage - 3 ||
                                                page === currentPage + 3
                                            ) {
                                                return <span key={page} className="text-gray-400">...</span>;
                                            }
                                            return null;
                                        })}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {showQuickView && selectedBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowQuickView(false)} />
                    <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Quick view content */}
                        <button
                            onClick={() => setShowQuickView(false)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <X size={16} />
                        </button>
                        {/* Add quick view details here */}
                    </div>
                </div>
            )}

            <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #d1d1d1;
                    border-radius: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #a1a1a1;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}