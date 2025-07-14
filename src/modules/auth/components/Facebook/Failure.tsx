import React from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Failure() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const error = searchParams.get("error") || "unknown_error";
    const message = searchParams.get("message") || "Đăng nhập Facebook thất bại";

    const handleRetry = () => {
        navigate('/auth/login');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập thất bại ❌</h1>
                <p className="text-gray-600 mb-4">
                    {decodeURIComponent(message)}
                </p>
                {error !== "unknown_error" && (
                    <p className="text-sm text-gray-500 mb-6">
                        Mã lỗi: {error}
                    </p>
                )}
                <div className="space-y-3">
                    <Button
                        onClick={handleRetry}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Thử lại đăng nhập
                    </Button>
                    <Button
                        onClick={handleGoHome}
                        variant="outline"
                        className="w-full"
                    >
                        Về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}
