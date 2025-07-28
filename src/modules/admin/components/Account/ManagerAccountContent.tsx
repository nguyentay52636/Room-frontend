

import { useEffect, useState } from "react"

import { AddAccountDialog } from "./components/Dialog/components/AddAccount/AddAccountDialog"

import HeaderManagerAccount from "./components/HeaderManagerAccount";
import StatsCardManagerAccount from "./components/StatsCardManagerAccount"
import TableManagerAccount from "./components/Dialog/components/TableManagerAccounts/TableManagerAccount"
import { getUsers } from "@/lib/apis/userApi"
import { IUser } from "@/lib/apis/types"
import { getRoleIcon, getRoleName, stats } from "./components/Dialog/components/AddAccount/hooks/ActionAccountHooks"
import { getStatusBadge } from "../Customer/components/hooks/ActionCustomerHooks"
import ErrorApi from "./components/Dialog/components/Error/ErrorApi";
import ErrorLoading from "./components/Dialog/components/Error/ErrorLoading";


export default function ManagerAccountContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const [selectedAccount, setSelectedAccount] = useState<IUser | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">("view")
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredAccounts = (users || []).filter((account: IUser) => {
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


    const handleAddAccount = () => {
        setSelectedAccount(null)
        setDialogMode("create")
        setIsDialogOpen(true)
    }

    const handleEditAccount = (account: IUser) => {
        setSelectedAccount(account)
        setDialogMode("edit")
        setIsDialogOpen(true)
    }

    const handleViewAccount = (account: IUser) => {
        setSelectedAccount(account)
        setDialogMode("view")
        setIsDialogOpen(true)
    }

    const handleSuccess = () => {
        // Refresh data after successful operation
        fetchUsers()
    }

    if (loading) {
        return (
            <ErrorLoading loading={loading} />
        )
    }

    if (error) {
        return (
            <ErrorApi error={error} />
        )
    }

    return (
        <>
            <HeaderManagerAccount handleAddAccount={handleAddAccount} />

            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats(users).map((stat: any, index: number) => (
                        <StatsCardManagerAccount key={index} stat={stat} index={index} />
                    ))}
                </div>
                <TableManagerAccount filteredAccounts={filteredAccounts} getRoleIcon={getRoleIcon} getRoleName={getRoleName} getStatusBadge={getStatusBadge} handleViewAccount={handleViewAccount} handleEditAccount={handleEditAccount} />

            </div>

            <AddAccountDialog
                account={selectedAccount}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={dialogMode}
                onSuccess={handleSuccess}
            />
        </>
    )
}


