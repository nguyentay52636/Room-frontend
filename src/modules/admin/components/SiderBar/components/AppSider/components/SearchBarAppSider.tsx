import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipContent } from '@/components/ui/tooltip'
export default function SearchBarAppSider({ isCollapsed, isMobile }: { isCollapsed: any, isMobile: any }) {
    return (
        <div className="px-4 py-2">
            {!isCollapsed && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                </div>
            )}
            {isCollapsed && !isMobile && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-full h-10">
                                <Search className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-gray-900 text-white">
                            <p>Tìm kiếm</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    )
}
