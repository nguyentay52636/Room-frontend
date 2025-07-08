import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, Users, Award, Calendar, Eye, Building2, DollarSign, Square, Bed, Target, Reply, Clock, Star, ChevronRight, MapPin, ThumbsUp } from 'lucide-react'

export default function CardsItemReviewsManager({ getRatingBadgeColor, getStarColor, handleChatSelect, handleViewReview, review }: { getRatingBadgeColor: any, getStarColor: any, handleChatSelect: any, handleViewReview: any, review: any }) {
  return (
    <>
      <Card
        key={review._id}
        className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 overflow-hidden relative"
        onClick={() => handleViewReview(review)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-600/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-14 w-14 ring-3 ring-blue-200 shadow-lg group-hover:ring-blue-300 transition-all duration-300">
                  <AvatarImage
                    src={review.nguoiDungId?.anhDaiDien || "/placeholder.svg"}
                    alt={review.nguoiDungId?.ten || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-lg">
                    {review.nguoiDungId?.ten?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 text-lg">
                  {review.nguoiDungId?.ten || "Unknown User"}
                  <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200 text-xs font-semibold">
                    <Award className="h-3 w-3 mr-1" />
                    VIP
                  </Badge>
                </h4>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 relative z-10">
          {/* Đánh giá sao */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 transition-all duration-200 ${i < review.soSao ? `${getStarColor(review.soSao)} fill-current` : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <Badge
                className={`${getRatingBadgeColor(review.soSao)} border rounded-xl text-sm font-bold px-3 py-1`}
              >
                {review.soSao}/5 ⭐
              </Badge>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Eye className="h-3 w-3" />
              <span>Đã xem</span>
            </div>
          </div>

          {/* Thông tin bất động sản - Có thể click */}
          {review.batDongSanId && (
            <div
              className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 cursor-pointer group/property"
              onClick={(e) => {
                e.stopPropagation()
                handleViewReview(review)
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-blue-600 group-hover/property:text-blue-700 transition-colors" />
                    <h5 className="font-bold text-gray-900 dark:text-gray-100 text-base line-clamp-1 group-hover/property:text-blue-600 transition-colors">
                      {review.batDongSanId.tieuDe}
                    </h5>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover/property:text-blue-600 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      {review.batDongSanId.overlay.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      {review.batDongSanId.overlay.priceDisplay}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      {review.batDongSanId.dienTich}m²
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bed className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      {review.batDongSanId.soPhongNgu} PN
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 text-xs font-semibold">
                    {review.batDongSanId.overlay.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    <Target className="h-3 w-3" />
                    <span>Xem chi tiết</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bình luận */}
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-gray-50 via-blue-50 to-blue-100 dark:from-gray-800 dark:via-blue-900 dark:to-blue-900 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm line-clamp-4 italic">
                💬 "{review.binhLuan}"
              </p>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Reply className="h-3 w-3 mr-1" />
                Phản hồi
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                Hữu ích
              </Button>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>
                {new Date(review.createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
