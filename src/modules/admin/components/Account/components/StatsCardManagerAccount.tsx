import { Card } from '@/components/ui/card'
import React from 'react'
import { CardContent } from '@/components/ui/card'

export default function StatsCardManagerAccount({ stat, index }: { stat: any, index: number }) {
    return (
        <>
            <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
