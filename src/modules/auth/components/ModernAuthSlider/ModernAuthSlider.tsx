import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
    X,
    Home,
    MapPin,
    Star,
    Users,
    Shield,
    Clock,
} from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"
import { LoginForm } from "./components/LoginForm"
import { RegisterForm } from "./components/RegisterForm"
import { WelcomePanel } from "./components/WelcomePanel"
import { AnimatedBackground } from "./components/AnimatedBackground"

interface FormData {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    phone: string
    username: string
    group: string
}

interface FormErrors {
    email?: string
    password?: string
    confirmPassword?: string
    fullName?: string
    phone?: string
    username?: string
    group?: string
}

interface ModernAuthSliderProps {
    onClose?: () => void
}

export default function ModernAuthSlider({ onClose }: ModernAuthSliderProps) {
    const router = useNavigate()
    const pathname = useLocation()
    const [mode, setMode] = useState<"login" | "register">("login")
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const [pendingMode, setPendingMode] = useState<"login" | "register" | null>(null)
    const [direction, setDirection] = useState(1)

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        username: "",
        group: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})

    // Set mode based on pathname
    useEffect(() => {
        if (pathname.pathname === "/auth/login") {
            setMode("login")
        } else if (pathname.pathname === "/auth/register") {
            setMode("register")
        }
    }, [pathname])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                })
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener("mousemove", handleMouseMove)
            return () => container.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    const switchMode = (newMode: "login" | "register") => {
        if (isTransitioning || mode === newMode) return

        setIsTransitioning(true)
        setPendingMode(newMode)
        setDirection(newMode === "register" ? 1 : -1)

        // Update URL
        router(newMode === "login" ? "/auth/login" : "/auth/register")
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.email) {
            newErrors.email = "Email là bắt buộc"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ"
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu là bắt buộc"
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
        }

        if (mode === "register") {
            if (!formData.fullName) {
                newErrors.fullName = "Họ và tên là bắt buộc"
            }

            if (!formData.username) {
                newErrors.username = "Tên đăng nhập là bắt buộc"
            }

            if (!formData.phone) {
                newErrors.phone = "Số điện thoại là bắt buộc"
            } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
                newErrors.phone = "Số điện thoại không hợp lệ"
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Mật khẩu không khớp"
            }

            if (!formData.group) {
                newErrors.group = "Vui lòng chọn loại tài khoản"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log(mode === "login" ? "Login:" : "Register:", formData)
        } catch (error) {
            console.error("Auth error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`)
    }

    return (
        <div ref={containerRef} className="relative min-h-screen py-50 overflow-hidden">
            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <X className="w-6 h-6" />
                </button>
            )}

            {/* Animated Background Elements */}
            <AnimatedBackground mousePosition={mousePosition} />

            {/* Main Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full max-w-7xl min-h-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden"
                    style={{
                        backgroundImage: "url('https://smartland.vn/wp-content/uploads/2021/10/bat-dong-san-ven-song-sai-gon-01-e1620704384316.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={mode}
                            custom={direction}
                            initial={{ x: 100 * direction + "%", opacity: 0, scale: 0.98 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: -100 * direction + "%", opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.7, ease: [0.4, 0.01, 0.165, 0.99] }}
                            className="absolute inset-0 grid lg:grid-cols-2"
                            style={{ zIndex: 2 }}
                        >
                            {mode === "login" ? (                                <>
                                    {/* Left Side - Login Form */}
                                    <div className="flex flex-col justify-center p-8 lg:p-16 bg-white relative overflow-hidden">
                                        {/* Decorative Elements */}
                                        <div className="absolute top-10 left-10 w-20 h-20 opacity-10">
                                            <div
                                                className="w-full h-full border-4 border-pink-300 rounded-full animate-spin"
                                                style={{ animationDuration: "20s" }}
                                            />
                                        </div>
                                        <div className="absolute bottom-20 right-10 w-16 h-16 opacity-10">
                                            <div className="w-full h-full bg-blue-300 rounded-lg rotate-45 animate-pulse" />
                                        </div>
                                        <LoginForm
                                            formData={formData}
                                            errors={errors}
                                            showPassword={showPassword}
                                            isLoading={isLoading}
                                            onInputChange={(field, value) => handleInputChange(field as keyof FormData, value)}
                                            onShowPassword={() => setShowPassword(!showPassword)}
                                            onSubmit={handleSubmit}
                                            onSocialLogin={handleSocialLogin}
                                        />
                                    </div>
                                    {/* Right Side - Welcome Panel with Rental Service Info */}
                                    <div
                                        className="relative flex flex-col justify-center items-center p-8 lg:p-16 text-white overflow-hidden"

                                    >
                                        <WelcomePanel
                                            mode={mode}
                                            isTransitioning={isTransitioning}
                                            onSwitchMode={() => switchMode("register")}
                                        >
                                            <div className="mb-8">
                                                <h2 className="text-5xl font-bold mb-4 leading-tight">Xin chào!</h2>
                                                <p className="text-xl mb-6 opacity-90 max-w-md">
                                                    Chào mừng đến với nền tảng cho thuê nhà hàng đầu Việt Nam
                                                </p>
                                            </div>
                                            <div className="space-y-4 mb-8 max-w-sm">
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                        <Home className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">10,000+ Căn hộ</p>
                                                        <p className="text-sm opacity-80">Đa dạng lựa chọn</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                        <Shield className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Bảo mật tuyệt đối</p>
                                                        <p className="text-sm opacity-80">Thông tin được bảo vệ</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                        <Clock className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Hỗ trợ 24/7</p>
                                                        <p className="text-sm opacity-80">Luôn sẵn sàng giúp đỡ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </WelcomePanel>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Left Side - Welcome Back Panel with Service Info */}
                                    <div
                                        className="relative flex flex-col justify-center items-center p-8 lg:p-16 text-white overflow-hidden"
                                        style={{
                                            backgroundImage: "url('https://smartland.vn/wp-content/uploads/2021/10/bat-dong-san-ven-song-sai-gon-01-e1620704384316.jpg')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    >
                                        <WelcomePanel
                                            mode={mode}
                                            isTransitioning={isTransitioning}
                                            onSwitchMode={() => switchMode("login")}
                                        >
                                            <div className="mb-8">
                                                <h2 className="text-5xl font-bold mb-4 leading-tight">Chào mừng trở lại!</h2>
                                                <p className="text-xl mb-6 opacity-90 max-w-md">
                                                    Đăng nhập để tiếp tục hành trình tìm kiếm ngôi nhà lý tưởng
                                                </p>
                                            </div>
                                            <div className="space-y-4 mb-8 max-w-sm">
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                        <Users className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">50,000+ Khách hàng</p>
                                                        <p className="text-sm opacity-80">Tin tưởng sử dụng</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                        <Star className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">4.9/5 Đánh giá</p>
                                                        <p className="text-sm opacity-80">Từ người dùng</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                        <MapPin className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">63 Tỉnh thành</p>
                                                        <p className="text-sm opacity-80">Phủ sóng toàn quốc</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </WelcomePanel>
                                    </div>
                                    {/* Right Side - Register Form */}
                                    <div className="flex flex-col justify-center p-8 lg:p-8 bg-white relative overflow-hidden">
                                        {/* Decorative Elements */}
                                        <div className="absolute top-10 right-10 w-20 h-20 opacity-10">
                                            <div
                                                className="w-full h-full border-4 border-teal-300 rounded-full animate-spin"
                                                style={{ animationDuration: "20s" }}
                                            />
                                        </div>
                                        <div className="absolute bottom-20 left-10 w-16 h-16 opacity-10">
                                            <div className="w-full h-full bg-pink-300 rounded-lg rotate-45 animate-pulse" />
                                        </div>
                                        <RegisterForm
                                            formData={formData}
                                            errors={errors}
                                            showPassword={showPassword}
                                            showConfirmPassword={showConfirmPassword}
                                            isLoading={isLoading}
                                            onInputChange={(field, value) => handleInputChange(field as keyof FormData, value)}
                                            onShowPassword={() => setShowPassword(!showPassword)}
                                            onShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                            onSubmit={handleSubmit}
                                            onSocialLogin={handleSocialLogin}
                                        />
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
