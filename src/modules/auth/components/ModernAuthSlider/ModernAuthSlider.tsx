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
import { toast } from "react-toastify"
import { login, register } from "@/redux/slices/authSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"

interface FormData {
    ten: string
    email: string
    tenDangNhap: string
    matKhau: string
    xacNhanMatKhau: string
    soDienThoai: string
    vaiTro: string
}

interface FormErrors {
    ten?: string
    email?: string
    tenDangNhap?: string
    matKhau?: string
    xacNhanMatKhau?: string
    soDienThoai?: string
    vaiTro?: string
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

    // Responsive states
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormData>({
        email: "",
        matKhau: "",
        xacNhanMatKhau: "",
        ten: "",
        soDienThoai: "",
        tenDangNhap: "",
        vaiTro: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})

    // Responsive detection
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            setIsMobile(width < 768)
            setIsTablet(width >= 768 && width < 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.tenDangNhap && formData.matKhau) {
            setIsLoading(true)
            try {
                const response = await dispatch(login({ tenDangNhap: formData.tenDangNhap, matKhau: formData.matKhau })).unwrap();

                console.log('Full login response:', response);

                // Kiểm tra nếu login thành công
                if (response && response.user && response.accessToken) {
                    const userData = response.user;

                    toast.success(`Đăng nhập thành công! Chào mừng ${userData.tenDangNhap}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    console.log('User data:', userData);
                    console.log('User role:', userData.vaiTro);
                    console.log('User role name:', userData.vaiTro?.ten);

                    if (onClose) {
                        onClose();
                    }

                    setTimeout(() => {
                        if (userData.vaiTro?.ten === "nguoi_thue") {
                            console.log('Navigating to user home page');
                            navigate('/');
                        } else {
                            console.log('Navigating to admin dashboard');
                            navigate('/');
                        }
                    }, 1000); // Delay 1 giây để hiển thị thông báo
                } else {
                    toast.error('Đăng nhập thất bại - Thông tin đăng nhập không chính xác', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } catch (err: any) {
                console.error('Login error:', err);
                const errorMessage = err instanceof Error ? err.message : (err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
                toast.error(`Đăng nhập thất bại - ${errorMessage}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } finally {
                setIsLoading(false)
            }
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin - Tên đăng nhập và mật khẩu là bắt buộc', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {

            console.log("Validation errors:", errors)
            return
        }

        console.log("✅ Form validation passed, sending to server...")

        const registerData = {
            email: formData.email,
            ten: formData.ten,
            tenDangNhap: formData.tenDangNhap,
            matKhau: formData.matKhau,
            xacNhanMatKhau: formData.xacNhanMatKhau,
            soDienThoai: formData.soDienThoai,
            vaiTro: formData.vaiTro
        }

        setIsLoading(true)
        try {
            const response = await dispatch(register(registerData)).unwrap();

            console.log("✅ Registration response:", response)
            if (response && (response.statusCode === 201 || response.user)) {
                toast.success('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                // Reset form data
                setFormData({
                    email: "",
                    matKhau: "",
                    xacNhanMatKhau: "",
                    ten: "",
                    soDienThoai: "",
                    tenDangNhap: "",
                    vaiTro: "",
                });

                // Chuyển về form đăng nhập thay vì đóng modal
                switchMode("login");
            } else {
                toast.error('Đăng ký thất bại - Vui lòng thử lại', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (err: any) {
            console.error("❌ Registration failed - Full error:", err)
            const errorMessage = err instanceof Error ? err.message : (err.response?.data?.message || 'Vui lòng thử lại');
            toast.error(`Đăng ký thất bại - ${errorMessage}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialLogin = (provider: string) => {
        toast.info(`Đang phát triển - Tính năng đăng nhập bằng ${provider} đang được phát triển`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
    const handleFacebookLogin = () => {
        const apiBaseUrl = import.meta.env.VITE_API_URL || "https://da92df21-3a0a-4d9b-a7fb-47550e4c282f-00-3q7tqjx3vn1pz.pike.replit.dev/";
        window.location.href = `${apiBaseUrl}/auth/facebook/callback`;
    };
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

        if (!formData.matKhau) {
            newErrors.matKhau = "Mật khẩu là bắt buộc"
        } else if (formData.matKhau.length < 6) {
            newErrors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự"
        }

        if (mode === "register") {
            if (!formData.ten) {
                newErrors.ten = "Họ và tên là bắt buộc"
            }

            if (!formData.tenDangNhap) {
                newErrors.tenDangNhap = "Tên đăng nhập là bắt buộc"
            }

            if (!formData.soDienThoai) {
                newErrors.soDienThoai = "Số điện thoại là bắt buộc"
            } else if (!/^[0-9]{10,11}$/.test(formData.soDienThoai)) {
                newErrors.soDienThoai = "Số điện thoại không hợp lệ"
            }

            if (!formData.xacNhanMatKhau) {
                newErrors.xacNhanMatKhau = "Xác nhận mật khẩu là bắt buộc"
            } else if (formData.matKhau !== formData.xacNhanMatKhau) {
                newErrors.xacNhanMatKhau = "Mật khẩu không khớp"
            }

            if (!formData.vaiTro) {
                newErrors.vaiTro = "Vui lòng chọn loại tài khoản"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }



    const handleInputChange = (field: keyof FormData, value: string) => {
        console.log(`📝 Input changed - Field: ${field}, Value: "${value}"`)
        setFormData((prev) => {
            const newData = { ...prev, [field]: value }
            console.log("Updated form data:", newData)
            return newData
        })
        if (errors[field]) {
            console.log(`🔧 Clearing error for field: ${field}`)
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }


    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Close Button - Responsive */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-800 p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200"
                >
                    <X className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
            )}

            {/* Animated Background Elements */}
            <AnimatedBackground mousePosition={mousePosition} />

            {/* Main Container - Fully Responsive */}
            <div className="relative w-full min-h-screen flex items-center justify-center p-2 sm:p-4 lg:p-8">
                <div className={`
                    relative w-full max-w-7xl bg-white shadow-2xl overflow-hidden
                    ${isMobile
                        ? 'min-h-screen rounded-none'
                        : isTablet
                            ? 'min-h-[700px] rounded-2xl'
                            : 'min-h-[800px] rounded-3xl'
                    }
                `}
                    style={{
                        backgroundImage: isMobile ? "none" : "url('https://smartland.vn/wp-content/uploads/2021/10/bat-dong-san-ven-song-sai-gon-01-e1620704384316.jpg')",
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
                            className={`
                                absolute inset-0
                                ${isMobile
                                    ? 'flex flex-col'
                                    : 'grid lg:grid-cols-2'
                                }
                            `}
                            style={{ zIndex: 2 }}
                        >
                            {mode === "login" ? (<>
                                {/* Mobile: Single column layout */}
                                {isMobile ? (
                                    <div className="flex flex-col min-h-screen">
                                        {/* Mobile Welcome Section */}
                                        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 text-center">
                                            <div className="mb-4">
                                                <h2 className="text-2xl font-bold mb-2">Xin chào!</h2>
                                                <p className="text-sm opacity-90">
                                                    Chào mừng đến với nền tảng cho thuê nhà hàng đầu Việt Nam
                                                </p>
                                            </div>
                                            <div className="flex justify-center gap-6 text-xs">
                                                <div className="text-center">
                                                    <Home className="w-4 h-4 mx-auto mb-1" />
                                                    <p className="font-semibold">10K+ Căn hộ</p>
                                                </div>
                                                <div className="text-center">
                                                    <Shield className="w-4 h-4 mx-auto mb-1" />
                                                    <p className="font-semibold">Bảo mật</p>
                                                </div>
                                                <div className="text-center">
                                                    <Clock className="w-4 h-4 mx-auto mb-1" />
                                                    <p className="font-semibold">24/7</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Login Form */}
                                        <div className="flex-1 p-4 sm:p-6 bg-white">
                                            <LoginForm
                                                formData={{
                                                    tenDangNhap: formData.tenDangNhap,
                                                    matKhau: formData.matKhau
                                                }}
                                                errors={{
                                                    tenDangNhap: errors.tenDangNhap,
                                                    matKhau: errors.matKhau
                                                }}
                                                showPassword={showPassword}
                                                isLoading={isLoading}
                                                onInputChange={handleInputChange}
                                                onShowPassword={() => setShowPassword(!showPassword)}
                                                onSubmit={handleSubmitLogin}
                                                onSocialLogin={handleSocialLogin}
                                                handleSubmitLogin={handleSubmitLogin}
                                                handleFacebookLogin={handleFacebookLogin}
                                            />

                                            {/* Mobile Switch to Register */}
                                            <div className="mt-6 text-center">
                                                <button
                                                    onClick={() => switchMode("register")}
                                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                >
                                                    Chưa có tài khoản? Đăng ký ngay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Desktop/Tablet: Two column layout */}
                                        {/* Left Side - Login Form */}
                                        <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-16 bg-white relative overflow-hidden">
                                            {/* Decorative Elements - Hidden on small screens */}
                                            <div className="hidden lg:block absolute top-10 left-10 w-20 h-20 opacity-10">
                                                <div
                                                    className="w-full h-full border-4 border-pink-300 rounded-full animate-spin"
                                                    style={{ animationDuration: "20s" }}
                                                />
                                            </div>
                                            <div className="hidden lg:block absolute bottom-20 right-10 w-16 h-16 opacity-10">
                                                <div className="w-full h-full bg-blue-300 rounded-lg rotate-45 animate-pulse" />
                                            </div>
                                            <LoginForm
                                                formData={{
                                                    tenDangNhap: formData.tenDangNhap,
                                                    matKhau: formData.matKhau
                                                }}
                                                errors={{
                                                    tenDangNhap: errors.tenDangNhap,
                                                    matKhau: errors.matKhau
                                                }}
                                                showPassword={showPassword}
                                                isLoading={isLoading}
                                                onInputChange={handleInputChange}
                                                onShowPassword={() => setShowPassword(!showPassword)}
                                                onSubmit={handleSubmitLogin}
                                                onSocialLogin={handleSocialLogin}
                                                handleSubmitLogin={handleSubmitLogin}
                                                handleFacebookLogin={handleFacebookLogin}
                                            />
                                        </div>
                                        {/* Right Side - Welcome Panel with Rental Service Info */}
                                        <div className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 text-white overflow-hidden">
                                            <WelcomePanel
                                                mode={mode}
                                                isTransitioning={isTransitioning}
                                                onSwitchMode={() => switchMode("register")}
                                            >
                                                <div className="mb-6 lg:mb-8">
                                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight">Xin chào!</h2>
                                                    <p className="text-base sm:text-lg lg:text-xl mb-4 lg:mb-6 opacity-90 max-w-md">
                                                        Chào mừng đến với nền tảng cho thuê nhà hàng đầu Việt Nam
                                                    </p>
                                                </div>
                                                <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 max-w-sm">
                                                    <div className="flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                            <Home className="w-4 h-4 lg:w-5 lg:h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm lg:text-base">10,000+ Căn hộ</p>
                                                            <p className="text-xs lg:text-sm opacity-80">Đa dạng lựa chọn</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                            <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm lg:text-base">Bảo mật tuyệt đối</p>
                                                            <p className="text-xs lg:text-sm opacity-80">Thông tin được bảo vệ</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                            <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm lg:text-base">Hỗ trợ 24/7</p>
                                                            <p className="text-xs lg:text-sm opacity-80">Luôn sẵn sàng giúp đỡ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </WelcomePanel>
                                        </div>
                                    </>
                                )}
                            </>
                            ) : (
                                <>
                                    {/* Register Mode */}
                                    {isMobile ? (
                                        <div className="flex flex-col min-h-screen">
                                            {/* Mobile Welcome Back Section */}
                                            <div className="bg-gradient-to-br from-purple-600 to-blue-700 text-white p-6 text-center">
                                                <div className="mb-4">
                                                    <h2 className="text-2xl font-bold mb-2">Tạo tài khoản mới!</h2>
                                                    <p className="text-sm opacity-90">
                                                        Bắt đầu hành trình tìm kiếm ngôi nhà lý tưởng
                                                    </p>
                                                </div>
                                                <div className="flex justify-center gap-6 text-xs">
                                                    <div className="text-center">
                                                        <Users className="w-4 h-4 mx-auto mb-1" />
                                                        <p className="font-semibold">50K+ Khách hàng</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <Star className="w-4 h-4 mx-auto mb-1" />
                                                        <p className="font-semibold">4.9/5 Đánh giá</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <MapPin className="w-4 h-4 mx-auto mb-1" />
                                                        <p className="font-semibold">63 Tỉnh thành</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mobile Register Form */}
                                            <div className="flex-1 p-4 sm:p-6 bg-white overflow-y-auto">
                                                <RegisterForm
                                                    formData={formData}
                                                    errors={errors}
                                                    showPassword={showPassword}
                                                    showConfirmPassword={showConfirmPassword}
                                                    isLoading={isLoading}
                                                    onInputChange={handleInputChange}
                                                    onShowPassword={() => setShowPassword(!showPassword)}
                                                    onShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    onSubmit={handleSubmitRegister}
                                                    onSocialLogin={handleSocialLogin}
                                                    handleFacebookLogin={handleFacebookLogin}
                                                />

                                                {/* Mobile Switch to Login */}
                                                <div className="mt-6 text-center pb-6">
                                                    <button
                                                        onClick={() => switchMode("login")}
                                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                    >
                                                        Đã có tài khoản? Đăng nhập ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Desktop/Tablet: Two column layout */}
                                            {/* Left Side - Welcome Back Panel with Service Info */}
                                            <div
                                                className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 text-white overflow-hidden"
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
                                                    <div className="mb-6 lg:mb-8">
                                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight">Chào mừng trở lại!</h2>
                                                        <p className="text-base sm:text-lg lg:text-xl mb-4 lg:mb-6 opacity-90 max-w-md">
                                                            Đăng nhập để tiếp tục hành trình tìm kiếm ngôi nhà lý tưởng
                                                        </p>
                                                    </div>
                                                    <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 max-w-sm">
                                                        <div className="flex items-center gap-3 text-left">
                                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                                <Users className="w-4 h-4 lg:w-5 lg:h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm lg:text-base">50,000+ Khách hàng</p>
                                                                <p className="text-xs lg:text-sm opacity-80">Tin tưởng sử dụng</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-left">
                                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                                <Star className="w-4 h-4 lg:w-5 lg:h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm lg:text-base">4.9/5 Đánh giá</p>
                                                                <p className="text-xs lg:text-sm opacity-80">Từ người dùng</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-left">
                                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                                <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm lg:text-base">63 Tỉnh thành</p>
                                                                <p className="text-xs lg:text-sm opacity-80">Phủ sóng toàn quốc</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </WelcomePanel>
                                            </div>
                                            {/* Right Side - Register Form */}
                                            <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 bg-white relative overflow-hidden overflow-y-auto">
                                                {/* Decorative Elements - Hidden on small screens */}
                                                <div className="hidden lg:block absolute top-10 right-10 w-20 h-20 opacity-10">
                                                    <div
                                                        className="w-full h-full border-4 border-teal-300 rounded-full animate-spin"
                                                        style={{ animationDuration: "20s" }}
                                                    />
                                                </div>
                                                <div className="hidden lg:block absolute bottom-20 left-10 w-16 h-16 opacity-10">
                                                    <div className="w-full h-full bg-pink-300 rounded-lg rotate-45 animate-pulse" />
                                                </div>
                                                <RegisterForm
                                                    formData={formData}
                                                    errors={errors}
                                                    showPassword={showPassword}
                                                    showConfirmPassword={showConfirmPassword}
                                                    isLoading={isLoading}
                                                    onInputChange={handleInputChange}
                                                    onShowPassword={() => setShowPassword(!showPassword)}
                                                    onShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    onSubmit={handleSubmitRegister}
                                                    onSocialLogin={handleSocialLogin}
                                                    handleFacebookLogin={handleFacebookLogin}
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
