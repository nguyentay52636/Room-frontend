import { Progress } from '@/components/ui/progress'
import { CardContent } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'

export default function EnhancedQuickStatsManagerHome({ quickStats }: { quickStats: any }) {
    return (
        <>
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <span>Thống kê nhanh</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {quickStats.map((stat: any, index: number) => (
                            <div
                                key={index}
                                className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{stat.title}</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                                        <span>{stat.subtitle}</span>
                                        <span>{stat.progress}%</span>
                                    </div>
                                    <Progress value={stat.progress} className="h-2" />
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 dark:text-gray-400">{stat.total}</span>
                                        <span className={`font-medium ${stat.color}`}>{stat.change}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
