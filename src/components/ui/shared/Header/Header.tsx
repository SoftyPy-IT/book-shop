'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, ChevronDown, Mail, Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)

    const menuItems = [
        {
            name: 'দেশ',
            hasSubmenu: true,
            subcategories: ['সব ধরনের', 'বাংলা সাহিত্য', 'বাংলাদেশী লেখক', 'আঞ্চলিক সাহিত্য']
        },
        {
            name: 'ছড়া',
            hasSubmenu: true,
            subcategories: ['বাংলা ছড়া', 'ইংরেজি ছড়া', 'শিশু ছড়া', 'আধুনিক ছড়া', 'ঐতিহ্যবাহী']
        },
        {
            name: 'বিষয়',
            hasSubmenu: true,
            subcategories: ['দর্শন', 'বিজ্ঞান', 'ইতিহাস', 'আত্মজীবনী', 'রহস্য-রোমাঞ্চ', 'প্রেম']
        },
        {
            name: 'ক্রয়ের্ক',
            hasSubmenu: true,
            subcategories: ['বাচ্চাদের বই', 'শিক্ষামূলক', 'গল্পের বই', 'কমিকস', 'রঙিন বই']
        },
        {
            name: 'কালেকশন',
            hasSubmenu: true,
            subcategories: ['বেস্টসেলার', 'নতুন প্রকাশনা', 'অফার সংগ্রহ', 'ক্লাসিক', 'আগামী সপ্তাহ']
        },
        {
            name: 'প্রকাশক',
            hasSubmenu: true,
            subcategories: ['সব প্রকাশক', 'জনপ্রিয় লেবেল', 'স্বাধীন প্রকাশক', 'আন্তর্জাতিক']
        },
        {
            name: 'লেখক',
            hasSubmenu: false
        },
        {
            name: 'বইমেলা',
            hasSubmenu: true,
            subcategories: ['আগত মেলা', 'চলমান মেলা', 'অনলাইন মেলা', 'বিশেষ আয়োজন']
        },
        {
            name: 'অফার',
            hasSubmenu: false
        },
        {
            name: 'ব্লগ',
            hasSubmenu: false
        }
    ]

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const handleMobileSubmenuToggle = (itemName: string) => {
        setMobileActiveDropdown(mobileActiveDropdown === itemName ? null : itemName)
    }

    return (
        <header className="w-full bg-white">
            {/* Top Announcement Bar */}
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
                        <Link href="#" className="hover:text-blue-300 transition-colors hidden sm:block">
                            Track Your Order
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-white font-bold text-lg">📚</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 hidden sm:inline">Reading</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-grow max-w-2xl hidden sm:block">
                        <div className="relative group">
                            <Input
                                type="text"
                                placeholder="Search Your Product Here..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-8 py-6 rounded-full bg-gray-50 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-sm"
                            />
                            <Button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full w-9 h-9 p-0 flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                            <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                        </button>
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group relative">
                            <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                0
                            </span>
                        </button>


                        <Link href='/login'>
                            <Button variant="outline" className="hidden sm:flex text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 py-2 px-4 shadow-sm hover:shadow-md transition-all">
                                Log In
                            </Button>
                        </Link>
                        <Link href='/register'> <Button className="hidden sm:flex bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-5 shadow-md hover:shadow-lg transition-all font-medium rounded-lg">
                            Register
                        </Button></Link>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="sm:hidden mt-3">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-2 pr-10 rounded-full bg-gray-50 border-2 border-gray-300 focus:border-blue-500 text-sm"
                        />
                        <Button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 p-0 flex items-center justify-center">
                            <Search className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Category Navigation - Centered */}
            <div className="hidden lg:block bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 relative"> {/* Added relative positioning */}
                    <div className="flex items-center justify-center flex-nowrap"> {/* Removed overflow-x-auto */}
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative flex-shrink-0" /* Added flex-shrink-0 */
                                onMouseEnter={() => {
                                    if (item.hasSubmenu) {
                                        setActiveDropdown(item.name)
                                    }
                                }}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.hasSubmenu ? (
                                    <>
                                        <button
                                            className="flex items-center gap-1.5 px-4 xl:px-5 py-4 text-gray-700 font-medium hover:text-blue-600 transition-colors group whitespace-nowrap"
                                        >
                                            {item.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Dropdown Menu - Fixed positioning */}
                                        {activeDropdown === item.name && (
                                            <div
                                                className="absolute left-0 top-full mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
                                                style={{ minWidth: '200px' }}
                                            >
                                                {item.subcategories?.map((sub, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href="#"
                                                        className="block px-5 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
                                                    >
                                                        {sub}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href="#"
                                        className="flex items-center px-4 xl:px-5 py-4 text-gray-700 font-medium hover:text-blue-600 transition-colors whitespace-nowrap"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">📚</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">Reading</span>
                        </Link>
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <div key={item.name} className="border-b border-gray-100 pb-2">
                                {item.hasSubmenu ? (
                                    <>
                                        <button
                                            className="flex items-center justify-between w-full py-3 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                                            onClick={() => handleMobileSubmenuToggle(item.name)}
                                        >
                                            {item.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileActiveDropdown === item.name ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        {/* Mobile Subcategories */}
                                        {mobileActiveDropdown === item.name && (
                                            <div className="pl-4 space-y-2 mt-2">
                                                {item.subcategories?.map((sub, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href="#"
                                                        className="block py-2 text-gray-600 hover:text-blue-600 text-sm"
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {sub}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href="#"
                                        className="block py-3 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                                        onClick={toggleMobileMenu}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Auth Buttons */}
                    <div className="mt-6 space-y-2">
                        <Link href='/login'>
                            <Button variant="outline" className="w-full text-gray-700 border-gray-300">
                                Log In
                            </Button>
                        </Link>
                        <Link href='/register'>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}