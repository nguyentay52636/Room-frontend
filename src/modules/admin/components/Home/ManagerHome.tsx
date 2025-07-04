

import { useState, useEffect } from "react"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import HeaderHomeManager from "./components/HeaderHomeManager"
import { quickStats, recentActivities, stats, topProperties } from "./components/Data/DataHomeAdmin"
import EnhancedWellcomeManagerHome from "./components/EnhancedWellcomeManagerHome"
import EnhancedStatsItem from "./components/Card/EnhancedStatsItem"
import RecentCustomerManagerHome from "./components/Card/RecentCustomerManagerHome"
import EnhancedQuickStatsManagerHome from "./components/Card/ EnhancedQuickStatsManagerHome"
import TopRealEstateManagerHome from "./components/Card/TopRealEstateManagerHome"

export default function ManagerHome() {

    const [timeRange, setTimeRange] = useState("7d")
    const [isLoading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState(12)
    const [currentTime, setCurrentTime] = useState(new Date())

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)
        return () => clearInterval(timer)
    }, [])

    const handleRefresh = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
    }



    return (
        <SidebarProvider>

            <SidebarInset>
                <HeaderHomeManager currentTime={currentTime} timeRange={timeRange} setTimeRange={setTimeRange} handleRefresh={handleRefresh} notifications={notifications} isLoading={isLoading} />

                <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                    <EnhancedWellcomeManagerHome currentTime={currentTime} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <EnhancedStatsItem key={index} stat={stat} index={index} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <RecentCustomerManagerHome recentActivities={recentActivities} />
                        <EnhancedQuickStatsManagerHome quickStats={quickStats} />
                    </div>

                    {/* New Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TopRealEstateManagerHome topProperties={topProperties} />

                        <RecentCustomerManagerHome recentActivities={recentActivities} />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
