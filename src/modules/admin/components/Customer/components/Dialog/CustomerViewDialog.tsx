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
import { Customer } from "@/lib/apis/types"
import { useEffect, useState } from "react"

interface CustomerViewDialogProps {
    customer: any
    open: boolean
    onOpenChange: (open: boolean) => void
}
const initialFormData: Customer = {
    nguoiDungId: {
        ten: "",
        email: "",
        tenDangNhap: "",
        matKhau: "",
        soDienThoai: "",
        vaiTro: "",
        anhDaiDien: "",
        trangThai: "",
    },
    diaChi: "",
    loai: "",
    tongChiTieu: 0,
    soBdsDangThue: 0,
    soBdsYeuThich: 0,
    soDanhGia: 0,
    diemTrungBinh: 0,
    bdsDangThueHienTai: "",
    ngayKetThucHopDong: "",
    lanHoatDongGanNhat: "",
    ghiChu: "",
    updatedAt: "",
}

export function CustomerViewDialog({ customer, open, onOpenChange }: CustomerViewDialogProps) {
    const [formData, setFormData] = useState<Customer>(initialFormData)
    useEffect(() => {
        if (customer) {
            setFormData(customer)
        }
    }, [customer])


    const {
        nguoiDungId = {} as Partial<Customer['nguoiDungId']>,
        diaChi = '',
        loai = '',
        tongChiTieu = 0,
        soBdsDangThue = 0,
        soBdsYeuThich = 0,
        soDanhGia = 0,
        diemTrungBinh = 0,
        bdsDangThueHienTai = '',
        ngayKetThucHopDong = '',
        lanHoatDongGanNhat = '',
        ghiChu = '',
        updatedAt = '',
    } = formData || {};
    const {
        ten = '',
        email = '',
        soDienThoai = '',
        anhDaiDien = '',
        trangThai = '',
    } = nguoiDungId || {} as Partial<Customer['nguoiDungId']>;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "hoat_dong":
                return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
            case "khong_hoat_dong":
                return <Badge variant="secondary">Không hoạt động</Badge>
            case "cho_duyet":
                return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
            case "bi_khoa":
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
                                        <AvatarImage src={anhDaiDien || "/placeholder.svg?height=80&width=80"} />
                                        <AvatarFallback className="text-lg">{ten?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            {getTypeBadge(loai)}
                                            {getStatusBadge(trangThai)}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Họ và tên</label>
                                        <p className="text-sm text-muted-foreground">{ten}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <p className="text-sm text-muted-foreground">{email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Số điện thoại</label>
                                        <p className="text-sm text-muted-foreground">{soDienThoai}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Loại khách hàng</label>
                                        <div>{getTypeBadge(loai)}</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Địa chỉ</label>
                                    <p className="text-sm text-muted-foreground">{diaChi}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Trạng thái</label>
                                    <div>{getStatusBadge(trangThai)}</div>
                                </div>

                                {ghiChu && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Ghi chú</label>
                                        <p className="text-sm text-muted-foreground">{ghiChu}</p>
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
                                        <p className="text-2xl font-bold text-green-600">{formatCurrency(tongChiTieu)}</p>
                                        <p className="text-sm text-muted-foreground">Tổng chi tiêu</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{soBdsDangThue}</p>
                                        <p className="text-sm text-muted-foreground">Bất động sản đã thuê</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-1">
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <p className="text-2xl font-bold">{diemTrungBinh?.toFixed(1)}</p>
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
                                    {bdsDangThueHienTai && (
                                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Đang thuê hiện tại</h4>
                                            <p className="text-blue-800 dark:text-blue-200">{bdsDangThueHienTai}</p>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">Hợp đồng đến: {ngayKetThucHopDong}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Home className="h-8 w-8 text-blue-500" />
                                            <div>
                                                <p className="text-2xl font-bold">{soBdsDangThue}</p>
                                                <p className="text-sm text-muted-foreground">Bất động sản đã thuê</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Heart className="h-8 w-8 text-red-500" />
                                            <div>
                                                <p className="text-2xl font-bold">{soBdsYeuThich}</p>
                                                <p className="text-sm text-muted-foreground">Bất động sản yêu thích</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lịch sử thuê: Có thể cần map từ một mảng nếu có */}
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
                                                    <div className="text-2xl font-bold">{diemTrungBinh?.toFixed(1)}</div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">Đánh giá trung bình</p>
                                                <Progress value={diemTrungBinh * 20} className="mt-2" />
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold">{soDanhGia}</div>
                                                <p className="text-sm text-muted-foreground">Tổng số đánh giá</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Đánh giá gần đây: Có thể cần map từ một mảng nếu có */}
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
                                                        <p className="text-sm text-muted-foreground">{updatedAt}</p>
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
                                                        <p className="text-sm text-muted-foreground">{lanHoatDongGanNhat}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        {/* Tin nhắn: Nếu có dữ liệu */}
                                    </div>

                                    {/* Lịch sử hoạt động: Có thể cần map từ một mảng nếu có */}
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