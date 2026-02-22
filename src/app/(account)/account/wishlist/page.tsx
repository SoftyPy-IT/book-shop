// app/account/wishlist/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Heart,
    ShoppingCart,
    Trash2,
    Share2,
    Star,
    Eye,
    X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WishlistItem {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    inStock: boolean;
    category: string;
}

const wishlistItems: WishlistItem[] = [
    {
        id: "1",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 14.99,
        originalPrice: 24.99,
        rating: 4.5,
        reviewCount: 12453,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=412&q=80",
        inStock: true,
        category: "Thriller"
    },
    {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        price: 16.99,
        rating: 4.8,
        reviewCount: 25678,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        inStock: true,
        category: "Self-Help"
    },
    {
        id: "3",
        title: "Dune",
        author: "Frank Herbert",
        price: 12.99,
        rating: 4.6,
        reviewCount: 9876,
        image: "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        inStock: false,
        category: "Science Fiction"
    }
];

export default function WishlistPage() {
    const [items, setItems] = useState<WishlistItem[]>(wishlistItems);
    const [view, setView] = useState<"grid" | "list">("grid");

    const removeFromWishlist = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const addToCart = (id: string) => {
        // Add to cart logic
        console.log("Added to cart:", id);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
            />
        ));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Wishlist
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Tabs defaultValue="grid" className="w-[200px]" onValueChange={(v) => setView(v as "grid" | "list")}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="grid">Grid</TabsTrigger>
                            <TabsTrigger value="list">List</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {items.length > 0 && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="text-red-500">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Clear wishlist?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. All items will be removed from your wishlist.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => setItems([])}>
                                        Clear
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </div>

            {items.length > 0 ? (
                <div className={
                    view === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                }>
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            className={`group hover:shadow-xl transition-all duration-300 ${view === "list" ? "flex" : ""
                                }`}
                        >
                            <CardContent className={`p-6 ${view === "list" ? "flex gap-6" : ""}`}>
                                {/* Image */}
                                <div className={`relative ${view === "list" ? "w-32 h-40" : "w-full h-48 mb-4"}`}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    {!item.inStock && (
                                        <Badge variant="destructive" className="absolute top-2 right-2">
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>

                                {/* Content */}
                                <div className={view === "list" ? "flex-1" : ""}>
                                    {/* Category */}
                                    <Badge variant="outline" className="mb-2">
                                        {item.category}
                                    </Badge>

                                    {/* Title & Author */}
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                        <Link href={`/books/${item.id}`}>{item.title}</Link>
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">by {item.author}</p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex">{renderStars(item.rating)}</div>
                                        <span className="text-sm text-gray-500">({item.reviewCount})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl font-bold">₱{item.price.toFixed(2)}</span>
                                        {item.originalPrice && (
                                            <>
                                                <span className="text-sm text-gray-400 line-through">
                                                    ₱{item.originalPrice.toFixed(2)}
                                                </span>
                                                <Badge className="bg-green-500">
                                                    Save {Math.round((1 - item.price / item.originalPrice) * 100)}%
                                                </Badge>
                                            </>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                            onClick={() => addToCart(item.id)}
                                            disabled={!item.inStock}
                                        >
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Add to Cart
                                        </Button>

                                        <Button variant="outline" size="icon">
                                            <Share2 className="h-4 w-4" />
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="icon" className="text-red-500">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Remove from wishlist?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This item will be removed from your wishlist.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => removeFromWishlist(item.id)}>
                                                        Remove
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                // Empty Wishlist State
                <div className="text-center py-16">
                    <div className="bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-950 dark:to-red-950 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                        <Heart className="h-16 w-16 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Your wishlist is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Save your favorite books here and never lose track of what you want to read next!
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-pink-600 to-red-600 text-white"
                    >
                        Explore Books
                    </Button>
                </div>
            )}
        </div>
    );
}