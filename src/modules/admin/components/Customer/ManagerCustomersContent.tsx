
import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
    Plus,
    Users,
    DollarSign,
    UserCheck,
    Star,
} from "lucide-react"

import StatsCardManagerCustomers from "./components/StatsCardManagerCustomers"
import TableManagerCustomers from "./components/TableManagerCustomers"
import FilterSearchManagerCustomer from "./components/FilterSearchManagerCustomer"
import PaginationManagerCustomer from "./components/PaginationManagerCustomer"
import HeaderManagerCustomers from "./components/HeaderManagerCustomers"
import { getCustomers } from "@/lib/apis/customerApi"
import { Customer } from "@/lib/apis/types"
import { CustomerViewDialog } from "./components/Dialog/CustomerViewDialog"
import { EditCustomerForm } from "./components/Dialog/EditCustomer/EditCustomerForm"
import { AddCustomerDialog } from "./components/Dialog/AddCustomer/AddCustomerDialog"
import { ICustomerResponse } from "@/lib/apis/responseApi"
export default function ManagerCustomersContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [customers, setCustomers] = useState<Customer[]>([])

    // Dialog states
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.customers);
                console.log(response.customers)
            } catch (error: any) {
                throw new Error(error.message)
            }
        }
        fetchCustomers()
    }, [])

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            (typeof customer.nguoiDungId === 'object' && customer.nguoiDungId?.ten?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof customer.nguoiDungId === 'object' && customer.nguoiDungId?.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof customer.nguoiDungId === 'object' && customer.nguoiDungId?.soDienThoai?.includes(searchTerm)) ||
            customer.diaChi.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || customer.loai === statusFilter
        const matchesType = typeFilter === "all" || customer.loai === typeFilter

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
        setIsCreateDialogOpen(true)
    }

    const handleEditCustomer = (customer: any) => {
        setSelectedCustomer(customer)
        setIsEditDialogOpen(true)
    }

    const handleViewCustomer = (customer: any) => {
        setSelectedCustomer(customer)
        setIsViewDialogOpen(true)
    }

    const handleCreateCustomer = (customerData: any) => {
        console.log("Creating customer:", customerData)
        // TODO: Implement API call to create customer
        // After successful creation, refresh the customers list
    }

    const handleUpdateCustomer = (customerData: any) => {
        console.log("Updating customer:", customerData)
        // TODO: Implement API call to update customer
        // After successful update, refresh the customers list
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

    return (
        <>
            <HeaderManagerCustomers />

            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <StatsCardManagerCustomers stats={stats} />
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách khách hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FilterSearchManagerCustomer searchTerm={searchTerm} statusFilter={statusFilter} typeFilter={typeFilter} setSearchTerm={setSearchTerm} setStatusFilter={setStatusFilter} setTypeFilter={setTypeFilter} />
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

            {/* View Dialog */}
            <CustomerViewDialog
                customer={selectedCustomer}
                open={isViewDialogOpen}
                onOpenChange={setIsViewDialogOpen}
            />

            {/* Edit Dialog */}
            <EditCustomerForm
                customer={selectedCustomer}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onSave={handleUpdateCustomer}
            />

            {/* Create Dialog */}
            <AddCustomerDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onCreate={handleCreateCustomer}
            />
        </>
    )
}
