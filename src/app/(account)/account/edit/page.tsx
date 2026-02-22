/* eslint-disable react/no-unescaped-entities */
// app/account/settings/page.tsx
"use client";

import {
    Camera,
    Mail,
    MapPin,
    Phone,
    Save,
    User
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
}

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        name: "Ibrahim Sikder",
        email: "ibrahim.sikder503@gmail.com",
        phone: "+8801825445033",
        address: "Dhaka, Bangladesh",
        bio: "Book lover and avid reader. Always looking for my next adventure between the pages."
    });

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
    };

    return (
        <div className="space-y-6 w-full ">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Account Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Update your personal information
                </p>
            </div>

            {/* Profile Settings Card */}
            <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-b">
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Profile Information
                    </CardTitle>
                    <CardDescription>
                        Update your personal information and how others see you on the platform
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 ring-4 ring-blue-500 ring-offset-4">
                                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                                    IS
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
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
                        {/* Full Name */}
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

                        {/* Email Address */}
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

                        {/* Phone Number */}
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

                        {/* Address */}
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

                        {/* Bio - Full Width */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                                id="bio"
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Tell us a little about yourself..."
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    size="lg"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all min-w-[200px]"
                >
                    {isSaving ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                        </div>
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