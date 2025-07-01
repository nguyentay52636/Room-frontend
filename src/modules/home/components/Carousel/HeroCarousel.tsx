"use client"

import { useState, useEffect, useRef } from "react"
import AnimatedBackground from "./components/AnimatedBackground"
import ProgressBarCarousel from "./components/ProgressBarCarousel"
import NavigateControlsCarousel from "./components/NavigateControlsCarousel"
import { Clock, Heart, CheckCircle } from "lucide-react"
import MainContentCarousel from "./components/MainContentCarousel/MainContentCarousel"

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        badge: "🏆 Nền tảng cho thuê phòng trọ #1 Việt Nam",
        title: "Tìm phòng trọ lý tưởng",
        subtitle: "cho cuộc sống của bạn",
        description: "Khám phá hàng ngàn phòng trọ chất lượng với đầy đủ tiện nghi, giá cả hợp lý và vị trí thuận tiện.",
        features: [
            { icon: CheckCircle, text: "Xác thực 100%", color: "text-green-400" },
            { icon: Heart, text: "10K+ đánh giá tích cực", color: "text-red-400" },
            { icon: Clock, text: "Hỗ trợ 24/7", color: "text-blue-400" },
        ],
        overlayContent: {
            category: "Căn hộ cao cấp",
            title: "Vinhomes Central Park",
            location: "Quận Bình Thạnh, TP.HCM",
            price: "15-25 triệu/tháng",
            rating: 4.8,
            reviews: 234,
            amenities: ["WiFi", "Parking", "Security", "Pool"],
        },
        color: "from-blue-900 via-slate-900 to-gray-900",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        badge: "✨ Căn hộ cao cấp với view đẹp",
        title: "Không gian sống",
        subtitle: "hiện đại & tiện nghi",
        description: "Trải nghiệm cuộc sống đẳng cấp với những căn hộ được thiết kế hiện đại, đầy đủ nội thất cao cấp.",
        features: [
            { icon: CheckCircle, text: "Nội thất cao cấp", color: "text-green-400" },
            { icon: Heart, text: "View thành phố", color: "text-red-400" },
            { icon: Clock, text: "An ninh 24/7", color: "text-blue-400" },
        ],
        overlayContent: {
            category: "Studio hiện đại",
            title: "Masteri Millennium",
            location: "Quận 4, TP.HCM",
            price: "12-18 triệu/tháng",
            rating: 4.9,
            reviews: 156,
            amenities: ["WiFi", "Gym", "Security", "Garden"],
        },
        color: "from-emerald-900 via-teal-900 to-cyan-900",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        badge: "🏠 Không gian gia đình ấm cúng",
        title: "Thiết kế thông minh",
        subtitle: "tối ưu không gian",
        description: "Căn hộ được thiết kế thông minh với không gian mở, bếp hiện đại và khu vực sinh hoạt thoải mái.",
        features: [
            { icon: CheckCircle, text: "Thiết kế mở", color: "text-green-400" },
            { icon: Heart, text: "Bếp hiện đại", color: "text-red-400" },
            { icon: Clock, text: "Tiện ích đầy đủ", color: "text-blue-400" },
        ],
        overlayContent: {
            category: "Căn hộ gia đình",
            title: "Saigon South Residences",
            location: "Quận 7, TP.HCM",
            price: "20-35 triệu/tháng",
            rating: 4.7,
            reviews: 189,
            amenities: ["WiFi", "Parking", "Playground", "Mall"],
        },
        color: "from-purple-900 via-indigo-900 to-blue-900",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        badge: "🌆 Căn hộ view thành phố tuyệt đẹp",
        title: "Cuộc sống đẳng cấp",
        subtitle: "tại trung tâm thành phố",
        description: "Tận hưởng cuộc sống hiện đại với view toàn cảnh thành phố, tiện ích đầy đủ và dịch vụ 5 sao.",
        features: [
            { icon: CheckCircle, text: "View thành phố", color: "text-green-400" },
            { icon: Heart, text: "Tiện ích cao cấp", color: "text-red-400" },
            { icon: Clock, text: "Dịch vụ 24/7", color: "text-blue-400" },
        ],
        overlayContent: {
            category: "Penthouse cao cấp",
            title: "Landmark 81 Residences",
            location: "Quận Bình Thạnh, TP.HCM",
            price: "50-80 triệu/tháng",
            rating: 4.9,
            reviews: 89,
            amenities: ["WiFi", "Gym", "Pool", "Spa", "Concierge"],
        },
        color: "from-orange-900 via-red-900 to-pink-900",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        badge: "🏡 Căn hộ xanh mát với view sông",
        title: "Không gian xanh",
        subtitle: "gần gũi thiên nhiên",
        description: "Căn hộ với thiết kế xanh, view sông đẹp và không gian sống hài hòa với thiên nhiên.",
        features: [
            { icon: CheckCircle, text: "View sông đẹp", color: "text-green-400" },
            { icon: Heart, text: "Không gian xanh", color: "text-red-400" },
            { icon: Clock, text: "Môi trường trong lành", color: "text-blue-400" },
        ],
        overlayContent: {
            category: "Căn hộ view sông",
            title: "The Manor Mỹ Đình",
            location: "Quận Nam Từ Liêm, Hà Nội",
            price: "25-40 triệu/tháng",
            rating: 4.6,
            reviews: 203,
            amenities: ["WiFi", "Garden", "River View", "Security"],
        },
        color: "from-green-900 via-emerald-900 to-teal-900",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        badge: "🎨 Căn hộ thiết kế độc đáo",
        title: "Phong cách hiện đại",
        subtitle: "thiết kế độc đáo",
        description: "Căn hộ với thiết kế nội thất hiện đại, phong cách độc đáo và không gian sống sáng tạo.",
        features: [
            { icon: CheckCircle, text: "Thiết kế độc đáo", color: "text-green-400" },
            { icon: Heart, text: "Nội thất cao cấp", color: "text-red-400" },
            { icon: Clock, text: "Không gian sáng tạo", color: "text-blue-400" },
        ],
        overlayContent: {
            category: "Căn hộ thiết kế",
            title: "The Manor Premium",
            location: "Quận 1, TP.HCM",
            price: "30-45 triệu/tháng",
            rating: 4.8,
            reviews: 167,
            amenities: ["WiFi", "Design Studio", "Art Gallery", "Cafe"],
        },
        color: "from-indigo-900 via-purple-900 to-pink-900",
    },
]

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [searchData, setSearchData] = useState({
        location: "",
        priceRange: "",
        roomType: "",
    })
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isPlaying) return

        const timer = setInterval(() => {
            handleSlideChange((prev) => (prev + 1) % slides.length)
        }, 6000)

        return () => clearInterval(timer)
    }, [isPlaying, currentSlide])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                })
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener("mousemove", handleMouseMove)
            return () => container.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    const handleSlideChange = (newSlideOrFunction: number | ((prev: number) => number)) => {
        if (isTransitioning) return

        setIsTransitioning(true)
        const newSlide = typeof newSlideOrFunction === "function" ? newSlideOrFunction(currentSlide) : newSlideOrFunction

        setTimeout(() => {
            setCurrentSlide(newSlide)
            setTimeout(() => {
                setIsTransitioning(false)
            }, 100)
        }, 400)
    }

    const nextSlide = () => handleSlideChange((prev) => (prev + 1) % slides.length)
    const prevSlide = () => handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length)
    const goToSlide = (index: number) => handleSlideChange(index)

    const currentSlideData = slides[currentSlide]

    const handleSearch = () => {
        console.log("Search data:", searchData)
    }

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden -mt-16 lg:-mt-20">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <AnimatedBackground
                        key={index}
                        slide={slide}
                        index={index}
                        currentSlide={currentSlide}
                        mousePosition={mousePosition}
                    />
                ))}
            </div>

            {/* Main Content */}
            <MainContentCarousel currentSlideData={currentSlideData} isTransitioning={isTransitioning} mousePosition={mousePosition} />
            {/* Navigation Controls */}
            <NavigateControlsCarousel currentSlide={currentSlide} slides={slides} isTransitioning={isTransitioning} prevSlide={prevSlide} nextSlide={nextSlide} goToSlide={goToSlide} />
            {/* Progress Bar */}
            <ProgressBarCarousel currentSlide={currentSlide} slides={slides} />
        </section>
    )
}
