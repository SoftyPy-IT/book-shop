/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import {
    BookOpen,
    Building,
    Check,
    Crown,
    Filter,
    GemIcon,
    Globe,
    Grid3x3,
    Layers,
    List,
    Pen,
    Percent,
    RefreshCw,
    Rocket,
    Sparkles,
    Star,
    Tag,
    Trophy,
    X
} from "lucide-react";
import { useMemo, useState } from "react";

// Types
import { Book, CATEGORIES, FilterState, FORMATS, LANGUAGES, PUBLISHERS, SORT_OPTIONS, TAGS } from "@/types/shop";

// Components
import { BookCard } from "@/components/shop/BookCard";
import { CategoryTree } from "@/components/shop/CategoryTree";
import { DiscountFilter } from "@/components/shop/DiscountFilter";
import { Pagination } from "@/components/shop/Pagination";
import { PriceRangeSlider } from "@/components/shop/PriceRangeSlider";
import { RatingFilter } from "@/components/shop/RatingFilter";
import { ShopHeader } from "@/components/shop/ShopHeader";

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
        const rating = (Math.random() * 2) + 3;
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

export default function ShopPage() {
    // View State
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isFilterOpen, setIsFilterOpen] = useState(true);
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
            if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            if (filters.categories.length > 0 && !filters.categories.includes(book.category)) return false;
            if (filters.subCategories.length > 0 && !filters.subCategories.includes(book.subCategory)) return false;
            if (filters.publishers.length > 0 && !filters.publishers.includes(book.publisher)) return false;
            if (filters.languages.length > 0 && !filters.languages.includes(book.language)) return false;
            if (filters.formats.length > 0 && !filters.formats.includes(book.format)) return false;
            if (book.price < filters.priceRange[0] || book.price > filters.priceRange[1]) return false;
            if (filters.rating && book.rating < filters.rating) return false;

            if (filters.discount) {
                const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
                if (discount < filters.discount) return false;
            }

            if (filters.stock && !book.inStock) return false;
            if (filters.bestseller && !book.isBestseller) return false;
            if (filters.newArrivals && !book.isNew) return false;
            if (filters.featured && !book.isFeatured) return false;
            if (filters.preOrder && !book.isPreOrder) return false;
            if (filters.limitedEdition && !book.isLimited) return false;
            if (filters.signed && !book.isSigned) return false;
            if (filters.firstEdition && !book.isFirstEdition) return false;
            if (book.publicationYear < filters.yearRange[0] || book.publicationYear > filters.yearRange[1]) return false;
            if (book.pages < filters.pageRange[0] || book.pages > filters.pageRange[1]) return false;
            if (filters.tags.length > 0 && !filters.tags.some(tag => book.tags.includes(tag))) return false;
            if (filters.countries.length > 0 && !filters.countries.includes(book.country)) return false;

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
        <div className="min-h-screen bg-white max-w-7xl mx-auto">
            <ShopHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <div className=" px-4 py-8">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex items-center gap-3 mb-4">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
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
                        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-4 scrollbar-thin">
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

                            {/* Categories */}
                            <div className="border-b border-gray-100 pb-6 mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Layers size={16} className="text-amber-500" />
                                    ক্যাটাগরি
                                </h3>
                                <CategoryTree
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
                                {/* Copy filter sections here */}
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

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

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