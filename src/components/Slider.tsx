'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import slider from '@/assets/slider/slider.webp'
import slider2 from '@/assets/slider/slider2.webp'

interface SlideData {
    id: number
    image: string
}

const slides: SlideData[] = [
    { id: 1, image: slider.src },
    { id: 2, image: slider2.src },
    { id: 3, image: slider.src }
]

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handlePrevSlide = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentSlide(prev =>
            prev === 0 ? slides.length - 1 : prev - 1
        )
        setTimeout(() => setIsTransitioning(false), 700)
    }, [isTransitioning])

    const handleNextSlide = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentSlide(prev =>
            prev === slides.length - 1 ? 0 : prev + 1
        )
        setTimeout(() => setIsTransitioning(false), 700)
    }, [isTransitioning])

    useEffect(() => {
        const timer = setInterval(handleNextSlide, 5000)
        return () => clearInterval(timer)
    }, [handleNextSlide])

    return (
        <div className="relative w-full h-96 max-w-[1380px] mx-auto  rounded-xl overflow-hidden shadow-2xl">

            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'object',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'initial',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'

                    }}
                />
            ))}

            {/* Navigation */}
            <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            >
                <ChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 w-2'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
