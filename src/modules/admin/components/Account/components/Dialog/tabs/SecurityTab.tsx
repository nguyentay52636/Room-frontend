import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Activity, Key, Lock, Eye, EyeOff } from "lucide-react"

interface SecurityTabProps {
    formData: any
    account: any
    isReadOnly: boolean
    mode: string
    showPassword: boolean
    showConfirmPassword: boolean
    changePassword: boolean
    onInputChange: (field: string, value: string) => void
    onTogglePassword: (show: boolean) => void
    onToggleConfirmPassword: (show: boolean) => void
    onChangePassword: (change: boolean) => void
    onGeneratePassword: () => void
}

export function SecurityTab({
    formData,
    account,
    isReadOnly,
    mode,
    showPassword,
    showConfirmPassword,
    changePassword,
    onInputChange,
    onTogglePassword,
    onToggleConfirmPassword,
    onChangePassword,
    onGeneratePassword
}: SecurityTabProps) {
    const isCreate = mode === "create"

    return (
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
                                <Switch id="change-password" checked={changePassword} onCheckedChange={onChangePassword} />
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
                                            onChange={(e) => onInputChange("password", e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            className="pr-20"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onTogglePassword(!showPassword)}
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
                                            onChange={(e) => onInputChange("confirmPassword", e.target.value)}
                                            placeholder="Nhập lại mật khẩu"
                                            className="pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onToggleConfirmPassword(!showConfirmPassword)}
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
                                    <Button type="button" variant="outline" size="sm" onClick={onGeneratePassword}>
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
    )
} 