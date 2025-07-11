import { UserX } from 'lucide-react'
import React from 'react'

export default function ReloadError({ error }: { error: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="p-6 space-y-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="text-red-600 mb-4">
                            <UserX className="h-12 w-12 mx-auto" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
