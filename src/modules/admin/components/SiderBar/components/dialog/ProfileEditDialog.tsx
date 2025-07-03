"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload } from "lucide-react"

interface ProfileEditDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ProfileEditDialog({ open, onOpenChange }: ProfileEditDialogProps) {
    const [formData, setFormData] = useState({
        name: "Quản trị viên",
        email: "admin@newlife.vn",
        phone: "+84 123 456 789",
        position: "Quản lý hệ thống",
        bio: "Quản trị viên hệ thống NewLife, chuyên về quản lý bất động sản và cho thuê căn hộ.",
        avatar: "/placeholder.svg?height=100&width=100",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = () => {
        // Handle save logic here
        console.log("Saving profile:", formData)
        onOpenChange(false)
    }

    const handleAvatarUpload = () => {
        // Handle avatar upload logic here
        console.log("Upload avatar")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Chỉnh sửa hồ sơ</DialogTitle>
                    <DialogDescription>Cập nhật thông tin cá nhân của bạn tại đây.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={formData.avatar || "/placeholder.svg"} alt="Profile" />
                                <AvatarFallback className="bg-emerald-600 text-white text-xl">AD</AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="outline"
                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white"
                                onClick={handleAvatarUpload}
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                            <Upload className="h-4 w-4 mr-2" />
                            Tải ảnh lên
                        </Button>
                    </div>

                    {/* Form Fields */}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Họ và tên</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Nhập họ và tên"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="Nhập địa chỉ email"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="position">Chức vụ</Label>
                            <Input
                                id="position"
                                value={formData.position}
                                onChange={(e) => handleInputChange("position", e.target.value)}
                                placeholder="Nhập chức vụ"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bio">Giới thiệu</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => handleInputChange("bio", e.target.value)}
                                placeholder="Viết vài dòng giới thiệu về bản thân..."
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
