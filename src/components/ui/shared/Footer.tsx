'use client'

import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, RotateCcw, Shield, Truck, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-slate-900 text-gray-100">
            {/* Trust Badges Section */}
            <div className="border-b border-slate-700 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                        <div className="flex items-center gap-4 justify-center sm:justify-start">
                            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Truck className="w-7 h-7 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm sm:text-base">দ্রুত ডেলিভারি</h3>
                                <p className="text-xs sm:text-sm text-gray-400">সারা দেশে ২-৩ দিনে</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Shield className="w-7 h-7 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm sm:text-base">নিরাপদ পেমেন্ট</h3>
                                <p className="text-xs sm:text-sm text-gray-400">১০০% সুরক্ষিত লেনদেন</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center sm:justify-end">
                            <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <RotateCcw className="w-7 h-7 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm sm:text-base">সহজ রিটার্ন</h3>
                                <p className="text-xs sm:text-sm text-gray-400">৭ দিনের গ্যারান্টি</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">📚</span>
                            </div>
                            <h3 className="text-xl font-bold text-white">Reading</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Reading হল বাংলাদেশের শীর্ষস্থানীয় অনলাইন বই কেনাকাটার প্ল্যাটফর্ম যেখানে আমরা গুণমান, সাশ্রয়ী মূল্য এবং দ্রুত সেবা নিশ্চিত করি।
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:scale-110">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:scale-110">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 border-b border-slate-700 pb-3">দ্রুত লিংক</h4>
                        <ul className="space-y-3">
                            {['নতুন প্রকাশনা', 'সেরা বিক্রেতা', 'বিশেষ অফার', 'আমাদের ব্লগ', 'লেখক পরিচয়'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 border-b border-slate-700 pb-3">গ্রাহক সেবা</h4>
                        <ul className="space-y-3">
                            {['আমাদের সম্পর্কে', 'যোগাযোগ করুন', 'ফেরত নীতি', 'শিপিং নীতি', 'গোপনীয়তা নীতি'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 border-b border-slate-700 pb-3">যোগাযোগ করুন</h4>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start group">
                                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                <div>
                                    <p className="text-gray-400 text-xs">সাপোর্ট হটলাইন</p>
                                    <a href="tel:+88017230000000" className="text-white font-bold hover:text-blue-400 transition-colors">+88 01723-000000</a>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start group">
                                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                <div>
                                    <p className="text-gray-400 text-xs">ইমেল</p>
                                    <a href="mailto:contact@reading.com.bd" className="text-white font-bold hover:text-blue-400 transition-colors">contact@reading.com.bd</a>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start group">
                                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                <div>
                                    <p className="text-gray-400 text-xs">ঠিকানা</p>
                                    <p className="text-white font-bold">ঢাকা, বাংলাদেশ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Payment Methods */}
                <div className="border-t border-slate-700 pt-10 mb-10">
                    <h4 className="text-white font-bold text-lg mb-6">আমরা গ্রহণ করি</h4>
                    <div className="flex flex-wrap gap-3">
                        {['ব্যাংক ট্রান্সফার', 'ক্রেডিট কার্ড', 'ডেবিট কার্ড', 'মোবাইল পেমেন্ট', 'নগদ প্রদান'].map((method) => (
                            <div key={method} className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-all cursor-pointer border border-slate-600 hover:border-blue-500">
                                {method}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-slate-700 pt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                            © {new Date().getFullYear()} Reading স্টোর। সর্বাধিকার সংরক্ষিত। আমাদের পণ্য এবং সেবা ব্যবহারের মাধ্যমে আপনি আমাদের শর্তাবলী স্বীকার করেন।
                        </p>
                        <div className="flex flex-wrap gap-4 sm:justify-end">
                            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm font-medium">
                                গোপনীয়তা নীতি
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm font-medium">
                                শর্তাবলী
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm font-medium">
                                সাইটম্যাপ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-40 group"
            >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
        </footer>
    )
}
