import React from 'react'
import CardCustomerMoodStatus from './Card/CardCustomerMoodStatus'
import CardCustomerInfo from './Card/CardCustomerInfo'
import CardProjectDetails from './Card/CardProjectDetails'
import CardQuickActions from './Card/CardQuickActions'
import { ScrollArea } from '@radix-ui/react-scroll-area'
export default function CardScrollRight({ selectedChat }: { selectedChat: any }) {
    return (
        <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                    {/* Customer Mood & Status */}
                    <CardCustomerMoodStatus selectedChat={selectedChat} />

                    {/* Customer Info */}
                    <CardCustomerInfo selectedChat={selectedChat} />

                    {/* Project Details */}
                    <CardProjectDetails selectedChat={selectedChat} />

                    {/* Quick Actions */}
                    <CardQuickActions />

                    {/* Chat Stats */}

                </div>
            </ScrollArea>
        </div>
    )
}
