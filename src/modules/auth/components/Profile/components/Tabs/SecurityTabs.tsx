import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, FileText } from 'lucide-react'
import { Phone } from 'lucide-react'
import { Shield } from 'lucide-react'
import React from 'react'

export default function SecurityTabs() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Bảo mật tài khoản</CardTitle>
                    <CardDescription>Quản lý bảo mật và quyền riêng tư</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Shield className="w-4 h-4 mr-2" />
                        Đổi mật khẩu
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Phone className="w-4 h-4 mr-2" />
                        Xác thực 2 bước
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                        <FileText className="w-4 h-4 mr-2" />
                        Tải xuống dữ liệu cá nhân
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Xóa tài khoản
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}
