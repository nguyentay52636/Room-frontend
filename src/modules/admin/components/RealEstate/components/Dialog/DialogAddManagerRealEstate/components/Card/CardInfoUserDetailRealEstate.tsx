import { User } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Phone, Mail } from 'lucide-react'  

export default function CardInfoUserDetailRealEstate({ formData, handleInputChange, errors, isReadOnly }: any) {
    return (
        <>
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <User className="h-5 w-5 text-orange-600" />
                        <span>Thông tin chủ sở hữu</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="owner" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Họ và tên *
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="owner"
                                value={formData.owner}
                                onChange={(e) => handleInputChange("owner", e.target.value)}
                                placeholder="Nguyễn Văn A"
                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.owner ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                disabled={isReadOnly}
                            />
                            {errors.owner && <p className="text-sm text-red-500 mt-1">{errors.owner}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ownerPhone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Số điện thoại *
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="ownerPhone"
                                    value={formData.ownerPhone}
                                    onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                                    placeholder="0901234567"
                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.ownerPhone ? "border-red-500 focus:border-red-500" : ""
                                        }`}
                                    disabled={isReadOnly}
                                />
                                {errors.ownerPhone && <p className="text-sm text-red-500 mt-1">{errors.ownerPhone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ownerEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email *
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="ownerEmail"
                                    type="email"
                                    value={formData.ownerEmail}
                                    onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                                    placeholder="owner@email.com"
                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.ownerEmail ? "border-red-500 focus:border-red-500" : ""
                                        }`}
                                    disabled={isReadOnly}
                                />
                                {errors.ownerEmail && <p className="text-sm text-red-500 mt-1">{errors.ownerEmail}</p>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
