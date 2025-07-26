import React, { useEffect, useState } from 'react'
import FilterSearchManagerCustomer from './FilterSearchManagerCustomer'
import { Customer } from '@/lib/apis/types'
import PaginationManagerCustomer from './PaginationManagerCustomer'
import { CustomerViewDialog } from './Dialog/CustomerViewDialog'
import { EditCustomerForm } from './Dialog/EditCustomer/EditCustomerForm'
import { getCustomers } from '@/lib/apis/customerApi'
import TableFormCustomer from './TableManagerCustomer/TableFormCustomer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatsCardManagerCustomers from "./StatsCardManagerCustomers"
import { stats } from './hooks/ActionCustomerHooks'
export default function TableManagerCustomers() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.customers);
                setLoading(false)
            } catch (error: any) {
                throw new Error(error.message)

            } finally {
                setLoading(false)
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



    const handleEditCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setIsEditDialogOpen(true)
    }

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setIsViewDialogOpen(true)
    }


    const handleUpdateCustomer = (customerData: Customer) => {
        console.log("Updating customer:", customerData)

    }

    const handleDeleteCustomer = (customer: Customer) => {
        console.log("Deleting customer:", customer)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }
    return (
        <>
            <StatsCardManagerCustomers stats={stats(customers)} />
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách khách hàng</CardTitle>
                </CardHeader>
                <CardContent>

                    <FilterSearchManagerCustomer searchTerm={searchTerm} statusFilter={statusFilter} typeFilter={typeFilter} setSearchTerm={setSearchTerm} setStatusFilter={setStatusFilter} setTypeFilter={setTypeFilter} />

                    <TableFormCustomer filteredCustomers={filteredCustomers} handleViewCustomer={handleViewCustomer} handleEditCustomer={handleEditCustomer} handleDeleteCustomer={handleDeleteCustomer} />
                    <PaginationManagerCustomer totalItems={filteredCustomers.length} />
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
                </CardContent>
            </Card>

        </>


    )
}
