import { Badge } from "@/components/ui/badge"
import { DollarSign } from "lucide-react"
import { Customer } from "@/lib/apis/types"
import { Star } from "lucide-react"
import { UserCheck, Users } from "lucide-react"
import { formatCurrency } from "../Dialog/utils/customerUtils"


export const getStatusBadge = (status: string) => {
    switch (status) {
        case "active":
            return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoạt động</Badge>
        case "inactive":
            return <Badge variant="secondary">Không hoạt động</Badge>
        case "pending":
            return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ duyệt</Badge>
        case "blocked":
            return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Bị khóa</Badge>
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export const getTypeBadge = (type: string) => {
    switch (type) {
        case "premium":
            return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Premium</Badge>
        case "regular":
            return <Badge variant="outline">Thường</Badge>
        case "new":
            return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Mới</Badge>
        default:
            return <Badge variant="outline">{type}</Badge>
    }
}
export const stats = (customers: Customer[]) => [
    {
        title: "Tổng khách hàng",
        value: customers.length.toString(),
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
        title: "Đang hoạt động",
        value: customers.filter((c) => c.loai === "active").length.toString(),
        icon: UserCheck,
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
        title: "Khách hàng Premium",
        value: customers.filter((c) => c.loai === "premium").length.toString(),
        icon: Star,
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
        title: "Tổng doanh thu",
        value: formatCurrency(customers.reduce((sum, c) => sum + c.tongChiTieu, 0)),
        icon: DollarSign,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-950",
    },
]