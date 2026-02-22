// components/shop/CategoryTree.tsx
"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/types/shop";

interface CategoryTreeProps {
    selected: string[];
    onSelect: (categoryId: string) => void;
    expanded: string[];
    onToggle: (categoryId: string) => void;
}

export const CategoryTree = ({ selected, onSelect, expanded, onToggle }: CategoryTreeProps) => {
    return (
        <div className="space-y-2">
            {CATEGORIES.map((category) => {
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