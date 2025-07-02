import { RelatedProperties } from "../RelatedProperties"
import HeaderCardProductDetails from "./components/HeaderCardProductDetails"
import MainContentCardProductDetails from "./components/MainContentCardProductDetails/MainContentCardProductDetails"
import { properties } from "./components/dataDetails"

interface PropertyDetailProps {
    id: string
}

export function CardProductDetails({ id }: PropertyDetailProps) {
    // Mock data - trong thực tế sẽ fetch từ API dựa trên ID
    const getPropertyData = (propertyId: string) => {
        const property = properties[propertyId as keyof typeof properties]
        return property || properties["5"]
    }

    const property = getPropertyData(id)

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <HeaderCardProductDetails property={property} isLiked={false} setIsLiked={() => { }} />
            <MainContentCardProductDetails property={property} />
            <RelatedProperties currentPropertyId={id} category={property.category} location={property.location} />
        </div>
    )
}
