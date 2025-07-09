import { Card } from '@/components/ui/card'
import React from 'react'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Square, Bed, Bath, Calendar, Layers, Building, Sofa, PawPrint, FileText } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

interface CardRealEstateDetailsProps {
    formData: any
    handleInputChange: (field: keyof any, value: string | string[] | boolean) => void
    isReadOnly: boolean
    errors: any
    newAmenity: string
    setNewAmenity: (value: string) => void
    addAmenity: () => void
    removeAmenity: (amenity: string) => void
}

export default function CardsDetailsRealEstate({ formData, handleInputChange, isReadOnly, errors }: CardRealEstateDetailsProps) {
    return (
        <>
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <Square className="h-5 w-5 text-purple-600" />
                        <span>Chi tiết bất động sản</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="beds" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phòng ngủ
                            </Label>
                            <div className="relative">
                                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="beds"
                                    type="number"
                                    value={formData.beds}
                                    onChange={(e) => handleInputChange("beds", e.target.value)}
                                    placeholder="2"
                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                    disabled={isReadOnly}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="baths" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phòng tắm
                            </Label>
                            <div className="relative">
                                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="baths"
                                    type="number"
                                    value={formData.baths}
                                    onChange={(e) => handleInputChange("baths", e.target.value)}
                                    placeholder="2"
                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                    disabled={isReadOnly}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="area" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Diện tích (m²) *
                            </Label>
                            <div className="relative">
                                <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="area"
                                    type="number"
                                    value={formData.area}
                                    onChange={(e) => handleInputChange("area", e.target.value)}
                                    placeholder="120"
                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.area ? "border-red-500 focus:border-red-500" : ""
                                        }`}
                                    disabled={isReadOnly}
                                />
                                {errors.area && <p className="text-sm text-red-500 mt-1">{errors.area}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="yearBuilt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Năm xây dựng
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="yearBuilt"
                                    type="number"
                                    value={formData.yearBuilt}
                                    onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                                    placeholder="2020"
                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                    disabled={isReadOnly}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="floor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tầng
                            </Label>
                            <div className="relative">
                                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="floor"
                                    type="number"
                                    value={formData.floor}
                                    onChange={(e) => handleInputChange("floor", e.target.value)}
                                    placeholder="15"
                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                    disabled={isReadOnly}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="totalFloors" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tổng số tầng
                            </Label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="totalFloors"
                                    type="number"
                                    value={formData.totalFloors}
                                    onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                                    placeholder="25"
                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                    disabled={isReadOnly}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Sofa className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">Có nội thất</span>
                            </div>
                            <Switch
                                checked={formData.furnished}
                                onCheckedChange={(checked) => handleInputChange("furnished", checked)}
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <PawPrint className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">Cho phép thú cưng</span>
                            </div>
                            <Switch
                                checked={formData.petAllowed}
                                onCheckedChange={(checked) => handleInputChange("petAllowed", checked)}
                                disabled={isReadOnly}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mô tả
                        </Label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Mô tả chi tiết về bất động sản..."
                                rows={4}
                                className="pl-10 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 resize-none"
                                disabled={isReadOnly}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
