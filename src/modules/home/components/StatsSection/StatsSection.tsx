"use client"

import { useEffect, useState, useRef } from "react"
import { Building, Users, Star, Award } from "lucide-react"

import HeaderStatsSection from "./components/HeaderStatsSection"
import BackGroundsStatsSections from "./components/BackGroundsStatsSections"
import StatsCountItem from "./components/StatsCountItem"
import CallToActionSection from "./components/CallToActionSection"
const stats = [
    {
        icon: Building,
        value: 5000,
        suffix: "+",
        label: "Căn hộ có sẵn",
        description: "Trên toàn thành phố",
        duration: 2000,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-500/10",
        iconColor: "text-blue-500",
    },
    {
        icon: Users,
        value: 50000,
        suffix: "+",
        label: "Khách hàng hài lòng",
        description: "Đã tin tưởng lựa chọn",
        duration: 2500,
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-500/10",
        iconColor: "text-emerald-500",
    },
    {
        icon: Star,
        value: 4.9,
        suffix: "/5",
        label: "Đánh giá trung bình",
        description: "Từ khách hàng",
        duration: 1500,
        isDecimal: true,
        color: "from-amber-500 to-amber-600",
        bgColor: "bg-amber-500/10",
        iconColor: "text-amber-500",
    },
    {
        icon: Award,
        value: 10,
        suffix: "+",
        label: "Năm kinh nghiệm",
        description: "Trong lĩnh vực BDS",
        duration: 1800,
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-500/10",
        iconColor: "text-purple-500",
    },
]



export default function StatsSection() {
    const [completedAnimations, setCompletedAnimations] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [animationsStarted, setAnimationsStarted] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animationsStarted) {
                    setIsVisible(true)
                    setAnimationsStarted(true)
                }
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [animationsStarted])

    const handleAnimationComplete = () => {
        setCompletedAnimations((prev) => {
            const newCount = prev + 1
            return newCount
        })
    }

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <BackGroundsStatsSections />
            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <HeaderStatsSection isVisible={isVisible} />

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <StatsCountItem key={index} stat={stat} index={index} isVisible={isVisible} handleAnimationComplete={handleAnimationComplete} completedAnimations={completedAnimations} />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <CallToActionSection isVisible={isVisible} />
            </div>
        </section>
    )
}
