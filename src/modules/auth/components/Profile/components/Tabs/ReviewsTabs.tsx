
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function ReviewsTabs({ userReviews, formatDate, renderStars }: { userReviews: any, formatDate: any, renderStars: any }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Đánh giá của tôi</CardTitle>
                    <CardDescription>Các đánh giá bạn đã viết về bất động sản</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {userReviews.map((review: any) => (
                            <div key={review.id} className="border-b pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{review.batDongSan}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1">{renderStars(review.soSao)}</div>
                                            <span className="text-sm text-gray-500">{formatDate(review.ngayTao)}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Edit3 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-gray-700 mb-3">{review.binhLuan}</p>
                                {review.phanHoi && (
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm font-medium text-blue-900 mb-1">Phản hồi từ chủ nhà:</p>
                                        <p className="text-sm text-blue-800">{review.phanHoi}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
