import React from 'react'
import CardsDetailsRealEstate from './CardsDetailsRealEstate'
import CardInfoUserDetailRealEstate from '../Card/CardInfoUserDetailRealEstate'
import CardAmenitiesManagerRealEstate from '../Card/CardAmenitiesManagerRealEstate'

export default function CardRightDialog({ formData, handleInputChange, isReadOnly, errors, newAmenity, setNewAmenity, addAmenity, removeAmenity }: any) {
    return (
        <div className="space-y-6">
            <CardsDetailsRealEstate formData={formData} handleInputChange={handleInputChange} isReadOnly={isReadOnly} errors={errors} newAmenity={newAmenity} setNewAmenity={setNewAmenity} addAmenity={addAmenity} removeAmenity={removeAmenity} />
            <CardInfoUserDetailRealEstate formData={formData} handleInputChange={handleInputChange} errors={errors} isReadOnly={isReadOnly} />
            {/* Amenities */}
            <CardAmenitiesManagerRealEstate formData={formData} isReadOnly={isReadOnly} newAmenity={newAmenity} setNewAmenity={setNewAmenity} addAmenity={addAmenity} removeAmenity={removeAmenity} />
        </div>
    )
}
