import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Star, Heart, Eye } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
export default function FavoritesTab({ favoriteProperties, formatCurrency }: { favoriteProperties: any, formatCurrency: any }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bất động sản yêu thích</CardTitle>
          <CardDescription>Danh sách các bất động sản bạn đã lưu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteProperties.map((property: any) => (
              <div
                key={property.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={property.hinhAnh || "/placeholder.svg"}
                  alt={property.tieuDe}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{property.tieuDe}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4" />
                    {property.diaChi}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-blue-600">{formatCurrency(property.gia)}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{property.soSao}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{property.soLuotXem}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1">
                      Xem chi tiết
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </>
  )
}
