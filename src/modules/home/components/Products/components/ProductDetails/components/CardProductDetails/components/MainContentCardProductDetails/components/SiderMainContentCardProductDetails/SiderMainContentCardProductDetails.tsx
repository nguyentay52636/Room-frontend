
import PriceCardSiderMainContentCardProductDetails from './components/PriceCardSiderMainContentCardProductDetails'
import OwnerInfoSiderMainContentCardProductDetails from './components/OwnerInfoSiderMainContentCardProductDetails'
import SafetyTipsSiderMainContentCardProductDetails from './components/SafetyTipsSiderMainContentCardProductDetails'

export default function SiderMainContentCardProductDetails({ property }: { property: any }) {
    return (
        <>
            <div className="space-y-6">
                <PriceCardSiderMainContentCardProductDetails property={property} />
                <OwnerInfoSiderMainContentCardProductDetails property={property} />
                <SafetyTipsSiderMainContentCardProductDetails />
            </div>
        </>
    )
}
