import React from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import { Edit, User, Settings, LogOut } from 'lucide-react'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { TooltipContent } from '@/components/ui/tooltip'
export default function UserProfileAppSider({ isCollapsed, isMobile, setIsProfileDialogOpen }: { isCollapsed: any, isMobile: any, setIsProfileDialogOpen: any }) {
    return (
        <div className="flex items-center">
            {isCollapsed && !isMobile ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-full h-10">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                            <AvatarFallback className="bg-emerald-600 text-white text-xs">AD</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">Quản trị viên</p>
                                            <p className="text-xs text-gray-500">admin@newlife.vn</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        <span>Chỉnh sửa hồ sơ</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Tài khoản</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Cài đặt</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Đăng xuất</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-gray-900 text-white">
                            <div>
                                <p className="font-medium">Quản trị viên</p>
                                <p className="text-xs opacity-75">admin@newlife.vn</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="bg-emerald-600 text-white">AD</AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900">Quản trị viên</p>
                                    <p className="text-xs text-gray-500">admin@newlife.vn</p>
                                </div>
                            )}
                            {!isCollapsed && <ChevronRight className="h-4 w-4 text-gray-400" />}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">Quản trị viên</p>
                                <p className="text-xs text-gray-500">admin@newlife.vn</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa hồ sơ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Tài khoản</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Cài đặt</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
