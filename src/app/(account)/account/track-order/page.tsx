// app/account/track-order/page.tsx
"use client";

import {
    AlertCircle,
    CheckCircle2,
    Clock,
    MapPin,
    Navigation,
    Package,
    PackageCheck,
    PackageOpen,
    Search,
    Truck
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface Order {
    id: string;
    date: string;
    status: "pending" | "processing" | "ready" | "shipped" | "delivered";
    estimatedDelivery: string;
    carrier?: string;
    trackingNumber?: string;
    currentLocation?: string;
    lastUpdate?: string;
}

const mockOrder: Order = {
    id: "392",
    date: "Feb 22, 2026 09:34 AM",
    status: "shipped",
    estimatedDelivery: "Feb 25, 2026",
    carrier: "DHL Express",
    trackingNumber: "DH123456789",
    currentLocation: "Sorting Center, Dhaka",
    lastUpdate: "Feb 23, 2026 02:30 PM"
};

const timelineSteps = [
    {
        status: "pending",
        label: "Order Placed",
        description: "Your order has been received",
        date: "Feb 22, 2026 09:34 AM",
        icon: Clock
    },
    {
        status: "processing",
        label: "Processing",
        description: "Your order is being prepared",
        date: "Feb 22, 2026 02:15 PM",
        icon: PackageOpen
    },
    {
        status: "ready",
        label: "Ready for Delivery",
        description: "Your order is packed and ready",
        date: "Feb 23, 2026 10:00 AM",
        icon: PackageCheck
    },
    {
        status: "shipped",
        label: "Shipped",
        description: "Your order is on the way",
        date: "Feb 23, 2026 02:30 PM",
        icon: Truck
    },
    {
        status: "delivered",
        label: "Delivered",
        description: "Your order has been delivered",
        icon: CheckCircle2
    }
];

export default function TrackOrderPage() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isTracking, setIsTracking] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setIsTracking(true);
        // Simulate API call
        setTimeout(() => {
            setOrder(mockOrder);
            setIsTracking(false);
        }, 1000);
    };

    const getStatusProgress = (status: string) => {
        const statusMap = {
            pending: 20,
            processing: 40,
            ready: 60,
            shipped: 80,
            delivered: 100
        };
        return statusMap[status as keyof typeof statusMap] || 0;
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: "bg-yellow-500",
            processing: "bg-blue-500",
            ready: "bg-purple-500",
            shipped: "bg-indigo-500",
            delivered: "bg-green-500"
        };
        return colors[status as keyof typeof colors] || "bg-gray-500";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Track Your Order
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Enter your tracking number or phone number to track your order
                </p>
            </div>

            {/* Tracking Search */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600">
                <CardContent className="p-8">
                    <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                                <Input
                                    placeholder="Enter tracking number or phone number"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 text-lg"
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isTracking}
                                className="h-14 px-8 bg-white text-blue-600 hover:bg-white/90 text-lg"
                            >
                                {isTracking ? (
                                    "Searching..."
                                ) : (
                                    <>
                                        <Search className="mr-2 h-5 w-5" />
                                        Track Order
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Tracking Result */}
            {order && (
                <div className="space-y-6">
                    {/* Order Summary */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="text-xl font-bold">#{order.id}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-medium">{order.date}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                                    <p className="font-medium text-green-600">{order.estimatedDelivery}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Status</p>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Progress Bar */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span>Order Placed</span>
                                    <span>Processing</span>
                                    <span>Ready</span>
                                    <span>Shipped</span>
                                    <span>Delivered</span>
                                </div>
                                <Progress value={getStatusProgress(order.status)} className="h-3" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline and Details */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Timeline */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Tracking Timeline</CardTitle>
                                <CardDescription>
                                    Current status: {order.carrier} • {order.trackingNumber}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    {timelineSteps.map((step, index) => {
                                        const isCompleted = index <= timelineSteps.findIndex(s => s.status === order.status);
                                        const Icon = step.icon;

                                        return (
                                            <div key={step.status} className="relative pb-8 last:pb-0">
                                                {index < timelineSteps.length - 1 && (
                                                    <div
                                                        className={`absolute left-6 top-6 -ml-px h-full w-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-200"
                                                            }`}
                                                        aria-hidden="true"
                                                    />
                                                )}

                                                <div className="relative flex items-start gap-4">
                                                    <div>
                                                        <span className={`flex h-12 w-12 items-center justify-center rounded-full ${isCompleted
                                                            ? "bg-green-500 text-white"
                                                            : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                                                            }`}>
                                                            <Icon className="h-5 w-5" />
                                                        </span>
                                                    </div>

                                                    <div className="flex-1 pt-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className={`font-medium ${isCompleted ? "text-foreground" : "text-gray-400"
                                                                }`}>
                                                                {step.label}
                                                            </p>
                                                            {step.date && isCompleted && (
                                                                <p className="text-sm text-gray-500">{step.date}</p>
                                                            )}
                                                        </div>
                                                        <p className={`text-sm mt-1 ${isCompleted ? "text-gray-600" : "text-gray-400"
                                                            }`}>
                                                            {step.description}
                                                        </p>
                                                        {step.status === order.status && (
                                                            <Badge variant="outline" className="mt-2 border-green-500 text-green-600">
                                                                Current
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Live Tracking Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Live Tracking</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Navigation className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Current Location</p>
                                            <p className="font-medium">{order.currentLocation}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Last Update</p>
                                            <p className="font-medium">{order.lastUpdate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Truck className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Carrier</p>
                                            <p className="font-medium">{order.carrier}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Package className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Tracking Number</p>
                                            <p className="font-medium">{order.trackingNumber}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Delivery Address */}
                                <div>
                                    <h4 className="font-semibold mb-3">Delivery Address</h4>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Ibrahim Sikder</p>
                                            <p className="text-sm text-gray-500">123 Book Street</p>
                                            <p className="text-sm text-gray-500">Dhaka, Bangladesh 1200</p>
                                            <p className="text-sm text-gray-500">Phone: +8801825445033</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Need Help */}
                                <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-blue-600">Need help?</p>
                                            <p className="text-sm text-blue-600/80 mt-1">
                                                Contact our support team for assistance with your delivery
                                            </p>
                                            <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                                                Contact Support →
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}