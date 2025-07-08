
import { useState, useEffect } from "react"
import type { Review } from "@/lib/apis/types"
import { ReviewDialog } from "./components/ReviewDialog"
import PaginationReviewsManager from "./components/PaginationReviewsManager"
import { stats as mockStats } from "./components/Mock/ReviewsData"
import HeaderTitleReviewsManager from "./components/HeaderTitleReviewsManager"
import CardItemReviewsManager from "./components/CardStatsReviewsManager"
import FilterSearchReviewsManager from "./components/FilterSearchReviewsManager"
import CardsItemReviewsManager from "./components/CardsItemReviewsManager"
import CardsItemEmpty from "./components/CardsItemEmpty"
import { getAllReviews } from "@/lib/apis/reviewsApi"

export default function ReviewsManagerContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [ratingFilter, setRatingFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState<Review[]>([])
    const [stats, setStats] = useState(mockStats)

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getAllReviews();
                const responseData = response as any;
                if (responseData.reviews) {
                    setReviews(responseData.reviews);

                    const reviewsData = responseData.reviews;
                    const totalReviews = reviewsData.length;
                    const averageRating = totalReviews > 0
                        ? (reviewsData.reduce((sum: number, review: any) => sum + review.soSao, 0) / totalReviews).toFixed(1)
                        : "0.0";
                    const positiveReviews = reviewsData.filter((review: any) => review.soSao >= 4).length;
                    const satisfactionRate = totalReviews > 0
                        ? Math.round((positiveReviews / totalReviews) * 100) + "%"
                        : "0%";

                    setStats([
                        {
                            title: "Tổng đánh giá",
                            value: totalReviews.toString(),
                            icon: mockStats[0].icon,
                            color: mockStats[0].color,
                            bgColor: mockStats[0].bgColor,
                            change: "+12%",
                            changeType: "increase" as const,
                            emoji: "📝",
                        },
                        {
                            title: "Đánh giá tích cực",
                            value: positiveReviews.toString(),
                            icon: mockStats[1].icon,
                            color: mockStats[1].color,
                            bgColor: mockStats[1].bgColor,
                            change: "+8%",
                            changeType: "increase" as const,
                            emoji: "👍",
                        },
                        {
                            title: "Điểm trung bình",
                            value: averageRating,
                            icon: mockStats[2].icon,
                            color: mockStats[2].color,
                            bgColor: mockStats[2].bgColor,
                            change: "+0.2",
                            changeType: "increase" as const,
                            emoji: "⭐",
                        },
                        {
                            title: "Khách hàng hài lòng",
                            value: satisfactionRate,
                            icon: mockStats[3].icon,
                            color: mockStats[3].color,
                            bgColor: mockStats[3].bgColor,
                            change: "+5%",
                            changeType: "increase" as const,
                            emoji: "💖",
                        }
                    ]);
                } else if (responseData.data) {
                    setReviews(responseData.data);
                } else {
                    setReviews([]);
                }

            } catch (error: any) {
                setError(error.message || "Failed to fetch reviews")
                setReviews([])
            } finally {
                setIsLoading(false)
            }
        }
        fetchReviews()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const handleChatSelect = (review: Review) => {
        console.log(review)
    }

    // Ensure reviews is always an array before filtering
    const filteredReviews = (reviews || []).filter((review) => {
        const matchesSearch =
            review.nguoiDungId?.ten?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.binhLuan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (review.batDongSanId?.tieuDe?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

        const matchesRating = ratingFilter === "all" || review.soSao?.toString() === ratingFilter

        const matchesCategory = categoryFilter === "all" || review.batDongSanId?.overlay?.category === categoryFilter

        return matchesSearch && matchesRating && matchesCategory
    })

    const handleViewReview = (review: Review) => {
        setSelectedReview(review)
        setIsDialogOpen(true)
    }

    const getStarColor = (rating: number) => {
        if (rating >= 4) return "text-emerald-500"
        if (rating >= 3) return "text-amber-500"
        return "text-red-500"
    }

    const getRatingBadgeColor = (rating: number) => {
        if (rating >= 4) return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200"
        if (rating >= 3) return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200"
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200"
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }



    return (
        <>
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950 min-h-screen">
                {/* Header Section */}
                <HeaderTitleReviewsManager />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <CardItemReviewsManager key={index} index={index} stat={stat} />
                    ))}
                </div>

                <FilterSearchReviewsManager searchTerm={searchTerm} setSearchTerm={setSearchTerm} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading reviews...</span>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading reviews</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200"
                                    >
                                        Try again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews List - Only show when not loading and no error */}
                {!isLoading && !error && (
                    <>

                        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredReviews.map((review) => (
                                <CardsItemReviewsManager key={review._id} review={review} getRatingBadgeColor={getRatingBadgeColor} getStarColor={getStarColor} handleChatSelect={handleChatSelect} handleViewReview={handleViewReview} />
                            ))}
                        </div>

                        {/* Trạng thái trống */}
                        {filteredReviews.length === 0 && (
                            <CardsItemEmpty setSearchTerm={setSearchTerm} setRatingFilter={setRatingFilter} setCategoryFilter={setCategoryFilter} />
                        )}

                        <PaginationReviewsManager totalItems={filteredReviews.length} />
                    </>
                )}
            </div>

            <ReviewDialog review={selectedReview} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    )
}
