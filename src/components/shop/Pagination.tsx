// components/shop/Pagination.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                            onClick={() => onPageChange(page)}
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
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};