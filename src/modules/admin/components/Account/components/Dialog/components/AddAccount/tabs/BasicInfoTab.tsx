import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface BasicInfoTabProps {
    formData: FormData
    account: Record<string, unknown> | null
    isReadOnly: boolean
    onInputChange: (field: string, value: string) => void
}

export function BasicInfoTab({ formData, isReadOnly, onInputChange }: BasicInfoTabProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ten">Họ và tên</Label>
                    <Input
                        id="ten"
                        value={formData.ten}
                        onChange={(e) => onInputChange("ten", e.target.value)}
                        disabled={isReadOnly}
                        placeholder="Nhập họ và tên"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => onInputChange("email", e.target.value)}
                        disabled={isReadOnly}
                        placeholder="Nhập email"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tenDangNhap">Tên đăng nhập</Label>
                    <Input
                        id="tenDangNhap"
                        value={formData.tenDangNhap}
                        onChange={(e) => onInputChange("tenDangNhap", e.target.value)}
                        disabled={isReadOnly}
                        placeholder="Nhập tên đăng nhập"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="soDienThoai">Số điện thoại</Label>
                    <Input
                        id="soDienThoai"
                        value={formData.soDienThoai}
                        onChange={(e) => onInputChange("soDienThoai", e.target.value)}
                        disabled={isReadOnly}
                        placeholder="Nhập số điện thoại"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="vaiTro">Vai trò</Label>
                    <Select
                        value={formData.vaiTro}
                        onValueChange={(value) => onInputChange("vaiTro", value)}
                        disabled={isReadOnly}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="trangThai">Trạng thái</Label>
                    <Select
                        value={formData.trangThai}
                        onValueChange={(value) => onInputChange("trangThai", value)}
                        disabled={isReadOnly}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Hoạt động</SelectItem>
                            <SelectItem value="inactive">Không hoạt động</SelectItem>
                            <SelectItem value="suspended">Tạm khóa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="anhDaiDien">Ảnh đại diện</Label>
                <Input
                    id="anhDaiDien"
                    type="file"
                    accept="image/*"
                    disabled={isReadOnly}
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            // Handle file upload logic here
                            onInputChange("anhDaiDien", file.name)
                        }
                    }}
                />
            </div>
        </div>
    )
} 