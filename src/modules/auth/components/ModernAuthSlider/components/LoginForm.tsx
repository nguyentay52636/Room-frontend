import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Chrome, Github, AlertCircle, Eye, EyeOff, Facebook } from "lucide-react"
import { FormMotion } from "./Animation/FormMotion"
import React from "react"
import LoginWithGoogle from "../../Google/LoginWithGoogle"


interface LoginFormProps {
    formData: {
        tenDangNhap: string
        matKhau: string
    }
    errors: {
        tenDangNhap?: string
        matKhau?: string
    }

    showPassword: boolean
    isLoading: boolean
    onInputChange: (field: keyof { tenDangNhap: string; matKhau: string }, value: string) => void
    onShowPassword: () => void
    onSubmit: (e: React.FormEvent) => void
    onSocialLogin: (provider: string) => void
    handleSubmitLogin: (e: React.FormEvent) => void
    handleFacebookLogin: () => void
}

export function LoginForm({
    formData,
    errors,
    showPassword,
    isLoading,
    onInputChange,
    onShowPassword,
    handleSubmitLogin,
    handleFacebookLogin,
}: LoginFormProps) {
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
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
                <p className="text-gray-600">hoặc sử dụng tài khoản đã đăng ký của bạn.</p>
            </FormMotion>
            <form onSubmit={handleSubmitLogin} className="space-y-6">
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
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
                        className={`h-12 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 ${errors.tenDangNhap ? "border-red-400" : ""}`}
                    />
                    {errors.tenDangNhap && (
                        <div className="flex items-center gap-2 text-red-500 text-sm animate-fadeIn">
                            <AlertCircle className="w-4 h-4" />
                            {errors.tenDangNhap}
                        </div>
                    )}
                </FormMotion>
                <FormMotion
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
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
                            className={`h-12 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 pr-10 ${errors.matKhau ? "border-red-400" : ""}`}
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
                <FormMotion
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 hover:shadow-lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Đang xử lý...
                            </div>
                        ) : (
                            "ĐĂNG NHẬP"
                        )}
                    </Button>
                </FormMotion>
                <FormMotion
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <LoginWithGoogle />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleFacebookLogin}
                        className="w-full cursor-pointer h-12 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:shadow-md"
                    >
                        <Facebook className="w-5 h-5 mr-2 text-blue-500" />
                        Đăng nhập bằng facebook
                    </Button>
                </FormMotion>

            </form>
        </FormMotion>
    )
} 