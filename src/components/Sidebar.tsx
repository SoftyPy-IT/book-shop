// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    ShoppingBag,
    Heart,
    Package,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NavItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

const navItems: NavItem[] = [
    {
        title: "Account",
        href: "/account/profile",
        icon: <Home className="h-5 w-5" />,
    },
    {
        title: "Orders",
        href: "/account/orders",
        icon: <ShoppingBag className="h-5 w-5" />,
        badge: 3,
    },

    {
        title: "Wishlist",
        href: "/account/wishlist",
        icon: <Heart className="h-5 w-5" />,
        badge: 5,
    },
    {
        title: "Track Order",
        href: "/track-order",
        icon: <Package className="h-5 w-5" />,
    },
    {
        title: "Settings",
        href: "/account/edit",
        icon: <Settings className="h-5 w-5" />,
    },
];

const user = {
    name: "Ibrahim Sikder",
    email: "ibrahim.sikder503@gmail.com",
    avatar: "",
    initials: "IS"
};

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 shrink-0 hidden lg:block">
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
                                    <div
                                        className={`${pathname === item.href
                                            ? "text-white"
                                            : "text-gray-500 group-hover:text-blue-600 dark:text-gray-400"
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <span className="font-medium">{item.title}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {item.badge && (
                                        <Badge
                                            className={
                                                pathname === item.href ? "bg-white text-blue-600" : ""
                                            }
                                        >
                                            {item.badge}
                                        </Badge>
                                    )}
                                    <ChevronRight
                                        className={`h-4 w-4 transition-all ${pathname === item.href
                                            ? "text-white"
                                            : "text-gray-400 group-hover:translate-x-1"
                                            }`}
                                    />
                                </div>
                            </Link>
                            {index < navItems.length - 1 && (
                                <Separator className="dark:bg-gray-800" />
                            )}
                        </div>
                    ))}

                    {/* Logout Button */}
                    <div className="border-t dark:border-gray-800">
                        <button className="flex items-center space-x-3 px-6 py-4 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group">
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </nav>


            </div>
        </aside>
    );
}