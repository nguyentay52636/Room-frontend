
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

import {

    Users,
    UserCheck,
    UserX,
    Crown,
    Calendar,

} from "lucide-react"
import PaginationManagerEmployee from "./components/PaginationManagerEmployee"
import ManagerEmployeeHeader from "./components/ManagerEmployeeHeader"
import ManagerEmployeeCards from "./components/ManagerEmployeeCards"
import ManagerEmployeeTable from "./components/ManagerEmployeeTable"
import { getEmployees } from "@/lib/apis/employeeApi"
import { Employee } from "@/lib/apis/types"
import ReloadError from "./components/ReloadError"
export default function ManagerEmployeeContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)

    const [selectedStaff, setSelectedStaff] = useState(null)

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
    }, [employees])

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Filter employees based on search query
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


    const getPositionLabel = (position: string) => {
        switch (position?.toLowerCase()) {
            case "quan ly":
            case "manager":
                return "Quản lý"
            case "nhan_vien":
            case "staff":
                return "Nhân viên"
            case "admin":
            case "quan_tri_vien":
                return "Quản trị viên"
            default:
                return position || "N/A"
        }
    }

    const getDepartmentLabel = (department: string) => {
        switch (department?.toLowerCase()) {
            case "sales":
            case "sale":
                return "Kinh doanh"
            case "support":
                return "Hỗ trợ khách hàng"
            case "tech":
            case "technical":
                return "Kỹ thuật"
            case "admin":
                return "Quản trị"
            default:
                return department || "N/A"
        }
    }


    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case "dang_hoat_dong":
            case "active":
                return (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Đang làm việc
                    </Badge>
                )
            case "nghi_phep":
            case "onleave":
                return (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Nghỉ phép
                    </Badge>
                )
            case "da_nghi_viec":
            case "inactive":
                return (
                    <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm">
                        <UserX className="h-3 w-3 mr-1" />
                        Đã nghỉ việc
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status || "N/A"}</Badge>
        }
    }
    const getPositionIcon = (position: string) => {
        switch (position?.toLowerCase()) {
            case "admin":
            case "quan_tri_vien":
                return <Crown className="h-4 w-4 text-purple-600" />
            case "quan ly":
            case "manager":
                return <Users className="h-4 w-4 text-blue-600" />
            default:
                return <UserCheck className="h-4 w-4 text-green-600" />
        }
    }





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
                        <ManagerEmployeeCards />
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
