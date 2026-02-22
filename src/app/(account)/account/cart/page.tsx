/* eslint-disable react/no-unescaped-entities */
// app/account/cart/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Trash2,
    Heart,
    ShoppingBag,
    Plus,
    Minus,
    ArrowRight,
    Tag,
    Shield,
    Truck,
    RefreshCw
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

interface CartItem {
    id: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    image: string;
    inStock: boolean;
}

const cartItems: CartItem[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 15.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        inStock: true
    },
    {
        id: "2",
        title: "1984",
        author: "George Orwell",
        price: 12.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        inStock: true
    }
];

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>(cartItems);
    const [promoCode, setPromoCode] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>(items.map(item => item.id));

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
        setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    };

    const toggleItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
    };

    const subtotal = items
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Shopping Cart
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>
            </div>

            {items.length > 0 ? (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    checked={selectedItems.length === items.length}
                                    onCheckedChange={toggleAll}
                                />
                                <span className="font-medium">Select All ({items.length} items)</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove Selected
                            </Button>
                        </div>

                        {/* Cart Items List */}
                        {items.map((item) => (
                            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex gap-6">
                                        <Checkbox
                                            checked={selectedItems.includes(item.id)}
                                            onCheckedChange={() => toggleItem(item.id)}
                                            className="mt-1"
                                        />

                                        {/* Book Image */}
                                        <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Book Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                                                        <Link href={`/books/${item.id}`}>{item.title}</Link>
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{item.author}</p>
                                                    {!item.inStock && (
                                                        <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                                                    )}
                                                </div>
                                                <p className="font-bold text-xl">₱{item.price.toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <Button variant="ghost" size="sm" className="text-gray-500">
                                                        <Heart className="h-4 w-4 mr-2" />
                                                        Save
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="text-red-500">
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Remove
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Remove item from cart?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. The item will be removed from your cart.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => removeItem(item.id)}>
                                                                    Remove
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Continue Shopping */}
                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href="/books"
                                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                            >
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-28">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                {/* Promo Code */}
                                <div className="flex gap-2 mb-6">
                                    <Input
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <Button variant="outline">Apply</Button>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Shipping</span>
                                        <span className="font-medium">
                                            {shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Tax (10%)</span>
                                        <span className="font-medium">₱{tax.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-600">₱{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white h-12 text-lg"
                                    disabled={selectedItems.length === 0}
                                >
                                    Proceed to Checkout
                                </Button>

                                {/* Features */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Truck className="h-4 w-4" />
                                        <span>Free shipping on orders over ₱50</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Shield className="h-4 w-4" />
                                        <span>Secure checkout</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <RefreshCw className="h-4 w-4" />
                                        <span>30-day return policy</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                // Empty Cart State
                <div className="text-center py-16">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                        <ShoppingBag className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Looks like you haven't added any books to your cart yet. Explore our collection and find your next read!
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    >
                        Start Shopping
                    </Button>
                </div>
            )}
        </div>
    );
}