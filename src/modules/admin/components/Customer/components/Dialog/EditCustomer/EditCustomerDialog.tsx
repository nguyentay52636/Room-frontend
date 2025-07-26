"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar, Upload, Home, Heart, Star, DollarSign, MapPin, Edit, User, CheckCircle, MessageSquare } from "lucide-react";
import { z } from "zod";
import { Customer } from "@/lib/apis/types";
import { updateCustomer } from "@/lib/apis/customerApi";
import { toast } from 'sonner';

interface DialogEditCustomerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer;
    onUpdateSuccess: () => void;
}

const formSchema = z.object({
    diaChi: z.string().min(1, "Địa chỉ là bắt buộc"),
    loai: z.string().min(1, "Loại khách hàng là bắt buộc"),
    tongChiTieu: z
        .number({ invalid_type_error: "Tổng chi tiêu phải là một số" })
        .min(0, "Tổng chi tiêu không được âm"),
    soBdsDangThue: z
        .number({ invalid_type_error: "Số BDS đang thuê phải là một số" })
        .min(0, "Số BDS đang thuê không được âm"),
    soBdsYeuThich: z
        .number({ invalid_type_error: "Số BDS yêu thích phải là một số" })
        .min(0, "Số BDS yêu thích không được âm"),
    soDanhGia: z
        .number({ invalid_type_error: "Số đánh giá phải là một số" })
        .min(0, "Số đánh giá không được âm"),
    diemTrungBinh: z
        .number({ invalid_type_error: "Điểm trung bình phải là một số" })
        .min(0, "Điểm trung bình không được âm")
        .max(5, "Điểm trung bình không được lớn hơn 5"),
    bdsDangThueHienTai: z.string().optional(),
    ngayKetThucHopDong: z.string().optional(),
    lanHoatDongGanNhat: z.string().optional(),
    ghiChu: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EditCustomerDialog({ open, onOpenChange, customer, onUpdateSuccess }: DialogEditCustomerProps) {
    const [formData, setFormData] = useState<FormValues>({
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
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

    useEffect(() => {
        if (customer) {
            setFormData({
                diaChi: customer.diaChi || "",
                loai: customer.loai || "",
                tongChiTieu: customer.tongChiTieu || 0,
                soBdsDangThue: customer.soBdsDangThue || 0,
                soBdsYeuThich: customer.soBdsYeuThich || 0,
                soDanhGia: customer.soDanhGia || 0,
                diemTrungBinh: customer.diemTrungBinh || 0,
                bdsDangThueHienTai: customer.bdsDangThueHienTai || "",
                ngayKetThucHopDong: customer.ngayKetThucHopDong || "",
                lanHoatDongGanNhat: customer.lanHoatDongGanNhat || "",
                ghiChu: customer.ghiChu || "",
            });
            setErrors({});
        }
    }, [customer]);

    const handleInputChange = (field: keyof FormValues, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: (["tongChiTieu", "soBdsDangThue", "soBdsYeuThich", "soDanhGia", "diemTrungBinh"].includes(field) ? Number(value) || 0 : value) as any,
        }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Partial<Record<keyof FormValues, string>> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FormValues;
                newErrors[field] = issue.message;
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            if (!customer || !customer._id) {
                alert("Không tìm thấy ID khách hàng để cập nhật");
                return;
            }

            const updatedCustomer: Partial<Customer> = {
                diaChi: formData.diaChi,
                loai: formData.loai,
                tongChiTieu: formData.tongChiTieu,
                soBdsDangThue: formData.soBdsDangThue,
                soBdsYeuThich: formData.soBdsYeuThich,
                soDanhGia: formData.soDanhGia,
                diemTrungBinh: formData.diemTrungBinh,
                bdsDangThueHienTai: formData.bdsDangThueHienTai,
                ngayKetThucHopDong: formData.ngayKetThucHopDong,
                lanHoatDongGanNhat: formData.lanHoatDongGanNhat,
                ghiChu: formData.ghiChu,
                nguoiDungId: customer.nguoiDungId
            };

            try {
                await updateCustomer(customer._id, updatedCustomer as Customer);
                toast.success("Cập nhật thành công!", {
                    description: "Thông tin khách hàng đã được cập nhật.",
                    icon: <CheckCircle className='text-green-500' />,
                    duration: 3000,
                });
                onOpenChange(false);
                onUpdateSuccess();
            } catch (error: any) {
                toast.error(error.message || "Cập nhật khách hàng thất bại");
            }
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white dark:bg-gray-900">
                <DialogHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Edit className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Chỉnh sửa khách hàng
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Cập nhật thông tin khách hàng
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                    <div className="p-6 space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-700 shadow-lg">
                                <AvatarImage src={customer?.nguoiDungId?.anhDaiDien || "/placeholder.svg"} alt={customer?.nguoiDungId?.ten} />
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                                    {customer?.nguoiDungId?.ten?.charAt(0) || "K"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {customer?.nguoiDungId?.ten || "Khách hàng"}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {customer?.nguoiDungId?.email || "Không có email"}
                                </p>
                            </div>
                        </div>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <span>Thông tin cơ bản</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="diaChi" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Địa chỉ *
                                        </Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="diaChi"
                                                value={formData.diaChi ?? ""}
                                                onChange={(e) => handleInputChange("diaChi", e.target.value)}
                                                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.diaChi ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.diaChi && <p className="text-sm text-red-500 mt-1">{errors.diaChi}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="loai" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Loại khách hàng *
                                        </Label>
                                        <Select
                                            value={formData.loai}
                                            onValueChange={(value) => handleInputChange("loai", value)}
                                        >
                                            <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                                                <SelectValue placeholder="Chọn loại khách hàng" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="premium">Premium</SelectItem>
                                                <SelectItem value="regular">Thường</SelectItem>
                                                <SelectItem value="new">Mới</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.loai && <p className="text-sm text-red-500 mt-1">{errors.loai}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tongChiTieu" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Tổng chi tiêu (VNĐ) *
                                        </Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="tongChiTieu"
                                                type="number"
                                                value={formData.tongChiTieu === undefined || formData.tongChiTieu === null ? "" : String(formData.tongChiTieu)}
                                                onChange={(e) => handleInputChange("tongChiTieu", e.target.value)}
                                                placeholder="10000000"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.tongChiTieu ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.tongChiTieu && <p className="text-sm text-red-500 mt-1">{errors.tongChiTieu}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ghiChu" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Ghi chú
                                        </Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="ghiChu"
                                                value={formData.ghiChu ?? ""}
                                                onChange={(e) => handleInputChange("ghiChu", e.target.value)}
                                                placeholder="Ghi chú về khách hàng"
                                                className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    <Home className="h-5 w-5 text-green-600" />
                                    <span>Thông tin bất động sản</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="soBdsDangThue" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Số BDS đang thuê *
                                        </Label>
                                        <div className="relative">
                                            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="soBdsDangThue"
                                                type="number"
                                                value={formData.soBdsDangThue === undefined || formData.soBdsDangThue === null ? "" : String(formData.soBdsDangThue)}
                                                onChange={(e) => handleInputChange("soBdsDangThue", e.target.value)}
                                                placeholder="0"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.soBdsDangThue ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.soBdsDangThue && <p className="text-sm text-red-500 mt-1">{errors.soBdsDangThue}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="soBdsYeuThich" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Số BDS yêu thích *
                                        </Label>
                                        <div className="relative">
                                            <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="soBdsYeuThich"
                                                type="number"
                                                value={formData.soBdsYeuThich === undefined || formData.soBdsYeuThich === null ? "" : String(formData.soBdsYeuThich)}
                                                onChange={(e) => handleInputChange("soBdsYeuThich", e.target.value)}
                                                placeholder="0"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.soBdsYeuThich ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.soBdsYeuThich && <p className="text-sm text-red-500 mt-1">{errors.soBdsYeuThich}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bdsDangThueHienTai" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            BDS đang thuê hiện tại
                                        </Label>
                                        <Input
                                            id="bdsDangThueHienTai"
                                            value={formData.bdsDangThueHienTai ?? ""}
                                            onChange={(e) => handleInputChange("bdsDangThueHienTai", e.target.value)}
                                            placeholder="Tên bất động sản đang thuê"
                                            className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ngayKetThucHopDong" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Ngày kết thúc hợp đồng
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="ngayKetThucHopDong"
                                                type="date"
                                                value={formData.ngayKetThucHopDong ?? ""}
                                                onChange={(e) => handleInputChange("ngayKetThucHopDong", e.target.value)}
                                                className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    <Star className="h-5 w-5 text-yellow-600" />
                                    <span>Đánh giá & Hoạt động</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="soDanhGia" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Số đánh giá *
                                        </Label>
                                        <div className="relative">
                                            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="soDanhGia"
                                                type="number"
                                                value={formData.soDanhGia === undefined || formData.soDanhGia === null ? "" : String(formData.soDanhGia)}
                                                onChange={(e) => handleInputChange("soDanhGia", e.target.value)}
                                                placeholder="0"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.soDanhGia ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.soDanhGia && <p className="text-sm text-red-500 mt-1">{errors.soDanhGia}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="diemTrungBinh" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Điểm trung bình *
                                        </Label>
                                        <div className="relative">
                                            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="diemTrungBinh"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={formData.diemTrungBinh === undefined || formData.diemTrungBinh === null ? "" : String(formData.diemTrungBinh)}
                                                onChange={(e) => handleInputChange("diemTrungBinh", e.target.value)}
                                                placeholder="0.0"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.diemTrungBinh ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.diemTrungBinh && <p className="text-sm text-red-500 mt-1">{errors.diemTrungBinh}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lanHoatDongGanNhat" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Lần hoạt động gần nhất
                                        </Label>
                                        <Input
                                            id="lanHoatDongGanNhat"
                                            value={formData.lanHoatDongGanNhat ?? ""}
                                            onChange={(e) => handleInputChange("lanHoatDongGanNhat", e.target.value)}
                                            placeholder="Ngày hoạt động gần nhất"
                                            className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DialogFooter className="px-6 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-end space-x-3 w-full">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="px-6 h-10 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="px-3 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 