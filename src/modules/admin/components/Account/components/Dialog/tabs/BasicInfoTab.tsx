import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { BadgeDisplay } from "../components/BadgeDisplay"

interface BasicInfoTabProps {
    formData: any
    account: any
    isReadOnly: boolean
    onInputChange: (field: string, value: string) => void
}

export function BasicInfoTab({ formData, account, isReadOnly, onInputChange }: BasicInfoTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={account?.avatar || "/placeholder.svg?height=80&width=80"} />
                        <AvatarFallback className="text-lg">{formData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        {!isReadOnly && (
                            <Button variant="outline" size="sm">
                                Thay đổi ảnh
                            </Button>
                        )}
                        <BadgeDisplay role={formData.role} status={formData.status} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => onInputChange("name", e.target.value)}
                            disabled={isReadOnly}
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => onInputChange("email", e.target.value)}
                            disabled={isReadOnly}
                            placeholder="Nhập địa chỉ email"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => onInputChange("phone", e.target.value)}
                            disabled={isReadOnly}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="department">Phòng ban</Label>
                        <Input
                            id="department"
                            value={formData.department}
                            onChange={(e) => onInputChange("department", e.target.value)}
                            disabled={isReadOnly}
                            placeholder="Nhập phòng ban"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 