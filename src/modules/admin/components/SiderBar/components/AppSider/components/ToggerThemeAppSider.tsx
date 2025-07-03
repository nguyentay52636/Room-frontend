import { Moon } from 'lucide-react'
import { TooltipContent } from '@/components/ui/tooltip'
import { TooltipTrigger } from '@/components/ui/tooltip'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Sun } from 'lucide-react'

export default function ToggerThemeAppSider({ isCollapsed, isMobile }: { isCollapsed: any, isMobile: any }) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    return (
        <div className="flex items-center">
            {isCollapsed && !isMobile ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="w-full h-10"
                            >
                                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-gray-900 text-white">
                            <p>{isDarkMode ? "Chế độ sáng" : "Chế độ tối"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <Button
                    variant="ghost"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-full justify-start gap-3 px-3 py-2 h-auto"
                >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {!isCollapsed && <span className="text-sm">{isDarkMode ? "Chế độ sáng" : "Chế độ tối"}</span>}
                </Button>
            )}
        </div>
    )
}
