

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Building, Hotel, Briefcase, GraduationCap, TrendingUp, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function ProductDetailsCategories() {
    const categories = [
        {
            id: "phong-tro",
            name: "Phòng trọ",
            icon: Home,
            description: "Phòng trọ giá rẻ, phù hợp sinh viên và người lao động",
            count: "2,450",
            priceRange: "2-8 triệu",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop",
            growth: "+12%",
            isPopular: true,
            gradient: "from-blue-500/20 to-cyan-500/20",
        },
        {
            id: "can-ho-cao-cap",
            name: "Căn hộ cao cấp",
            icon: Building,
            description: "Căn hộ chung cư cao cấp với đầy đủ tiện ích",
            count: "1,890",
            priceRange: "15-50 triệu",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop",
            growth: "+8%",
            isPopular: false,
            gradient: "from-purple-500/20 to-pink-500/20",
        },
        {
            id: "can-ho-dich-vu",
            name: "Căn hộ dịch vụ",
            icon: Hotel,
            description: "Căn hộ dịch vụ full nội thất, tiện ích cao cấp",
            count: "856",
            priceRange: "20-60 triệu",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop",
            growth: "+15%",
            isPopular: true,
            gradient: "from-green-500/20 to-emerald-500/20",
        },
        {
            id: "studio",
            name: "Studio",
            icon: Briefcase,
            description: "Căn hộ studio hiện đại, không gian mở",
            count: "634",
            priceRange: "12-25 triệu",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=200&fit=crop",
            growth: "+20%",
            isPopular: false,
            gradient: "from-orange-500/20 to-red-500/20",
        },
        {
            id: "nha-nguyen-can",
            name: "Nhà nguyên căn",
            icon: Home,
            description: "Nhà nguyên căn rộng rãi cho gia đình",
            count: "423",
            priceRange: "25-80 triệu",
            image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=200&fit=crop",
            growth: "+5%",
            isPopular: false,
            gradient: "from-indigo-500/20 to-blue-500/20",
        },
        {
            id: "ktx-sinh-vien",
            name: "KTX Sinh viên",
            icon: GraduationCap,
            description: "Ký túc xá sinh viên an toàn, tiện nghi",
            count: "1,245",
            priceRange: "1.5-4 triệu",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop",
            growth: "+25%",
            isPopular: true,
            gradient: "from-teal-500/20 to-cyan-500/20",
        },
    ]

    return (
        <div className="mt-16 mb-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Danh mục sản phẩm</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Khám phá đa dạng các loại hình cho thuê phù hợp với nhu cầu và ngân sách của bạn
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <Card
                        key={category.id}
                        className="group overflow-hidden hover:shadow-xl transition-all duration-500 animate-fade-in-up border-0 bg-gradient-to-br from-white to-gray-50/50"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="relative">
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />
                            <img
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                                {category.isPopular && <Badge className="bg-red-500/90 backdrop-blur-sm">Phổ biến</Badge>}
                                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-green-600 border-green-200">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {category.growth}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-6 relative">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                    <category.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Số lượng tin</span>
                                    <span className="font-semibold">{category.count} tin</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Khoảng giá</span>
                                    <span className="font-semibold text-primary">{category.priceRange}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 bg-transparent"
                                variant="outline"
                                asChild
                            >
                                <Link to={`/products?category=${category.id}`}>
                                    Xem danh sách
                                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-12">
                <Button size="lg" asChild>
                    <Link to="/products">
                        Xem tất cả danh mục
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
