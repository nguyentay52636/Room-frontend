import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Calendar } from 'lucide-react'
import React from 'react'

export default function RentalHistoryTabs({ rentalHistory, getStatusBadge, renderStars }: { rentalHistory: any, getStatusBadge: any, renderStars: any }) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }
    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Lịch sử thuê nhà</CardTitle>
                    <CardDescription>Danh sách các bất động sản bạn đã thuê</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {rentalHistory.map((rental: any) => {
                            const status = getStatusBadge(rental.trangThai)
                            return (
                                <div
                                    key={rental.id}
                                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <img
                                        src={rental.hinhAnh || "/placeholder.svg"}
                                        alt={rental.tieuDe}
                                        className="w-20 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{rental.tieuDe}</h3>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {rental.diaChi}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {rental.thoiGian}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-lg text-blue-600">{formatCurrency(rental.gia)}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={status.variant}>{status.label}</Badge>
                                        </div>
                                        <div className="flex items-center gap-1 mt-2">{renderStars(rental.danhGia)}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

        </>
    )
}
