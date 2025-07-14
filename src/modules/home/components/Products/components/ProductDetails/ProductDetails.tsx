
import { CardProductDetails } from './components/CardProductDetails/CardProductDetails'
import { ProductDetailsCategories } from './components/ProductDetailsCategories'
import BreadcrumbBackHome from './components/BreadcrumbBackHome'
import { useParams } from 'react-router-dom'

interface PropertyPageProps {
    params?: {
        id: string
    }
}

export default function ProductDetails({ params }: PropertyPageProps) {
    // Use React Router params if available, otherwise fall back to props
    const routerParams = useParams();
    const propertyId = routerParams.id || params?.id || '1';

    return (
        <div className="min-h-screen bg-background">
            <BreadcrumbBackHome />
            <CardProductDetails id={propertyId} />
            {/* Product Categories Section */}
            <ProductDetailsCategories />
        </div>
    )
}
