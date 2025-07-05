import { useState } from "react"

interface FormData {
    name: string
    email: string
    phone: string
    role: string
    status: string
    department: string
    notes: string
    password: string
    confirmPassword: string
}

export function useAccountForm(account: any, mode: string, onOpenChange: (open: boolean) => void) {
    const [formData, setFormData] = useState<FormData>({
        name: account?.name || "",
        email: account?.email || "",
        phone: account?.phone || "",
        role: account?.role || "staff",
        status: account?.status || "active",
        department: account?.department || "",
        notes: account?.notes || "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    const isCreate = mode === "create"

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const generateRandomPassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setFormData((prev) => ({ ...prev, password, confirmPassword: password }))
    }

    const handleSave = () => {
        console.log("Saving account:", formData)
        onOpenChange(false)
    }

    const isFormValid = 
        formData.name &&
        formData.email &&
        (!isCreate || formData.password) &&
        (!changePassword || (formData.password && formData.password === formData.confirmPassword))

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
        isFormValid
    }
} 