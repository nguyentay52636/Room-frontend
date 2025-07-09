
import type React from "react"

import { useState, useEffect, useRef } from "react"

import HeaderProduct from "./components/Element/HeaderProduct"
import ProductItem from "./components/Element/ProductItem"
import ViewAllProduct from "./components/Element/ViewAllProduct"
import { BatDongSan } from "@/lib/apis/types"
import { getAllProperties } from "@/lib/apis/propertiesApi"
import { PaginationProducts } from "./components/PaginationProducts"
// Dữ liệu mẫu để test


export default function ProductsContent() {
    const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set())
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [properties, setProperties] = useState<BatDongSan[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await getAllProperties()
                const propertiesData = Array.isArray(response) ? response : [];

                setProperties(propertiesData);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError(error as string);

            } finally {
                setLoading(false);
            }
        }
        fetchProperties();
    }, [])

    // Tính toán sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = properties.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(properties.length / productsPerPage);

    // Reset về trang 1 khi properties thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [properties.length]);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of products section
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />

            <div className="container mx-auto px-4 relative">
                <HeaderProduct isVisible={isVisible} />
                <div className="flex flex-col">
                    {loading ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">Đang tải...</p>
                        </div>
                    ) : error ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-red-500 text-lg">Có lỗi xảy ra: {error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                {currentProducts && currentProducts.length > 0 ? (
                                    currentProducts.map((property, index) => (
                                        <ProductItem
                                            key={property._id}
                                            property={property}
                                            index={index}
                                            hoveredCard={hoveredCard}
                                            setHoveredCard={setHoveredCard}
                                            isVisible={isVisible}
                                            toggleLike={toggleLike}
                                            likedProperties={likedProperties}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-gray-500 text-lg">Không có bất động sản nào được tìm thấy</p>
                                    </div>
                                )}
                            </div>

                            {properties.length > 0 && (
                                <div className="flex justify-center mb-20">
                                    <PaginationProducts
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <ViewAllProduct isVisible={isVisible} />
            </div>
        </section>
    )
}
