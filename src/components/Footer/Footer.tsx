import { Separator } from "@radix-ui/react-dropdown-menu"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <div className="">
                  <h1 className="text-lg font-bold text-primary-foreground">NewLife</h1>
                  <p className="text-xs text-primary-foreground/80 -mt-1">Cho thuê căn hộ</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed my-8">
                Nền tảng cho thuê căn hộ hàng đầu Việt Nam, mang đến trải nghiệm tìm kiếm và thuê nhà hoàn hảo.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {["Tìm căn hộ", "Đăng tin", "Về chúng tôi", "Blog", "Hỗ trợ"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Dịch vụ</h4>
            <ul className="space-y-3">
              {["Thuê căn hộ", "Tư vấn BDS", "Quản lý tài sản", "Định giá", "Pháp lý"].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">1900 1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">phuongtay52636@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  SGU  273 An Dương Vương ,Q5 <br />
                  TP. Hồ Chí Minh
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Đang phục vụ 24/7</span>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/10" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm opacity-90">© 2025 NewLive. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="opacity-90 hover:opacity-100 transition-opacity">
              Điều khoản sử dụng
            </Link  >
            <Link to="#" className="opacity-90 hover:opacity-100 transition-opacity">
              Chính sách bảo mật
            </Link>
            <Link to="#" className="opacity-90 hover:opacity-100 transition-opacity">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
