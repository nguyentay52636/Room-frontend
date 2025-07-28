import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getRoles } from "@/lib/apis/roleApi"
import { role } from "@/lib/apis/types"
import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"

interface SettingsTabProps {
    form: UseFormReturn<any>
    isReadOnly: boolean
}

export function SettingsTab({ form, isReadOnly }: SettingsTabProps) {
    const [roles, setRoles] = useState<role[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoading(true)
            try {
                const response = await getRoles()
                console.log("alo", response)
                setRoles(response)
            } catch (error) {
                setError(error as string)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRoles()
    }, [])

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông báo</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Email thông báo</Label>
                            <p className="text-sm text-muted-foreground">
                                Nhận thông báo qua email
                            </p>
                        </div>
                        <Switch disabled={isReadOnly} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Thông báo đăng nhập</Label>
                            <p className="text-sm text-muted-foreground">
                                Thông báo khi có đăng nhập mới
                            </p>
                        </div>
                        <Switch disabled={isReadOnly} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Thông báo bảo mật</Label>
                            <p className="text-sm text-muted-foreground">
                                Thông báo về các vấn đề bảo mật
                            </p>
                        </div>
                        <Switch disabled={isReadOnly} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Bảo mật</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Xác thực hai yếu tố</Label>
                        <Select disabled={isReadOnly}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn phương thức xác thực" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Không sử dụng</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="app">Ứng dụng xác thực</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Yêu cầu đổi mật khẩu định kỳ</Label>
                            <p className="text-sm text-muted-foreground">
                                Tự động yêu cầu đổi mật khẩu sau 90 ngày
                            </p>
                        </div>
                        <Switch disabled={isReadOnly} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Giao diện</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Ngôn ngữ</Label>
                        <Select disabled={isReadOnly}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn ngôn ngữ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vi">Tiếng Việt</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Chủ đề</Label>
                        <Select disabled={isReadOnly}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn chủ đề" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Sáng</SelectItem>
                                <SelectItem value="dark">Tối</SelectItem>
                                <SelectItem value="auto">Tự động</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
} 