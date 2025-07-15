
import {
    getRedirectResult,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth';
import CryptoJS from 'crypto-js';


import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../../../config/firebas.config';
import googleProvider from './config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../../../../redux/slices/authSlice';
import { register } from '../../../../redux/slices/authSlice';
import { createUser, getUserById } from '@/lib/apis/userApi';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
export default function LoginWithGoogle() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            const data = await signInWithPopup(auth, googleProvider);
            const check = await getUserById(data.user.uid);
            const passwordHash = CryptoJS.MD5(data.user.email || '').toString();
            if (check) {
                const credentials = {
                    tenDangNhap: data.user.email || '',
                    matKhau: passwordHash,
                };
                await dispatch(login(credentials)).unwrap();
            } else {
                const credentials = {
                    tenDangNhap: data.user.email || '',
                    matKhau: passwordHash,
                    ten: data.user.displayName || '',
                    email: data.user.email || '',
                    soDienThoai: data.user.phoneNumber || '0000000000',
                    vaiTro: 'nguoi_thue',
                    trangThai: 'hoat_dong',
                };
                const dataSignup = await createUser(credentials);
                await dispatch(register({
                    ...dataSignup.data.data,
                    xacNhanMatKhau: passwordHash
                })).unwrap();
            }
            const url = searchParams.get('from') || '/';
            navigate(url);
            toast.success('Đăng nhập thành công');
        } catch (error) {
            if (error instanceof Error) {
                switch (error.message) {
                    case 'auth/account-exists-with-different-credential':
                        toast.error('Email này đã liên kết với phương thức đăng nhập khác');
                        break;
                    case 'auth/popup-closed-by-user':
                        toast.error('Đã hủy đăng nhập');
                        break;
                    default:
                        toast.error('Đăng nhập thất bại');
                }
                return;
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <Button
                onClick={loginWithGoogle}
                disabled={!!isLoading}
                type="button"
                variant="outline"
                className="w-full cursor-pointer h-12 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:shadow-md"

            >
                <Chrome className="w-5 h-5 mr-2 text-red-500" />

                {isLoading ? 'Loading...' : ' Đăng nhập bằng google'}
            </Button>
        </div>
    );
}