import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { User, Calendar, Activity, Star, Home, Heart, MessageSquare, DollarSign, Clock } from "lucide-react"

interface CustomerViewDialogProps {
    customer: any
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CustomerViewDialog({ customer, open, onOpenChange }: CustomerViewDialogProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
            case "inactive":
                return <Badge variant="secondary">Không hoạt động</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
            case "blocked":
                return <Badge className="bg-red-100 text-red-800">Bị khóa</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "premium":
                return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
            case "regular":
                return <Badge variant="outline">Thường</Badge>
            case "new":
                return <Badge className="bg-blue-100 text-blue-800">Mới</Badge>
            default:
                return <Badge>{type}</Badge>
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    if (!customer) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Chi tiết khách hàng</span>
                    </DialogTitle>
                    <DialogDescription>
                        Xem chi tiết thông tin khách hàng
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                        <TabsTrigger value="properties">Bất động sản</TabsTrigger>
                        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                        <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-4 w-4" />
                                    <span>Thông tin cá nhân</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4 mb-6">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={customer?.avatar || "/placeholder.svg?height=80&width=80"} />
                                        <AvatarFallback className="text-lg">{customer.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            {getTypeBadge(customer.type)}
                                            {getStatusBadge(customer.status)}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Họ và tên</label>
                                        <p className="text-sm text-muted-foreground">{customer.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Số điện thoại</label>
                                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Loại khách hàng</label>
                                        <div>{getTypeBadge(customer.type)}</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Địa chỉ</label>
                                    <p className="text-sm text-muted-foreground">{customer.address}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Trạng thái</label>
                                    <div>{getStatusBadge(customer.status)}</div>
                                </div>

                                {customer.notes && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Ghi chú</label>
                                        <p className="text-sm text-muted-foreground">{customer.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Thống kê tài chính</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.totalSpent)}</p>
                                        <p className="text-sm text-muted-foreground">Tổng chi tiêu</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{customer.propertiesRented}</p>
                                        <p className="text-sm text-muted-foreground">Bất động sản đã thuê</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-1">
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <p className="text-2xl font-bold">{customer.averageRating?.toFixed(1)}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Đánh giá trung bình</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="properties" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Home className="h-4 w-4" />
                                    <span>Bất động sản</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {customer.currentProperty && (
                                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Đang thuê hiện tại</h4>
                                            <p className="text-blue-800 dark:text-blue-200">{customer.currentProperty}</p>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">Hợp đồng đến: {customer.contractEnd}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Home className="h-8 w-8 text-blue-500" />
                                            <div>
                                                <p className="text-2xl font-bold">{customer.propertiesRented}</p>
                                                <p className="text-sm text-muted-foreground">Bất động sản đã thuê</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Heart className="h-8 w-8 text-red-500" />
                                            <div>
                                                <p className="text-2xl font-bold">{customer.favoriteProperties}</p>
                                                <p className="text-sm text-muted-foreground">Bất động sản yêu thích</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium">Lịch sử thuê</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div>
                                                    <p className="font-medium">Golden Ridge Luxury</p>
                                                    <p className="text-sm text-muted-foreground">01/2024 - Hiện tại</p>
                                                </div>
                                                <Badge className="bg-green-100 text-green-800">Đang thuê</Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div>
                                                    <p className="font-medium">Riverstone Villa</p>
                                                    <p className="text-sm text-muted-foreground">06/2023 - 12/2023</p>
                                                </div>
                                                <Badge variant="outline">Đã kết thúc</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Star className="h-4 w-4" />
                                    <span>Đánh giá & Phản hồi</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <Star className="h-5 w-5 text-yellow-500" />
                                                    <div className="text-2xl font-bold">{customer.averageRating?.toFixed(1)}</div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">Đánh giá trung bình</p>
                                                <Progress value={customer.averageRating * 20} className="mt-2" />
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold">{customer.reviews}</div>
                                                <p className="text-sm text-muted-foreground">Tổng số đánh giá</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium">Đánh giá gần đây</h4>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`h-4 w-4 ${star <= 5 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">Golden Ridge Luxury</span>
                                                </div>
                                                <p className="text-sm">
                                                    "Bất động sản rất đẹp, dịch vụ tuyệt vời. Tôi rất hài lòng với trải nghiệm thuê ở đây."
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">15/01/2024</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">Riverstone Villa</span>
                                                </div>
                                                <p className="text-sm">
                                                    "Vị trí thuận tiện, không gian thoáng mát. Chỉ có điều wifi hơi chậm."
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">20/12/2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="h-4 w-4" />
                                    <span>Hoạt động gần đây</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium">Tham gia</p>
                                                        <p className="text-sm text-muted-foreground">{customer.joinDate}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium">Hoạt động cuối</p>
                                                        <p className="text-sm text-muted-foreground">{customer.lastActivity}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium">Tin nhắn</p>
                                                        <p className="text-sm text-muted-foreground">24 tin nhắn</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium">Lịch sử hoạt động</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-muted-foreground">2 giờ trước</span>
                                                <span>Xem chi tiết bất động sản Ocean Breeze Condo</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-muted-foreground">1 ngày trước</span>
                                                <span>Thêm bất động sản vào danh sách yêu thích</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                <span className="text-muted-foreground">3 ngày trước</span>
                                                <span>Đánh giá Golden Ridge Luxury - 5 sao</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span className="text-muted-foreground">1 tuần trước</span>
                                                <span>Gia hạn hợp đồng thuê</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 