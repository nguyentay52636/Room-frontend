import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export default function CardItemReviewsManager({ index, stat }: { index: number, stat: any }) {
    return (
        <>
            <Card
                key={index}
                className={`${stat.bgColor} dark:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl border-0 group overflow-hidden relative`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="text-xl">{stat.emoji}</span>
                        {stat.title}
                    </CardTitle>
                    <stat.icon
                        className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div className={`text-3xl font-bold ${stat.color} dark:text-gray-100`}>{stat.value}</div>
                        <div
                            className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full font-medium ${stat.changeType === "increase"
                                ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900"
                                : "text-red-600 bg-red-100 dark:bg-red-900"
                                }`}
                        >
                            <TrendingUp className="h-3 w-3" />
                            {stat.change}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
