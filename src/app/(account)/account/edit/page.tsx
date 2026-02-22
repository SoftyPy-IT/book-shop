/* eslint-disable react/no-unescaped-entities */
// app/account/settings/page.tsx
"use client";

import {
    Camera,
    CreditCard,
    Lock,
    Mail,
    MapPin,
    Phone,
    Save,
    Shield,
    Smartphone,
    Trash2,
    User
} from "lucide-react";
import { useState } from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotificationSetting {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

export default function SettingsPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [profile, setProfile] = useState({
        name: "Ibrahim Sikder",
        email: "ibrahim.sikder503@gmail.com",
        phone: "+8801825445033",
        address: "Dhaka, Bangladesh",
        bio: "Book lover and avid reader. Always looking for my next adventure between the pages."
    });

    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: "order_updates",
            label: "Order Updates",
            description: "Receive notifications about your order status",
            enabled: true
        },
        {
            id: "promotions",
            label: "Promotions",
            description: "Get updates about sales and new arrivals",
            enabled: false
        },
        {
            id: "wishlist",
            label: "Wishlist Alerts",
            description: "Get notified when items in your wishlist are on sale",
            enabled: true
        },
        {
            id: "reviews",
            label: "Review Reminders",
            description: "Receive reminders to review purchased books",
            enabled: true
        }
    ]);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
    };

    const toggleNotification = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
        ));
    };

    return (
        <div className="space-y-8 w-full ">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Account Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage your account preferences and personal information
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information and how others see you on the platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Avatar className="h-24 w-24 ring-4 ring-blue-500 ring-offset-4">
                                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                                            IS
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="icon"
                                        className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700 text-white h-8 w-8"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Profile Photo</h3>
                                    <p className="text-sm text-gray-500">Click the camera icon to update your photo</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="phone"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="address"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <textarea
                                        id="bio"
                                        rows={4}
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose what updates you'd like to receive
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">{notification.label}</Label>
                                        <p className="text-sm text-gray-500">{notification.description}</p>
                                    </div>
                                    <Switch
                                        checked={notification.enabled}
                                        onCheckedChange={() => toggleNotification(notification.id)}
                                    />
                                </div>
                            ))}

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="font-semibold">Email Notifications</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Marketing Emails</Label>
                                        <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Newsletter</Label>
                                        <p className="text-sm text-gray-500">Weekly book recommendations and news</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>
                                Manage your password and security preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Change Password */}
                            <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Change Password
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label>Current Password</Label>
                                        <Input type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>New Password</Label>
                                        <Input type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Confirm New Password</Label>
                                        <Input type="password" />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Two-Factor Authentication */}
                            <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Two-Factor Authentication
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Enable 2FA</p>
                                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>

                            <Separator />

                            {/* Connected Devices */}
                            <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    Connected Devices
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div>
                                            <p className="font-medium">iPhone 14 Pro</p>
                                            <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
                                        </div>
                                        <Badge variant="outline">Current</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div>
                                            <p className="font-medium">MacBook Pro</p>
                                            <p className="text-sm text-gray-500">Last active: 2 days ago</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-500">
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>
                                Manage your saved payment methods and billing information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Saved Cards */}
                            <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Saved Cards
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-5 w-5 text-blue-600" />
                                                <span className="font-medium">Visa ending in 4242</span>
                                            </div>
                                            <Badge>Default</Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">Expires 12/25</p>
                                    </div>
                                    <div className="relative p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <CreditCard className="h-5 w-5 text-purple-600" />
                                            <span className="font-medium">Mastercard ending in 8888</span>
                                        </div>
                                        <p className="text-sm text-gray-500">Expires 08/24</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Add New Card
                                </Button>
                            </div>

                            <Separator />

                            {/* Billing Address */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Default Billing Address</h3>
                                <div className="p-4 border rounded-lg">
                                    <p className="font-medium">Ibrahim Sikder</p>
                                    <p className="text-sm text-gray-500">123 Book Street</p>
                                    <p className="text-sm text-gray-500">Dhaka, Bangladesh 1200</p>
                                    <p className="text-sm text-gray-500">Phone: +8801825445033</p>
                                    <Button variant="link" className="mt-2 p-0">
                                        Edit Address
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Preferences</CardTitle>
                            <CardDescription>
                                Customize your experience on our platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Language */}
                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                        <SelectItem value="bn">Bengali</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Currency */}
                            <div className="space-y-2">
                                <Label>Currency</Label>
                                <Select defaultValue="usd">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usd">USD ($)</SelectItem>
                                        <SelectItem value="eur">EUR (€)</SelectItem>
                                        <SelectItem value="gbp">GBP (£)</SelectItem>
                                        <SelectItem value="bdt">BDT (৳)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Theme */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Dark Mode</Label>
                                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                                </div>
                                <Switch
                                    checked={isDarkMode}
                                    onCheckedChange={setIsDarkMode}
                                />
                            </div>

                            <Separator />

                            {/* Data & Privacy */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Data & Privacy</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Share usage data</p>
                                        <p className="text-sm text-gray-500">Help us improve by sharing anonymous usage data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>

                            <Separator />

                            {/* Delete Account */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-red-600">Danger Zone</h3>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="w-full">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                account and remove all your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                                Delete Account
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end sticky bottom-8">
                <Button
                    size="lg"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                    {isSaving ? (
                        <>Saving...</>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}