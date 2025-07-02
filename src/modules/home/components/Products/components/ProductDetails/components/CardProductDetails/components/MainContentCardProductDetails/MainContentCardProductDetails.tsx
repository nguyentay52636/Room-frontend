
import React, { useState } from 'react'
import { ImageGallery } from '../../../ImageGallery'
import {
    Car,
    Wifi,
    Shield,
    Zap,
    Droplets,
    Wind,
    TreePine,
    ShoppingCart,
    GraduationCap,
    Building,
    Bus,
    Plane,

} from "lucide-react"

import { owner, policies, productDetais, tabs } from '@/utils/data/types'
import QuickInfoMainContentCardProductDetails from './components/QuickInfoMainContentCardProductDetails'
import TabsMainContentCardProductDetails from './components/TabsMainContentCardProductDetails'
import SiderMainContentCardProductDetails from './components/SiderMainContentCardProductDetails/SiderMainContentCardProductDetails'



interface MainContentCardProductDetailsProps {
    property: productDetais
}

export default function MainContentCardProductDetails({ property }: MainContentCardProductDetailsProps) {
    const [activeTab, setActiveTab] = useState("overview")
    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    const amenities = [
        { icon: Wifi, name: "Wifi miễn phí", available: true },
        { icon: Wind, name: "Điều hòa", available: property.category !== "Phòng trọ" },
        { icon: Car, name: "Chỗ đậu xe", available: property.parking > 0 },
        { icon: Shield, name: "Bảo vệ 24/7", available: property.category === "Căn hộ cao cấp" },
        { icon: Droplets, name: "Hồ bơi", available: property.category === "Căn hộ cao cấp" },
        { icon: Zap, name: "Phòng gym", available: property.category === "Căn hộ cao cấp" },
        { icon: TreePine, name: "Công viên", available: property.category !== "Phòng trọ" },
        { icon: ShoppingCart, name: "Trung tâm thương mại", available: true },
    ]

    const nearbyPlaces = [
        { icon: ShoppingCart, name: "Landmark 81", distance: "500m", type: "Trung tâm thương mại" },
        { icon: GraduationCap, name: "Trường RMIT", distance: "1.2km", type: "Trường học" },
        { icon: Building, name: "Bitexco Tower", distance: "2.5km", type: "Văn phòng" },
        { icon: Bus, name: "Bến xe Miền Đông", distance: "3km", type: "Giao thông" },
        { icon: Plane, name: "Sân bay Tân Sơn Nhất", distance: "8km", type: "Sân bay" },
    ]






    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <ImageGallery images={property.images} title={property.title} />

                {/* Quick Info */}
                <QuickInfoMainContentCardProductDetails property={property} />

                {/* Tabs */}
                <TabsMainContentCardProductDetails activeTab={activeTab} setActiveTab={setActiveTab} property={property} amenities={amenities} nearbyPlaces={nearbyPlaces} />
            </div>

            {/* Sidebar */}
            <SiderMainContentCardProductDetails property={property} />
        </div>
    )
}
