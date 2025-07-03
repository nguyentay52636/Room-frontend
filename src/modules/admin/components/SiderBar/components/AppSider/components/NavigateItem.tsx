import { Badge } from '@/components/ui/badge';
import React from 'react'
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
export const NavigateItem = ({ item, isCollapsed, isMobile, setIsMobileOpen }: { item: any, isCollapsed: any, isMobile: any, setIsMobileOpen: any }) => {
    const content = (
        <Link
            to={item.href}
            onClick={() => isMobile && setIsMobileOpen(false)}
            className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
          ${item.current
                    ? "bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }
          ${isCollapsed && !isMobile ? "justify-center px-2" : ""}
        `}
        >
            <item.icon className={`${isCollapsed && !isMobile ? "h-5 w-5" : "h-5 w-5"} flex-shrink-0`} />
            {!isCollapsed && (
                <>
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                        <Badge className="ml-auto bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {item.badge}
                        </Badge>
                    )}
                </>
            )}
            {item.current && !isCollapsed && (
                <div className="absolute right-2">
                    <ChevronRight className="h-4 w-4 text-emerald-600" />
                </div>
            )}
        </Link>
    )

    if (isCollapsed && !isMobile) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 text-white">
                        <p>{item.name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return content
}