import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Chrome, Github, AlertCircle, Eye, EyeOff } from "lucide-react"

import React from "react"
import { FormMotion } from "./Animation/FormMotion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
interface RegisterFormProps {
    formData: {
        ten: string
        email: string
        tenDangNhap: string
        matKhau: string
        xacNhanMatKhau: string
        soDienThoai: string
        vaiTro: string
    }
    errors: {
        ten?: string
        email?: string
        tenDangNhap?: string
        matKhau?: string
        xacNhanMatKhau?: string
        soDienThoai?: string
        vaiTro?: string
    }
    showPassword: boolean
    showConfirmPassword: boolean
    isLoading: boolean
    onInputChange: (field: keyof { ten: string; email: string; tenDangNhap: string; matKhau: string; xacNhanMatKhau: string; soDienThoai: string; vaiTro: string }, value: string) => void
    onShowPassword: () => void
    onShowConfirmPassword: () => void
    onSubmit: (e: React.FormEvent) => void
    onSocialLogin: (provider: string) => void
}

export function RegisterForm({
    formData,
    errors,
    showPassword,
    showConfirmPassword,
    isLoading,
    onInputChange,
    onShowPassword,
    onShowConfirmPassword,
    onSubmit,
    onSocialLogin,
}: RegisterFormProps) {
    return (
        <FormMotion
            className="max-w-md mx-auto w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
        >
            <FormMotion
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Đăng ký</h2>
                <p className="text-gray-600">để sử dụng dịch vụ cho thuê nhà tốt nhất.</p>
            </FormMotion>
            <form
                onSubmit={onSubmit}
                className="space-y-4 w-full max-w-md max-h-[60vh] overflow-y-auto p-2"
                style={{ minWidth: 0 }}
            >
                {/* Email */}
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={formData.email}
                        onChange={e => onInputChange("email", e.target.value)}
                        className={`h- border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:ring-0 transition-all duration-300 ${errors.email ? "border-red-400" : ""}`}
                    />
                    {errors.email && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                        </div>
                    )}
                </FormMotion>
                {/* Full Name */}
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">
                        Họ và tên
                    </Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={formData.ten}
                        onChange={e => onInputChange("ten", e.target.value)}
                        className={`h- border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:ring-0 transition-all duration-300 ${errors.ten ? "border-red-400" : ""}`}
                    />
                    {errors.ten && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.ten}
                        </div>
                    )}
                </FormMotion>
                {/* Username */}
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Label htmlFor="username" className="text-gray-700 font-medium">
                        Tên đăng nhập
                    </Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={formData.tenDangNhap}
                        onChange={e => onInputChange("tenDangNhap", e.target.value)}
                        className={` border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:ring-0 transition-all duration-300 ${errors.tenDangNhap ? "border-red-400" : ""}`}
                    />
                    {errors.tenDangNhap && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.tenDangNhap}
                        </div>
                    )}
                </FormMotion>
                {/* Password */}
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                        Mật khẩu
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            value={formData.matKhau}
                            onChange={e => onInputChange("matKhau", e.target.value)}
                            className={` border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:ring-0 transition-all duration-300 pr-10 ${errors.matKhau ? "border-red-400" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={onShowPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.matKhau && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.matKhau}
                        </div>
                    )}
                </FormMotion>
                {/* Confirm Password */}
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                >
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                        Xác nhận mật khẩu
                    </Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu"
                            value={formData.xacNhanMatKhau}
                            onChange={e => onInputChange("xacNhanMatKhau", e.target.value)}
                            className={` border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:ring-0 transition-all duration-300 pr-10 ${errors.xacNhanMatKhau ? "border-red-400" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={onShowConfirmPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.xacNhanMatKhau && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.xacNhanMatKhau}
                        </div>
                    )}
                </FormMotion>
                {/* Phone */}
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Số điện thoại
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={formData.soDienThoai}
                        onChange={e => onInputChange("soDienThoai", e.target.value)}
                        className={` border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:ring-0 transition-all duration-300 ${errors.soDienThoai ? "border-red-400" : ""}`}
                    />
                    {errors.soDienThoai && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.soDienThoai}
                        </div>
                    )}
                </FormMotion>
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    <Label htmlFor="group" className="text-gray-700 font-medium">
                        Vai Trò
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Vai Trò" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Khách hàng</SelectItem>
                            <SelectItem value="dark">Chú nhà</SelectItem>

                        </SelectContent>
                    </Select>
                </FormMotion>

                <FormMotion
                    className="pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer   bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 hover:shadow-lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Đang xử lý...
                            </div>
                        ) : (
                            "ĐĂNG KÝ"
                        )}
                    </Button>
                </FormMotion>
                {/* Social Login */}
                <FormMotion
                    className="space-y-3 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                >
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full cursor-pointer border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:shadow-md"
                        onClick={() => onSocialLogin("google")}
                    >
                        <Chrome className="w-5 h-5 mr-2 text-red-500" />
                        Đăng ký bằng Google
                    </Button>

                </FormMotion>
            </form >
        </FormMotion >
    )
} 