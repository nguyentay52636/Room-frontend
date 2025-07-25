
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar, Upload, Briefcase, FileText, DollarSign, Building, Edit, User } from "lucide-react";
import { z } from "zod";
import { Employee, UserType } from "@/lib/apis/types";

// Define Zod schema synchronized with Employee and IUser interfaces
const formSchema = z.object({
    ten: z.string().min(1, "Họ và tên là bắt buộc"),
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    soDienThoai: z
        .string()
        .min(1, "Số điện thoại là bắt buộc")
        .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10 hoặc 11 chữ số"),
    anhDaiDien: z.string().optional(),
    vaiTro: z.string().optional(), // Assuming role is a string; adjust if enum
    phongBan: z.string().min(1, "Phòng ban là bắt buộc"),
    chucVu: z.string().min(1, "Chức vụ là bắt buộc"),
    luong: z
        .number({ invalid_type_error: "Lương phải là một số" })
        .positive("Lương phải lớn hơn 0"),
    hieuSuat: z
        .number({ invalid_type_error: "Hiệu suất phải là một số" })
        .min(0, "Hiệu suất không được âm")
        .optional(),
    ngayVaoLam: z
        .string()
        .min(1, "Ngày vào làm là bắt buộc")
        .refine((val) => !isNaN(Date.parse(val)), "Ngày vào làm phải là định dạng ngày hợp lệ"),
    trangThai: z.string().min(1, "Trạng thái là bắt buộc"),
    bio: z.string().optional(), // Not in Employee but included for UI compatibility
});

type FormValues = z.infer<typeof formSchema>;

interface DialogEditEmployeeProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    staff: Employee;
    onUpdateSuccess: () => void;
}

export default function DialogEditEmployee({ open, onOpenChange, staff, onUpdateSuccess }: DialogEditEmployeeProps) {
    const [formData, setFormData] = useState<FormValues>({
        ten: "",
        email: "",
        soDienThoai: "",
        anhDaiDien: "",
        vaiTro: "",
        phongBan: "",
        chucVu: "",
        luong: 0,
        hieuSuat: 0,
        ngayVaoLam: new Date().toISOString().split("T")[0],
        trangThai: "",
        bio: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

    useEffect(() => {
        if (staff) {
            setFormData({
                ten: staff.nguoiDungId?.ten || "",
                email: staff.nguoiDungId?.email || "",
                soDienThoai: staff.nguoiDungId?.soDienThoai || "",
                anhDaiDien: staff.nguoiDungId?.anhDaiDien || "",
                vaiTro: staff.nguoiDungId?.vaiTro?.ten || "",
                phongBan: staff.phongBan || "",
                chucVu: staff.chucVu || "",
                luong: staff.luong || 0,
                hieuSuat: staff.hieuSuat || 0,
                ngayVaoLam: staff.ngayVaoLam
                    ? new Date(staff.ngayVaoLam).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
                trangThai: staff.trangThai || "",
                bio: "",
            });
            setErrors({});
        }
    }, [staff]);

    const handleInputChange = (field: keyof FormValues, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: typeof value === "string" && ["luong", "hieuSuat"].includes(field)
                ? Number(value) || 0
                : value,
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

    const handleSubmit = () => {
        if (validateForm()) {
            const updatedEmployee: Partial<Employee> = {
                nguoiDungId: {
                    ten: formData.ten,
                    email: formData.email,
                    soDienThoai: formData.soDienThoai,
                    anhDaiDien: formData.anhDaiDien || undefined,
                    vaiTro: formData.vaiTro || undefined,
                } as UserType,
                phongBan: formData.phongBan,
                chucVu: formData.chucVu,
                luong: formData.luong,
                hieuSuat: formData.hieuSuat || 0,
                ngayVaoLam: new Date(formData.ngayVaoLam),
                trangThai: formData.trangThai,
            };
            console.log("Updating employee:", updatedEmployee);
            // TODO: Implement API call to update employee
            onOpenChange(false);
            onUpdateSuccess();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white dark:bg-gray-900">
                <DialogHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Edit className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Chỉnh sửa nhân viên
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Cập nhật thông tin nhân viên
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                    <div className="p-6 space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-700 shadow-lg">
                                <AvatarImage src={formData.anhDaiDien || "/placeholder.svg"} alt={formData.ten} />
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">
                                    {formData.ten.charAt(0) || "S"}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 border-gray-200 dark:border-gray-700 bg-transparent"
                                onClick={() => {
                                    // TODO: Implement avatar upload logic
                                    console.log("Avatar upload clicked");
                                }}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Tải ảnh lên
                            </Button>
                        </div>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <span>Thông tin cá nhân</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ten" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Họ và tên *
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="ten"
                                                value={formData.ten}
                                                onChange={(e) => handleInputChange("ten", e.target.value)}
                                                placeholder="Nguyễn Văn A"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.ten ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.ten && <p className="text-sm text-red-500 mt-1">{errors.ten}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email *
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                placeholder="example@newlife.vn"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.email ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="soDienThoai" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Số điện thoại *
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="soDienThoai"
                                                value={formData.soDienThoai}
                                                onChange={(e) => handleInputChange("soDienThoai", e.target.value)}
                                                placeholder="0987654321"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.soDienThoai ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.soDienThoai && <p className="text-sm text-red-500 mt-1">{errors.soDienThoai}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="vaiTro" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Vai trò
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                            <Select
                                                value={formData.vaiTro}
                                                onValueChange={(value) => handleInputChange("vaiTro", value)}
                                            >
                                                <SelectTrigger className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400">
                                                    <SelectValue placeholder="Chọn vai trò" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {/* Adjust values based on role enum/type if defined */}
                                                    <SelectItem value="employee">Nhân viên</SelectItem>
                                                    <SelectItem value="manager">Quản lý</SelectItem>
                                                    <SelectItem value="admin">Quản trị viên</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="luong" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Lương (VNĐ) *
                                        </Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="luong"
                                                type="number"
                                                value={formData.luong || ""}
                                                onChange={(e) => handleInputChange("luong", e.target.value)}
                                                placeholder="10000000"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.luong ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.luong && <p className="text-sm text-red-500 mt-1">{errors.luong}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="hieuSuat" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Hiệu suất
                                        </Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="hieuSuat"
                                                type="number"
                                                value={formData.hieuSuat || ""}
                                                onChange={(e) => handleInputChange("hieuSuat", e.target.value)}
                                                placeholder="0"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.hieuSuat ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.hieuSuat && <p className="text-sm text-red-500 mt-1">{errors.hieuSuat}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Giới thiệu
                                    </Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Textarea
                                            id="bio"
                                            value={formData.bio}
                                            onChange={(e) => handleInputChange("bio", e.target.value)}
                                            placeholder="Thông tin thêm về nhân viên..."
                                            rows={3}
                                            className="pl-10 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 resize-none"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    <Building className="h-5 w-5 text-green-600" />
                                    <span>Thông tin công việc</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="chucVu" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Chức vụ *
                                        </Label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                            <Select
                                                value={formData.chucVu}
                                                onValueChange={(value) => handleInputChange("chucVu", value)}
                                            >
                                                <SelectTrigger className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400">
                                                    <SelectValue placeholder="Chọn chức vụ" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="manager">Quản lý</SelectItem>
                                                    <SelectItem value="staff">Nhân viên</SelectItem>
                                                    <SelectItem value="admin">Quản trị viên</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phongBan" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Phòng ban *
                                        </Label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                            <Select
                                                value={formData.phongBan}
                                                onValueChange={(value) => handleInputChange("phongBan", value)}
                                            >
                                                <SelectTrigger className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400">
                                                    <SelectValue placeholder="Chọn phòng ban" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sales">Kinh doanh</SelectItem>
                                                    <SelectItem value="support">Hỗ trợ khách hàng</SelectItem>
                                                    <SelectItem value="tech">Kỹ thuật</SelectItem>
                                                    <SelectItem value="admin">Quản trị</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="trangThai" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Trạng thái *
                                        </Label>
                                        <Select
                                            value={formData.trangThai}
                                            onValueChange={(value) => handleInputChange("trangThai", value)}
                                        >
                                            <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400">
                                                <SelectValue placeholder="Chọn trạng thái" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Đang làm việc</SelectItem>
                                                <SelectItem value="onleave">Nghỉ phép</SelectItem>
                                                <SelectItem value="inactive">Đã nghỉ việc</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ngayVaoLam" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Ngày tham gia *
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="ngayVaoLam"
                                                type="date"
                                                value={formData.ngayVaoLam}
                                                onChange={(e) => handleInputChange("ngayVaoLam", e.target.value)}
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.ngayVaoLam ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.ngayVaoLam && <p className="text-sm text-red-500 mt-1">{errors.ngayVaoLam}</p>}
                                        </div>
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
                            className="px-3 h-10 bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
