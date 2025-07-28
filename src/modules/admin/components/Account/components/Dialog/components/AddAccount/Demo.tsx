import React, { useState } from 'react'
import { AddAccountDialog } from './AddAccountDialog'
import { IUser } from '@/lib/apis/types'

// Mock data for testing
const mockUser: IUser = {
    _id: "1",
    ten: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    tenDangNhap: "nguyenvana",
    matKhau: "password123",
    soDienThoai: "0123456789",
    vaiTro: "user",
    trangThai: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
}

export default function AccountManagementDemo() {
    const [selectedAccount, setSelectedAccount] = useState<IUser | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">("create")

    const handleAddAccount = () => {
        setSelectedAccount(null)
        setDialogMode("create")
        setIsDialogOpen(true)
    }

    const handleEditAccount = () => {
        setSelectedAccount(mockUser)
        setDialogMode("edit")
        setIsDialogOpen(true)
    }

    const handleViewAccount = () => {
        setSelectedAccount(mockUser)
        setDialogMode("view")
        setIsDialogOpen(true)
    }

    const handleSuccess = () => {
        console.log("Operation successful!")
        // Refresh data or show success message
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Account Management Demo</h1>

            <div className="space-y-4">
                <div className="flex space-x-4">
                    <button
                        onClick={handleAddAccount}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Tạo tài khoản mới
                    </button>

                    <button
                        onClick={handleEditAccount}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Chỉnh sửa tài khoản
                    </button>

                    <button
                        onClick={handleViewAccount}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Xem chi tiết tài khoản
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Tính năng đã triển khai:</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>✅ React Hook Form với Zod validation</li>
                        <li>✅ Thêm tài khoản mới với validation</li>
                        <li>✅ Chỉnh sửa tài khoản hiện có</li>
                        <li>✅ Xem chi tiết tài khoản (chế độ chỉ đọc)</li>
                        <li>✅ Tự động tạo mật khẩu ngẫu nhiên</li>
                        <li>✅ Xử lý mật khẩu thông minh (chỉ cập nhật khi thay đổi)</li>
                        <li>✅ Validation real-time với error messages</li>
                        <li>✅ Loading states và error handling</li>
                        <li>✅ Tab-based interface (Basic Info, Security, Settings, Activity)</li>
                        <li>✅ Type-safe với TypeScript</li>
                        <li>✅ Responsive design</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Cách sử dụng:</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        <pre className="text-sm">
                            {`// Hook chính
const {
    form,                    // React Hook Form instance
    isSubmitting,           // State đang submit
    isReadOnly,             // State chế độ chỉ đọc
    isFormValid,            // State form hợp lệ
    handleSave,             // Function xử lý lưu
    generateRandomPassword, // Function tạo mật khẩu ngẫu nhiên
} = useAccountForm({
    account: userData,      // Dữ liệu tài khoản (null cho tạo mới)
    mode: "create",         // "create" | "edit" | "view"
    onOpenChange: setOpen,  // Callback đóng dialog
    onSuccess: refreshData  // Callback sau khi thành công
})

// Dialog Component
<AddAccountDialog
    account={selectedAccount}
    open={isDialogOpen}
    onOpenChange={setIsDialogOpen}
    mode={dialogMode}
    onSuccess={handleSuccess}
/>`}
                        </pre>
                    </div>
                </div>
            </div>

            <AddAccountDialog
                account={selectedAccount}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={dialogMode}
                onSuccess={handleSuccess}
            />
        </div>
    )
} 