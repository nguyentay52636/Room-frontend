import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, RefreshCw } from "lucide-react"

interface FormData {
    ten: string
    email: string
    tenDangNhap: string
    matKhau: string
    soDienThoai: string
    vaiTro: string
    anhDaiDien: string
    trangThai: string
}

interface SecurityTabProps {
    formData: FormData
    account: Record<string, unknown> | null
    isReadOnly: boolean
    mode: "view" | "edit" | "create"
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
    return (
        <div className="space-y-4">
            {mode === "edit" && (
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="changePassword"
                        checked={changePassword}
                        onChange={(e) => onChangePassword(e.target.checked)}
                        disabled={isReadOnly}
                    />
                    <Label htmlFor="changePassword">Thay đổi mật khẩu</Label>
                </div>
            )}

            {(mode === "create" || changePassword) && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="matKhau">Mật khẩu</Label>
                        <div className="relative">
                            <Input
                                id="matKhau"
                                type={showPassword ? "text" : "password"}
                                value={formData.matKhau}
                                onChange={(e) => onInputChange("matKhau", e.target.value)}
                                disabled={isReadOnly}
                                placeholder="Nhập mật khẩu"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => onTogglePassword(!showPassword)}
                                disabled={isReadOnly}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                disabled={isReadOnly}
                                placeholder="Nhập lại mật khẩu"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => onToggleConfirmPassword(!showConfirmPassword)}
                                disabled={isReadOnly}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onGeneratePassword}
                            disabled={isReadOnly}
                            className="flex items-center space-x-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span>Tạo mật khẩu ngẫu nhiên</span>
                        </Button>
                    </div>
                </>
            )}

            <div className="space-y-2">
                <Label>Lịch sử đăng nhập</Label>
                <div className="rounded-md border p-4">
                    <p className="text-sm text-muted-foreground">
                        {account?.lastLogin
                            ? `Lần đăng nhập cuối: ${new Date(account.lastLogin as string).toLocaleString('vi-VN')}`
                            : "Chưa có lịch sử đăng nhập"
                        }
                    </p>
                </div>
            </div>
        </div>
    )
} 