import React from 'react'
import ImageGalleryCardRealEstate from './ImageGalleryCardRealEstate'
import BasicInfoCardRealEstate from './BasicInfoCardRealEstate'

export default function CardLeftDialog({ formData, isReadOnly, currentImageIndex, handleInputChange, prevImage, nextImage, getStatusBadge, errors }: any) {
    return (
        <div className="space-y-6">
            <ImageGalleryCardRealEstate formData={formData} isReadOnly={isReadOnly} currentImageIndex={currentImageIndex} handleInputChange={handleInputChange} prevImage={prevImage} nextImage={nextImage} />


            {/* Basic Information */}
            <BasicInfoCardRealEstate formData={formData} handleInputChange={handleInputChange} errors={errors} isReadOnly={isReadOnly} getStatusBadge={getStatusBadge} />
        </div>
  )
}
