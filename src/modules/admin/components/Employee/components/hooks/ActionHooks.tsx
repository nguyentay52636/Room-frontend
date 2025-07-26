import { UserCheck, Calendar, UserX, Crown, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export const getPositionLabel = (position: string) => {
    switch (position?.toLowerCase()) {
        case "quan ly":
        case "manager":
            return "Quản lý"
        case "nhan_vien":
        case "staff":
            return "Nhân viên"
        case "admin":
        case "quan_tri_vien":
            return "Quản trị viên"
        default:
            return position || "N/A"
    }
}

export const getDepartmentLabel = (department: string) => {
    switch (department?.toLowerCase()) {
        case "sales":
        case "sale":
            return "Kinh doanh"
        case "support":
            return "Hỗ trợ khách hàng"
        case "tech":
        case "technical":
            return "Kỹ thuật"
        case "admin":
            return "Quản trị"
        default:
            return department || "N/A"
    }
}


export const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
        case "dang_hoat_dong":
        case "active":
            return (
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Đang làm việc
                </Badge>
            )
        case "nghi_phep":
        case "onleave":
            return (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    Nghỉ phép
                </Badge>
            )
        case "da_nghi_viec":
        case "inactive":
            return (
                <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm">
                    <UserX className="h-3 w-3 mr-1" />
                    Đã nghỉ việc
                </Badge>
            )
        default:
            return <Badge variant="secondary">{status || "N/A"}</Badge>
    }
}
export const getPositionIcon = (position: string) => {
    switch (position?.toLowerCase()) {
        case "admin":
        case "quan_tri_vien":
            return <Crown className="h-4 w-4 text-purple-600" />
        case "quan ly":
        case "manager":
            return <Users className="h-4 w-4 text-blue-600" />
        default:
            return <UserCheck className="h-4 w-4 text-green-600" />
    }
}