import { useState } from "react"
import { createUser, updateUser } from "@/lib/apis/userApi"
import { toast } from "sonner"

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

export function useAccountForm(account: Record<string, unknown> | null, mode: "view" | "edit" | "create", onOpenChange: (open: boolean) => void) {
    const [formData, setFormData] = useState<FormData>({
        ten: (account?.ten as string) || "",
        email: (account?.email as string) || "",
        tenDangNhap: (account?.tenDangNhap as string) || "",
        matKhau: (account?.matKhau as string) || "",
        soDienThoai: (account?.soDienThoai as string) || "",
        vaiTro: (account?.vaiTro as string) || "",
        anhDaiDien: (account?.anhDaiDien as string) || "",
        trangThai: (account?.trangThai as string) || ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const generateRandomPassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        handleInputChange("matKhau", password)
    }

    const isFormValid = () => {
        const requiredFields = ["ten", "email", "tenDangNhap", "matKhau", "soDienThoai", "vaiTro", "trangThai"]
        return requiredFields.every(field => formData[field as keyof FormData]?.trim() !== "")
    }

    const handleSave = async () => {
        try {
            if (mode === "create") {
                await createUser(formData)
                toast.success("Tạo tài khoản thành công")
            } else if (mode === "edit") {
                await updateUser((account?.id as string) || "", formData)
                toast.success("Cập nhật tài khoản thành công")
            }
            onOpenChange(false)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra"
            toast.error(errorMessage)
        }
    }

    return {
        formData,
        showPassword,
        showConfirmPassword,
        changePassword,
        handleInputChange,
        setShowPassword,
        setShowConfirmPassword,
        setChangePassword,
        generateRandomPassword,
        handleSave,
        isFormValid: isFormValid()
    }
} 