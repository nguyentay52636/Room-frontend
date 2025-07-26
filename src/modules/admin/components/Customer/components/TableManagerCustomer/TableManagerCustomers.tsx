import React, { useEffect, useState } from 'react'
import FilterSearchManagerCustomer from './FilterSearchManagerCustomer'
import { Customer } from '@/lib/apis/types'
import PaginationManagerCustomer from '../PaginationManagerCustomer'
import { CustomerViewDialog } from '../Dialog/CustomerViewDialog'
import { getCustomers, deleteCustomer } from '@/lib/apis/customerApi'
import TableFormCustomer from './TableFormCustomer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatsCardManagerCustomers from "./StatsCardManagerCustomers"
import { stats } from '../hooks/ActionCustomerHooks'
import { toast } from 'sonner'
import DialogConfirmDeleteCustomer from '../../../Employee/components/Dialog/DialogConfirmDeleteCustomer'
import { EditCustomerDialog } from '../Dialog/EditCustomer/EditCustomerDialog'

export default function TableManagerCustomers() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchCustomers = async () => {
        try {
            setLoading(true)
            const response = await getCustomers();
            setCustomers(response.customers);
        } catch (error: any) {
            toast.error('Lỗi khi tải danh sách khách hàng', {
                description: error.message,
                duration: 3000,
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    const handleUpdateSuccess = () => {
        fetchCustomers()
    }

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
        setIsUpdateDialogOpen(true)
    }

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setIsViewDialogOpen(true)
    }

    const handleDeleteCustomer = async (customer: Customer) => {
        setSelectedCustomer(customer)
        setIsDeleteDialogOpen(true);
    }

    const handleConfirmDelete = async () => {
        if (!selectedCustomer) return
        try {
            setIsDeleting(true)
            await deleteCustomer(selectedCustomer?._id as string)

            toast.success("Xóa khách hàng thành công!", {
                description: `Khách hàng: ${selectedCustomer?.nguoiDungId?.ten || ""}`,
                duration: 3000,
                position: 'top-center',
                style: { background: '#4CAF50', color: 'white', border: 'none' },
            });
            setIsDeleteDialogOpen(false);
            setSelectedCustomer(null);
            fetchCustomers() // Refresh the list after deletion
        } catch (error: any) {
            toast.error('Lỗi khi xóa khách hàng ❌', {
                description: 'Đã xảy ra lỗi. Vui lòng thử lại.',
                duration: 3000,
                position: 'top-center',
                style: { background: '#F44336', color: 'white', border: 'none' },
            });
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <StatsCardManagerCustomers stats={stats(customers)} />
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <FilterSearchManagerCustomer
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        typeFilter={typeFilter}
                        setSearchTerm={setSearchTerm}
                        setStatusFilter={setStatusFilter}
                        setTypeFilter={setTypeFilter}
                    />

                    <TableFormCustomer
                        filteredCustomers={filteredCustomers}
                        handleViewCustomer={handleViewCustomer}
                        handleEditCustomer={handleEditCustomer}
                        handleDeleteCustomer={handleDeleteCustomer}
                    />
                    <PaginationManagerCustomer totalItems={filteredCustomers.length} />

                    {/* View Dialog */}
                    <CustomerViewDialog
                        customer={selectedCustomer}
                        open={isViewDialogOpen}
                        onOpenChange={setIsViewDialogOpen}
                    />

                    {selectedCustomer && (
                        <EditCustomerDialog
                            open={isUpdateDialogOpen}
                            onOpenChange={setIsUpdateDialogOpen}
                            customer={selectedCustomer}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    )}

                    <DialogConfirmDeleteCustomer
                        isOpen={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        onConfirm={handleConfirmDelete}
                        isLoading={isDeleting}
                        customerName={selectedCustomer?.nguoiDungId?.ten || ""}
                    />
                </CardContent>
            </Card>
        </>
    )
}
