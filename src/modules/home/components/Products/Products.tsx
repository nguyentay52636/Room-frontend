
import type React from "react"

import { useState, useEffect, useRef } from "react"

import { properties } from "./ProductData"
import HeaderProduct from "./components/Element/HeaderProduct"
import ProductItem from "./components/Element/ProductItem"
import ViewAllProduct from "./components/Element/ViewAllProduct"



export default function Products() {
    const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set())
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const toggleLike = (propertyId: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setLikedProperties((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(propertyId)) {
                newSet.delete(propertyId)
            } else {
                newSet.add(propertyId)
            }
            return newSet
        })
    }



    return (
        <section
            ref={sectionRef}
            className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />

            <div className="container mx-auto px-4 relative">
                <HeaderProduct isVisible={isVisible} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {properties.map((property, index) => (
                        <ProductItem
                            key={property.id}
                            property={property}
                            index={index}
                            hoveredCard={hoveredCard}
                            setHoveredCard={setHoveredCard}
                            isVisible={isVisible}
                            toggleLike={toggleLike}
                            likedProperties={likedProperties}
                        />
                    ))}
                </div>
                <ViewAllProduct isVisible={isVisible} />
            </div>
        </section>
    )
}
