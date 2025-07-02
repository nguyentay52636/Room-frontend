export interface productDetais {
    id: number
    title: string
    location: string
    category: string
    price: string
    originalPrice?: string
    area: string
    bedrooms: number
    bathrooms: number
    parking: number
    floor: string
    direction: string
    balcony: string
    furnished: string
    rating: number
    reviews: number
    images: string[]
    description: string
    highlights: string[]
    isNew: boolean
    isFeatured: boolean
    availableFrom: string
}
export const owner = {
    name: "Nguyễn Ngọc Quyền",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    phone: "0988 505 123",
    rating: 4.9,
    reviews: 234,
    responseTime: "Trong vòng 1 giờ",
    languages: ["Tiếng Việt", "English"],
    verified: true,
    joinDate: "2020",
}
export const policies = [
    "Không hút thuốc trong nhà",
    "Không nuôi thú cưng",
    "Giờ giấc: 22:00 - 06:00",
    "Tối đa 4 người ở",
    "Đặt cọc 2 tháng tiền thuê",
]
export const tabs = [
    { id: "overview", label: "Tổng quan" },
    { id: "amenities", label: "Tiện ích" },
    { id: "location", label: "Vị trí" },
    { id: "policies", label: "Quy định" },
]