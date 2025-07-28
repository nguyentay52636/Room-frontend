import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { IUser } from "@/lib/apis/types"

interface BasicInfoTabProps {
    form: UseFormReturn<any>
    account: IUser | null
    isReadOnly: boolean
}

export function BasicInfoTab({ form, isReadOnly }: BasicInfoTabProps) {
    const { register, formState: { errors } } = form

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ten">Họ và tên</Label>
                    <Input
                        id="ten"
                        {...register("ten")}
                        disabled={isReadOnly}
                        placeholder="Nhập họ và tên"
                    />
                    {errors.ten && (
                        <p className="text-sm text-red-500">{errors.ten.message as string}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        disabled={isReadOnly}
                        placeholder="Nhập email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message as string}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tenDangNhap">Tên đăng nhập</Label>
                    <Input
                        id="tenDangNhap"
                        {...register("tenDangNhap")}
                        disabled={isReadOnly}
                        placeholder="Nhập tên đăng nhập"
                    />
                    {errors.tenDangNhap && (
                        <p className="text-sm text-red-500">{errors.tenDangNhap.message as string}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="soDienThoai">Số điện thoại</Label>
                    <Input
                        id="soDienThoai"
                        {...register("soDienThoai")}
                        disabled={isReadOnly}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.soDienThoai && (
                        <p className="text-sm text-red-500">{errors.soDienThoai.message as string}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="vaiTro">Vai trò</Label>
                    <Select
                        value={form.watch("vaiTro")}
                        onValueChange={(value) => form.setValue("vaiTro", value)}
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
                    {errors.vaiTro && (
                        <p className="text-sm text-red-500">{errors.vaiTro.message as string}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="trangThai">Trạng thái</Label>
                    <Select
                        value={form.watch("trangThai")}
                        onValueChange={(value) => form.setValue("trangThai", value)}
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
                    {errors.trangThai && (
                        <p className="text-sm text-red-500">{errors.trangThai.message as string}</p>
                    )}
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
                            form.setValue("anhDaiDien", file.name)
                        }
                    }}
                />
            </div>
        </div>
    )
} 