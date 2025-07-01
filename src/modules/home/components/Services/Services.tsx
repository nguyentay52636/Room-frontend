import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, white 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Sẵn sàng tìm ngôi nhà
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              mơ ước của bạn?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Hãy để chúng tôi giúp bạn tìm được căn hộ hoàn hảo với hàng ngàn lựa chọn chất lượng cao và dịch vụ tư vấn
            chuyên nghiệp.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Bắt đầu tìm kiếm
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 mr-2" />
              Liên hệ tư vấn
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Hỗ trợ khách hàng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300">Xác thực căn hộ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">5000+</div>
              <div className="text-gray-300">Căn hộ có sẵn</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
