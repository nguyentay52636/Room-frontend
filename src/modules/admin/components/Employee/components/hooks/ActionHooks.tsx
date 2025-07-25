import { Badge } from "@/components/ui/badge"
import { Calendar, UserCheck, UserX } from "lucide-react"

export const getPositionLabel = (position: string) => {
    switch (position) {
        case "admin":
            return "Quản lý"
        case "nhan_vien":
            return "Nhân viên"
        case "admin":
            return "Quản trị viên"
        default:
            return position
    }
}

export const getDepartmentLabel = (department: string) => {
    switch (department) {
        case "sales":
            return "Kinh doanh"
        case "support":
            return "Hỗ trợ khách hàng"
        case "tech":
            return "Kỹ thuật"
        case "admin":
            return "Quản trị"
        default:
            return department
    }
}

export const getStatusBadge = (status: string) => {
    switch (status) {
        case "dang_hoat_dong":
            return (
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Đang làm việc
                </Badge>
            )
        case "onleave":
            return (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    Nghỉ phép
                </Badge>
            )
        case "inactive":
            return (
                <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm">
                    <UserX className="h-3 w-3 mr-1" />
                    Đã nghỉ việc
                </Badge>
            )
        default:
            return <Badge variant="secondary">{status}</Badge>
    }
}