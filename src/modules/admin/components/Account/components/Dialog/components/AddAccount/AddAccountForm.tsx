import { IUser } from '@/lib/apis/types'
import { createUser } from '@/lib/apis/userApi';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { useAccountForm } from '../ActionAccountForm'

interface AddAccountFormProps {
    account?: IUser | null
    mode?: "view" | "edit" | "create"
    onSuccess?: () => void
}

export default function AddAccountForm({ account, mode = "create", onSuccess }: AddAccountFormProps) {
    const {
        form,
        isSubmitting,
        isReadOnly,
        isFormValid,
        handleSave
    } = useAccountForm({
        account,
        mode,
        onOpenChange: () => { }, // Not used in this component
        onSuccess
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {mode === "create" ? "Tạo tài khoản mới" : mode === "edit" ? "Chỉnh sửa tài khoản" : "Chi tiết tài khoản"}
            </h1>

            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Họ và tên</label>
                        <input
                            {...form.register("ten")}
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập họ và tên"
                        />
                        {form.formState.errors.ten && (
                            <p className="text-sm text-red-500">{form.formState.errors.ten.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            {...form.register("email")}
                            type="email"
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập email"
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Tên đăng nhập</label>
                        <input
                            {...form.register("tenDangNhap")}
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập tên đăng nhập"
                        />
                        {form.formState.errors.tenDangNhap && (
                            <p className="text-sm text-red-500">{form.formState.errors.tenDangNhap.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                        <input
                            {...form.register("soDienThoai")}
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập số điện thoại"
                        />
                        {form.formState.errors.soDienThoai && (
                            <p className="text-sm text-red-500">{form.formState.errors.soDienThoai.message}</p>
                        )}
                    </div>
                </div>

                {mode === "create" && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                        <input
                            {...form.register("matKhau")}
                            type="password"
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập mật khẩu"
                        />
                        {form.formState.errors.matKhau && (
                            <p className="text-sm text-red-500">{form.formState.errors.matKhau.message}</p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Vai trò</label>
                        <select
                            {...form.register("vaiTro")}
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Chọn vai trò</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                        </select>
                        {form.formState.errors.vaiTro && (
                            <p className="text-sm text-red-500">{form.formState.errors.vaiTro.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Trạng thái</label>
                        <select
                            {...form.register("trangThai")}
                            disabled={isReadOnly}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                            <option value="suspended">Tạm khóa</option>
                        </select>
                        {form.formState.errors.trangThai && (
                            <p className="text-sm text-red-500">{form.formState.errors.trangThai.message}</p>
                        )}
                    </div>
                </div>

                {!isReadOnly && (
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Đang xử lý..."
                                : mode === "create"
                                    ? "Tạo tài khoản"
                                    : "Lưu thay đổi"
                            }
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}