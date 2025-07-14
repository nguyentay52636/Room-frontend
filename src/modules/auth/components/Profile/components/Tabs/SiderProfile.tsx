import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertCircle, Camera } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Card, CardContent } from '@/components/ui/card'

export default function SiderProfile({ user: propUser }: { user: any }) {
    const reduxUser = useSelector((state: RootState) => state.auth.user)

    const user = reduxUser || propUser || {
        ten: "Người dùng",
        tenDangNhap: "user",
        anhDaiDien: "/placeholder.svg",
        vaiTro: "tenant",
        xacThuc: {
            email: false,
            soDienThoai: false,
            cccd: false,
            congViec: false,
        }
    }

    const xacThuc = user.xacThuc || {
        email: false,
        soDienThoai: false,
        cccd: false,
        congViec: false,
    }

    return (
        <>
            <div className="lg:col-span-1">
                <Card className="sticky top-8">
                    <CardContent className="p-6">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                    <AvatarImage src={user.anhDaiDien || "/placeholder.svg"} alt={user.ten || "User"} />
                                    <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                        {(user.ten || "U")
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{user.ten || "Người dùng"}</h2>
                            <p className="text-gray-600">@{user.tenDangNhap || "user"}</p>
                            <Badge variant={user.vaiTro === "landlord" ? "default" : "secondary"} className="mt-2">
                                {user.vaiTro === "landlord" ? "🏠 Chủ nhà" : "👤 Người thuê"}
                            </Badge>
                        </div>

                        {/* Verification Status */}
                        <div className="space-y-3 mb-6">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Trạng thái xác thực
                            </h3>
                            <div className="space-y-2">
                                {Object.entries(xacThuc).map(([key, verified]) => {
                                    const labels = {
                                        email: "Email",
                                        soDienThoai: "Số điện thoại",
                                        cccd: "CCCD/CMND",
                                        congViec: "Công việc",
                                    }
                                    return (
                                        <div key={key} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">{labels[key as keyof typeof labels]}</span>
                                            {verified ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">2</div>
                                <div className="text-xs text-gray-600">Lần thuê</div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">4.5</div>
                                <div className="text-xs text-gray-600">Đánh giá</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
