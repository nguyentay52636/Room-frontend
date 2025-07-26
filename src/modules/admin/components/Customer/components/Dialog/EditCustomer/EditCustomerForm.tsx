import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { z } from "zod"


export const formSchema = z.object({
    nguoiDungId: z.object({
        ten: z.string().min(1, "Họ và tên là bắt buộc"),
        email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
        tenDangNhap: z.string().min(1, "Tên đăng nhập là bắt buộc"),
        matKhau: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
        soDienThoai: z
            .string()
            .min(1, "Số điện thoại là bắt buộc")
            .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10 hoặc 11 chữ số"),
        vaiTro: z.string().min(1, "Vai trò là bắt buộc"),
        anhDaiDien: z.string().optional(),
        trangThai: z.string().optional(),
    }),

    diaChi: z.string().min(1, "Địa chỉ là bắt buộc"),
    loai: z.string().min(1, "Loại khách hàng là bắt buộc"),
    tongChiTieu: z
        .number({ invalid_type_error: "Tổng chi tiêu phải là một số" })
        .nonnegative("Tổng chi tiêu không được âm"),
    soBdsDangThue: z
        .number({ invalid_type_error: "Số BĐS đang thuê phải là một số" })
        .nonnegative("Không được âm"),
    soBdsYeuThich: z
        .number({ invalid_type_error: "Số BĐS yêu thích phải là một số" })
        .nonnegative("Không được âm"),
    soDanhGia: z
        .number({ invalid_type_error: "Số đánh giá phải là một số" })
        .nonnegative("Không được âm"),
    diemTrungBinh: z
        .number({ invalid_type_error: "Điểm trung bình phải là một số" })
        .min(0)
        .max(5, "Điểm trung bình không vượt quá 5"),
    bdsDangThueHienTai: z.string().min(1, "BĐS đang thuê hiện tại là bắt buộc"),
    ngayKetThucHopDong: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Ngày kết thúc hợp đồng không hợp lệ"),
    lanHoatDongGanNhat: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Lần hoạt động gần nhất không hợp lệ"),
    ghiChu: z.string().optional(),
})

interface CustomerEditDialogProps {
    customer: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (customerData: any) => void
}

export function EditCustomerForm({ customer, open, onOpenChange, onSave }: CustomerEditDialogProps) {
    const [formData, setFormData] = useState({
        // Thông tin user
        ten: "",
        email: "",
        tenDangNhap: "",
        matKhau: "",
        soDienThoai: "",
        vaiTro: "",
        anhDaiDien: "",
        trangThai: "",

        // Thông tin customer
        diaChi: "",
        loai: "regular",
        tongChiTieu: 0,
        soBdsDangThue: 0,
        soBdsYeuThich: 0,
        soDanhGia: 0,
        diemTrungBinh: 0,
        bdsDangThueHienTai: "",
        ngayKetThucHopDong: "",
        lanHoatDongGanNhat: "",
        ghiChu: "",
    })

    useEffect(() => {
        if (customer) {
            setFormData({
                // Thông tin user từ nguoiDungId
                ten: customer.nguoiDungId?.ten || "",
                email: customer.nguoiDungId?.email || "",
                tenDangNhap: customer.nguoiDungId?.tenDangNhap || "",
                matKhau: customer.nguoiDungId?.matKhau || "",
                soDienThoai: customer.nguoiDungId?.soDienThoai || "",
                vaiTro: customer.nguoiDungId?.vaiTro || "",
                anhDaiDien: customer.nguoiDungId?.anhDaiDien || "",
                trangThai: customer.nguoiDungId?.trangThai || "",

                // Thông tin customer
                diaChi: customer.diaChi || "",
                loai: customer.loai || "regular",
                tongChiTieu: customer.tongChiTieu || 0,
                soBdsDangThue: customer.soBdsDangThue || 0,
                soBdsYeuThich: customer.soBdsYeuThich || 0,
                soDanhGia: customer.soDanhGia || 0,
                diemTrungBinh: customer.diemTrungBinh || 0,
                bdsDangThueHienTai: customer.bdsDangThueHienTai || "",
                ngayKetThucHopDong: customer.ngayKetThucHopDong || "",
                lanHoatDongGanNhat: customer.lanHoatDongGanNhat || "",
                ghiChu: customer.ghiChu || "",
            })
        }
    }, [customer])

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

    const handleSave = () => {
        onSave(formData)
        onOpenChange(false)
    }

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleCancel = () => {
        // Reset form data to original customer data
        if (customer) {
            setFormData({
                ten: customer.nguoiDungId?.ten || "",
                email: customer.nguoiDungId?.email || "",
                tenDangNhap: customer.nguoiDungId?.tenDangNhap || "",
                matKhau: customer.nguoiDungId?.matKhau || "",
                soDienThoai: customer.nguoiDungId?.soDienThoai || "",
                vaiTro: customer.nguoiDungId?.vaiTro || "",
                anhDaiDien: customer.nguoiDungId?.anhDaiDien || "",
                trangThai: customer.nguoiDungId?.trangThai || "",
                diaChi: customer.diaChi || "",
                loai: customer.loai || "regular",
                tongChiTieu: customer.tongChiTieu || 0,
                soBdsDangThue: customer.soBdsDangThue || 0,
                soBdsYeuThich: customer.soBdsYeuThich || 0,
                soDanhGia: customer.soDanhGia || 0,
                diemTrungBinh: customer.diemTrungBinh || 0,
                bdsDangThueHienTai: customer.bdsDangThueHienTai || "",
                ngayKetThucHopDong: customer.ngayKetThucHopDong || "",
                lanHoatDongGanNhat: customer.lanHoatDongGanNhat || "",
                ghiChu: customer.ghiChu || "",
            })
        }
        onOpenChange(false)
    }

    if (!customer) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Chỉnh sửa khách hàng</span>
                    </DialogTitle>
                    <DialogDescription>
                        Chỉnh sửa thông tin khách hàng
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Thông tin cá nhân */}
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
                                    <AvatarImage src={formData.anhDaiDien || "/placeholder.svg?height=80&width=80"} />
                                    <AvatarFallback className="text-lg">{formData.ten.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm">
                                        Thay đổi ảnh
                                    </Button>
                                    <div className="flex items-center space-x-2">
                                        {getTypeBadge(formData.loai)}
                                        {getStatusBadge(formData.trangThai)}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ten">Họ và tên *</Label>
                                    <Input
                                        id="ten"
                                        value={formData.ten}
                                        onChange={(e) => handleInputChange("ten", e.target.value)}
                                        placeholder="Nhập họ và tên"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="Nhập địa chỉ email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tenDangNhap">Tên đăng nhập *</Label>
                                    <Input
                                        id="tenDangNhap"
                                        value={formData.tenDangNhap}
                                        onChange={(e) => handleInputChange("tenDangNhap", e.target.value)}
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="matKhau">Mật khẩu *</Label>
                                    <Input
                                        id="matKhau"
                                        type="password"
                                        value={formData.matKhau}
                                        onChange={(e) => handleInputChange("matKhau", e.target.value)}
                                        placeholder="Nhập mật khẩu"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="soDienThoai">Số điện thoại *</Label>
                                    <Input
                                        id="soDienThoai"
                                        value={formData.soDienThoai}
                                        onChange={(e) => handleInputChange("soDienThoai", e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vaiTro">Vai trò *</Label>
                                    <Select
                                        value={formData.vaiTro}
                                        onValueChange={(value) => handleInputChange("vaiTro", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn vai trò" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="customer">Khách hàng</SelectItem>
                                            <SelectItem value="admin">Quản trị viên</SelectItem>
                                            <SelectItem value="staff">Nhân viên</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="trangThai">Trạng thái</Label>
                                    <Select
                                        value={formData.trangThai}
                                        onValueChange={(value) => handleInputChange("trangThai", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Hoạt động</SelectItem>
                                            <SelectItem value="inactive">Không hoạt động</SelectItem>
                                            <SelectItem value="pending">Chờ duyệt</SelectItem>
                                            <SelectItem value="blocked">Bị khóa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Thông tin khách hàng */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>Thông tin khách hàng</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="diaChi">Địa chỉ *</Label>
                                    <Input
                                        id="diaChi"
                                        value={formData.diaChi}
                                        onChange={(e) => handleInputChange("diaChi", e.target.value)}
                                        placeholder="Nhập địa chỉ"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="loai">Loại khách hàng *</Label>
                                    <Select
                                        value={formData.loai}
                                        onValueChange={(value) => handleInputChange("loai", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">Mới</SelectItem>
                                            <SelectItem value="regular">Thường</SelectItem>
                                            <SelectItem value="premium">Premium</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tongChiTieu">Tổng chi tiêu</Label>
                                    <Input
                                        id="tongChiTieu"
                                        type="number"
                                        value={formData.tongChiTieu}
                                        onChange={(e) => handleInputChange("tongChiTieu", Number(e.target.value))}
                                        placeholder="0"
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="soBdsDangThue">Số BĐS đang thuê</Label>
                                    <Input
                                        id="soBdsDangThue"
                                        type="number"
                                        value={formData.soBdsDangThue}
                                        onChange={(e) => handleInputChange("soBdsDangThue", Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="soBdsYeuThich">Số BĐS yêu thích</Label>
                                    <Input
                                        id="soBdsYeuThich"
                                        type="number"
                                        value={formData.soBdsYeuThich}
                                        onChange={(e) => handleInputChange("soBdsYeuThich", Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="soDanhGia">Số đánh giá</Label>
                                    <Input
                                        id="soDanhGia"
                                        type="number"
                                        value={formData.soDanhGia}
                                        onChange={(e) => handleInputChange("soDanhGia", Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="diemTrungBinh">Điểm trung bình</Label>
                                    <Input
                                        id="diemTrungBinh"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={formData.diemTrungBinh}
                                        onChange={(e) => handleInputChange("diemTrungBinh", Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bdsDangThueHienTai">BĐS đang thuê hiện tại *</Label>
                                    <Input
                                        id="bdsDangThueHienTai"
                                        value={formData.bdsDangThueHienTai}
                                        onChange={(e) => handleInputChange("bdsDangThueHienTai", e.target.value)}
                                        placeholder="Nhập BĐS đang thuê"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ngayKetThucHopDong">Ngày kết thúc hợp đồng</Label>
                                    <Input
                                        id="ngayKetThucHopDong"
                                        type="date"
                                        value={formData.ngayKetThucHopDong}
                                        onChange={(e) => handleInputChange("ngayKetThucHopDong", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lanHoatDongGanNhat">Lần hoạt động gần nhất</Label>
                                    <Input
                                        id="lanHoatDongGanNhat"
                                        type="date"
                                        value={formData.lanHoatDongGanNhat}
                                        onChange={(e) => handleInputChange("lanHoatDongGanNhat", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ghiChu">Ghi chú</Label>
                                <Textarea
                                    id="ghiChu"
                                    value={formData.ghiChu}
                                    onChange={(e) => handleInputChange("ghiChu", e.target.value)}
                                    rows={3}
                                    placeholder="Thêm ghi chú về khách hàng này..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} disabled={!formData.ten || !formData.email}>
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 