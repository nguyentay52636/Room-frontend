import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

interface SettingsTabProps {
    formData: any
    isReadOnly: boolean
    onInputChange: (field: string, value: string) => void
}

export function SettingsTab({ formData, isReadOnly, onInputChange }: SettingsTabProps) {
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
                            onValueChange={(value) => onInputChange("status", value)}
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