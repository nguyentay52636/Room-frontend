
import React, { useState } from 'react'
import { ImageGallery } from '../../../ImageGallery'


import { owner, policies, productDetais, tabs } from '@/utils/data/types'
import QuickInfoMainContentCardProductDetails from './components/QuickInfoMainContentCardProductDetails'
import TabsMainContentCardProductDetails from './components/TabsMainContentCardProductDetails'
import SiderMainContentCardProductDetails from './components/SiderMainContentCardProductDetails/SiderMainContentCardProductDetails'
import { nearbyPlaces, getAmenities } from '../dataDetails'



interface MainContentCardProductDetailsProps {
    property: productDetais
}

export default function MainContentCardProductDetails({ property }: MainContentCardProductDetailsProps) {
    const [activeTab, setActiveTab] = useState("overview")
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <ImageGallery images={property.images} title={property.title} />

                {/* Quick Info */}
                <QuickInfoMainContentCardProductDetails property={property} />

                {/* Tabs */}
                <TabsMainContentCardProductDetails activeTab={activeTab} setActiveTab={setActiveTab} property={property} amenities={getAmenities(property)} nearbyPlaces={nearbyPlaces} />
            </div>

            {/* Sidebar */}
            <SiderMainContentCardProductDetails property={property} />
        </div>
    )
}
