'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockPublishers = [
    { id: 1, initials: 'PP', name: 'প্রথম প্রকাশক', color: 'bg-blue-500' },
    { id: 2, initials: 'HA', name: 'হাসান প্রকাশনী', color: 'bg-orange-500' },
    { id: 3, initials: 'RH', name: 'রাহুল হোম', color: 'bg-green-500' },
    { id: 4, initials: 'SS', name: 'শামীম ও সালমা', color: 'bg-purple-500' },
    { id: 5, initials: 'MA', name: 'মোহাম্মাদী', color: 'bg-red-500' },
    { id: 6, initials: 'OP', name: 'অনন্য প্রকাশনা', color: 'bg-slate-700' },
    { id: 7, initials: 'CP', name: 'সৃজনশীল প্রকাশনী', color: 'bg-teal-500' },
    { id: 8, initials: 'SP', name: 'স্বর্ণ প্রকাশনা', color: 'bg-indigo-600' },
    { id: 6, initials: 'OP', name: 'অনন্য প্রকাশনা', color: 'bg-slate-700' },
    { id: 7, initials: 'CP', name: 'সৃজনশীল প্রকাশনী', color: 'bg-teal-500' },
    { id: 8, initials: 'SP', name: 'স্বর্ণ প্রকাশনা', color: 'bg-indigo-600' },
];

interface CarouselProps {
    children: React.ReactNode;
    maxVisible?: number;
}

function Carousel({ children, maxVisible = 8 }: CarouselProps) {
    const [scrollPos, setScrollPos] = useState(0);

    const scroll = (direction: 'left' | 'right') => {
        const container = document.getElementById('carousel-container-publishers');
        if (container) {
            const scrollAmount = 300;
            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                setScrollPos(Math.max(0, scrollPos - scrollAmount));
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                setScrollPos(scrollPos + scrollAmount);
            }
        }
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div
                id="carousel-container-publishers"
                className="flex gap-6 overflow-x-auto scroll-smooth px-12"
            >
                {children}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
                <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
        </div>
    );
}

function PublisherBadge({ publisher }: { publisher: (typeof mockPublishers)[0] }) {
    return (
        <div className="flex-shrink-0 text-center">
            <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-2 ${publisher.color} text-white font-bold text-lg`}
            >
                {publisher.initials}
            </div>
            <p className="text-xs font-medium text-gray-800 text-center">
                {publisher.name}
            </p>
        </div>
    );
}


export default function PublisherSection({ title = "বেস্ট প্রকাশক " }: { title?: string }) {
    return (
        <div className="bg-white max-w-7xl mx-auto  mt-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    — {title} —
                </h2>

                <div className="mb-6">
                    <Carousel maxVisible={8}>
                        {mockPublishers.map((publisher) => (
                            <PublisherBadge key={publisher.id} publisher={publisher} />
                        ))}
                    </Carousel>
                </div>

                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full">
                    সব্বাই পণসদ্য
                </Button>
            </div>
        </div>
    );
}