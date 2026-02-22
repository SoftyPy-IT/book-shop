
import Image from 'next/image'
import './feature.css'
import feature from '@/assets/category/category.webp'
import feature2 from '@/assets/category/category2.webp'
import feature3 from '@/assets/category/category3.webp'
import feature4 from '@/assets/category/category4.webp'
export default function FeatureSection() {

    return (
        <div className='flex items-center justify-center gap-5 mt-3 '>
            <div className='w-[300px]  h-36 shadow-lg rounded-lg feature'>
                <Image width={500} height={500} src={feature} alt='feature' />
            </div>
            <div className='w-[300px]  h-36 shadow-lg rounded-lg feature'>
                <Image width={500} height={500} src={feature2} alt='feature' />
            </div>
            <div className='w-[300px]  h-36 shadow-lg rounded-lg feature'>
                <Image width={500} height={500} src={feature3} alt='feature' />
            </div>
            <div className='w-[300px]  h-36 shadow-lg rounded-lg feature'>
                <Image width={500} height={500} src={feature4} alt='feature' />
            </div>
        </div>
    )
}
