// app/order-tracking/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Package,
    Phone,
    Calendar,
    User,
    CreditCard,
    MapPin,
    Clock,
    Search,
    CheckCircle2,
    Truck,
    PackageCheck,
    PackageOpen,
    ShoppingBag
} from "lucide-react";

// Order status types
type OrderStatus = "pending" | "processing" | "ready" | "shipped" | "completed";

interface Order {
    id: string;
    orderDate: string;
    customerName: string;
    status: OrderStatus;
    phone: string;
    paymentMethod: string;
    address: string;
    paymentStatus: "pending" | "paid" | "failed";
    total: number;
    items?: OrderItem[];
}

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface TimelineStep {
    status: OrderStatus;
    label: string;
    description: string;
    date?: string;
    icon: React.ReactNode;
}

export default function OrderTrackingPage() {
    const searchParams = useSearchParams();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [searchedPhone, setSearchedPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Mock function to fetch orders - replace with actual API call
    const fetchOrders = async (phone: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data - replace with actual API response
            const mockOrders: Order[] = [
                {
                    id: "392",
                    orderDate: "Feb 22, 2026 09:34 AM",
                    customerName: "Ibrahim Sikder",
                    status: "pending",
                    phone: "+8801825445033",
                    paymentMethod: "COD",
                    address: "Dhaka",
                    paymentStatus: "pending",
                    total: 440.00,
                    items: [
                        { id: "1", name: "The Great Gatsby", quantity: 1, price: 15.99 },
                        { id: "2", name: "1984", quantity: 2, price: 12.99 }
                    ]
                }
            ];

            setOrders(mockOrders);
            setSearchedPhone(phone);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.trim()) {
            fetchOrders(phoneNumber);
        }
    };

    const getStatusColor = (status: OrderStatus | string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500";
            case "processing":
                return "bg-blue-500";
            case "ready":
                return "bg-purple-500";
            case "shipped":
                return "bg-indigo-500";
            case "completed":
                return "bg-green-500";
            case "paid":
                return "bg-green-500";
            case "failed":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getTimelineSteps = (currentStatus: OrderStatus): TimelineStep[] => {
        const steps: TimelineStep[] = [
            {
                status: "pending",
                label: "Pending",
                description: "Your order has been received and is awaiting processing.",
                icon: <Clock className="h-5 w-5" />
            },
            {
                status: "processing",
                label: "Processing",
                description: "Your order is being processed.",
                icon: <PackageOpen className="h-5 w-5" />
            },
            {
                status: "ready",
                label: "Ready For Delivery",
                description: "Your order is packed and ready for delivery.",
                icon: <PackageCheck className="h-5 w-5" />
            },
            {
                status: "shipped",
                label: "Shipped",
                description: "Your order has been shipped and is on the way.",
                icon: <Truck className="h-5 w-5" />
            },
            {
                status: "completed",
                label: "Completed",
                description: "Your order has been delivered successfully.",
                icon: <CheckCircle2 className="h-5 w-5" />
            }
        ];

        // Add dates to completed steps based on order data
        const statusOrder: OrderStatus[] = ["pending", "processing", "ready", "shipped", "completed"];
        const currentIndex = statusOrder.indexOf(currentStatus);

        return steps.map((step, index) => ({
            ...step,
            date: index <= currentIndex ? selectedOrder?.orderDate : undefined
        }));
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <Package className="h-8 w-8" />
                Track Your Order
            </h1>

            {/* Phone Number Input Card */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Find Your Order</CardTitle>
                    <CardDescription>
                        Enter your phone number to track your orders
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTrackOrder} className="flex gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                "Searching..."
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Track Order
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Orders List */}
            {searchedPhone && orders.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                        Orders found for {searchedPhone}
                    </h2>

                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            className={`cursor-pointer transition-all ${selectedOrder?.id === order.id ? "ring-2 ring-primary" : ""
                                }`}
                            onClick={() => setSelectedOrder(order)}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            Order #{order.id}
                                            <Badge className={getStatusColor(order.status)}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription>
                                            Placed on {order.orderDate}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">
                                            ₱{order.total.toFixed(2)}
                                        </div>
                                        <Badge variant="outline" className={getStatusColor(order.paymentStatus)}>
                                            Payment: {order.paymentStatus}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}

            {/* Selected Order Details */}
            {selectedOrder && (
                <div className="mt-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order #{selectedOrder.id} Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Order Date</p>
                                            <p className="font-medium">{selectedOrder.orderDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Customer Name</p>
                                            <p className="font-medium">{selectedOrder.customerName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{selectedOrder.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-medium">{selectedOrder.paymentMethod}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium">{selectedOrder.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="font-medium text-xl">₱{selectedOrder.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            {selectedOrder.items && selectedOrder.items.length > 0 && (
                                <>
                                    <Separator className="my-6" />
                                    <div>
                                        <h3 className="font-semibold mb-4">Order Items</h3>
                                        <div className="space-y-3">
                                            {selectedOrder.items.map((item) => (
                                                <div key={item.id} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Quantity: {item.quantity} × ₱{item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        ₱{(item.quantity * item.price).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Order Status Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Status Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative">
                                {getTimelineSteps(selectedOrder.status).map((step, index, array) => (
                                    <div key={step.status} className="relative pb-8">
                                        {index < array.length - 1 && (
                                            <div
                                                className={`absolute left-6 top-6 -ml-px h-full w-0.5 ${step.date ? "bg-primary" : "bg-gray-200"
                                                    }`}
                                                aria-hidden="true"
                                            />
                                        )}

                                        <div className="relative flex items-start gap-4">
                                            <div>
                                                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${step.date
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-gray-100 text-gray-400"
                                                    }`}>
                                                    {step.icon}
                                                </span>
                                            </div>

                                            <div className="flex-1 pt-1">
                                                <div className="flex items-center justify-between">
                                                    <p className={`font-medium ${step.date ? "text-foreground" : "text-gray-400"
                                                        }`}>
                                                        {step.label}
                                                    </p>
                                                    {step.date && (
                                                        <p className="text-sm text-gray-500">
                                                            {step.date}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className={`text-sm mt-1 ${step.date ? "text-gray-600" : "text-gray-400"
                                                    }`}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* No Orders Found */}
            {searchedPhone && orders.length === 0 && !isLoading && (
                <Card className="mt-8">
                    <CardContent className="py-12 text-center">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                        <p className="text-gray-500">
                            No orders were found with the phone number {searchedPhone}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}