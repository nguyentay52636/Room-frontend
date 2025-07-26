
import { useState } from 'react'
import TableFormAccounts from './TableFormAccounts'
import { Card } from '@/components/ui/card'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'

export default function TableManagerAccount({ filteredAccounts, getRoleIcon, getRoleName, getStatusBadge, handleViewAccount, handleEditAccount }: { filteredAccounts: any, getRoleIcon: any, getRoleName: any, getStatusBadge: any, handleViewAccount: any, handleEditAccount: any }) {
    const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({})

    const togglePasswordVisibility = (accountId: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [accountId]: !prev[accountId]
        }))
    }

    return (
        <div className="rounded-md border overflow-hidden">
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách tài khoản</CardTitle>
                </CardHeader>
                <CardContent>
                    <TableFormAccounts filteredAccounts={filteredAccounts} getRoleIcon={getRoleIcon} getRoleName={getRoleName} getStatusBadge={getStatusBadge} handleViewAccount={handleViewAccount} handleEditAccount={handleEditAccount} />
                    {filteredAccounts.length === 0 && (
                        <div className="text-center py-8">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Không tìm thấy tài khoản nào</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    )
}
