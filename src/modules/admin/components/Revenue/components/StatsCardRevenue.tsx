import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCardRevenue({ revenueStats }: { revenueStats: any }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {revenueStats.map((stat: any, index: any) => (
                <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            {stat.changeType === "increase" ? (
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                            ) : (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={stat.changeType === "increase" ? "text-emerald-500" : "text-red-500"}>
                                {stat.change}
                            </span>
                            <span>{stat.description}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
