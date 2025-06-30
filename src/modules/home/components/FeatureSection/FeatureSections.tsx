import { Search, Shield, Headphones, CreditCard, MapPin, Star } from "lucide-react"
import HeaderFeature from "./components/HeaderFeature"
import FeatureItem from "./components/FeatureItem"
const features = [
    {
        icon: Search,
        title: "Tìm kiếm thông minh",
        description: "AI-powered search giúp bạn tìm được căn hộ phù hợp nhất với nhu cầu và ngân sách.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Shield,
        title: "Xác thực 100%",
        description: "Tất cả căn hộ đều được xác thực và kiểm tra kỹ lưỡng trước khi đăng tải.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: Headphones,
        title: "Hỗ trợ 24/7",
        description: "Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: CreditCard,
        title: "Thanh toán linh hoạt",
        description: "Nhiều hình thức thanh toán tiện lợi, an toàn và bảo mật tuyệt đối.",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: MapPin,
        title: "Vị trí đắc địa",
        description: "Căn hộ tại những vị trí thuận tiện, gần trung tâm và các tiện ích công cộng.",
        color: "from-teal-500 to-blue-500",
    },
    {
        icon: Star,
        title: "Chất lượng cao",
        description: "Cam kết chất lượng dịch vụ và căn hộ đạt tiêu chuẩn quốc tế.",
        color: "from-yellow-500 to-orange-500",
    },
]

export default function FeatureSections() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <HeaderFeature />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
