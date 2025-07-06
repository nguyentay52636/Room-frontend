import React from 'react'
import { PaginationProvider } from '../../context/PaginationContext'
import ManagerCustomersContent from './ManagerCustomersContent'
export default function ManagerCustomers() {
    return (
        <PaginationProvider>
            <ManagerCustomersContent />
        </PaginationProvider>
    )
}
