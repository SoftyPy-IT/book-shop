/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MousePointerSquareDashed,
  BookMarked,
  ScrollText,
  Scale,
  Feather,
  Landmark,
  HeartHandshake,
  BookOpen,
  Notebook,
  MarsStroke,
  FileText,
  Users,
  GraduationCap,
  Atom,
  Binary,
  FlaskConical,
  Microscope,
  Globe2,
  Coins,
  Heart,
  Baby,
  Music,
  Paintbrush,
  Puzzle,
  TrendingUp,
  Zap,
  Crown,
  Trophy,
  Brain,
  Sparkles,
  Rocket,
  DraftingCompass,
  Trophy as TrophyIcon,
  Sparkles as SparklesIcon,
  GemIcon,
  Pen,
  Award,
  Percent,
  Headphones,
  Package as PackageIcon,
} from "lucide-react";

export interface Book {
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

export interface FilterState {
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

export interface SortOption {
  label: string;
  value: string;
  icon: any;
}

// Categories Tree
export const CATEGORIES = [
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
      {
        id: "islamic-history",
        name: "ইসলামি ইতিহাস",
        count: 210,
        icon: Landmark,
      },
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
      {
        id: "science-fiction",
        name: "সায়েন্স ফিকশন",
        count: 280,
        icon: Rocket,
      },
      { id: "fantasy", name: "ফ্যান্টাসি", count: 320, icon: DraftingCompass },
      { id: "mystery", name: "রহস্য", count: 250, icon: Puzzle },
      { id: "thriller", name: "থ্রিলার", count: 290, icon: Zap },
      { id: "romance", name: "রোমান্স", count: 310, icon: Heart },
    ],
  },
];

// Publishers
export const PUBLISHERS = [
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
export const LANGUAGES = [
  { id: "bengali", name: "বাংলা", count: 4250 },
  { id: "english", name: "ইংরেজি", count: 1850 },
  { id: "arabic", name: "আরবি", count: 520 },
  { id: "urdu", name: "উর্দু", count: 180 },
  { id: "hindi", name: "হিন্দি", count: 120 },
  { id: "french", name: "ফরাসি", count: 80 },
];

// Formats
export const FORMATS = [
  { id: "hardcover", name: "হার্ডকভার", icon: BookOpen, count: 3250 },
  { id: "paperback", name: "পেপারব্যাক", icon: BookOpen, count: 4120 },
  { id: "pocket", name: "পকেট সাইজ", icon: BookOpen, count: 890 },
  { id: "ebook", name: "ই-বুক", icon: BookOpen, count: 1250 },
  { id: "audio", name: "অডিও বুক", icon: Headphones, count: 320 },
  { id: "box-set", name: "বক্স সেট", icon: PackageIcon, count: 180 },
  { id: "limited", name: "লিমিটেড সংস্করণ", icon: GemIcon, count: 95 },
];

// Sort Options
export const SORT_OPTIONS: SortOption[] = [
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
export const TAGS = [
  { id: "bestseller", name: "বেস্টসেলার", icon: TrophyIcon, color: "amber" },
  { id: "new", name: "নতুন", icon: SparklesIcon, color: "blue" },
  { id: "limited", name: "লিমিটেড", icon: GemIcon, color: "purple" },
  { id: "signed", name: "স্বাক্ষরিত", icon: Pen, color: "green" },
  { id: "first-edition", name: "প্রথম সংস্করণ", icon: Crown, color: "yellow" },
  { id: "award-winning", name: "পুরস্কারপ্রাপ্ত", icon: Award, color: "red" },
  { id: "pre-order", name: "প্রি-অর্ডার", icon: Rocket, color: "orange" },
  { id: "discounted", name: "ছাড়", icon: Percent, color: "emerald" },
];

// Import for Sort Options
import { ArrowUpDown, Star, Calendar } from "lucide-react";
