import { Activity, Crown, Shield, ShieldCheck, UserIcon, Users, } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/lib/apis/types";
export const getRoleIcon = (role: string) => {
    switch (role) {
        case "admin":
            return <Crown className="h-4 w-4 text-yellow-500" />
        case "manager":
            return <ShieldCheck className="h-4 w-4 text-blue-500" />
        case "nhan_vien":
            return <Shield className="h-4 w-4 text-green-500" />
        case "chu_tro":
            return <UserIcon className="h-4 w-4 text-purple-500" />
        case "nguoi_thue":
            return <Users className="h-4 w-4 text-gray-500" />
        default:
            return <UserIcon className="h-4 w-4" />
    }
}

export const getRoleName = (role: string) => {
    switch (role) {
        case "admin":
            return "Quản trị viên"
        case "manager":
            return "Quản lý"
        case "nhan_vien":
            return "Nhân viên"
        case "chu_tro":
            return "Chủ nhà"
        case "nguoi_thue":
            return "Người thuê"
        default:
            return role
    }
}

export const getStatusBadge = (status: string) => {
    switch (status) {
        case "hoat_dong":
            return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoạt động</Badge>
        case "khoa":
            return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Tạm khóa</Badge>
        case "inactive":
            return <Badge variant="secondary">Không hoạt động</Badge>
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export const stats = (users: IUser[]) => [
    {
        title: "Tổng tài khoản",
        value: (users || []).length.toString(),
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
        title: "Đang hoạt động",
        value: (users || []).filter((a) => a.trangThai === "hoat_dong").length.toString(),
        icon: Activity,
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
        title: "Quản trị viên",
        value: (users || []).filter((a) => {
            const vaiTroValue = typeof a.vaiTro === 'object' ? a.vaiTro?.ten : a.vaiTro
            return vaiTroValue === "admin"
        }).length.toString(),
        icon: Crown,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
        title: "Chủ nhà",
        value: (users || []).filter((a) => {
            const vaiTroValue = typeof a.vaiTro === 'object' ? a.vaiTro?.ten : a.vaiTro
            return vaiTroValue === "chu_tro"
        }).length.toString(),
        icon: UserIcon,
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-950",
    },
]
