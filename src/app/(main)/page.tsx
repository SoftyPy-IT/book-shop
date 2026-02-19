'use client'



import { CategorySlider } from '@/components/Category'
import FeatureSection from '@/components/FeatureSection'
import ProductCard from '@/components/Product/ProductCard'
import PublishedSection from '@/components/PublishedSection'
import HeroSlider from '@/components/Slider'
import TestimonialSection from '@/components/TestimonialSection'

export default function Home() {

  return (
    <main className="min-h-screen bg-white">


      <HeroSlider />
      <FeatureSection />
      <ProductCard title='নতুন প্রকাশিত বই' />
      <CategorySlider />
      <ProductCard title='কুরআন ও হাদিস বিষয়ক বই' />
      <TestimonialSection />
      <ProductCard title='কুরআন ও হাদিস বিষয়ক বই' />
      <PublishedSection />
      <ProductCard title='ফ্রিল্যান্সিং ও আউটসোর্সিং' />

      <ProductCard title='All Products ' />

    </main>
  )
}
