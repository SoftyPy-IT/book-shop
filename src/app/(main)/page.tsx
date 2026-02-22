'use client'



import { CategorySlider } from '@/components/home/Category'
import FeatureSection from '@/components/home/FeatureSection'
import ProductCard from '@/components/Product/ProductCard'
import PublishedSection from '@/components/home/PublishedSection'
import HeroSlider from '@/components/home/Slider'
import TestimonialSection from '@/components/home/TestimonialSection'
import CategorySection from '@/components/home/CategorySection'

export default function Home() {

  return (
    <main className="min-h-screen bg-white">


      <HeroSlider />

      <FeatureSection />
      <ProductCard title='Top Selling Books' />
      <CategorySlider />

      <ProductCard title='কুরআন ও হাদিস বিষয়ক বই' />


      <CategorySection />
      <ProductCard title='কুরআন ও হাদিস বিষয়ক বই' />
      <PublishedSection />
      <ProductCard title='ফ্রিল্যান্সিং ও আউটসোর্সিং' />
      <TestimonialSection />
      <ProductCard title='All Products ' />

    </main>
  )
}
