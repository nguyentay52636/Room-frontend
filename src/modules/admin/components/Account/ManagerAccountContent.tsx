

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { DialogAddManagerAccounts } from "./components/DialogAddManagerAccounts"
import {

    Shield,
    ShieldCheck,
    User as UserIcon,
    Users,
    Crown,

    Activity,
} from "lucide-react"
import HeaderManagerAccount from "./components/HeaderManagerAccount";
import StatsCardManagerAccount from "./components/StatsCardManagerAccount"
import FilterSearchManagerAccount from "./components/Dialog/components/TableManagerAccounts/FilterSearchManagerAccount"
import TableManagerAccount from "./components/Dialog/components/TableManagerAccounts/TableManagerAccount"
import PaginationManagerAccounts from "./components/PaginationManagerAccounts"
import { usePagination } from "../../context/PaginationContext"
import { getUsers } from "@/lib/apis/userApi"
import { IUser } from "@/lib/apis/types"



export default function ManagerAccountContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">("view")
    const { paginationState } = usePagination();
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await getUsers()
                console.log(response)
                setUsers(response || [])

            } catch (error: any) {
                console.error("Error fetching users:", error)
                setError(error.message || "Failed to fetch users")
                setUsers([])
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const filteredAccounts = (users || []).filter((account: any) => {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
            account.ten?.toLowerCase().includes(searchLower) ||
            account.email?.toLowerCase().includes(searchLower) ||
            account.soDienThoai?.includes(searchTerm) ||
            false

        const matchesStatus = statusFilter === "all" || account.trangThai === statusFilter
        const vaiTroValue = typeof account.vaiTro === 'object' ? account.vaiTro?.ten : account.vaiTro
        const matchesRole = roleFilter === "all" || vaiTroValue === roleFilter

        return matchesSearch && matchesStatus && matchesRole
    })

    const getRoleIcon = (role: string) => {
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

    const getRoleName = (role: string) => {
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

    const getStatusBadge = (status: string) => {
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

    const handleAddAccount = () => {
        setSelectedAccount(null)
        setDialogMode("create")
        setIsDialogOpen(true)
    }

    const handleEditAccount = (account: any) => {
        setSelectedAccount(account)
        setDialogMode("edit")
        setIsDialogOpen(true)
    }

    const handleViewAccount = (account: any) => {
        setSelectedAccount(account)
        setDialogMode("view")
        setIsDialogOpen(true)
    }

    const stats = [
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

    if (loading) {
        return (
            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-500">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">Lỗi: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <HeaderManagerAccount handleAddAccount={handleAddAccount} />

            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatsCardManagerAccount key={index} stat={stat} index={index} />
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách tài khoản</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FilterSearchManagerAccount
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            roleFilter={roleFilter}
                            setRoleFilter={setRoleFilter}
                        />
                        <TableManagerAccount filteredAccounts={filteredAccounts} getRoleIcon={getRoleIcon} getRoleName={getRoleName} getStatusBadge={getStatusBadge} handleViewAccount={handleViewAccount} handleEditAccount={handleEditAccount} />
                        {filteredAccounts.length === 0 && (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Không tìm thấy tài khoản nào</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <PaginationManagerAccounts totalItems={filteredAccounts.length} />
            </div>

            <DialogAddManagerAccounts account={selectedAccount} open={isDialogOpen} onOpenChange={setIsDialogOpen} mode={dialogMode} />
        </>
    )
}


