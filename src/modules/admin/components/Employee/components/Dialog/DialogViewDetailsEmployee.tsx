"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Calendar, Briefcase, MapPin, FileText, DollarSign, Building, Eye, UserCheck, UserX, Crown, Users } from "lucide-react"
import { Employee } from "@/lib/apis/types"
import { getDepartmentLabel, getStatusBadge } from "../hooks/ActionHooks"
import { getPositionLabel } from "../hooks/ActionHooks"

interface DialogViewDetailsEmployeeProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    staff?: any
}



const initialFormData: Employee = {
    nguoiDungId: {
        _id: "",
        ten: "",
        email: "",
        tenDangNhap: "",
        matKhau: "",
        soDienThoai: "",
        vaiTro: "",
        anhDaiDien: "",
        trangThai: "",
    },
    phongBan: "sales",
    chucVu: "staff",
    luong: 0,
    hieuSuat: 0,
    ngayVaoLam: new Date(),
    trangThai: "active",
}
export default function DialogViewDetailsEmployee({ open, onOpenChange, staff }: DialogViewDetailsEmployeeProps) {
    const [formData, setFormData] = useState<Employee>(initialFormData)

    useEffect(() => {
        if (staff) {
            setFormData({
                nguoiDungId: {
                    _id: staff.nguoiDungId?._id || "",
                    ten: staff.nguoiDungId?.ten || "",
                    email: staff.nguoiDungId?.email || "",
                    tenDangNhap: staff.nguoiDungId?.tenDangNhap || "",
                    matKhau: staff.nguoiDungId?.matKhau || "",
                    soDienThoai: staff.nguoiDungId?.soDienThoai || "",
                    vaiTro: staff.nguoiDungId?.vaiTro || "",
                    anhDaiDien: staff.nguoiDungId?.anhDaiDien || "",
                    trangThai: staff.nguoiDungId?.trangThai || "",
                    createdAt: staff.nguoiDungId?.createdAt,
                    updatedAt: staff.nguoiDungId?.updatedAt,
                },
                phongBan: staff.phongBan || "sales",
                chucVu: staff.chucVu || "staff",
                luong: staff.luong || 0,
                hieuSuat: staff.hieuSuat || 0,
                ngayVaoLam: staff.ngayVaoLam ? new Date(staff.ngayVaoLam) : new Date(),
                trangThai: staff.trangThai || "active",
                createdAt: staff.createdAt,
                updatedAt: staff.updatedAt,
                __v: staff.__v,
            })
        }
    }, [staff])




    const formatDate = (dateString?: string): string => {
        if (!dateString) return "Chưa có thông tin"
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Ngày không hợp lệ"
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }


    const formatSalary = (salary: string) => {
        if (!salary) return "Chưa có thông tin"
        return Number.parseInt(salary).toLocaleString("vi-VN") + " VNĐ"
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white dark:bg-gray-900">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Eye className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Thông tin nhân viên
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Xem chi tiết thông tin nhân viên
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                    <div className="p-6 space-y-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-700 shadow-lg">
                                    <AvatarImage src={formData.nguoiDungId?.anhDaiDien || "/placeholder.svg"} alt={formData.nguoiDungId?.anhDaiDien} />
                                    <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold">
                                        {formData.nguoiDungId?.ten.charAt(0) || "S"}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{formData.nguoiDungId?.ten}</h3>
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    {/* {getPositionIcon(formData.position)} */}
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {/* {getPositionLabel(formData.position)} */}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
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
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Họ và tên
                                        </Label>
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <User className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                                                {formData.nguoiDungId?.ten || "Chưa có thông tin"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email
                                        </Label>
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100">
                                                {formData.nguoiDungId?.email || "Chưa có thông tin"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Số điện thoại
                                        </Label>
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100">
                                                {formData.nguoiDungId?.soDienThoai || "Chưa có thông tin"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Lương
                                        </Label>
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                                                {formatSalary(String(formData.luong))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Địa chỉ
                                    </Label>
                                    <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                        <span className="text-gray-900 dark:text-gray-100">
                                            {formData || "Chưa có thông tin"}
                                        </span>
                                    </div>
                                </div> */}
                            </CardContent>
                        </Card>

                        {/* Work Information */}
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
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <Briefcase className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                                                {getPositionLabel(formData.chucVu)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Phòng ban
                                        </Label>
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <Building className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100">
                                                {getDepartmentLabel(formData.phongBan)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Trạng thái
                                        </Label>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            {getStatusBadge(formData.trangThai)}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Ngày tham gia
                                        </Label>
                                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-gray-100">
                                                {formatDate(formData.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Giới thiệu
                                    </Label>
                                    <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                                        <span className="text-gray-900 dark:text-gray-100">
                                            {formData. || "Chưa có thông tin"}
                                        </span>
                                    </div>
                                </div> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-end space-x-3 w-full">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="px-6 h-10 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Đóng
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
