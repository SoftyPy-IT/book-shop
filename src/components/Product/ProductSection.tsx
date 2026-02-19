import ProductCard from "./ProductCard";
import { ChevronRight } from "lucide-react";

interface ProductSectionProps {
    title: string;
    products: Array<{
        id: string;
        title: string;
        author: string;
        price: number;
        originalPrice: number;
        rating: number;
        reviews: number;
        discount: number;
        image: string;
    }>;
}

export default function ProductSection({ title, products }: ProductSectionProps) {
    return (
        <section className="py-12 border-b border-border">
            <div className="container">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif font-bold text-[#1E3A5F]">
                        {title}
                    </h2>
                    <a
                        href="#"
                        className="flex items-center gap-2 text-[#1E3A5F] hover:text-[#DC2626] transition font-medium"
                    >
                        আরও দেখুন
                        <ChevronRight className="w-5 h-5" />
                    </a>
                </div>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
                    <button className="px-4 py-2 bg-[#F5F1E8] text-[#1E3A5F] rounded-full hover:bg-[#1E3A5F] hover:text-white transition text-sm font-medium">
                        সব
                    </button>
                    <button className="px-4 py-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition text-sm font-medium">
                        শিক্ষা বই
                    </button>
                    <button className="px-4 py-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition text-sm font-medium">
                        উপন্যাস
                    </button>
                    <button className="px-4 py-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition text-sm font-medium">
                        গল্প
                    </button>
                    <button className="px-4 py-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition text-sm font-medium">
                        কবিতা
                    </button>
                    <button className="px-4 py-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition text-sm font-medium">
                        ইতিহাস
                    </button>
                    <button className="px-4 py-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition text-sm font-medium">
                        বিজ্ঞান
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
