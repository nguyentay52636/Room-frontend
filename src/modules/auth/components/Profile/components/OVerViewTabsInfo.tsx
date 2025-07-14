import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RootState } from '@/redux/store'
import { Edit3, Save } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function OVerViewTabsInfo({ user }: { user: any }) {
    const [isEditing, setIsEditing] = useState(false)
    user = useSelector((state: RootState) => state.auth.user)
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Thông tin cá nhân</CardTitle>
                        <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Lưu
                            </>
                        ) : (
                            <>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </>
                        )}
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="ten">Họ và tên</Label>
                            <Input
                                id="ten"
                                value={user.ten}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={user.email}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soDienThoai">Số điện thoại</Label>
                            <Input
                                id="soDienThoai"
                                value={user.soDienThoai}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ngheNghiep">Nghề nghiệp</Label>
                            <Input
                                id="ngheNghiep"
                                value={user.ngheNghiep}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="diaChi">Địa chỉ</Label>
                            <Input
                                id="diaChi"
                                value={user.diaChi}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ngaySinh">Ngày sinh</Label>
                            <Input
                                id="ngaySinh"
                                type="date"
                                value={user.ngaySinh}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-gray-50" : ""}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="moTa">Mô tả bản thân</Label>
                        <Textarea
                            id="moTa"
                            value={user.moTa}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                            rows={4}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
