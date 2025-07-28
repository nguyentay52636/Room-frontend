
import TableFormAccounts from './TableFormAccounts'
import { Card } from '@/components/ui/card'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import PaginationManagerAccounts from '../../../PaginationManagerAccounts'

export default function TableManagerAccount({ filteredAccounts, getRoleIcon, getRoleName, getStatusBadge, handleViewAccount, handleEditAccount }: { filteredAccounts: any, getRoleIcon: any, getRoleName: any, getStatusBadge: any, handleViewAccount: any, handleEditAccount: any }) {
    return (
        <div className="rounded-md border overflow-hidden">
            <Card>
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-lg sm:text-xl">Danh sách tài khoản</CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <TableFormAccounts
                                filteredAccounts={filteredAccounts}
                                getRoleIcon={getRoleIcon}
                                getRoleName={getRoleName}
                                getStatusBadge={getStatusBadge}
                                handleViewAccount={handleViewAccount}
                                handleEditAccount={handleEditAccount}
                            />
                        </div>
                    </div>
                    {filteredAccounts.length === 0 && (
                        <div className="text-center py-8 px-4">
                            <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-sm sm:text-base text-gray-500">Không tìm thấy tài khoản nào</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <div className="px-4 sm:px-6 py-4">
                <PaginationManagerAccounts totalItems={filteredAccounts.length} />
            </div>
        </div>
    )
}
