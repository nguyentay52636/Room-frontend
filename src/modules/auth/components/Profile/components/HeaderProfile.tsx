import { Button } from '@/components/ui/button'
import React from 'react'

export default function HeaderProfile() {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" className="text-gray-600">
                    ← Quay lại
                </Button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Hồ sơ cá nhân
                </h1>
            </div>
        </div>
    )
}
