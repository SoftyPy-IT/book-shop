import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TopBar() {
    return (

        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2.5 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs sm:text-sm gap-4">
                <span className="text-yellow-300 font-medium">অনলাইন কেনাকাটা সম্পর্কে বিশেষ অফার!</span>
                <div className="flex items-center gap-4 sm:gap-6">
                    <a href="mailto:contact@reading.com.bd" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">contact@reading.com.bd</span>
                    </a>
                    <a href="tel:+88017230000000" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        <span>+88017230-000000</span>
                    </a>
                    <Link href="/track-order" className="hover:text-blue-300 transition-colors hidden sm:block">
                        Track Your Order
                    </Link>
                </div>
            </div>
        </div>
    )
}
