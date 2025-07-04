import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function EnhancedStatsItem({ stat, index }: { stat: any, index: number }) {
    return (
        <>
            <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden"
            >
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                            <div className="flex items-center space-x-2">
                                <p
                                    className={`text-sm flex items-center ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                                >
                                    {stat.changeType === "positive" ? (
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                    ) : (
                                        <ArrowDownRight className="h-3 w-3 mr-1" />
                                    )}
                                    {stat.change}
                                </p>
                                <span className="text-xs text-gray-500">từ tháng trước</span>
                            </div>
                        </div>
                        <div
                            className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                        >
                            <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                            <span>Tiến độ</span>
                            <span>
                                {Math.round((Number.parseInt(stat.value.replace(/[^\d]/g, "")) / stat.target) * 100)}%
                            </span>
                        </div>
                        <Progress
                            value={(Number.parseInt(stat.value.replace(/[^\d]/g, "")) / stat.target) * 100}
                            className="h-2"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
