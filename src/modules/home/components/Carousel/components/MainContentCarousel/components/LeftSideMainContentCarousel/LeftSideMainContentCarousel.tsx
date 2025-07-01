import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, MapPin, DollarSign, Home } from 'lucide-react'

export default function LeftSideMainContentCarousel({ currentSlideData, isTransitioning }: { currentSlideData: any, isTransitioning: boolean }) {
  const [searchData, setSearchData] = useState({
    location: '',
    priceRange: '',
    roomType: ''
  })

  const handleSearch = () => {
    console.log(searchData)
  }

  return (
    <>
      <div className="text-white space-y-8">
        <div
          className={`transform transition-all duration-800 ease-out ${!isTransitioning ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
        >
          {/* Badge */}
          <div className="transform transition-all duration-600 delay-100">
            <Badge className="bg-blue-600/20 backdrop-blur-lg border border-blue-400/30 text-blue-300 px-6 py-3 text-sm font-medium rounded-full hover:scale-105 transition-all duration-300 mb-6">
              {currentSlideData.badge}
            </Badge>
          </div>

          {/* Title */}
          <div className="space-y-4 mb-8">
            <div className="overflow-hidden">
              <h1
                className={`text-5xl lg:text-6xl font-bold leading-tight transform transition-all duration-700 delay-200 ${!isTransitioning ? "translate-y-0" : "translate-y-full"
                  }`}
              >
                <span className="block text-white">{currentSlideData.title}</span>
                <span className="block text-teal-400 mt-2">{currentSlideData.subtitle}</span>
              </h1>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-xl text-gray-300 max-w-2xl leading-relaxed mb-8 transform transition-all duration-700 delay-400 ${!isTransitioning ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            {currentSlideData.description}
          </p>

          {/* Features */}
          <div
            className={`flex flex-wrap gap-6 mb-8 transform transition-all duration-700 delay-600 ${!isTransitioning ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            {currentSlideData.features.map((feature: any, idx: number) => (
              <div
                key={idx}
                className={`flex items-center gap-2 transform transition-all duration-500 hover:scale-105 ${!isTransitioning ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                style={{ transitionDelay: `${700 + idx * 100}ms` }}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-gray-300 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Search Form */}
          <div
            className={`bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl transform transition-all duration-700 delay-800 ${!isTransitioning ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-6 h-6 text-teal-400" />
              <h3 className="text-xl font-bold text-white">Tìm kiếm phòng trọ</h3>
            </div>

            <div className="space-y-4">
              {/* Location Input */}
              <div className="space-y-2">
                <label className="text-white font-medium text-sm my-2!">Địa điểm</label>
                <div className="relative my-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Nhập địa điểm bạn muốn tìm"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 h-12"
                  />
                </div>
              </div>

              {/* Price and Room Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white font-medium text-sm">Giá tiền</label>
                  <Select
                    value={searchData.priceRange}
                    onValueChange={(value) => setSearchData({ ...searchData, priceRange: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-teal-400 focus:ring-teal-400 h-12">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Chọn giá" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="under-5m" className="text-white hover:bg-slate-700">
                        Dưới 5 triệu
                      </SelectItem>
                      <SelectItem value="5m-10m" className="text-white hover:bg-slate-700">
                        5 - 10 triệu
                      </SelectItem>
                      <SelectItem value="10m-20m" className="text-white hover:bg-slate-700">
                        10 - 20 triệu
                      </SelectItem>
                      <SelectItem value="above-20m" className="text-white hover:bg-slate-700">
                        Trên 20 triệu
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium text-sm">Loại phòng</label>
                  <Select
                    value={searchData.roomType}
                    onValueChange={(value) => setSearchData({ ...searchData, roomType: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-teal-400 focus:ring-teal-400 h-12">
                      <Home className="w-4 h-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Loại phòng" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="studio" className="text-white hover:bg-slate-700">
                        Studio
                      </SelectItem>
                      <SelectItem value="1br" className="text-white hover:bg-slate-700">
                        1 phòng ngủ
                      </SelectItem>
                      <SelectItem value="2br" className="text-white hover:bg-slate-700">
                        2 phòng ngủ
                      </SelectItem>
                      <SelectItem value="3br" className="text-white hover:bg-slate-700">
                        3+ phòng ngủ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                size="lg"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg mt-6"
              >
                <Search className="w-5 h-5 mr-2 cursor-pointer" />
                Tìm kiếm
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-1000 ${!isTransitioning ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold my-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              🔍 Tìm phòng ngay
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white cursor-pointer hover:bg-white/10 px-8 py-3 rounded-lg my-4 font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
