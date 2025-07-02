import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { Shield } from 'lucide-react'

export default function PriceCardSiderMainContentCardProductDetails({ property }: { property: any }) {
    return (
        <>
            {/* Price Card */}
            <Card className="sticky top-4">
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-3xl font-bold text-primary">
                                {Number.parseInt(property.price).toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">VNĐ/tháng</span>
                        </div>
                        {property.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                                {Number.parseInt(property.originalPrice).toLocaleString()} VNĐ/tháng
                            </div>
                        )}
                    </div>

                    <div className="space-y-3 mb-6">
                        <Button variant="outline" className="w-full bg-transparent" size="lg">
                            <Calendar className="h-4 w-4 mr-2" />
                            Đặt lịch xem nhà
                        </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Thông tin được bảo mật và an toàn
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
