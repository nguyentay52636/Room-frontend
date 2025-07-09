import { CardContent } from '@/components/ui/card'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import React from 'react'
import { Star, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CardAmenitiesManagerRealEstateProps {
  formData: any
  isReadOnly: boolean
  newAmenity: string
  setNewAmenity: (value: string) => void
  addAmenity: () => void
  removeAmenity: (amenity: string) => void
}

export default function CardAmenitiesManagerRealEstate({ addAmenity, removeAmenity, formData, isReadOnly, newAmenity, setNewAmenity }: CardAmenitiesManagerRealEstateProps) {
  return (
    <>
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Star className="h-5 w-5 text-yellow-600" />
            <span>Tiện ích ({formData.amenities.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isReadOnly && (
            <div className="flex space-x-2">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Thêm tiện ích..."
                className="flex-1 h-10 border-gray-200 dark:border-gray-700"
                onKeyPress={(e) => e.key === "Enter" && <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span>Tiện ích ({formData.amenities.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isReadOnly && (
                      <div className="flex space-x-2">
                        <Input
                          value={newAmenity}
                          onChange={(e) => setNewAmenity(e.target.value)}
                          placeholder="Thêm tiện ích..."
                          className="flex-1 h-10 border-gray-200 dark:border-gray-700"
                          onKeyPress={(e) => e.key === "Enter" && addAmenity()}
                        />
                        <Button onClick={addAmenity} size="sm" className="h-10 px-4">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity: any, index: any) => (
                        <Badge key={index} variant="outline" className="border-gray-300 dark:border-gray-600 px-3 py-1">
                          {amenity}
                          {!isReadOnly && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2 hover:bg-red-100 dark:hover:bg-red-900/20"
                              onClick={() => removeAmenity(amenity)}
                            >

                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {formData.amenities.length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        Chưa có tiện ích nào được thêm
                      </p>
                    )}
                  </CardContent>
                </Card>}
              />
              <Button onClick={addAmenity} size="sm" className="h-10 px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenity: any, index: number) => (
              <Badge key={index} variant="outline" className="border-gray-300 dark:border-gray-600 px-3 py-1">
                {amenity}
                {!isReadOnly && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-2 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => removeAmenity(amenity)}
                  >

                  </Button>
                )}
              </Badge>
            ))}
          </div>
          {formData.amenities.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Chưa có tiện ích nào được thêm
            </p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
