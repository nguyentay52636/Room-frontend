import { User } from '@/lib/apis/types'
import { createUser } from '@/lib/apis/userApi';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';

export default function AddAccountForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<User>({
        defaultValues: {
            ten: "",
            email: "",
            tenDangNhap: "",
            matKhau: "",
            soDienThoai: "",
            vaiTro: "",
            anhDaiDien: "",
            trangThai: "",

        }
    })
    const handleAddAccount = async (values: User) => {
        setIsSubmitting(true)
        try {
            const response = await createUser(values)
            console.log(response)
            toast.success("Tạo tài khoản thành công")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div>
            <h1>Add Account</h1>
        </div>
    )
}