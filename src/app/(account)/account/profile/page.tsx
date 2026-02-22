/* eslint-disable react/no-unescaped-entities */
// app/account/profile/page.tsx
"use client";

import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Edit2,
    Lock,
    Truck,
    Copy,
    Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);

    // Mock user data
    const [profile, setProfile] = useState<UserProfile>({
        name: "Ibrahim Sikder",
        email: "ibrahimsikder5033@gmail.com",
        phone: "+8801825445033",
        address: "Not provided",
    });

    const copyEmail = () => {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 w-full ">
            {/* Profile Header Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600" />
                <CardContent className="relative px-6 pb-6">
                    {/* Avatar - Positioned to overlap the gradient */}
                    <div className="flex items-end justify-between">
                        <div className="flex items-end gap-4 -mt-12">
                            <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-gray-900 shadow-xl">
                                <AvatarImage src="" alt={profile.name} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="pt-4">
                                <h1 className="text-2xl font-bold">{profile.name}</h1>
                                <div
                                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer group"
                                    onClick={copyEmail}
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>{profile.email}</span>
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Edit Profile Button */}
                        <Dialog open={isEditing} onOpenChange={setIsEditing}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Edit2 className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Update your personal information
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Save Changes
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

                    <div className="space-y-4">
                        {/* Phone */}
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                                <Phone className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{profile.phone}</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
                                <MapPin className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">{profile.address}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Account Settings Card */}
            <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

                    <div className="space-y-2">
                        {/* Change Password */}
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-900 transition-colors">
                                <Lock className="h-5 w-5 text-amber-600" />
                            </div>
                            <span className="font-medium flex-1 text-left">Change Password</span>
                        </button>

                        <Separator className="my-2" />

                        {/* Shipping Addresses */}
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900 transition-colors">
                                <Truck className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="font-medium flex-1 text-left">Shipping Addresses</span>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}