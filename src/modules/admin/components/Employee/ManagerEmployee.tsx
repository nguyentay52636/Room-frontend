
import { useState } from "react"
import { Badge } from "@/components/ui/badge"


import {

    Users,
    UserCheck,
    UserX,
    Crown,
    Calendar,

} from "lucide-react"
import PaginationManagerEmployee from "./components/PaginationManagerEmployee"
import { DialogAddEmployee } from "./components/Dialog/DialogAddEmployee"
import ManagerEmployeeHeader from "./components/ManagerEmployeeHeader"
import ManagerEmployeeCards from "./components/ManagerEmployeeCards"
import ManagerEmployeeTable from "./components/ManagerEmployeeTable"
import { staff } from "./components/data/employee"

export default function ManagerEmployee() {
    const [searchQuery, setSearchQuery] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add")
    const [selectedStaff, setSelectedStaff] = useState(null)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)



    const getPositionLabel = (position: string) => {
        switch (position) {
            case "manager":
                return "Quản lý"
            case "staff":
                return "Nhân viên"
            case "admin":
                return "Quản trị viên"
            default:
                return position
        }
    }

    const getDepartmentLabel = (department: string) => {
        switch (department) {
            case "sales":
                return "Kinh doanh"
            case "support":
                return "Hỗ trợ khách hàng"
            case "tech":
                return "Kỹ thuật"
            case "admin":
                return "Quản trị"
            default:
                return department
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Đang làm việc
                    </Badge>
                )
            case "onleave":
                return (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Nghỉ phép
                    </Badge>
                )
            case "inactive":
                return (
                    <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm">
                        <UserX className="h-3 w-3 mr-1" />
                        Đã nghỉ việc
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getPositionIcon = (position: string) => {
        switch (position) {
            case "admin":
                return <Crown className="h-4 w-4 text-purple-600" />
            case "manager":
                return <Users className="h-4 w-4 text-blue-600" />
            default:
                return <UserCheck className="h-4 w-4 text-green-600" />
        }
    }

    const handleAddStaff = () => {
        console.log("Add staff button clicked")
        setDialogMode("add")
        setSelectedStaff(null)
        setDialogOpen(true)
        console.log("Dialog state:", { dialogOpen: true, dialogMode: "add" })
    }

    const handleEditStaff = (staff: any) => {
        setDialogMode("edit")
        setSelectedStaff(staff)
        setDialogOpen(true)
    }

    const handleViewStaff = (staff: any) => {
        setDialogMode("view")
        setSelectedStaff(staff)
        setDialogOpen(true)
    }

    const handleDeleteStaff = (id: number) => {
        if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            console.log("Deleting staff:", id)
        }
    }

    // Pagination handlers
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1) // Reset to first page when changing rows per page
    }

    const filteredStaff = staff.filter(
        (person) =>
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.phone.includes(searchQuery),
    )

    // Calculate pagination
    const totalItems = filteredStaff.length
    const totalPages = Math.ceil(totalItems / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedStaff = filteredStaff.slice(startIndex, endIndex)

    // Debug dialog state
    console.log("Rendering DialogAddEmployee with props:", { dialogOpen, selectedStaff, dialogMode })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="p-6 space-y-8">

                <ManagerEmployeeHeader handleAddStaff={handleAddStaff} />
                <ManagerEmployeeCards />
                <ManagerEmployeeTable
                    filteredStaff={filteredStaff}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleViewStaff={handleViewStaff}
                    handleEditStaff={handleEditStaff}
                    handleDeleteStaff={handleDeleteStaff}
                    paginatedStaff={paginatedStaff}
                    getPositionIcon={getPositionIcon}
                    getPositionLabel={getPositionLabel}
                    getDepartmentLabel={getDepartmentLabel}
                    getStatusBadge={getStatusBadge}
                />
                <PaginationManagerEmployee
                    currentPage={currentPage}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    totalItems={totalItems}
                />
            </div>

            <DialogAddEmployee
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                staff={selectedStaff}
                mode={dialogMode}
            />
        </div>
    )
}
