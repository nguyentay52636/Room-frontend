import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { getRoles } from "@/lib/apis/roleApi"
import { role } from "@/lib/apis/types"

interface SettingsTabProps {
    formData: any
    isReadOnly: boolean
    onInputChange: (field: string, value: string) => void
}

export function SettingsTab({ formData, isReadOnly, onInputChange }: SettingsTabProps) {
    const [roles, setRoles] = useState<role[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoading(true)
            try {
                const response = await getRoles()

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
                            onValueChange={(value) => onInputChange("role", value)}
                            disabled={isReadOnly}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role._id} value={role._id || ""}>{role.ten}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Trạng thái *</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => onInputChange("status", value)}
                            disabled={isReadOnly}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hoat_dong">Hoạt động</SelectItem>
                                <SelectItem value="khoa">Không hoạt động</SelectItem>
                                <SelectItem value="tam_khoa">Tạm khóa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Ghi chú</Label>
                    <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => onInputChange("notes", e.target.value)}
                        disabled={isReadOnly}
                        rows={3}
                        placeholder="Thêm ghi chú về tài khoản này..."
                    />
                </div>
            </CardContent>
        </Card>
    )
} 