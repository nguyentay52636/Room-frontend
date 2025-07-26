
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
import { Mail, Phone, Calendar, Upload, Briefcase, FileText, DollarSign, Building, Edit, User, CheckCircle } from "lucide-react";
import { z } from "zod";
import { Employee, UserType } from "@/lib/apis/types";
import { updateEmployee } from "@/lib/apis/employeeApi";
import { toast } from 'sonner';
interface DialogEditEmployeeProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    staff: Employee;
    onUpdateSuccess: () => void;
}

const formSchema = z.object({
    // Thông tin user (IUser)
    _id: z.string().optional(),
    ten: z.string().min(1, "Họ và tên là bắt buộc"),
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    tenDangNhap: z.string().min(1, "Tên đăng nhập là bắt buộc"),
    matKhau: z.string().optional(),
    soDienThoai: z
        .string()
        .min(1, "Số điện thoại là bắt buộc")
        .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10 hoặc 11 chữ số"),
    vaiTro: z.string().optional(),
    anhDaiDien: z.string().optional(),
    trangThai: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),

    // Thông tin employee
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
});

type FormValues = z.infer<typeof formSchema>;



export default function DialogEditEmployee({ open, onOpenChange, staff, onUpdateSuccess }: DialogEditEmployeeProps) {
    const [formData, setFormData] = useState<FormValues>({
        // Thông tin user
        _id: "",
        ten: "",
        email: "",
        tenDangNhap: "",
        matKhau: "",
        soDienThoai: "",
        vaiTro: "",
        anhDaiDien: "",
        trangThai: "",
        createdAt: "",
        updatedAt: "",

        // Thông tin employee
        phongBan: "",
        chucVu: "",
        luong: 0,
        hieuSuat: 0,
        ngayVaoLam: new Date().toISOString().split("T")[0],
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

    useEffect(() => {
        if (staff) {
            setFormData({
                // Thông tin user từ nguoiDungId
                _id: staff.nguoiDungId?._id || "",
                ten: staff.nguoiDungId?.ten || "",
                email: staff.nguoiDungId?.email || "",
                tenDangNhap: staff.nguoiDungId?.tenDangNhap || "",
                matKhau: staff.nguoiDungId?.matKhau || "",
                soDienThoai: staff.nguoiDungId?.soDienThoai || "",
                vaiTro: typeof staff.nguoiDungId?.vaiTro === "object"
                    ? (staff.nguoiDungId?.vaiTro as any)?.ten || ""
                    : staff.nguoiDungId?.vaiTro || "",
                anhDaiDien: staff.nguoiDungId?.anhDaiDien || "",
                trangThai: staff.nguoiDungId?.trangThai || "",
                createdAt: staff.nguoiDungId?.createdAt || "",
                updatedAt: staff.nguoiDungId?.updatedAt || "",

                // Thông tin employee
                phongBan: staff.phongBan || "",
                chucVu: staff.chucVu || "",
                luong: staff.luong || 0,
                hieuSuat: staff.hieuSuat || 0,
                ngayVaoLam: staff.ngayVaoLam
                    ? new Date(staff.ngayVaoLam).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
            });
            setErrors({});
        }
    }, [staff]);

    const handleInputChange = (field: keyof FormValues, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: (["luong", "hieuSuat"].includes(field) ? Number(value) || 0 : value) as any,
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
            if (!staff || !staff._id) {
                alert("Không tìm thấy ID nhân viên để cập nhật");
                return;
            }
            // Chỉ cập nhật các trường cho phép
            const updatedEmployee: Partial<Employee> = {
                phongBan: formData.phongBan,
                chucVu: formData.chucVu,
                luong: formData.luong,
                hieuSuat: formData.hieuSuat || 0,
                ngayVaoLam: new Date(formData.ngayVaoLam),
                trangThai: formData.trangThai,
                nguoiDungId: staff.nguoiDungId // truyền đúng UserType (IUser)
            };
            try {
                await updateEmployee(staff._id, updatedEmployee as Employee);
                toast.success("Đăng ký thành công!", {
                    description: "Nhân viên đã được cập nhật vào hệ thống.",
                    icon: <CheckCircle className='text-green-500' />,
                    duration: 3000,
                });
                onOpenChange(false);
                onUpdateSuccess();
            } catch (error: any) {
                toast.error(error.message || "Cập nhật nhân viên thất bại");
            }
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
                                disabled
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
                                                value={formData.ten ?? ""}
                                                onChange={(e) => handleInputChange("ten", e.target.value)}
                                                placeholder="Nguyễn Văn A"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.ten ? "border-red-500 focus:border-red-500" : ""}`}
                                                disabled
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
                                                value={formData.email ?? ""}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                placeholder="example@newlife.vn"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                                                disabled
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
                                                value={formData.soDienThoai ?? ""}
                                                onChange={(e) => handleInputChange("soDienThoai", e.target.value)}
                                                placeholder="0987654321"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.soDienThoai ? "border-red-500 focus:border-red-500" : ""}`}
                                                disabled
                                            />
                                            {errors.soDienThoai && <p className="text-sm text-red-500 mt-1">{errors.soDienThoai}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tenDangNhap" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Tên đăng nhập *
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="tenDangNhap"
                                                value={formData.tenDangNhap ?? ""}
                                                onChange={(e) => handleInputChange("tenDangNhap", e.target.value)}
                                                placeholder="nguyenvana"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.tenDangNhap ? "border-red-500 focus:border-red-500" : ""}`}
                                                disabled
                                            />
                                            {errors.tenDangNhap && <p className="text-sm text-red-500 mt-1">{errors.tenDangNhap}</p>}
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
                                                disabled
                                            >
                                                <SelectTrigger className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400">
                                                    <SelectValue placeholder="Chọn vai trò" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Nhan vien">Nhân viên</SelectItem>
                                                    <SelectItem value="Quan ly">Quản lý</SelectItem>
                                                    <SelectItem value="Admin">Quản trị viên</SelectItem>
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
                                                value={formData.luong === undefined || formData.luong === null ? "" : String(formData.luong)}
                                                onChange={(e) => handleInputChange("luong", e.target.value)}
                                                placeholder="10000000"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.luong ? "border-red-500 focus:border-red-500" : ""}`}
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
                                                value={formData.hieuSuat === undefined || formData.hieuSuat === null ? "" : String(formData.hieuSuat)}
                                                onChange={(e) => handleInputChange("hieuSuat", e.target.value)}
                                                placeholder="0"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.hieuSuat ? "border-red-500 focus:border-red-500" : ""}`}
                                            />
                                            {errors.hieuSuat && <p className="text-sm text-red-500 mt-1">{errors.hieuSuat}</p>}
                                        </div>
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
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Vị trí
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
                                                    <SelectItem value="Quan ly">Quản lý</SelectItem>
                                                    <SelectItem value="Nhan vien">Nhân viên</SelectItem>
                                                    <SelectItem value="Admin">Quản trị viên</SelectItem>
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
                                                    <SelectItem value="Sales">Kinh doanh</SelectItem>
                                                    <SelectItem value="Support">Hỗ trợ khách hàng</SelectItem>
                                                    <SelectItem value="Tech">Kỹ thuật</SelectItem>
                                                    <SelectItem value="Admin">Quản trị</SelectItem>
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
                                                <SelectItem value="dang_hoat_dong">Đang làm việc</SelectItem>
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
                                                value={formData.ngayVaoLam ?? ""}
                                                onChange={(e) => handleInputChange("ngayVaoLam", e.target.value)}
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.ngayVaoLam ? "border-red-500 focus:border-red-500" : ""}`}
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
