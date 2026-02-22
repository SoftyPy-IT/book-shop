/* eslint-disable react/no-unescaped-entities */
// app/account/orders/page.tsx
"use client";

import { useState } from "react";
import {
    ShoppingBag,
    Calendar,
    Eye,
    Search,
    Filter,
    ChevronDown,
    Package,
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Order {
    id: string;
    date: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    paymentMethod: string;
    paymentStatus: "paid" | "pending" | "failed";
    shippingAddress: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
}

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Mock orders data
    const orders: Order[] = [
        {
            id: "#392",
            date: "Feb 22, 2026",
            status: "pending",
            total: 440.00,
            items: [
                { name: "The Great Gatsby", quantity: 2, price: 15.99 },
                { name: "1984", quantity: 1, price: 12.99 },
                { name: "Atomic Habits", quantity: 1, price: 16.99 },
            ],
            paymentMethod: "Cash on Delivery",
            paymentStatus: "pending",
            shippingAddress: "123 Book Street, Dhaka, Bangladesh",
            estimatedDelivery: "Feb 25, 2026"
        },
        {
            id: "#391",
            date: "Feb 20, 2026",
            status: "shipped",
            total: 129.99,
            items: [
                { name: "Dune", quantity: 1, price: 12.99 },
                { name: "The Silent Patient", quantity: 1, price: 14.99 },
            ],
            paymentMethod: "Credit Card",
            paymentStatus: "paid",
            shippingAddress: "123 Book Street, Dhaka, Bangladesh",
            trackingNumber: "TRK123456789",
            estimatedDelivery: "Feb 23, 2026"
        },
        {
            id: "#390",
            date: "Feb 18, 2026",
            status: "delivered",
            total: 89.99,
            items: [
                { name: "Project Hail Mary", quantity: 1, price: 18.99 },
            ],
            paymentMethod: "PayPal",
            paymentStatus: "paid",
            shippingAddress: "123 Book Street, Dhaka, Bangladesh",
            estimatedDelivery: "Feb 21, 2026"
        },
        {
            id: "#389",
            date: "Feb 15, 2026",
            status: "processing",
            total: 245.50,
            items: [
                { name: "The Psychology of Money", quantity: 2, price: 14.99 },
                { name: "Think and Grow Rich", quantity: 1, price: 12.99 },
                { name: "Rich Dad Poor Dad", quantity: 1, price: 15.99 },
            ],
            paymentMethod: "Credit Card",
            paymentStatus: "paid",
            shippingAddress: "123 Book Street, Dhaka, Bangladesh",
            estimatedDelivery: "Feb 24, 2026"
        },
        {
            id: "#388",
            date: "Feb 10, 2026",
            status: "cancelled",
            total: 67.98,
            items: [
                { name: "The Alchemist", quantity: 1, price: 11.99 },
                { name: "The Monk Who Sold His Ferrari", quantity: 1, price: 10.99 },
            ],
            paymentMethod: "Cash on Delivery",
            paymentStatus: "failed",
            shippingAddress: "123 Book Street, Dhaka, Bangladesh",
        }
    ];

    const getStatusColor = (status: string) => {
        const colors = {
            pending: "bg-yellow-500",
            processing: "bg-blue-500",
            shipped: "bg-purple-500",
            delivered: "bg-green-500",
            cancelled: "bg-red-500"
        };
        return colors[status as keyof typeof colors] || "bg-gray-500";
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending": return <Clock className="h-4 w-4" />;
            case "processing": return <Package className="h-4 w-4" />;
            case "shipped": return <Truck className="h-4 w-4" />;
            case "delivered": return <CheckCircle className="h-4 w-4" />;
            case "cancelled": return <XCircle className="h-4 w-4" />;
            default: return <Package className="h-4 w-4" />;
        }
    };

    const getPaymentStatusColor = (status: string) => {
        const colors = {
            paid: "bg-green-500",
            pending: "bg-yellow-500",
            failed: "bg-red-500"
        };
        return colors[status as keyof typeof colors] || "bg-gray-500";
    };

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const viewOrderDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6 w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Orders
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track and manage your orders
                    </p>
                </div>

                {/* Stats Badge */}
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-1">
                        Total Orders: {orders.length}
                    </Badge>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search by order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>All Orders</DropdownMenuItem>
                        <DropdownMenuItem>Pending</DropdownMenuItem>
                        <DropdownMenuItem>Processing</DropdownMenuItem>
                        <DropdownMenuItem>Shipped</DropdownMenuItem>
                        <DropdownMenuItem>Delivered</DropdownMenuItem>
                        <DropdownMenuItem>Cancelled</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </div>

            {/* Orders Table Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-b">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                        Order History
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                                <TableHead className="font-semibold">Order ID</TableHead>
                                <TableHead className="font-semibold">Date</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Total</TableHead>
                                <TableHead className="font-semibold text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                                        onClick={() => viewOrderDetails(order)}
                                    >
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                {order.date}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`} />
                                                <span className="capitalize flex items-center gap-1">
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold">₱{order.total.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    viewOrderDetails(order);
                                                }}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Package className="h-12 w-12 mb-4 text-gray-400" />
                                            <p className="text-lg font-medium mb-2">No orders found</p>
                                            <p className="text-sm">Try searching with a different order ID</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Order Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            Order {selectedOrder?.id}
                            {selectedOrder && (
                                <Badge className={getStatusColor(selectedOrder.status)}>
                                    {selectedOrder.status}
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            Placed on {selectedOrder?.date}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Payment Status</p>
                                    <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                                        {selectedOrder.paymentStatus}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Shipping Address</p>
                                    <p className="font-medium text-sm">{selectedOrder.shippingAddress}</p>
                                </div>
                                {selectedOrder.trackingNumber && (
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Tracking Number</p>
                                        <p className="font-medium text-sm">{selectedOrder.trackingNumber}</p>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Order Items */}
                            <div>
                                <h4 className="font-semibold mb-3">Order Items</h4>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
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

                            <Separator />

                            {/* Total */}
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">Total Amount</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    ₱{selectedOrder.total.toFixed(2)}
                                </p>
                            </div>

                            {/* Estimated Delivery */}
                            {selectedOrder.estimatedDelivery && (
                                <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4">
                                    <p className="text-sm text-blue-600 dark:text-blue-400">
                                        Estimated Delivery: {selectedOrder.estimatedDelivery}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}