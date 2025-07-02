export interface Property {
    id: string
    title: string
    location: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    features: string[]
    isNew?: boolean
    isFeatured?: boolean
    views?: number
    discount?: number
}

export  const properties: Property[] = [
    {
        id: "1",
        title: "Căn hộ cao cấp Vinhomes Central Park",
        price: 25000000,
        originalPrice: 28000000,
        location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
        rating: 4.8,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        features: ["85m²", "2 phòng ngủ", "2 WC", "Có ban công", "Đầy đủ nội thất"],
        isNew: true,
        isFeatured: true,
        views: 1234,
        discount: 10,
    },
    {
        id: "2",
        title: "Phòng trọ cao cấp quận 1",
        price: 8500000,
        location: "Quận 1, TP. Hồ Chí Minh",
        rating: 4.6,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        features: ["35m²", "1 phòng ngủ", "1 WC", "Wifi", "Điều hòa"],
        isNew: false,
        isFeatured: false,
        views: 856,
    },
    {
        id: "3",
        title: "Studio apartment Landmark 81",
        price: 18000000,
        location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
        rating: 4.9,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        features: ["45m²", "Studio", "1 WC", "View sông", "Gym & Pool"],
        isNew: true,
        isFeatured: true,
        views: 2156,
    },
    {
        id: "4",
        title: "Căn hộ dịch vụ Saigon Pearl",
        price: 22000000,
        originalPrice: 25000000,
        location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
        rating: 4.7,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop",
        features: ["70m²", "2 phòng ngủ", "2 WC", "Dọn phòng", "Bảo vệ 24/7"],
        isNew: false,
        isFeatured: true,
        views: 967,
        discount: 12,
    },
    {
        id: "5",
        title: "Phòng trọ sinh viên gần ĐH",
        price: 3500000,
        location: "Quận 3, TP. Hồ Chí Minh",
        rating: 4.4,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
        features: ["25m²", "1 phòng", "WC chung", "Wifi", "Gần trường"],
        isNew: false,
        isFeatured: false,
        views: 543,
    },
    {
        id: "6",
        title: "Penthouse The Manor",
        price: 45000000,
        location: "Quận Bình Thạnh, TP. Hồ Chí Minh",
        rating: 4.9,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        features: ["120m²", "3 phòng ngủ", "3 WC", "Sân thượng", "Luxury"],
        isNew: true,
        isFeatured: true,
        views: 3421,
    },
]