import { CardContent } from '@/components/ui/card'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Activity, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock } from 'lucide-react'

export default function RecentCustomerManagerHome({ recentActivities }: { recentActivities: any }) {
    return (
        <>
            <Card className="lg:col-span-2 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Activity className="h-4 w-4 text-white" />
                            </div>
                            <span>Hoạt động gần đây</span>
                        </CardTitle>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {recentActivities.map((activity: any) => (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer"
                            >
                                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {activity.title}
                                        </p>
                                        <div
                                            className={`p-1.5 rounded-lg ${activity.type === "success"
                                                ? "bg-green-100 dark:bg-green-900/30"
                                                : activity.type === "warning"
                                                    ? "bg-yellow-100 dark:bg-yellow-900/30"
                                                    : "bg-blue-100 dark:bg-blue-900/30"
                                                }`}
                                        >
                                            <activity.icon
                                                className={`h-3 w-3 ${activity.type === "success"
                                                    ? "text-green-600 dark:text-green-400"
                                                    : activity.type === "warning"
                                                        ? "text-yellow-600 dark:text-yellow-400"
                                                        : "text-blue-600 dark:text-blue-400"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.details}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {activity.time}
                                        </p>
                                        <span className="text-xs text-gray-400">bởi {activity.user}</span>
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
