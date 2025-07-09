import { Customer } from '@/lib/apis/types';
import React, { useState } from 'react'
import * as z from "zod";
import { createCustomer } from '@/lib/apis/customerApi';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Building2, Calendar, Star, Home, MessageSquare } from "lucide-react"

const formSchema = z.object({
    nguoiDungId: z.string().min(1, { message: "Tên khách hàng là bắt buộc" }),
    diaChi: z.string().min(1, { message: "Địa chỉ là bắt buộc" }),
    loai: z.string().min(1, { message: "Loại khách hàng là bắt buộc" }),
    tongChiTieu: z.number().min(0, { message: "Tổng chi tiêu phải lớn hơn hoặc bằng 0" }),
    soBdsDangThue: z.number().min(0, { message: "Số bất động sản đang thuê phải lớn hơn hoặc bằng 0" }),
    soBdsYeuThich: z.number().min(0, { message: "Số bất động sản yêu thích phải lớn hơn hoặc bằng 0" }),
    soDanhGia: z.number().min(0, { message: "Số đánh giá phải lớn hơn hoặc bằng 0" }),
    diemTrungBinh: z.number().min(0, { message: "Điểm trung bình phải lớn hơn hoặc bằng 0" }),
    bdsDangThueHienTai: z.number().min(0, { message: "Số bất động sản đang thuê hiện tại phải lớn hơn hoặc bằng 0" }),
    ngayKetThucHopDong: z.string().min(1, { message: "Ngày kết thúc hợp đồng là bắt buộc" }),
    lanHoatDongGanNhat: z.string().min(1, { message: "Lần hoạt động gần nhất là bắt buộc" }),
    ghiChu: z.string().optional(),
})

interface AddCustomerFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AddCustomerForm({ onSuccess, onCancel }: AddCustomerFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        nguoiDungId: "",
        diaChi: "",
        loai: "",
        tongChiTieu: 0,
        soBdsDangThue: 0,
        soBdsYeuThich: 0,
        soDanhGia: 0,
        diemTrungBinh: 0,
        bdsDangThueHienTai: 0,
        ngayKetThucHopDong: "",
        lanHoatDongGanNhat: "",
        ghiChu: "",
    });

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        try {
            formSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Vui lòng kiểm tra lại thông tin");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await createCustomer(formData as Customer)
            if (response) {
                toast.success("Khách hàng đã được tạo thành công")
                setFormData({
                    nguoiDungId: "",
                    diaChi: "",
                    loai: "",
                    tongChiTieu: 0,
                    soBdsDangThue: 0,
                    soBdsYeuThich: 0,
                    soDanhGia: 0,
                    diemTrungBinh: 0,
                    bdsDangThueHienTai: 0,
                    ngayKetThucHopDong: "",
                    lanHoatDongGanNhat: "",
                    ghiChu: "",
                });
                onSuccess?.();
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi tạo khách hàng")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thông tin cơ bản */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Thông tin cơ bản</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nguoiDungId">ID Người dùng *</Label>
                                <Input
                                    id="nguoiDungId"
                                    placeholder="Nhập ID người dùng"
                                    value={formData.nguoiDungId}
                                    onChange={(e) => handleInputChange("nguoiDungId", e.target.value)}
                                    className={errors.nguoiDungId ? "border-red-500" : ""}
                                />
                                {errors.nguoiDungId && (
                                    <p className="text-sm text-red-500">{errors.nguoiDungId}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="loai">Loại khách hàng *</Label>
                                <Select
                                    value={formData.loai}
                                    onValueChange={(value) => handleInputChange("loai", value)}
                                >
                                    <SelectTrigger className={errors.loai ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Chọn loại khách hàng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="regular">Thường</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="vip">VIP</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.loai && (
                                    <p className="text-sm text-red-500">{errors.loai}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="diaChi">Địa chỉ *</Label>
                            <Textarea
                                id="diaChi"
                                placeholder="Nhập địa chỉ đầy đủ"
                                value={formData.diaChi}
                                onChange={(e) => handleInputChange("diaChi", e.target.value)}
                                className={errors.diaChi ? "border-red-500" : ""}
                            />
                            {errors.diaChi && (
                                <p className="text-sm text-red-500">{errors.diaChi}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin tài chính */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span>Thông tin tài chính</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tongChiTieu">Tổng chi tiêu (VNĐ)</Label>
                                <Input
                                    id="tongChiTieu"
                                    type="number"
                                    placeholder="0"
                                    value={formData.tongChiTieu}
                                    onChange={(e) => handleInputChange("tongChiTieu", Number(e.target.value))}
                                    className={errors.tongChiTieu ? "border-red-500" : ""}
                                />
                                {errors.tongChiTieu && (
                                    <p className="text-sm text-red-500">{errors.tongChiTieu}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin bất động sản */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Home className="h-4 w-4" />
                            <span>Thông tin bất động sản</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="soBdsDangThue">Số BDS đang thuê</Label>
                                <Input
                                    id="soBdsDangThue"
                                    type="number"
                                    placeholder="0"
                                    value={formData.soBdsDangThue}
                                    onChange={(e) => handleInputChange("soBdsDangThue", Number(e.target.value))}
                                    className={errors.soBdsDangThue ? "border-red-500" : ""}
                                />
                                {errors.soBdsDangThue && (
                                    <p className="text-sm text-red-500">{errors.soBdsDangThue}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bdsDangThueHienTai">BDS đang thuê hiện tại</Label>
                                <Input
                                    id="bdsDangThueHienTai"
                                    type="number"
                                    placeholder="0"
                                    value={formData.bdsDangThueHienTai}
                                    onChange={(e) => handleInputChange("bdsDangThueHienTai", Number(e.target.value))}
                                    className={errors.bdsDangThueHienTai ? "border-red-500" : ""}
                                />
                                {errors.bdsDangThueHienTai && (
                                    <p className="text-sm text-red-500">{errors.bdsDangThueHienTai}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="soBdsYeuThich">Số BDS yêu thích</Label>
                                <Input
                                    id="soBdsYeuThich"
                                    type="number"
                                    placeholder="0"
                                    value={formData.soBdsYeuThich}
                                    onChange={(e) => handleInputChange("soBdsYeuThich", Number(e.target.value))}
                                    className={errors.soBdsYeuThich ? "border-red-500" : ""}
                                />
                                {errors.soBdsYeuThich && (
                                    <p className="text-sm text-red-500">{errors.soBdsYeuThich}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin đánh giá */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Star className="h-4 w-4" />
                            <span>Thông tin đánh giá</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="soDanhGia">Số đánh giá</Label>
                                <Input
                                    id="soDanhGia"
                                    type="number"
                                    placeholder="0"
                                    value={formData.soDanhGia}
                                    onChange={(e) => handleInputChange("soDanhGia", Number(e.target.value))}
                                    className={errors.soDanhGia ? "border-red-500" : ""}
                                />
                                {errors.soDanhGia && (
                                    <p className="text-sm text-red-500">{errors.soDanhGia}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="diemTrungBinh">Điểm trung bình</Label>
                                <Input
                                    id="diemTrungBinh"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    placeholder="0.0"
                                    value={formData.diemTrungBinh}
                                    onChange={(e) => handleInputChange("diemTrungBinh", Number(e.target.value))}
                                    className={errors.diemTrungBinh ? "border-red-500" : ""}
                                />
                                {errors.diemTrungBinh && (
                                    <p className="text-sm text-red-500">{errors.diemTrungBinh}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin hợp đồng */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Thông tin hợp đồng</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ngayKetThucHopDong">Ngày kết thúc hợp đồng *</Label>
                                <Input
                                    id="ngayKetThucHopDong"
                                    type="date"
                                    value={formData.ngayKetThucHopDong}
                                    onChange={(e) => handleInputChange("ngayKetThucHopDong", e.target.value)}
                                    className={errors.ngayKetThucHopDong ? "border-red-500" : ""}
                                />
                                {errors.ngayKetThucHopDong && (
                                    <p className="text-sm text-red-500">{errors.ngayKetThucHopDong}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lanHoatDongGanNhat">Lần hoạt động gần nhất *</Label>
                                <Input
                                    id="lanHoatDongGanNhat"
                                    type="datetime-local"
                                    value={formData.lanHoatDongGanNhat}
                                    onChange={(e) => handleInputChange("lanHoatDongGanNhat", e.target.value)}
                                    className={errors.lanHoatDongGanNhat ? "border-red-500" : ""}
                                />
                                {errors.lanHoatDongGanNhat && (
                                    <p className="text-sm text-red-500">{errors.lanHoatDongGanNhat}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ghi chú */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>Ghi chú</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="ghiChu">Ghi chú</Label>
                            <Textarea
                                id="ghiChu"
                                placeholder="Thêm ghi chú về khách hàng..."
                                rows={3}
                                value={formData.ghiChu}
                                onChange={(e) => handleInputChange("ghiChu", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Đang tạo..." : "Tạo khách hàng"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
