import {
    Wifi,
    Wind,
    Car,
    Shield,
    Droplets,
    Zap,
    TreePine,
    ShoppingCart,
    GraduationCap,
    Building,
    Bus,
    Plane
} from './icons'

export const properties = {
    "1": {
        id: 1,
        title: "Căn hộ cao cấp Vinhomes Central Park",
        location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
        category: "Căn hộ cao cấp",
        price: "25.000.000",
        originalPrice: "28.000.000",
        area: "85",
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        floor: "15/30",
        direction: "Đông Nam",
        balcony: "Có",
        furnished: "Đầy đủ",
        rating: 4.8,
        reviews: 156,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        ],
        description:
            "Căn hộ cao cấp tại Vinhomes Central Park với view sông Sài Gòn tuyệt đẹp. Thiết kế hiện đại, đầy đủ nội thất cao cấp. Vị trí đắc địa, gần trung tâm thành phố với đầy đủ tiện ích xung quanh.",
        highlights: [
            "View sông Sài Gòn panoramic",
            "Nội thất cao cấp đầy đủ",
            "Hệ thống an ninh 24/7",
            "Tiện ích resort 5 sao",
            "Gần trung tâm thành phố",
        ],
        isNew: true,
        isFeatured: true,
        availableFrom: "15/01/2024",
    },

    "5": {
        id: 5,
        title: "Phòng trọ sinh viên gần ĐH",
        location: "Quận 3, TP. Hồ Chí Minh",
        category: "Phòng trọ",
        price: "3.500.000",
        area: "25",
        bedrooms: 1,
        bathrooms: 0,
        parking: 0,
        floor: "2/4",
        direction: "Đông",
        balcony: "Không",
        furnished: "Cơ bản",
        rating: 4.4,
        reviews: 67,
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        ],
        description:
            "Phòng trọ sạch sẽ, thoáng mát, phù hợp cho sinh viên. Vị trí thuận lợi gần các trường đại học lớn, có đầy đủ tiện ích sinh hoạt xung quanh. Giá cả phải chăng, phù hợp với sinh viên.",
        highlights: ["Gần trường đại học", "Giá cả phải chăng", "An ninh tốt", "Wifi miễn phí", "Khu vực sầm uất"],
        isNew: false,
        isFeatured: false,
        availableFrom: "01/02/2024",
    },
}

export const getAmenities = (property: any) => [
    { icon: Wifi, name: "Wifi miễn phí", available: true },
    { icon: Wind, name: "Điều hòa", available: property.category !== "Phòng trọ" },
    { icon: Car, name: "Chỗ đậu xe", available: property.parking > 0 },
    { icon: Shield, name: "Bảo vệ 24/7", available: property.category === "Căn hộ cao cấp" },
    { icon: Droplets, name: "Hồ bơi", available: property.category === "Căn hộ cao cấp" },
    { icon: Zap, name: "Phòng gym", available: property.category === "Căn hộ cao cấp" },
    { icon: TreePine, name: "Công viên", available: property.category !== "Phòng trọ" },
    { icon: ShoppingCart, name: "Trung tâm thương mại", available: true },
]

export const nearbyPlaces = [
    { icon: ShoppingCart, name: "Landmark 81", distance: "500m", type: "Trung tâm thương mại" },
    { icon: GraduationCap, name: "Trường RMIT", distance: "1.2km", type: "Trường học" },
    { icon: Building, name: "Bitexco Tower", distance: "2.5km", type: "Văn phòng" },
    { icon: Bus, name: "Bến xe Miền Đông", distance: "3km", type: "Giao thông" },
    { icon: Plane, name: "Sân bay Tân Sơn Nhất", distance: "8km", type: "Sân bay" },
]

