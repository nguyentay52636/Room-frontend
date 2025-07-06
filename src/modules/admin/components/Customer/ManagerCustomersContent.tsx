
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
    Plus,
    Users,
    DollarSign,
    UserCheck,
    Star,
} from "lucide-react"
import { customers } from "./components/Data/DataCustomer"
import StatsCardManagerCustomers from "./components/StatsCardManagerCustomers"
import TableManagerCustomers from "./components/TableManagerCustomers"
import FilterSearchManagerCustomer from "./components/FilterSearchManagerCustomer"
import PaginationManagerCustomer from "./components/PaginationManagerCustomer"

export default function ManagerCustomersContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">("view")



    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm) ||
            customer.address.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || customer.status === statusFilter
        const matchesType = typeFilter === "all" || customer.type === typeFilter

        return matchesSearch && matchesStatus && matchesType
    })

    const getStatusBadge = (status: string) => {
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

    const getTypeBadge = (type: string) => {
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

    const handleAddCustomer = () => {
        setSelectedCustomer(null)
        setDialogMode("create")
        setIsDialogOpen(true)
    }

    const handleEditCustomer = (customer: any) => {
        setSelectedCustomer(customer)
        setDialogMode("edit")
        setIsDialogOpen(true)
    }

    const handleViewCustomer = (customer: any) => {
        setSelectedCustomer(customer)
        setDialogMode("view")
        setIsDialogOpen(true)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const stats = [
        {
            title: "Tổng khách hàng",
            value: customers.length.toString(),
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-950",
        },
        {
            title: "Đang hoạt động",
            value: customers.filter((c) => c.status === "active").length.toString(),
            icon: UserCheck,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-950",
        },
        {
            title: "Khách hàng Premium",
            value: customers.filter((c) => c.type === "premium").length.toString(),
            icon: Star,
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-950",
        },
        {
            title: "Tổng doanh thu",
            value: formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0)),
            icon: DollarSign,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50 dark:bg-emerald-950",
        },
    ]

    return (
        <>
            <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
                <div className="flex h-16 items-center gap-2 px-4">

                    <div className="ml-auto">
                        <Button
                            onClick={handleAddCustomer}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm khách hàng
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                {/* Stats Cards */}
                <StatsCardManagerCustomers stats={stats} />
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách khách hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FilterSearchManagerCustomer searchTerm={searchTerm} statusFilter={statusFilter} typeFilter={typeFilter} setSearchTerm={setSearchTerm} setStatusFilter={setStatusFilter} setTypeFilter={setTypeFilter} />

                        {/* Customers Table - Scrollable */}
                        <TableManagerCustomers filteredCustomers={filteredCustomers} getTypeBadge={getTypeBadge} getStatusBadge={getStatusBadge} formatCurrency={formatCurrency} handleViewCustomer={handleViewCustomer} handleEditCustomer={handleEditCustomer} />

                        {filteredCustomers.length === 0 && (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Không tìm thấy khách hàng nào</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <PaginationManagerCustomer totalItems={filteredCustomers.length} />
            </div>


        </>
    )
}
