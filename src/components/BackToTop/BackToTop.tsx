"use client"

import { useState, useEffect } from "react"
import { ArrowUp, Rocket } from "lucide-react"

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = document.documentElement.scrollTop
            const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const progress = (scrolled / maxHeight) * 100

            setScrollProgress(progress)
            setIsVisible(scrolled > 300)
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    if (!isVisible) return null

    return (
        <div className="cursor-pointer">
            <div className="fixed bottom-8 right-8 z-50 group cursor-pointer!">

                <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">

                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="4"
                            className="backdrop-blur-sm"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
                            className="transition-all duration-300 ease-out"
                        />
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="50%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                    </svg>


                    <button
                        onClick={scrollToTop}
                        className="absolute inset-2 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center backdrop-blur-lg border border-white/20"
                        aria-label="Back to top"
                    >
                        <div className="relative">
                            <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />

                            <Rocket className="w-6 h-6 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300" />
                        </div>
                    </button>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                        Về đầu trang
                        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                    </div>
                </div>

                {/* Progress Text */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                        {Math.round(scrollProgress)}%
                    </div>
                </div>
            </div>
        </div>
    )
}
