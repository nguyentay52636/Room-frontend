import { AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@/components/ui/avatar'
import { Avatar } from '@/components/ui/avatar'
import { CardTitle } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { owner } from '@/utils/data/types'
import { CheckCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { Clock } from 'lucide-react'
import { Users } from 'lucide-react'
import { Home } from 'lucide-react'
import { Star } from 'lucide-react'

export default function OwnerInfoSiderMainContentCardProductDetails({ property }: { property: any }) {
    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin người đăng</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-3">
                            <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {owner.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-lg">{owner.name}</span>
                                {owner.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>
                                    {owner.rating} ({owner.reviews} đánh giá)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="space-y-3 mb-4">
                        <Button
                            variant="outline"
                            className="w-full justify-start bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                            size="lg"
                        >
                            <img
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png"
                                alt="Zalo"
                                className="h-5 w-5 mr-3"
                            />
                            Chat qua Zalo
                        </Button>

                        <Button
                            className="w-full justify-start bg-teal-600 hover:bg-teal-700"
                            size="lg"
                            onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                        >
                            <Phone className="h-4 w-4 mr-3" />
                            {showPhoneNumber ? owner.phone : `${owner.phone.slice(0, 8)} ***`} -{" "}
                            {showPhoneNumber ? "Ẩn số" : "Hiện số"}
                        </Button>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Phản hồi: {owner.responseTime}</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Ngôn ngữ: {owner.languages.join(", ")}</span>
                        </div>
                        <div className="flex items-center">
                            <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Tham gia từ {owner.joinDate}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
