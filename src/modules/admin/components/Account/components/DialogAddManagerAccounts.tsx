
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Calendar, Activity, Settings, Eye, EyeOff, Key, Lock } from "lucide-react"

interface AccountDialogProps {
    account: any
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: "view" | "edit" | "create"
}

export function DialogAddManagerAccounts({ account, open, onOpenChange, mode }: AccountDialogProps) {
    const [formData, setFormData] = useState({
        name: account?.name || "",
        email: account?.email || "",
        phone: account?.phone || "",
        role: account?.role || "staff",
        status: account?.status || "active",
        department: account?.department || "",
        notes: account?.notes || "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    const isReadOnly = mode === "view"
    const isCreate = mode === "create"

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-100 text-red-800">Admin</Badge>
            case "manager":
                return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>
            case "staff":
                return <Badge className="bg-green-100 text-green-800">Staff</Badge>
            case "owner":
                return <Badge className="bg-purple-100 text-purple-800">Owner</Badge>
            case "customer":
                return <Badge className="bg-gray-100 text-gray-800">Customer</Badge>
            default:
                return <Badge>{role}</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
            case "inactive":
                return <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>
            case "suspended":
                return <Badge className="bg-red-100 text-red-800">Tạm khóa</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const handleSave = () => {
        // Handle save logic here
        console.log("Saving account:", formData)
        onOpenChange(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const generateRandomPassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setFormData((prev) => ({ ...prev, password, confirmPassword: password }))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>
                            {mode === "create" ? "Tạo tài khoản mới" : mode === "edit" ? "Chỉnh sửa tài khoản" : "Chi tiết tài khoản"}
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Tạo tài khoản mới cho hệ thống"
                            : mode === "edit"
                                ? "Chỉnh sửa thông tin tài khoản"
                                : "Xem chi tiết thông tin tài khoản"}
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                        <TabsTrigger value="security">Bảo mật</TabsTrigger>
                        <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                        <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
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
                                        <div className="flex items-center space-x-2">
                                            {getRoleBadge(formData.role)}
                                            {getStatusBadge(formData.status)}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Họ và tên *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
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
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            disabled={isReadOnly}
                                            placeholder="Nhập địa chỉ email"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            disabled={isReadOnly}
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Phòng ban</Label>
                                        <Input
                                            id="department"
                                            value={formData.department}
                                            onChange={(e) => handleInputChange("department", e.target.value)}
                                            disabled={isReadOnly}
                                            placeholder="Nhập phòng ban"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Key className="h-4 w-4" />
                                    <span>Mật khẩu</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {!isReadOnly && (
                                    <>
                                        {!isCreate && (
                                            <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <Switch id="change-password" checked={changePassword} onCheckedChange={setChangePassword} />
                                                <Label htmlFor="change-password" className="text-sm">
                                                    Thay đổi mật khẩu
                                                </Label>
                                            </div>
                                        )}

                                        {(isCreate || changePassword) && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="password">{isCreate ? "Mật khẩu *" : "Mật khẩu mới *"}</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            value={formData.password}
                                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                                            placeholder="Nhập mật khẩu"
                                                            className="pr-20"
                                                        />
                                                        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="h-7 w-7 p-0"
                                                            >
                                                                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="confirmPassword"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            value={formData.confirmPassword}
                                                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                            placeholder="Nhập lại mật khẩu"
                                                            className="pr-10"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute inset-y-0 right-0 h-7 w-7 p-0 mr-2"
                                                        >
                                                            {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                                        </Button>
                                                    </div>
                                                    {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                                                        <p className="text-sm text-red-600">Mật khẩu không khớp</p>
                                                    )}
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Button type="button" variant="outline" size="sm" onClick={generateRandomPassword}>
                                                        <Key className="h-3 w-3 mr-2" />
                                                        Tạo mật khẩu ngẫu nhiên
                                                    </Button>
                                                </div>

                                                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                                                        Yêu cầu mật khẩu:
                                                    </h4>
                                                    <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                                                        <li>• Ít nhất 8 ký tự</li>
                                                        <li>• Chứa ít nhất 1 chữ hoa</li>
                                                        <li>• Chứa ít nhất 1 chữ thường</li>
                                                        <li>• Chứa ít nhất 1 số</li>
                                                        <li>• Chứa ít nhất 1 ký tự đặc biệt</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {account && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">Ngày tạo</p>
                                                    <p className="text-sm text-muted-foreground">{account.createdAt}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Activity className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">Đăng nhập cuối</p>
                                                    <p className="text-sm text-muted-foreground">{account.lastLogin}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Lock className="h-4 w-4 text-gray-600" />
                                                <h4 className="text-sm font-medium">Bảo mật tài khoản</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">Xác thực 2 bước</p>
                                                    <p className="font-medium text-green-600">Đã bật</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Đổi mật khẩu cuối</p>
                                                    <p className="font-medium">15/12/2023</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Settings className="h-4 w-4" />
                                    <span>Cài đặt tài khoản</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Vai trò *</Label>
                                        <Select
                                            value={formData.role}
                                            onValueChange={(value) => handleInputChange("role", value)}
                                            disabled={isReadOnly}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="manager">Manager</SelectItem>
                                                <SelectItem value="staff">Staff</SelectItem>
                                                <SelectItem value="owner">Owner</SelectItem>
                                                <SelectItem value="customer">Customer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Trạng thái *</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => handleInputChange("status", value)}
                                            disabled={isReadOnly}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Hoạt động</SelectItem>
                                                <SelectItem value="inactive">Không hoạt động</SelectItem>
                                                <SelectItem value="suspended">Tạm khóa</SelectItem>
                                                <SelectItem value="pending">Chờ duyệt</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Ghi chú</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) => handleInputChange("notes", e.target.value)}
                                        disabled={isReadOnly}
                                        rows={3}
                                        placeholder="Thêm ghi chú về tài khoản này..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="h-4 w-4" />
                                    <span>Hoạt động gần đây</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {account ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold">{account.loginCount}</div>
                                                    <p className="text-sm text-muted-foreground">Lần đăng nhập</p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold">{account.properties}</div>
                                                    <p className="text-sm text-muted-foreground">Bất động sản quản lý</p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold">98%</div>
                                                    <p className="text-sm text-muted-foreground">Tỷ lệ hoạt động</p>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-medium">Lịch sử hoạt động</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-muted-foreground">2 giờ trước</span>
                                                    <span>Đăng nhập vào hệ thống</span>
                                                </div>
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-muted-foreground">1 ngày trước</span>
                                                    <span>Cập nhật thông tin bất động sản</span>
                                                </div>
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                    <span className="text-muted-foreground">3 ngày trước</span>
                                                    <span>Thay đổi mật khẩu</span>
                                                </div>
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    <span className="text-muted-foreground">1 tuần trước</span>
                                                    <span>Cập nhật thông tin cá nhân</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Tài khoản mới sẽ có thông tin hoạt động sau khi được tạo.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {isReadOnly ? "Đóng" : "Hủy"}
                    </Button>
                    {!isReadOnly && (
                        <Button
                            onClick={handleSave}
                            disabled={
                                !formData.name ||
                                !formData.email ||
                                (isCreate && !formData.password) ||
                                (changePassword && (!formData.password || formData.password !== formData.confirmPassword))
                            }
                        >
                            {mode === "create" ? "Tạo tài khoản" : "Lưu thay đổi"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
