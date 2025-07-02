import { CardContent } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import React from 'react'

export default function SafetyTipsSiderMainContentCardProductDetails() {
    return (
        <>
            <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                    <CardTitle className="text-yellow-800 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Lưu ý an toàn
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-yellow-700">
                    <ul className="space-y-1">
                        <li>• Luôn xem nhà trực tiếp trước khi thuê</li>
                        <li>• Không chuyển tiền trước khi ký hợp đồng</li>
                        <li>• Kiểm tra giấy tờ pháp lý của chủ nhà</li>
                        <li>• Báo cáo nếu phát hiện thông tin sai lệch</li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}
