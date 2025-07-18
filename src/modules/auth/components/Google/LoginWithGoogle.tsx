
import {

    signInWithPopup,
} from 'firebase/auth';
import CryptoJS from 'crypto-js';


import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, provider } from '../../../../config/firebase.config';

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


            provider.setCustomParameters({
                prompt: 'select_account',
                access_type: 'offline'
            });

            const data = await signInWithPopup(auth, provider);
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
                    soDienThoai: data.user.phoneNumber || '',
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
            console.error('Google Sign-In Error:', error);

            // Add more detailed error logging
            if (error instanceof Error) {
                console.error('Error details:', {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                });
            }

            if (error instanceof Error) {
                // Enhanced error handling for Firebase Auth errors
                switch (error.message) {
                    case 'auth/configuration-not-found':
                    case 'auth/invalid-api-key':
                        toast.error('Cấu hình Google Sign-In chưa đúng. Vui lòng liên hệ quản trị viên.');
                        console.error('Firebase Auth Configuration Error: Google Sign-In not properly configured in Firebase Console');
                        console.error('Solution: Go to Firebase Console > Authentication > Sign-in method > Enable Google provider');
                        break;
                    case 'auth/account-exists-with-different-credential':
                        toast.error('Email này đã liên kết với phương thức đăng nhập khác');
                        break;
                    case 'auth/popup-closed-by-user':
                        toast.error('Đã hủy đăng nhập');
                        break;
                    case 'auth/unauthorized-domain':
                        toast.error('Domain chưa được ủy quyền. Vui lòng liên hệ quản trị viên.');
                        break;
                    default:
                        toast.error('Đăng nhập thất bại: ' + error.message);
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