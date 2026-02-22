// components/product/PDFReaderModal.tsx
"use client";

import Portal from "@/components/Portal";
import { cn } from "@/lib/utils";
import {
    Book,
    BookOpen,
    ChevronRight,
    Download,
    Menu,
    Printer,
    Search,
    X,
    ZoomIn,
    ZoomOut
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Sample PDF pages data
const SAMPLE_PAGES = [
    {
        page: 1,
        content: "সূরা আল-ফাতিহা\n\nপরম করুণাময়, অতি দয়ালু আল্লাহর নামে শুরু করছি\n\n১. সমস্ত প্রশংসা আল্লাহর, যিনি সকল সৃষ্টির রব\n২. পরম করুণাময়, অতি দয়ালু\n৩. বিচার দিনের মালিক\n৪. আমরা একমাত্র তোমারই ইবাদত করি এবং শুধু তোমারই কাছে সাহায্য চাই\n৫. আমাদেরকে সরল পথ দেখাও\n৬. তাদের পথ, যাদেরকে তুমি নিয়ামত দান করেছ\n৭. তাদের পথ নয়, যাদের উপর তোমার গজব নেমেছে এবং যারা পথভ্রষ্ট হয়েছে",
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    },
    {
        page: 2,
        content: "সূরা আল-বাকারাহ (আয়াত ১-৫)\n\n১. আলিফ-লাম-মীম\n২. এ কিতাব! এতে কোন সন্দেহ নেই। মুত্তাকীদের জন্য পথনির্দেশ\n৩. যারা গায়েবের উপর ঈমান আনে, সালাত কায়েম করে এবং আমি তাদেরকে যে রিজিক দিয়েছি তা থেকে ব্যয় করে\n৪. এবং যারা ঈমান আনে তার উপর যা তোমার প্রতি নাযিল হয়েছে এবং যা তোমার পূর্বে নাযিল হয়েছে এবং আখিরাতের প্রতি যা তারা নিশ্চিত বিশ্বাস রাখে\n৫. তারাই তাদের প্রতিপালকের পথনির্দেশের উপর রয়েছে এবং তারাই সফলকাম",
        arabic: "الٓمٓ\nذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ\nالَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ\nوَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ\nأُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ"
    },
    {
        page: 3,
        content: "সূরা আল-বাকারাহ (আয়াত ২৫৫) - আয়াতুল কুরসি\n\nআল্লাহ ছাড়া কোন সত্য ইলাহ নেই, তিনি চিরঞ্জীব, সবকিছুর ধারক। তাঁকে তন্দ্রাও স্পর্শ করতে পারে না, নিদ্রাও নয়। আসমান ও যমীনে যা কিছু রয়েছে সবই তাঁর। কে আছ এমন যে, তাঁর অনুমতি ছাড়া তাঁর কাছে সুপারিশ করবে? তাদের সামনে ও পিছনে যা কিছু আছে তা তিনি জানেন। তাঁর জ্ঞানসীমা থেকে তারা কিছুই আয়ত্ত করতে পারে না, তবে যা তিনি ইচ্ছে করেন। তাঁর সিংহাসন আসমান ও যমীনকে পরিবেষ্টিত করে আছে। আর সেগুলোর সংরক্ষণ তাঁকে ক্লান্ত করে না। তিনিই সর্বোচ্চ, সর্বমহান।",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ"
    },
    {
        page: 4,
        content: "সূরা ইয়াসিন (আয়াত ১-১০)\n\n১. ইয়া-সীন\n২. জ্ঞানগর্ভ কুরআনের শপথ\n৩. নিশ্চয় আপনি রাসূলগণের একজন\n৪. সরল পথে প্রতিষ্ঠিত\n৫. পরাক্রমশালী, পরম দয়ালু আল্লাহর নিকট থেকে নাযিলকৃত\n৬. যাতে আপনি সতর্ক করতে পারেন এক সম্প্রদায়কে, যাদের পিতৃপুরুষদের সতর্ক করা হয়নি, তাই তারা গাফিল\n৭. তাদের অধিকাংশের উপর সেই উক্তি সত্য প্রমাণিত হয়েছে, ফলে তারা ঈমান আনে না",
        arabic: "يسٓ\nوَالْقُرْآنِ الْحَكِيمِ\nإِنَّكَ لَمِنَ الْمُرْسَلِينَ\nعَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ\nتَنزِيلَ الْعَزِيزِ الرَّحِيمِ\nلِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ\nلَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ"
    }
];

interface PDFReaderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PDFReaderModal({ isOpen, onClose }: PDFReaderModalProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [bookmark, setBookmark] = useState<number[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Handle click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const totalPages = SAMPLE_PAGES.length;

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    const toggleBookmark = () => {
        if (bookmark.includes(currentPage)) {
            setBookmark(bookmark.filter(p => p !== currentPage));
        } else {
            setBookmark([...bookmark, currentPage]);
        }
    };

    const currentPageData = SAMPLE_PAGES[currentPage - 1];

    return (
        <Portal>
            <div
                className="fixed inset-0 flex items-center justify-center p-4"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999999,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                }}
                onClick={handleBackdropClick}
            >
                {/* Modal Container */}
                <div
                    ref={modalRef}
                    className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200 flex flex-col"
                    style={{
                        zIndex: 10000000,
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-amber-700" size={24} />
                            <div>
                                <h2 className="text-lg font-black text-[#1c1713]" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                    আল-কুরআনের সহজ বাংলা অনুবাদ
                                </h2>
                                <p className="text-xs text-amber-700/60">নমুনা পাঠ {currentPage} / {totalPages}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="p-2 hover:bg-amber-100 rounded-xl transition-colors text-amber-700"
                            >
                                <Menu size={18} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-red-100 rounded-xl transition-colors text-red-500"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex overflow-hidden min-h-0 bg-[#faf7f2]">
                        {/* Sidebar - Page Thumbnails */}
                        {showSidebar && (
                            <div className="w-64 border-r border-amber-100 bg-amber-50/80 overflow-y-auto p-4 flex-shrink-0">
                                <div className="mb-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="অনুসন্ধান..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-amber-400"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs font-black text-amber-700/60 mb-3 uppercase tracking-wider">পৃষ্ঠাসমূহ</h3>
                                <div className="space-y-2">
                                    {SAMPLE_PAGES.map((page, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPage(idx + 1)}
                                            className={cn(
                                                "w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3",
                                                currentPage === idx + 1
                                                    ? "border-amber-600 bg-amber-50 shadow-sm"
                                                    : "border-amber-100 hover:border-amber-300 bg-white"
                                            )}
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center text-amber-700 font-black text-xs flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-bold truncate">পৃষ্ঠা {idx + 1}</div>
                                                <div className="text-[10px] text-amber-700/60 truncate">
                                                    {page.content.substring(0, 20)}...
                                                </div>
                                            </div>
                                            {bookmark.includes(idx + 1) && (
                                                <Book size={12} className="text-amber-500 fill-amber-500 flex-shrink-0" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* PDF Reader Content */}
                        <div className="flex-1 flex flex-col overflow-hidden bg-[#faf7f2]">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between px-4 py-2 border-b border-amber-100 bg-white/80 backdrop-blur-sm flex-shrink-0">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="p-1.5 rounded-lg hover:bg-amber-100 disabled:opacity-30 transition-colors text-amber-700"
                                    >
                                        <ChevronRight size={16} className="rotate-180" />
                                    </button>
                                    <span className="text-sm font-black mx-2">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="p-1.5 rounded-lg hover:bg-amber-100 disabled:opacity-30 transition-colors text-amber-700"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}
                                        className="p-1.5 rounded-lg hover:bg-amber-100 transition-colors text-amber-700"
                                    >
                                        <ZoomIn size={14} />
                                    </button>
                                    <span className="text-xs font-bold w-12 text-center">{zoomLevel}%</span>
                                    <button
                                        onClick={() => setZoomLevel(prev => Math.max(50, prev - 25))}
                                        className="p-1.5 rounded-lg hover:bg-amber-100 transition-colors text-amber-700"
                                    >
                                        <ZoomOut size={14} />
                                    </button>
                                    <div className="w-px h-4 bg-amber-200 mx-2" />
                                    <button
                                        onClick={toggleBookmark}
                                        className={cn(
                                            "p-1.5 rounded-lg transition-colors",
                                            bookmark.includes(currentPage)
                                                ? "text-amber-600 bg-amber-100"
                                                : "text-amber-400 hover:bg-amber-50"
                                        )}
                                    >
                                        <Book size={14} fill={bookmark.includes(currentPage) ? "currentColor" : "none"} />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-amber-100 transition-colors text-amber-700">
                                        <Download size={14} />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-amber-100 transition-colors text-amber-700">
                                        <Printer size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Page Content */}
                            <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'thin' }}>
                                <div
                                    className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-amber-100 transition-all"
                                    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                                >
                                    {/* Page Header */}
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-100">
                                        <span className="text-xs font-bold text-amber-700/60">পৃষ্ঠা {currentPage}</span>
                                        {bookmark.includes(currentPage) && (
                                            <Book size={14} className="text-amber-500 fill-amber-500" />
                                        )}
                                    </div>

                                    {/* Arabic Text */}
                                    <div className="mb-8 text-right" dir="rtl">
                                        <p className="text-2xl font-arabic leading-loose text-gray-800" style={{ fontFamily: "'Traditional Arabic', 'Scheherazade', serif" }}>
                                            {currentPageData.arabic}
                                        </p>
                                    </div>

                                    {/* Bengali Translation */}
                                    <div className="space-y-4" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                                        {currentPageData.content.split('\n').map((line, i) => (
                                            <p key={i} className="text-gray-700 leading-relaxed text-justify">
                                                {line}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Page Footer */}
                                    <div className="mt-8 pt-4 border-t border-amber-100 flex justify-between items-center text-xs text-amber-700/60">
                                        <span>আল-কুরআনের সহজ বাংলা অনুবাদ - নমুনা</span>
                                        <span>পৃষ্ঠা {currentPage} / {totalPages}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}