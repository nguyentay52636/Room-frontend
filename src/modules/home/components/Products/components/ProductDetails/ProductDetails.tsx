
import { CardProductDetails } from './components/CardProductDetails/CardProductDetails'
import { ProductDetailsCategories } from './components/ProductDetailsCategories'
import BreadcrumbBackHome from './components/BreadcrumbBackHome'

interface PropertyPageProps {
    params: {
        id: string
    }
}

export default function ProductDetails({ params }: PropertyPageProps) {
    return (
        <div className="min-h-screen bg-background">
            <BreadcrumbBackHome />
            <CardProductDetails id={params.id} />
            {/* Product Categories Section */}
            <ProductDetailsCategories />


        </div>
    )
}
