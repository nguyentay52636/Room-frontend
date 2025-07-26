
import { useEffect, useState } from "react"

import PaginationManagerEmployee from "./components/PaginationManagerEmployee"
import ManagerEmployeeHeader from "./components/ManagerEmployeeHeader"
import ManagerEmployeeCards from "./components/ManagerEmployeeCards"
import ManagerEmployeeTable from "./components/ManagerEmployeeTable"
import { getEmployees } from "@/lib/apis/employeeApi"
import { Employee } from "@/lib/apis/types"
import ReloadError from "./components/ReloadError"
import { getPositionIcon, getStatusBadge, getPositionLabel, getDepartmentLabel } from "./components/hooks/ActionHooks"
export default function ManagerEmployeeContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [employees, setEmployees] = useState<Employee[]>([])
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees()
                console.log("API Response:", response)
                console.log("Employees data:", response.data)
                setEmployees(response.data)
                setError(null) // Clear any previous errors
            } catch (err) {
                console.error("Error fetching employees:", err)
                // Fix: Extract error message properly instead of storing error object
                const errorMessage = err instanceof Error ? err.message : "Failed to load employees";
                setError(errorMessage)
                setEmployees([])
            } finally {
                setLoading(false)
            }
        }
        fetchEmployees()
    }, [])
    const filteredEmployees = employees?.filter((employee) => {
        if (!searchQuery) return true

        const query = searchQuery.toLowerCase()
        const name = employee.nguoiDungId?.ten?.toLowerCase() || ""
        const email = employee.nguoiDungId?.email?.toLowerCase() || ""
        const phone = employee.nguoiDungId?.soDienThoai?.toLowerCase() || ""
        const position = getPositionLabel(employee.chucVu)?.toLowerCase() || ""
        const department = getDepartmentLabel(employee.phongBan)?.toLowerCase() || ""

        return name.includes(query) ||
            email.includes(query) ||
            phone.includes(query) ||
            position.includes(query) ||
            department.includes(query)
    }) || []








    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="p-6 space-y-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Đang tải danh sách nhân viên...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="p-6 space-y-8">

                <ManagerEmployeeHeader />

                {error ? (
                    <ReloadError error={error} />
                ) : (
                    <>
                        <ManagerEmployeeCards employees={employees} />
                        <ManagerEmployeeTable
                            filteredEmployees={filteredEmployees}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}


                            getPositionIcon={getPositionIcon}
                            getPositionLabel={getPositionLabel}
                            getDepartmentLabel={getDepartmentLabel}
                            getStatusBadge={getStatusBadge}
                        />
                        <PaginationManagerEmployee
                            totalItems={employees.length}

                        />

                    </>
                )}




            </div>

            {/* <DialogAddEmployee
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                staff={selectedStaff}
            
            /> */}
        </div>
    )
}
