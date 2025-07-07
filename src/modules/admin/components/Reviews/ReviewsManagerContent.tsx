
import { useState, useEffect } from "react"
import type { Review } from "@/lib/apis/types"
import { ReviewDialog } from "./components/ReviewDialog"
import PaginationReviewsManager from "./components/PaginationReviewsManager"
import { reviews, stats } from "./components/Mock/ReviewsData"
import HeaderTitleReviewsManager from "./components/HeaderTitleReviewsManager"
import CardItemReviewsManager from "./components/CardStatsReviewsManager"
import FilterSearchReviewsManager from "./components/FilterSearchReviewsManager"
import CardsItemReviewsManager from "./components/CardsItemReviewsManager"
import CardsItemEmpty from "./components/CardsItemEmpty"
export default function ReviewsManagerContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [ratingFilter, setRatingFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const handleChatSelect = (review: Review) => {
        console.log(review)
    }

    const filteredReviews = reviews.filter((review) => {
        const matchesSearch =
            review.nguoiDungId.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.binhLuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (review.batDongSanId?.tieuDe.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

        const matchesRating = ratingFilter === "all" || review.soSao.toString() === ratingFilter

        const matchesCategory = categoryFilter === "all" || review.batDongSanId?.overlay.category === categoryFilter

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


                {/* Danh sách đánh giá */}
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

            </div>

            <ReviewDialog review={selectedReview} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    )
}
