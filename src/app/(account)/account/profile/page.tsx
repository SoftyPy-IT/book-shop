
"use client";

import {
    Bell,
    ChevronRight,
    Heart,
    Home,
    LogOut,
    Menu,
    Moon,
    Package,
    Search,
    Settings,
    ShoppingBag,
    Sun
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

interface NavItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Mock user data
    const user = {
        name: "Ibrahim Sikder",
        email: "ibrahim.sikder503@gmail.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        initials: "IS"
    };

    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/account",
            icon: <Home className="h-5 w-5" />,
        },
        {
            title: "Orders",
            href: "/account/orders",
            icon: <ShoppingBag className="h-5 w-5" />,
            badge: 3,
        },
        {
            title: "Cart",
            href: "/account/cart",
            icon: <Package className="h-5 w-5" />,
            badge: 2,
        },
        {
            title: "Wishlist",
            href: "/account/wishlist",
            icon: <Heart className="h-5 w-5" />,
            badge: 5,
        },
        {
            title: "Track Order",
            href: "/account/track-order",
            icon: <Package className="h-5 w-5" />,
        },
        {
            title: "Settings",
            href: "/account/settings",
            icon: <Settings className="h-5 w-5" />,
        },
    ];

    const quickActions = [
        { label: "Support", icon: <Bell className="h-4 w-4" /> },
        { label: "Search", icon: <Search className="h-4 w-4" /> },
    ];

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
                {/* Header */}
                <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg" : "bg-transparent"
                    }`}>
                    <div className="container mx-auto px-4">
                        <div className="flex h-20 items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-70"></div>
                                    <div className="relative bg-white dark:bg-gray-900 rounded-lg px-3 py-2">
                                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            BookStore
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link href="/books" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                    Books
                                </Link>
                                <Link href="/categories" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                    Categories
                                </Link>
                                <Link href="/deals" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                    Deals
                                </Link>
                            </nav>

                            {/* Right Side Actions */}
                            <div className="flex items-center space-x-4">
                                {/* Search */}
                                <div className="hidden lg:block relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search books..."
                                        className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Theme Toggle */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                >
                                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>

                                {/* Notifications */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="relative rounded-full">
                                            <Bell className="h-5 w-5" />
                                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                                                3
                                            </Badge>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-80">
                                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <ScrollArea className="h-80">
                                            {[1, 2, 3].map((i) => (
                                                <DropdownMenuItem key={i} className="cursor-pointer p-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium">Order #{392 + i} has been shipped</p>
                                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                                    </div>
                                                </DropdownMenuItem>
                                            ))}
                                        </ScrollArea>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* User Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <Avatar className="h-10 w-10 ring-2 ring-blue-500 ring-offset-2">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                                    {user.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {navItems.map((item) => (
                                            <DropdownMenuItem key={item.href} asChild>
                                                <Link href={item.href} className="cursor-pointer">
                                                    {item.icon}
                                                    <span className="ml-2">{item.title}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 cursor-pointer">
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Mobile Menu Trigger */}
                                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                                            <Menu className="h-5 w-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-72 p-0">
                                        <div className="flex flex-col h-full">
                                            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar className="h-16 w-16 ring-4 ring-white/50">
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback className="bg-white text-gray-900">
                                                            {user.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="text-white">
                                                        <p className="font-semibold">{user.name}</p>
                                                        <p className="text-sm opacity-90">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <ScrollArea className="flex-1 py-6">
                                                <nav className="space-y-1 px-3">
                                                    {navItems.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${pathname === item.href
                                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                                }`}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                {item.icon}
                                                                <span className="font-medium">{item.title}</span>
                                                            </div>
                                                            {item.badge && (
                                                                <Badge className={pathname === item.href ? "bg-white text-blue-600" : ""}>
                                                                    {item.badge}
                                                                </Badge>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </nav>
                                            </ScrollArea>

                                            <div className="p-4 border-t dark:border-gray-800">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                >
                                                    <LogOut className="h-4 w-4 mr-2" />
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block w-72 shrink-0">
                            <div className="sticky top-28">
                                {/* User Profile Card */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16 ring-2 ring-blue-500 ring-offset-2">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
                                                {user.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="font-bold text-lg">{user.name}</h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Menu */}
                                <nav className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                    {navItems.map((item, index) => (
                                        <div key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center justify-between px-6 py-4 transition-all relative group ${pathname === item.href
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`${pathname === item.href
                                                        ? "text-white"
                                                        : "text-gray-500 group-hover:text-blue-600 dark:text-gray-400"
                                                        }`}>
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-medium">{item.title}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {item.badge && (
                                                        <Badge className={pathname === item.href ? "bg-white text-blue-600" : ""}>
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                    <ChevronRight className={`h-4 w-4 transition-all ${pathname === item.href
                                                        ? "text-white"
                                                        : "text-gray-400 group-hover:translate-x-1"
                                                        }`} />
                                                </div>
                                            </Link>
                                            {index < navItems.length - 1 && (
                                                <Separator className="dark:bg-gray-800" />
                                            )}
                                        </div>
                                    ))}

                                    {/* Logout Button */}
                                    <div className="border-t dark:border-gray-800">
                                        <button
                                            className="flex items-center space-x-3 px-6 py-4 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </div>
                                </nav>

                                {/* Quick Stats */}
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800">
                                        <p className="text-2xl font-bold text-blue-600">12</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800">
                                        <p className="text-2xl font-bold text-purple-600">₱3.2k</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="flex-1 min-w-0">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-12">
                    <div className="container mx-auto px-4 py-8">
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            © 2026 BookStore. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </TooltipProvider>
    );
}