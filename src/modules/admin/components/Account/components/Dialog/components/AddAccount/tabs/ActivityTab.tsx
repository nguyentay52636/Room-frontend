import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, LogIn, LogOut, Shield, User } from "lucide-react"

interface ActivityTabProps {
    account: Record<string, unknown> | null
}

export function ActivityTab({ account }: ActivityTabProps) {
    // Mock activity data - in real app, this would come from API
    const activities = [
        {
            id: 1,
            type: "login",
            description: "Đăng nhập thành công",
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            ip: "192.168.1.100",
            location: "Hà Nội, Việt Nam"
        },
        {
            id: 2,
            type: "logout",
            description: "Đăng xuất",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            ip: "192.168.1.100",
            location: "Hà Nội, Việt Nam"
        },
        {
            id: 3,
            type: "security",
            description: "Thay đổi mật khẩu",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            ip: "192.168.1.100",
            location: "Hà Nội, Việt Nam"
        },
        {
            id: 4,
            type: "login",
            description: "Đăng nhập thành công",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            ip: "192.168.1.100",
            location: "Hà Nội, Việt Nam"
        }
    ]

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "login":
                return <LogIn className="h-4 w-4 text-green-500" />
            case "logout":
                return <LogOut className="h-4 w-4 text-gray-500" />
            case "security":
                return <Shield className="h-4 w-4 text-blue-500" />
            default:
                return <User className="h-4 w-4 text-gray-500" />
        }
    }

    const getActivityBadge = (type: string) => {
        switch (type) {
            case "login":
                return <Badge variant="default" className="bg-green-100 text-green-800">Đăng nhập</Badge>
            case "logout":
                return <Badge variant="secondary">Đăng xuất</Badge>
            case "security":
                return <Badge variant="outline" className="border-blue-200 text-blue-800">Bảo mật</Badge>
            default:
                return <Badge variant="outline">Khác</Badge>
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lần đăng nhập cuối</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {account?.lastLogin
                                ? new Date(account.lastLogin as string).toLocaleDateString('vi-VN')
                                : "Chưa có"
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {account?.lastLogin
                                ? new Date(account.lastLogin as string).toLocaleTimeString('vi-VN')
                                : ""
                            }
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tổng số lần đăng nhập</CardTitle>
                        <LogIn className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            Trong 30 ngày qua
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Trạng thái</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <Badge variant="default" className="bg-green-100 text-green-800">
                                Hoạt động
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Tài khoản đang hoạt động
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Lịch sử hoạt động</h3>
                <div className="space-y-3">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                            <div className="flex-shrink-0 mt-1">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        {activity.description}
                                    </p>
                                    {getActivityBadge(activity.type)}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {activity.timestamp.toLocaleString('vi-VN')}
                                </p>
                                <p className="text-xs text-gray-400">
                                    IP: {activity.ip} • {activity.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 