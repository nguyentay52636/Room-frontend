import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface ActivityTabProps {
    account: any
}

export function ActivityTab({ account }: ActivityTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Hoạt động gần đây</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {account ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-2xl font-bold">{account.loginCount}</div>
                                    <p className="text-sm text-muted-foreground">Lần đăng nhập</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-2xl font-bold">{account.properties}</div>
                                    <p className="text-sm text-muted-foreground">Bất động sản quản lý</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-2xl font-bold">98%</div>
                                    <p className="text-sm text-muted-foreground">Tỷ lệ hoạt động</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium">Lịch sử hoạt động</h4>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-muted-foreground">2 giờ trước</span>
                                    <span>Đăng nhập vào hệ thống</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-muted-foreground">1 ngày trước</span>
                                    <span>Cập nhật thông tin bất động sản</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span className="text-muted-foreground">3 ngày trước</span>
                                    <span>Thay đổi mật khẩu</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span className="text-muted-foreground">1 tuần trước</span>
                                    <span>Cập nhật thông tin cá nhân</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground">Tài khoản mới sẽ có thông tin hoạt động sau khi được tạo.</p>
                )}
            </CardContent>
        </Card>
    )
} 