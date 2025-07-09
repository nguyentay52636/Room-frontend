import { CardContent, CardTitle } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Home } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin } from 'lucide-react'
import { DollarSign } from 'lucide-react'
import { Building } from 'lucide-react'

export default function BasicInfoCardRealEstate({getStatusBadge, formData, isReadOnly, handleInputChange, errors }: any) {
    return (
        <>
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <div className="flex items-center space-x-2">
                            <Home className="h-5 w-5 text-green-600" />
                            <span>Thông tin cơ bản</span>
                        </div>
                        {isReadOnly && getStatusBadge(formData.status)}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tên bất động sản *
                        </Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Golden Ridge Apartment"
                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.title ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                disabled={isReadOnly}
                            />
                            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="district" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Quận/Huyện *
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="district"
                                    value={formData.district}
                                    onChange={(e) => handleInputChange("district", e.target.value)}
                                    placeholder="Quận 1"
                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.district ? "border-red-500 focus:border-red-500" : ""
                                        }`}
                                    disabled={isReadOnly}
                                />
                                {errors.district && <p className="text-sm text-red-500 mt-1">{errors.district}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Thành phố
                            </Label>
                            <Select
                                value={formData.city}
                                onValueChange={(value) => handleInputChange("city", value)}
                                disabled={isReadOnly}
                            >
                                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TP.HCM">TP. Hồ Chí Minh</SelectItem>
                                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                                    <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Địa chỉ đầy đủ *
                        </Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.location ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                disabled={isReadOnly}
                            />
                            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Giá thuê *
                            </Label>
                            <div className="flex space-x-2">
                                <div className="relative flex-1">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        placeholder="15000000"
                                        className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.price ? "border-red-500 focus:border-red-500" : ""
                                            }`}
                                        disabled={isReadOnly}
                                    />
                                </div>
                                <Select
                                    value={formData.currency}
                                    onValueChange={(value) => handleInputChange("currency", value)}
                                    disabled={isReadOnly}
                                >
                                    <SelectTrigger className="w-24 h-11 border-gray-200 dark:border-gray-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="VND">VND</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Loại bất động sản
                            </Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => handleInputChange("type", value)}
                                disabled={isReadOnly}
                            >
                                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="can_ho">Căn hộ</SelectItem>
                                    <SelectItem value="nha_rieng">Nhà riêng</SelectItem>
                                    <SelectItem value="chung_cu">Chung cư</SelectItem>
                                    <SelectItem value="biet_thu">Biệt thự</SelectItem>
                                    <SelectItem value="studio">Studio</SelectItem>
                                    <SelectItem value="nha_pho">Nhà phố</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {!isReadOnly && (
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Trạng thái
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dang_hoat_dong">Có sẵn</SelectItem>
                                    <SelectItem value="da_thue">Đã thuê</SelectItem>
                                    <SelectItem value="cho_duyet">Chờ duyệt</SelectItem>
                                    <SelectItem value="bao_tri">Bảo trì</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
