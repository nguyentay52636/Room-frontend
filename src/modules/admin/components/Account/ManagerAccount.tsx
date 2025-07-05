

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { DialogAddManagerAccounts } from "./components/DialogAddManagerAccounts"
import {

    Shield,
    ShieldCheck,
    User,
    Users,
    Crown,
 
    Activity,
} from "lucide-react"
import HeaderManagerAccount from "./components/HeaderManagerAccount";
import StatsCardManagerAccount from "./components/StatsCardManagerAccount"
import FilterSearchManagerAccount from "./components/FilterSearchManagerAccount"
import TableManagerAccount from "./components/TableManagerAccount"
import { accounts } from "./Data/AccountsData"
export default function ManagerAccount() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">("view")



    const filteredAccounts = accounts.filter((account) => {
        const matchesSearch =
            account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.phone.includes(searchTerm)

        const matchesStatus = statusFilter === "all" || account.status === statusFilter
        const matchesRole = roleFilter === "all" || account.role === roleFilter

        return matchesSearch && matchesStatus && matchesRole
    })

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "admin":
                return <Crown className="h-4 w-4 text-yellow-500" />
            case "manager":
                return <ShieldCheck className="h-4 w-4 text-blue-500" />
            case "staff":
                return <Shield className="h-4 w-4 text-green-500" />
            case "owner":
                return <User className="h-4 w-4 text-purple-500" />
            case "customer":
                return <Users className="h-4 w-4 text-gray-500" />
            default:
                return <User className="h-4 w-4" />
        }
    }

    const getRoleName = (role: string) => {
        switch (role) {
            case "admin":
                return "Quản trị viên"
            case "manager":
                return "Quản lý"
            case "staff":
                return "Nhân viên"
            case "owner":
                return "Chủ nhà"
            case "customer":
                return "Khách hàng"
            default:
                return role
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoạt động</Badge>
            case "inactive":
                return <Badge variant="secondary">Không hoạt động</Badge>
            case "suspended":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Tạm khóa</Badge>
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
            value: accounts.length.toString(),
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-950",
        },
        {
            title: "Đang hoạt động",
            value: accounts.filter((a) => a.status === "active").length.toString(),
            icon: Activity,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-950",
        },
        {
            title: "Quản trị viên",
            value: accounts.filter((a) => a.role === "admin").length.toString(),
            icon: Crown,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50 dark:bg-yellow-950",
        },
        {
            title: "Chủ nhà",
            value: accounts.filter((a) => a.role === "owner").length.toString(),
            icon: User,
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-950",
        },
    ]

    return (
        <>

            <HeaderManagerAccount handleAddAccount={handleAddAccount} />

            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatsCardManagerAccount stat={stat} index={index} />
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách tài khoản</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FilterSearchManagerAccount />
                        <TableManagerAccount filteredAccounts={filteredAccounts} getRoleIcon={getRoleIcon} getRoleName={getRoleName} getStatusBadge={getStatusBadge} handleViewAccount={handleViewAccount} handleEditAccount={handleEditAccount} />
                        {filteredAccounts.length === 0 && (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Không tìm thấy tài khoản nào</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <DialogAddManagerAccounts account={selectedAccount} open={isDialogOpen} onOpenChange={setIsDialogOpen} mode={dialogMode} />


        </>
    )
}
