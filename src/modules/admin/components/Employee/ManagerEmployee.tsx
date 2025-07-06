import React from 'react'
import { PaginationProvider } from '../../context/PaginationContext'
import ManagerEmployeeContent from './ManagerEmployeeContent'

export default function ManagerEmployee() {
    return (
        <PaginationProvider>
            <ManagerEmployeeContent />
        </PaginationProvider>
    )
}
