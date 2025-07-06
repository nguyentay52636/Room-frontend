import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"

export default function StatsCardManagerCustomers({ stats }: { stats: any[] }) {
    return (
        <div className="grid cursor-pointer grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <Card key={index} className="group  cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
