import {
    Home,
    Bed,
    Square,
    Wifi,
    Car,
    Shield,
    Utensils,
  
    Camera,
    Star,
    Info,
   
} from "lucide-react"
 export const categories = [
    { id: "apartment", name: "Căn hộ", icon: Home, desc: "Chung cư, căn hộ cao cấp" },
    { id: "room", name: "Phòng trọ", icon: Bed, desc: "Phòng trọ, nhà trọ" },
    { id: "studio", name: "Studio", icon: Square, desc: "Căn hộ studio, mini" },
    { id: "house", name: "Nhà nguyên căn", icon: Home, desc: "Nhà riêng, biệt thự" },
    { id: "service-apartment", name: "Căn hộ dịch vụ", icon: Shield, desc: "Có dịch vụ dọn dẹp" },
    { id: "dormitory", name: "KTX", icon: Utensils, desc: "Ký túc xá, homestay" },
]
export const amenitiesList = [
    { id: "wifi", name: "WiFi miễn phí", icon: Wifi, popular: true },
    { id: "parking", name: "Chỗ đậu xe", icon: Car, popular: true },
    { id: "security", name: "Bảo vệ 24/7", icon: Shield, popular: true },
    { id: "kitchen", name: "Bếp riêng", icon: Utensils, popular: true },
    { id: "ac", name: "Điều hòa", icon: Home, popular: true },
    { id: "washing", name: "Máy giặt", icon: Home, popular: false },
    { id: "balcony", name: "Ban công", icon: Home, popular: false },
    { id: "elevator", name: "Thang máy", icon: Home, popular: false },
    { id: "pool", name: "Hồ bơi", icon: Home, popular: false },
    { id: "gym", name: "Phòng gym", icon: Home, popular: false },
    { id: "garden", name: "Sân vườn", icon: Home, popular: false },
    { id: "pet", name: "Cho phép nuôi pet", icon: Home, popular: false },
]
export const steps = [
    { id: 1, name: "Thông tin cơ bản", description: "Loại hình và địa chỉ", icon: Home },
    { id: 2, name: "Chi tiết bất động sản", description: "Diện tích, phòng ngủ, giá cả", icon: Square },
    { id: 3, name: "Mô tả và tiện ích", description: "Mô tả chi tiết và tiện ích", icon: Star },
    { id: 4, name: "Hình ảnh", description: "Tải lên hình ảnh", icon: Camera },
    { id: 5, name: "Thông tin liên hệ", description: "Thông tin người đăng", icon: Info },
]