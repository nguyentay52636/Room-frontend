import { policies } from '@/utils/data/types'
import { productDetais, tabs } from '@/utils/data/types'
import { Badge, CheckCircle } from 'lucide-react'
import React from 'react'

export default function TabsMainContentCardProductDetails({ amenities, nearbyPlaces, activeTab, setActiveTab, property }: { amenities: any, nearbyPlaces: any, activeTab: string, setActiveTab: (tab: string) => void, property: productDetais }) {
    return (
        <div>
            <div className="flex border-b mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 font-medium transition-colors ${activeTab === tab.id
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Mô tả</h3>
                        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">Điểm nổi bật</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {property.highlights.map((highlight: string, index: number) => (
                                <div key={index} className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">Thông tin chi tiết</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Tầng</span>
                                <span className="font-medium">{property.floor}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Hướng</span>
                                <span className="font-medium">{property.direction}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Ban công</span>
                                <span className="font-medium">{property.balcony}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Nội thất</span>
                                <span className="font-medium">{property.furnished}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "amenities" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Tiện ích</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {amenities.map((amenity: any, index: number) => (
                            <div key={index} className="flex items-center p-3 rounded-lg border">
                                <amenity.icon className="h-5 w-5 text-primary mr-3" />
                                <span className="flex-1">{amenity.name}</span>
                                {amenity.available && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "location" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Vị trí lân cận</h3>
                    <div className="space-y-4">
                        {nearbyPlaces.map((place: any, index: number) => (
                            <div key={index} className="flex items-center p-4 rounded-lg border">
                                <place.icon className="h-6 w-6 text-primary mr-4" />
                                <div className="flex-1">
                                    <div className="font-medium">{place.name}</div>
                                    <div className="text-sm text-muted-foreground">{place.type}</div>
                                </div>
                                <Badge>{place.distance}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "policies" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quy định</h3>
                    <div className="space-y-3">
                        {policies.map((policy, index) => (
                            <div key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span>{policy}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
