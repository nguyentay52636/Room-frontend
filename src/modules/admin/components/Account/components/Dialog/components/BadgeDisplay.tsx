import { Badge } from "@/components/ui/badge"

interface BadgeDisplayProps {
    role: string
    status: string
}

export function BadgeDisplay({ role, status }: BadgeDisplayProps) {
    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-100 text-red-800">Admin</Badge>
            case "manager":
                return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>
            case "staff":
                return <Badge className="bg-green-100 text-green-800">Staff</Badge>
            case "owner":
                return <Badge className="bg-purple-100 text-purple-800">Owner</Badge>
            case "customer":
                return <Badge className="bg-gray-100 text-gray-800">Customer</Badge>
            default:
                return <Badge>{role}</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
            case "inactive":
                return <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>
            case "suspended":
                return <Badge className="bg-red-100 text-red-800">Tạm khóa</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="flex items-center space-x-2">
            {getRoleBadge(role)}
            {getStatusBadge(status)}
        </div>
    )
} 