
import { useEffect, useState } from "react"
import HeaderManagerCustomers from "./components/HeaderManagerCustomers"
import TableManagerCustomers from "./components/TableManagerCustomer/TableManagerCustomers"


export default function ManagerCustomersContent() {







    return (
        <>
            <HeaderManagerCustomers />

            <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                <TableManagerCustomers />
            </div>

        </>
    )
}
