import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { createUser, updateUser } from "@/lib/apis/userApi"
import { toast } from "sonner"
import { IUser } from "@/lib/apis/types"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Schema validation
const accountSchema = z.object({
    ten: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    tenDangNhap: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
    matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    soDienThoai: z.string().min(10, "Số điện thoại không hợp lệ"),
    vaiTro: z.string().min(1, "Vui lòng chọn vai trò"),
    anhDaiDien: z.string().optional(),
    trangThai: z.string().min(1, "Vui lòng chọn trạng thái")
})

type AccountFormData = z.infer<typeof accountSchema>

// Type for update user (without password requirement)
type UpdateUserData = Omit<AccountFormData, 'matKhau'> & {
    matKhau?: string
}

interface UseAccountFormProps {
    account: IUser | null
    mode: "view" | "edit" | "create"
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function useAccountForm({ account, mode, onOpenChange, onSuccess }: UseAccountFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            ten: "",
            email: "",
            tenDangNhap: "",
            matKhau: "",
            soDienThoai: "",
            vaiTro: "",
            anhDaiDien: "",
            trangThai: ""
        }
    })

    // Reset form when account or mode changes
    useEffect(() => {
        if (account && (mode === "edit" || mode === "view")) {
            // Handle vaiTro field which can be object or string
            const vaiTroValue = typeof account.vaiTro === 'object' 
                ? (account.vaiTro as any)?.ten || account.vaiTro 
                : account.vaiTro

            form.reset({
                ten: account.ten || "",
                email: account.email || "",
                tenDangNhap: account.tenDangNhap || "",
                matKhau: mode === "edit" ? "" : "••••••••", // Don't show password in edit mode
                soDienThoai: account.soDienThoai || "",
                vaiTro: vaiTroValue || "",
                anhDaiDien: account.anhDaiDien || "",
                trangThai: account.trangThai || ""
            })
        } else if (mode === "create") {
            form.reset({
                ten: "",
                email: "",
                tenDangNhap: "",
                matKhau: "",
                soDienThoai: "",
                vaiTro: "",
                anhDaiDien: "",
                trangThai: ""
            })
        }
    }, [account, mode, form])

    const generateRandomPassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        form.setValue("matKhau", password)
    }

    const handleSave = async (data: AccountFormData) => {
        if (isSubmitting) return

        setIsSubmitting(true)
        try {
            if (mode === "create") {
                await createUser(data)
                toast.success("Tạo tài khoản thành công")
            } else if (mode === "edit") {
                if (!account?._id) {
                    throw new Error("Không tìm thấy ID tài khoản")
                }
                
                // Prepare update data
                const updateData: UpdateUserData = {
                    ten: data.ten,
                    email: data.email,
                    tenDangNhap: data.tenDangNhap,
                    soDienThoai: data.soDienThoai,
                    vaiTro: data.vaiTro,
                    anhDaiDien: data.anhDaiDien,
                    trangThai: data.trangThai
                }
                
                // Only include password if it's changed
                if (data.matKhau && data.matKhau !== "" && data.matKhau !== "••••••••") {
                    updateData.matKhau = data.matKhau
                }
                
                await updateUser(account._id, updateData as IUser)
                toast.success("Cập nhật tài khoản thành công")
            }
            
            onSuccess?.()
            onOpenChange(false)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra"
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const isFormValid = form.formState.isValid
    const isReadOnly = mode === "view"

    return {
        form,
        showPassword,
        showConfirmPassword,
        changePassword,
        isSubmitting,
        isReadOnly,
        isFormValid,
        setShowPassword,
        setShowConfirmPassword,
        setChangePassword,
        generateRandomPassword,
        handleSave: form.handleSubmit(handleSave)
    }
} 