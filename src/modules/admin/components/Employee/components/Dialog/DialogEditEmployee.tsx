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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Calendar, Upload, Briefcase, MapPin, FileText, DollarSign, Building, Edit } from "lucide-react"

interface DialogEditEmployeeProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    staff?: any
}

interface FormData {
    name: string
    email: string
    phone: string
    position: string
    department: string
    status: string
    joinDate: string
    salary: string
    address: string
    avatar: string
    bio: string
}

const initialFormData: FormData = {
    name: "",
    email: "",
    phone: "",
    position: "staff",
    department: "sales",
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
    salary: "",
    address: "",
    avatar: "",
    bio: "",
}

export default function DialogEditEmployee({ open, onOpenChange, staff }: DialogEditEmployeeProps) {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

    useEffect(() => {
        if (staff) {
            setFormData({
                name: staff.name || "",
                email: staff.email || "",
                phone: staff.phone || "",
                position: staff.position || "staff",
                department: staff.department || "sales",
                status: staff.status || "active",
                joinDate: staff.joinDate || new Date().toISOString().split("T")[0],
                salary: staff.salary || "",
                address: staff.address || "",
                avatar: staff.avatar || "",
                bio: staff.bio || "",
            })
            setErrors({})
        }
    }, [staff])

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {}

        if (!formData.name.trim()) newErrors.name = "Họ và tên là bắt buộc"
        if (!formData.email.trim()) {
            newErrors.email = "Email là bắt buộc"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ"
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại là bắt buộc"
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Số điện thoại không hợp lệ"
        }
        if (!formData.salary.trim()) {
            newErrors.salary = "Lương là bắt buộc"
        } else if (Number.parseInt(formData.salary) <= 0) {
            newErrors.salary = "Lương phải lớn hơn 0"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Updating staff:", formData)
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white dark:bg-gray-900">
                {/* Header */}
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

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                    <div className="p-6 space-y-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-700 shadow-lg">
                                    <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                                    <AvatarFallback className="text-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">
                                        {formData.name.charAt(0) || "S"}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 border-gray-200 dark:border-gray-700 bg-transparent"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Tải ảnh lên
                            </Button>
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
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Họ và tên *
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                placeholder="Nguyễn Văn A"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.name ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
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
                                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Số điện thoại *
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                placeholder="0987654321"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.phone ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="salary" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Lương (VNĐ) *
                                        </Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="salary"
                                                type="number"
                                                value={formData.salary}
                                                onChange={(e) => handleInputChange("salary", e.target.value)}
                                                placeholder="10000000"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 ${errors.salary ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                            />
                                            {errors.salary && <p className="text-sm text-red-500 mt-1">{errors.salary}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Địa chỉ
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                            className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400"
                                        />
                                    </div>
                                </div>
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
                                        <Label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Vị trí *
                                        </Label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                            <Select
                                                value={formData.position}
                                                onValueChange={(value) => handleInputChange("position", value)}
                                            >
                                                <SelectTrigger className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400">
                                                    <SelectValue placeholder="Chọn vị trí" />
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
                                        <Label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Phòng ban *
                                        </Label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                            <Select
                                                value={formData.department}
                                                onValueChange={(value) => handleInputChange("department", value)}
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
                                        <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Trạng thái
                                        </Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => handleInputChange("status", value)}
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
                                        <Label htmlFor="joinDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Ngày tham gia *
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="joinDate"
                                                type="date"
                                                value={formData.joinDate}
                                                onChange={(e) => handleInputChange("joinDate", e.target.value)}
                                                className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400"
                                            />
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
                    </div>
                </div>

                {/* Footer */}
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
    )
}
