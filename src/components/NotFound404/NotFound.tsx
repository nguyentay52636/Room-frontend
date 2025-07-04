
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="text-center p-10 max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-indigo-100 relative overflow-hidden">
                {/* Trang trí góc trang */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-500/20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-indigo-500/20 rounded-tr-full"></div>

                {/* Khu vực nội dung */}
                <div className="relative z-10">
                    {/* GIF hình ảnh */}
                    <div className="overflow-hidden rounded-2xl shadow-xl mb-10 transform hover:scale-105 transition-all duration-500 border-4 border-indigo-100">
                        <img
                            src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif"
                            alt="404 Not Found Animation"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Tiêu đề */}
                    <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 drop-shadow-sm">404</h1>

                    {/* Thông báo */}
                    <p className="text-2xl text-gray-700 mb-10 font-medium leading-relaxed">
                        Oops! Trang bạn tìm kiếm không tồn tại.
                    </p>

                    {/* Các nút hành động */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Link
                            to="/trangchu"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 hover:shadow-indigo-200 hover:shadow-xl"
                        >
                            <Home className="h-5 w-5" />
                            Quay về trang chủ
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-md border-2 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all transform hover:scale-105"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}