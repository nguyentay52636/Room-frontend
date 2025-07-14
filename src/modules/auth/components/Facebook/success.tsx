import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { IUser } from "@/lib/apis/types";

const Success = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const accessToken = searchParams.get("accessToken");
    const name = searchParams.get("name");
    const userId = searchParams.get("userId");
    const loginType = searchParams.get("loginType");

    useEffect(() => {
        if (accessToken && userId && name) {
            // Tạo user object
            const userData = {
                _id: userId,
                ten: decodeURIComponent(name),
                tenDangNhap: decodeURIComponent(name),
                email: '', // Sẽ được load từ API nếu cần
                matKhau: '', // Facebook user không có password
                soDienThoai: '', // Sẽ được update sau nếu cần
                vaiTro: 'nguoi_thue', // Default role as string
                facebookId: true // Đánh dấu là Facebook user
            } as IUser;

            // Lưu vào Redux store
            dispatch(setCredentials({
                user: userData,
                token: accessToken
            }));

            // Lưu vào localStorage (backup)
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("token", accessToken);
            localStorage.setItem("currentUser", JSON.stringify(userData));
            localStorage.setItem("isAuthenticated", "true");

            // Hiển thị thông báo thành công
            toast.success(`Đăng nhập Facebook thành công! Chào mừng ${decodeURIComponent(name)}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Redirect về trang chính sau 2 giây
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } else {
            console.error('Missing required Facebook auth data:', { accessToken, userId, name });
            navigate("/failure?error=missing_data");
        }
    }, [accessToken, userId, name, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập thành công! 🎉</h1>
                <p className="text-gray-600 mb-4">
                    {name ? `Chào mừng ${decodeURIComponent(name)}!` : 'Chào mừng bạn!'}
                </p>
                <p className="text-sm text-gray-500">
                    Đang chuyển hướng về trang chính...
                </p>
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
