/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { Address, FormErrors } from "@/interface";
import { CART_ITEMS, COUPONS, DELIVERY_OPTIONS, PAYMENT_METHODS, SAVED_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
    AlertCircle,
    AlertTriangle,
    Award,
    BookOpen,
    Briefcase,
    Building,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy,
    CreditCard,
    Edit3,
    Gift,
    Heart,
    Home,
    Info,
    Mail,
    Map,
    MapPin,
    Minus,
    Navigation,
    Package,
    Phone,
    Plus,
    RotateCcw,
    Shield,
    ShoppingBag,
    Trash2,
    Truck,
    User,
    Wallet,
    X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";


/* ═══════════════════════════════════════════════
   ADDRESS FORM COMPONENT
═══════════════════════════════════════════════ */
const AddressForm = ({ onSave, onCancel, initialData }: { onSave: (address: any) => void; onCancel: () => void; initialData?: Address }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        phone: initialData?.phone || "",
        email: initialData?.email || "",
        address: initialData?.address || "",
        area: initialData?.area || "",
        city: initialData?.city || "",
        postalCode: initialData?.postalCode || "",
        type: initialData?.type || "home" as const,
        landmark: initialData?.landmark || "",
        default: initialData?.default || false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return "নাম আবশ্যক";
                if (value.trim().length < 3) return "নাম কমপক্ষে ৩ অক্ষর হতে হবে";
                return "";
            case 'phone':
                if (!value.trim()) return "মোবাইল নম্বর আবশ্যক";
                if (!/^(01[3-9]\d{8})$/.test(value.trim())) return "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)";
                return "";
            case 'address':
                if (!value.trim()) return "ঠিকানা আবশ্যক";
                if (value.trim().length < 5) return "ঠিকানা কমপক্ষে ৫ অক্ষর হতে হবে";
                return "";
            case 'area':
                if (!value.trim()) return "এলাকা/থানা আবশ্যক";
                return "";
            case 'city':
                if (!value.trim()) return "শহর/জেলা আবশ্যক";
                return "";
            case 'postalCode':
                if (value && !/^\d{4}$/.test(value)) return "সঠিক পোস্টাল কোড দিন (৪ ডিজিট)";
                return "";
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "সঠিক ইমেইল দিন";
                return "";
            default:
                return "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Required fields validation
        if (!formData.name.trim()) {
            newErrors.name = "নাম আবশ্যক";
            isValid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "মোবাইল নম্বর আবশ্যক";
            isValid = false;
        }
        if (!formData.address.trim()) {
            newErrors.address = "ঠিকানা আবশ্যক";
            isValid = false;
        }
        if (!formData.area.trim()) {
            newErrors.area = "এলাকা/থানা আবশ্যক";
            isValid = false;
        }
        if (!formData.city.trim()) {
            newErrors.city = "শহর/জেলা আবশ্যক";
            isValid = false;
        }

        // Format validation
        if (formData.phone && !/^(01[3-9]\d{8})$/.test(formData.phone)) {
            newErrors.phone = "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)";
            isValid = false;
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "সঠিক ইমেইল দিন";
            isValid = false;
        }
        if (formData.postalCode && !/^\d{4}$/.test(formData.postalCode)) {
            newErrors.postalCode = "সঠিক পোস্টাল কোড দিন (৪ ডিজিট)";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                    <User size={12} className="text-amber-500" />
                    প্রাপকের নাম <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="আপনার পুরো নাম লিখুন"
                    className={cn(
                        "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                        errors.name && touched.name
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    )}
                />
                {errors.name && touched.name && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.name}
                    </p>
                )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Phone size={12} className="text-amber-500" />
                        মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="01712345678"
                        maxLength={11}
                        className={cn(
                            "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                            errors.phone && touched.phone
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        )}
                    />
                    {errors.phone && touched.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.phone}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Mail size={12} className="text-amber-500" />
                        ইমেইল (ঐচ্ছিক)
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="email@example.com"
                        className={cn(
                            "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                            errors.email && touched.email
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        )}
                    />
                    {errors.email && touched.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.email}
                        </p>
                    )}
                </div>
            </div>

            {/* Address */}
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                    <MapPin size={12} className="text-amber-500" />
                    বিস্তারিত ঠিকানা <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="বাড়ি নম্বর, রোড নম্বর, ব্লক ইত্যাদি"
                    rows={2}
                    className={cn(
                        "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none",
                        errors.address && touched.address
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    )}
                />
                {errors.address && touched.address && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.address}
                    </p>
                )}
            </div>

            {/* Area & City */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Map size={12} className="text-amber-500" />
                        এলাকা/থানা <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ধানমন্ডি"
                        className={cn(
                            "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                            errors.area && touched.area
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        )}
                    />
                    {errors.area && touched.area && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.area}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Building size={12} className="text-amber-500" />
                        শহর/জেলা <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ঢাকা"
                        className={cn(
                            "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                            errors.city && touched.city
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        )}
                    />
                    {errors.city && touched.city && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.city}
                        </p>
                    )}
                </div>
            </div>

            {/* Postal Code & Landmark */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Navigation size={12} className="text-amber-500" />
                        পোস্টাল কোড
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="১২০৫"
                        maxLength={4}
                        className={cn(
                            "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                            errors.postalCode && touched.postalCode
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        )}
                    />
                    {errors.postalCode && touched.postalCode && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.postalCode}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Info size={12} className="text-amber-500" />
                        ল্যান্ডমার্ক (ঐচ্ছিক)
                    </label>
                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="মসজিদের পাশে"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                    />
                </div>
            </div>

            {/* Address Type */}
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">ঠিকানার ধরণ</label>
                <div className="flex gap-3">
                    {[
                        { value: 'home', label: 'বাড়ি', icon: Home },
                        { value: 'office', label: 'অফিস', icon: Briefcase },
                        { value: 'other', label: 'অন্যান্য', icon: MapPin },
                    ].map((type) => {
                        const Icon = type.icon;
                        return (
                            <label key={type.value} className="flex-1">
                                <input
                                    type="radio"
                                    name="type"
                                    value={type.value}
                                    checked={formData.type === type.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={cn(
                                    "flex items-center justify-center gap-2 py-3 px-2 rounded-xl border-2 cursor-pointer transition-all",
                                    formData.type === type.value
                                        ? "border-amber-500 bg-amber-50 text-amber-700"
                                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                                )}>
                                    <Icon size={16} />
                                    <span className="text-xs font-bold">{type.label}</span>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Default Address Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    name="default"
                    checked={formData.default}
                    onChange={handleChange}
                    className="w-4 h-4 accent-amber-500 rounded"
                />
                <span className="text-xs text-gray-600">এই ঠিকানা ডিফল্ট হিসেবে সেট করুন</span>
            </label>

            {/* Required Fields Note */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-700 flex items-center gap-1">
                    <AlertCircle size={12} />
                    <span className="font-bold">*</span> চিহ্নিত ফিল্ডগুলি অবশ্যই পূরণ করতে হবে
                </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    className="flex-1 h-12 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                >
                    ঠিকানা সংরক্ষণ করুন
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 h-12 border-2 border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                >
                    বাতিল করুন
                </button>
            </div>
        </form>
    );
};

/* ═══════════════════════════════════════════════
   ADDRESS CARD COMPONENT
═══════════════════════════════════════════════ */
const AddressCard = ({ address, selected, onSelect, onEdit, onDelete }: any) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'home': return <Home size={16} className="text-amber-500" />;
            case 'office': return <Briefcase size={16} className="text-amber-500" />;
            default: return <MapPin size={16} className="text-amber-500" />;
        }
    };

    return (
        <div
            onClick={() => onSelect(address.id)}
            className={cn(
                "relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-md",
                selected ? "border-amber-500 bg-amber-50/20" : "border-gray-100 hover:border-gray-200"
            )}
        >
            {address.default && (
                <span className="absolute top-3 right-3 text-[9px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 size={10} /> ডিফল্ট
                </span>
            )}

            <div className="flex items-start gap-3 mb-3">
                <div className={cn(
                    "p-2 rounded-lg",
                    selected ? "bg-amber-100" : "bg-gray-100"
                )}>
                    {getIcon(address.type)}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{address.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{address.phone}</p>
                </div>
            </div>

            <div className="space-y-1.5 mb-4">
                <p className="text-xs text-gray-700 leading-relaxed">
                    {address.address}
                </p>
                <p className="text-xs text-gray-600">
                    {address.area}, {address.city}
                </p>
                {address.postalCode && (
                    <p className="text-xs text-gray-500">পোস্টাল কোড: {address.postalCode}</p>
                )}
                {address.landmark && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info size={10} /> {address.landmark}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit?.(address.id); }}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"
                >
                    <Edit3 size={14} />
                </button>
                {!address.default && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(address.id); }}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>

            {selected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check size={12} className="text-white" />
                </div>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════
   CART ITEM COMPONENT
═══════════════════════════════════════════════ */
const CartItem = ({ item, onUpdateQuantity, onRemove }: any) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (newQty: number) => {
        if (newQty >= 1 && newQty <= 99) {
            setQuantity(newQty);
            onUpdateQuantity?.(item.id, newQty);
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 hover:border-gray-200">
            <div className="flex gap-4">
                {/* Book Image */}
                <div className="w-20 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                            <p className="text-xs text-gray-500 mb-2">{item.author}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.edition}</span>
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.language}</span>
                                {item.inStock && (
                                    <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                        <CheckCircle2 size={8} /> স্টকে আছে
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => onRemove?.(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-gray-900">৳{item.price * quantity}</span>
                                <span className="text-xs text-gray-400 line-through">৳{item.original * quantity}</span>
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full">
                                    {Math.round(((item.original - item.price) / item.original) * 100)}% ছাড়
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">প্রতি কপি ৳{item.price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-700 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                                <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-gray-900">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-700 transition-colors"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   PAYMENT METHOD CARD
═══════════════════════════════════════════════ */
const PaymentMethodCard = ({ method, selected, onSelect }: any) => {
    return (
        <button
            onClick={() => onSelect(method.id)}
            className={cn(
                "relative w-full p-5 bg-white rounded-2xl border-2 transition-all text-left hover:shadow-md",
                selected ? "border-amber-500 bg-amber-50/20" : "border-gray-100 hover:border-gray-200"
            )}
        >
            {method.popular && (
                <span className="absolute top-2 right-2 text-[8px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                    জনপ্রিয়
                </span>
            )}
            <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{method.icon}</span>
                <div>
                    <h4 className="font-bold text-gray-900 text-base">{method.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">{method.extra}</p>
            {selected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check size={12} className="text-white" />
                </div>
            )}
        </button>
    );
};

/* ═══════════════════════════════════════════════
   COUPON INPUT COMPONENT
═══════════════════════════════════════════════ */
const CouponInput = ({ onApply }: { onApply?: (discount: number) => void }) => {
    const [code, setCode] = useState("");
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState("");

    const handleApply = () => {
        if (!code.trim()) {
            setError("কুপন কোড দিন");
            return;
        }

        // Simulate coupon validation
        const coupon = COUPONS.find(c => c.code === code.toUpperCase());
        if (coupon) {
            setApplied(true);
            setError("");
            if (onApply) {
                const discount = coupon.type === 'percentage' ? 50 : coupon.discount;
                onApply(discount);
            }
            setTimeout(() => setApplied(false), 3000);
        } else {
            setError("ভুল কুপন কোড");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Gift size={16} className="text-amber-500" />
                কুপন কোড প্রয়োগ করুন
            </h3>

            <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setError("");
                        }}
                        placeholder="কুপন কোড লিখুন"
                        className={cn(
                            "w-full h-11 px-4 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors",
                            error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        )}
                    />
                </div>
                <button
                    onClick={handleApply}
                    className="px-6 h-11 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2"
                >
                    প্রয়োগ
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600">
                    <AlertCircle size={14} />
                    <span className="text-xs font-medium">{error}</span>
                </div>
            )}

            {applied && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 size={14} />
                    <span className="text-xs font-medium">কুপন সফলভাবে প্রয়োগ করা হয়েছে!</span>
                </div>
            )}

            <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 mb-2">উপলব্ধ কুপন:</p>
                {COUPONS.map((coupon) => (
                    <div key={coupon.code} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                        <div>
                            <span className="text-xs font-bold text-gray-900">{coupon.code}</span>
                            <p className="text-[9px] text-gray-400 mt-0.5">মেয়াদ: {coupon.expiry}</p>
                        </div>
                        <button
                            onClick={() => setCode(coupon.code)}
                            className="p-1.5 hover:bg-white rounded-lg transition-colors text-amber-600"
                        >
                            <Copy size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   DELIVERY OPTION COMPONENT
═══════════════════════════════════════════════ */
const DeliveryOption = ({ option, selected, onSelect, subtotal }: any) => {
    const Icon = option.icon;
    const isFree = option.free && subtotal >= 500;
    const finalPrice = isFree ? 0 : option.price;

    return (
        <label
            className={cn(
                "relative block p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md",
                selected ? "border-amber-500 bg-amber-50/20" : "border-gray-100 hover:border-gray-200"
            )}
        >
            <input
                type="radio"
                name="delivery"
                value={option.id}
                checked={selected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
            />
            <div className="flex items-start gap-3">
                <div className={cn(
                    "p-2 rounded-xl transition-colors",
                    selected ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400"
                )}>
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">{option.name}</h4>
                        <span className="text-sm font-black text-gray-900">
                            {finalPrice === 0 ? "ফ্রি" : `৳${finalPrice}`}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{option.duration}</p>
                    <p className="text-[10px] text-gray-400">{option.description}</p>
                </div>
            </div>
            {isFree && (
                <span className="absolute top-2 right-2 text-[8px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                    ফ্রি ডেলিভারি
                </span>
            )}
            {selected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check size={12} className="text-white" />
                </div>
            )}
        </label>
    );
};

/* ═══════════════════════════════════════════════
   ORDER SUMMARY COMPONENT
═══════════════════════════════════════════════ */
const OrderSummary = ({ items, deliveryCharge, couponDiscount, onCheckout, disabled = false, error }: any) => {
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    const total = subtotal + deliveryCharge - couponDiscount;

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag size={18} className="text-amber-500" />
                অর্ডার সারসংক্ষেপ
            </h3>

            <div className="space-y-4 mb-6">
                {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-gray-100 rounded-full text-[10px] font-bold flex items-center justify-center text-gray-600">
                                {item.quantity}
                            </span>
                            <span className="text-gray-600 line-clamp-1">{item.title}</span>
                        </div>
                        <span className="font-bold text-gray-900">৳{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">সাবটোটাল</span>
                    <span className="font-medium text-gray-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ডেলিভারি চার্জ</span>
                    <span className="font-medium text-gray-900">৳{deliveryCharge}</span>
                </div>
                {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                        <span>কুপন ডিসকাউন্ট</span>
                        <span>-৳{couponDiscount}</span>
                    </div>
                )}
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <div className="flex justify-between items-center mb-6">
                <span className="text-base font-bold text-gray-900">মোট</span>
                <div className="text-right">
                    <span className="text-2xl font-black text-gray-900">৳{total}</span>
                    <p className="text-[10px] text-gray-400">সহ সব কর ও ভ্যাট</p>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600">
                    <AlertTriangle size={14} />
                    <span className="text-xs font-medium">{error}</span>
                </div>
            )}

            <button
                onClick={onCheckout}
                disabled={disabled}
                className={cn(
                    "w-full h-14 rounded-2xl font-black text-base flex items-center justify-center gap-2 mb-4 transition-all",
                    disabled
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20"
                )}
            >
                অর্ডার নিশ্চিত করুন
                <ChevronRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield size={12} />
                <span>নিরাপদ পেমেন্ট</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <Truck size={12} />
                <span>ফ্রি ডেলিভারি</span>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                    { icon: Shield, label: "নিরাপদ", value: "১০০%" },
                    { icon: Clock, label: "ফাস্ট", value: "ডেলিভারি" },
                    { icon: Award, label: "প্রিমিয়াম", value: "কোয়ালিটি" },
                ].map((badge, i) => (
                    <div key={i} className="text-center p-2 bg-gray-50 rounded-xl">
                        <badge.icon size={16} className="mx-auto mb-1 text-amber-500" />
                        <span className="text-[9px] font-bold text-gray-700 block">{badge.label}</span>
                        <span className="text-[8px] text-gray-400">{badge.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   MAIN CHECKOUT PAGE
═══════════════════════════════════════════════ */
export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [cartItems, setCartItems] = useState(CART_ITEMS);
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            name: "মোঃ মাহেদী হাসান",
            phone: "01712345678",
            email: "mahedi@example.com",
            address: "বাড়ি #১২৩, রোড #৪৫",
            area: "ধানমন্ডি",
            city: "ঢাকা",
            postalCode: "1205",
            type: "home",
            default: true,
            landmark: "ধানমন্ডি ২৭ নং বাসস্ট্যান্ডের কাছে",
        }
    ]);

    const [selectedAddress, setSelectedAddress] = useState<number | null>(1);
    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [selectedDelivery, setSelectedDelivery] = useState("standard");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [checkoutError, setCheckoutError] = useState("");

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryOption = DELIVERY_OPTIONS.find(d => d.id === selectedDelivery)!;
    const isDeliveryFree = deliveryOption.free && subtotal >= 500;
    const deliveryCharge = isDeliveryFree ? 0 : deliveryOption.price;
    const total = subtotal + deliveryCharge - couponDiscount;

    // Validate checkout
    const validateCheckout = (): boolean => {
        if (!selectedAddress) {
            setCheckoutError("অনুগ্রহ করে একটি ডেলিভারি ঠিকানা নির্বাচন করুন");
            return false;
        }
        if (!selectedPayment) {
            setCheckoutError("অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন");
            return false;
        }
        if (cartItems.length === 0) {
            setCheckoutError("আপনার কার্ট খালি");
            return false;
        }
        return true;
    };

    const handlePlaceOrder = () => {
        if (validateCheckout()) {
            setOrderPlaced(true);
            setTimeout(() => {
                // Redirect to success page or show modal
            }, 2000);
        }
    };

    const handleUpdateQuantity = (id: number, newQty: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        ));
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleAddAddress = (addressData: any) => {
        const newAddress: Address = {
            ...addressData,
            id: Date.now(),
            default: addresses.length === 0 ? true : addressData.default,
        };

        if (newAddress.default) {
            setAddresses(prev => prev.map(addr => ({ ...addr, default: false })));
        }

        setAddresses(prev => [...prev, newAddress]);
        setSelectedAddress(newAddress.id);
        setShowAddressForm(false);
        setEditingAddress(null);
    };

    const handleEditAddress = (addressId: number) => {
        const address = addresses.find(a => a.id === addressId);
        if (address) {
            setEditingAddress(address);
            setShowAddressForm(true);
        }
    };

    const handleUpdateAddress = (addressData: any) => {
        if (editingAddress) {
            const updatedAddress: Address = {
                ...addressData,
                id: editingAddress.id,
            };

            if (updatedAddress.default) {
                setAddresses(prev => prev.map(addr =>
                    addr.id === editingAddress.id ? updatedAddress : { ...addr, default: false }
                ));
            } else {
                setAddresses(prev => prev.map(addr =>
                    addr.id === editingAddress.id ? updatedAddress : addr
                ));
            }

            setShowAddressForm(false);
            setEditingAddress(null);
        }
    };

    const handleDeleteAddress = (addressId: number) => {
        setAddresses(prev => prev.filter(a => a.id !== addressId));
        if (selectedAddress === addressId) {
            const defaultAddress = addresses.find(a => a.id !== addressId && a.default);
            setSelectedAddress(defaultAddress?.id || addresses[0]?.id || null);
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4">অর্ডার সফল হয়েছে!</h1>
                    <p className="text-gray-600 mb-2">আপনার অর্ডার  গ্রহণ করা হয়েছে।</p>
                    <p className="text-sm text-gray-500 mb-8">অর্ডার কনফার্মেশন এসএমএস পাঠানো হবে {addresses.find(a => a.id === selectedAddress)?.phone} নম্বরে</p>
                    <Link href="/">
                        <button className="px-8 h-12 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                            শপিং চালিয়ে যান
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-[1300px] mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <BookOpen className="text-amber-500" size={24} />
                            <span className="text-xl font-black text-gray-900">BoiBazar</span>
                        </Link>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                {[
                                    { num: 1, label: "কার্ট" },
                                    { num: 2, label: "চেকআউট" },
                                    { num: 3, label: "অর্ডার সম্পন্ন" },
                                ].map((s, i) => (
                                    <div key={s.num} className="flex items-center">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors",
                                            step >= s.num ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-400"
                                        )}>
                                            {s.num}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold ml-2",
                                            step >= s.num ? "text-gray-900" : "text-gray-400"
                                        )}>
                                            {s.label}
                                        </span>
                                        {i < 2 && <ChevronRight size={14} className="mx-3 text-gray-300" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1300px] mx-auto px-4 py-8">
                {/* Step 1: Cart Review */}
                {step === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <ShoppingBag size={20} className="text-amber-500" />
                                    আপনার কার্ট ({cartItems.length}টি আইটেম)
                                </h2>

                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500 mb-4">আপনার কার্ট খালি</p>
                                        <Link href="/">
                                            <button className="px-6 h-10 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors">
                                                শপিং করুন
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                onUpdateQuantity={handleUpdateQuantity}
                                                onRemove={handleRemoveItem}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Save for Later */}
                                {SAVED_ITEMS.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Heart size={14} className="text-gray-400" />
                                            সংরক্ষিত আইটেম ({SAVED_ITEMS.length})
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {SAVED_ITEMS.map((item) => (
                                                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                    <div className="w-12 h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                                                        <p className="text-[9px] text-gray-500 mb-1">{item.author}</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-xs font-black text-gray-900">৳{item.price}</span>
                                                            <span className="text-[8px] text-gray-400 line-through">৳{item.original}</span>
                                                        </div>
                                                    </div>
                                                    <button className="p-1.5 bg-white rounded-lg text-xs font-bold text-amber-600 hover:bg-amber-50 transition-colors">
                                                        কার্টে
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <OrderSummary
                                items={cartItems}
                                deliveryCharge={deliveryCharge}
                                couponDiscount={couponDiscount}
                                onCheckout={() => cartItems.length > 0 ? setStep(2) : setCheckoutError("আপনার কার্ট খালি")}
                                disabled={cartItems.length === 0}
                                error={checkoutError}
                            />

                            {/* Coupon Section */}
                            {cartItems.length > 0 && (
                                <div className="mt-4">
                                    <CouponInput onApply={(discount) => setCouponDiscount(discount)} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Checkout Details */}
                {step === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Delivery Address */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                        <MapPin size={20} className="text-amber-500" />
                                        ডেলিভারি ঠিকানা {!selectedAddress && (
                                            <span className="text-xs font-normal text-red-500 ml-2">(অনুগ্রহ করে ঠিকানা নির্বাচন করুন)</span>
                                        )}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingAddress(null);
                                            setShowAddressForm(true);
                                        }}
                                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors"
                                    >
                                        <Plus size={14} /> নতুন ঠিকানা যোগ করুন
                                    </button>
                                </div>

                                {showAddressForm ? (
                                    <div className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-gray-900">
                                                {editingAddress ? "ঠিকানা সম্পাদনা করুন" : "নতুন ঠিকানা যোগ করুন"}
                                            </h3>
                                            <button
                                                onClick={() => {
                                                    setShowAddressForm(false);
                                                    setEditingAddress(null);
                                                }}
                                                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                                            >
                                                <X size={16} className="text-gray-500" />
                                            </button>
                                        </div>
                                        <AddressForm
                                            onSave={editingAddress ? handleUpdateAddress : handleAddAddress}
                                            onCancel={() => {
                                                setShowAddressForm(false);
                                                setEditingAddress(null);
                                            }}
                                            initialData={editingAddress || undefined}
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {addresses.map((address) => (
                                            <AddressCard
                                                key={address.id}
                                                address={address}
                                                selected={selectedAddress === address.id}
                                                onSelect={setSelectedAddress}
                                                onEdit={handleEditAddress}
                                                onDelete={handleDeleteAddress}
                                            />
                                        ))}
                                    </div>
                                )}

                                {!selectedAddress && !showAddressForm && (
                                    <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2 text-amber-700">
                                        <AlertCircle size={16} />
                                        <span className="text-sm font-medium">অনুগ্রহ করে একটি ডেলিভারি ঠিকানা নির্বাচন করুন অথবা নতুন ঠিকানা যোগ করুন</span>
                                    </div>
                                )}
                            </div>

                            {/* Delivery Option */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <Truck size={20} className="text-amber-500" />
                                    ডেলিভারি অপশন
                                </h2>
                                <div className="space-y-3">
                                    {DELIVERY_OPTIONS.map((option) => (
                                        <DeliveryOption
                                            key={option.id}
                                            option={option}
                                            selected={selectedDelivery === option.id}
                                            onSelect={setSelectedDelivery}
                                            subtotal={subtotal}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <CreditCard size={20} className="text-amber-500" />
                                    পেমেন্ট পদ্ধতি {!selectedPayment && (
                                        <span className="text-xs font-normal text-red-500 ml-2">(পেমেন্ট পদ্ধতি নির্বাচন করুন)</span>
                                    )}
                                </h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {PAYMENT_METHODS.map((method) => (
                                        <PaymentMethodCard
                                            key={method.id}
                                            method={method}
                                            selected={selectedPayment === method.id}
                                            onSelect={setSelectedPayment}
                                        />
                                    ))}
                                </div>

                                {/* Cash on Delivery Note */}
                                {selectedPayment === "cod" && (
                                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <div className="flex items-start gap-2">
                                            <Wallet size={16} className="text-amber-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-amber-800 mb-1">ক্যাশ অন ডেলিভারি</p>
                                                <p className="text-xs text-amber-700">
                                                    পণ্য হাতে পেয়ে টাকা দিন। ডেলিভারি চার্জ {deliveryCharge}৳ সহ মোট {total}৳ পরিশোধ করবেন।
                                                </p>
                                                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                                    <CheckCircle2 size={12} />
                                                    অর্ডার কনফার্ম করতে কোন অগ্রিম পেমেন্ট প্রয়োজন নেই
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Online Payment Note */}
                                {selectedPayment !== "cod" && selectedPayment !== "" && (
                                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div className="flex items-start gap-2">
                                            <Shield size={16} className="text-blue-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-blue-800 mb-1">অনলাইন পেমেন্ট</p>
                                                <p className="text-xs text-blue-700">
                                                    পেমেন্ট সম্পন্ন হলে আপনার অর্ডার কনফার্ম হবে। SSL কমার্স দ্বারা সুরক্ষিত।
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Order Notes */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                                <h2 className="text-sm font-bold text-gray-900 mb-4">অর্ডার নোট (ঐচ্ছিক)</h2>
                                <textarea
                                    placeholder="যেমন: অফিস আওয়ারে ডেলিভারি দিবেন না, অথবা কোন স্পেসিফিক নির্দেশনা থাকলে লিখুন"
                                    rows={3}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                                />
                            </div>
                        </div>

                        {/* Order Summary with Checkout */}
                        <div className="lg:col-span-1 space-y-4">
                            <OrderSummary
                                items={cartItems}
                                deliveryCharge={deliveryCharge}
                                couponDiscount={couponDiscount}
                                onCheckout={handlePlaceOrder}
                                disabled={!selectedAddress || !selectedPayment}
                                error={checkoutError}
                            />

                            {/* Back to Cart */}
                            <button
                                onClick={() => {
                                    setStep(1);
                                    setCheckoutError("");
                                }}
                                className="w-full h-12 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                            >
                                <ChevronLeft size={16} />
                                কার্টে ফিরে যান
                            </button>

                            {/* Secure Checkout Badge */}
                            <div className="bg-gray-50 rounded-2xl p-4 text-center">
                                <Shield size={24} className="mx-auto mb-2 text-amber-500" />
                                <p className="text-xs font-bold text-gray-900 mb-1">নিরাপদ চেকআউট</p>
                                <p className="text-[9px] text-gray-400">আপনার তথ্য ১০০% সুরক্ষিত</p>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=50&q=80" alt="SSL" className="h-4" />
                                    <span className="text-[8px] text-gray-400">SSL কমার্স সার্টিফাইড</span>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                                <h4 className="text-xs font-bold text-gray-900 mb-3">ডেলিভারি তথ্য</h4>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-600 flex items-center gap-2">
                                        <Truck size={10} className="text-amber-500" />
                                        <span>ফ্রি ডেলিভারি ৫০০৳+ অর্ডারে</span>
                                    </p>
                                    <p className="text-[10px] text-gray-600 flex items-center gap-2">
                                        <RotateCcw size={10} className="text-amber-500" />
                                        <span>৭ দিনের রিটার্ন পলিসি</span>
                                    </p>
                                    <p className="text-[10px] text-gray-600 flex items-center gap-2">
                                        <Clock size={10} className="text-amber-500" />
                                        <span>ঢাকা সিটিতে ২৪-৪৮ ঘন্টার মধ্যে ডেলিভারি</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-100 mt-16 py-8 bg-gray-50/50">
                <div className="max-w-[1300px] mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Truck, title: "ফ্রি ডেলিভারি", desc: "৫০০৳+ অর্ডারে" },
                            { icon: RotateCcw, title: "৭ দিন রিটার্ন", desc: "সহজ রিটার্ন পলিসি" },
                            { icon: Shield, title: "নিরাপদ পেমেন্ট", desc: "SSL কমার্স" },
                            { icon: Clock, title: "২৪/৭ সাপোর্ট", desc: "সাপোর্ট টিম" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                <item.icon size={20} className="text-amber-500" />
                                <div>
                                    <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-[9px] text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}