import { Bath, Car } from 'lucide-react'
import { Bed } from 'lucide-react'
import { Square } from 'lucide-react'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { productDetais } from '@/utils/data/types'

export default function QuickInfoMainContentCardProductDetails({ property }: { property: productDetais }) {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{property.area}m²</div>
              <div className="text-sm text-muted-foreground">Diện tích</div>
            </div>
            <div className="text-center">
              <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{property.bedrooms}</div>
              <div className="text-sm text-muted-foreground">Phòng ngủ</div>
            </div>
            <div className="text-center">
              <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{property.bathrooms || "Chung"}</div>
              <div className="text-sm text-muted-foreground">Phòng tắm</div>
            </div>
            <div className="text-center">
              <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{property.parking || "Không"}</div>
              <div className="text-sm text-muted-foreground">Chỗ đậu xe</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
