/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockAuthors = [
    { id: 1, name: 'রুপ পান', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'সীমা শিল্পী', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'নিফিন্ড পারমিতা', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'আয়েশা সালিম', image: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'করিম ইসমাইল', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'নাজমুল হোসাইন', image: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'শারিয়া নাবা', image: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'ফাতিমা আয়েশা', image: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'নাজমুল হোসাইন', image: 'https://i.pravatar.cc/150?img=6' },
    { id: 10, name: 'শারিয়া নাবা', image: 'https://i.pravatar.cc/150?img=7' },
    { id: 11, name: 'ফাতিমা আয়েশা', image: 'https://i.pravatar.cc/150?img=8' },
];

interface CarouselProps {
    children: React.ReactNode;
    maxVisible?: number;
}

function Carousel({ children, maxVisible = 6 }: CarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = 300;
            const currentScroll = containerRef.current.scrollLeft;

            if (direction === 'left') {
                containerRef.current.scrollTo({
                    left: currentScroll - scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                containerRef.current.scrollTo({
                    left: currentScroll + scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth px-12 hide-scrollbar"
            >
                {children}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
        </div>
    );
}

function AuthorCard({ author }: { author: (typeof mockAuthors)[0] }) {
    return (
        <div className="flex-shrink-0 text-center w-[120px]">
            <img
                src={author.image}
                alt={author.name}
                className="w-30 h-30 rounded-full mx-auto mb-2 object-cover border-4 border-gray-200"
            />
            <p className="text-xs font-medium text-gray-800 text-center break-words">
                {author.name}
            </p>
        </div>
    );
}

export default function AuthorSection({ title = "বেস্ট লেখকগণ " }: { title?: string }) {
    return (
        <div className="bg-white max-w-7xl mx-auto py-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    — {title} —
                </h2>

                <div className="mb-6">
                    <Carousel>
                        {mockAuthors.map((author) => (
                            <AuthorCard key={`${author.id}-${author.name}`} author={author} />
                        ))}
                    </Carousel>
                </div>

                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full">
                    সব্বাই প্রোডাক্ট
                </Button>
            </div>
        </div>
    );
}