import React from 'react'
import LeftSideMainContentCarousel from './components/LeftSideMainContentCarousel/LeftSideMainContentCarousel'
import RightSideMainContentCarousel from './components/RightSideMainContentCarousel/RightSideMainContentCarousel'

export default function MainContentCarousel({ currentSlideData, isTransitioning, mousePosition }: { currentSlideData: any, isTransitioning: boolean, mousePosition: any }) {
    return (
        <div className="relative z-10 h-full mt-9 pt-20 lg:pt-20">
            <div className="container mx-auto px-4 h-full">
                <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
                    {/* Left Side - Search Form */}
                    <LeftSideMainContentCarousel currentSlideData={currentSlideData} isTransitioning={isTransitioning} />
                    {/* Right Side - Image with Overlay Content */}
                    <RightSideMainContentCarousel currentSlideData={currentSlideData} isTransitioning={isTransitioning} mousePosition={mousePosition} />
                </div>
            </div>
        </div>
    )
}
