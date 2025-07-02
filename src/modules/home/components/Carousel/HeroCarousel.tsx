"use client"

import { useState, useEffect, useRef } from "react"
import AnimatedBackground from "./components/AnimatedBackground"
import ProgressBarCarousel from "./components/ProgressBarCarousel"
import NavigateControlsCarousel from "./components/NavigateControlsCarousel"
import MainContentCarousel from "./components/MainContentCarousel/MainContentCarousel"
import { slides } from "./CarouselData"



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
