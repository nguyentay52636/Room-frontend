import { Globe, LogOut, Plus, User } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { Bell } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { selectAuth } from '@/redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { logout } from '@/redux/slices/authSlice'

export default function ButtonSwitchHeader() {
    const { language, setLanguage, t } = useLanguage()
    const { isAuthenticated, user } = useSelector(selectAuth)
    const dispatch = useDispatch()

    return (
        <>
            {/* Create Post Button - Responsive */}
            <Link to="/create-post-news">
                <Button
                    size="sm"
                    className="hidden sm:flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:scale-105 bg-orange-600 hover:bg-orange-700 text-white h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm"
                >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden lg:inline">Đăng tin</span>
                </Button>
            </Link>

            {/* Chat Button - Responsive */}
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 px-0 relative transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-primary/10 rounded-full theme-transition"
                asChild
            >
                <Link to="/chat">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <Badge className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs bg-primary text-white flex items-center justify-center rounded-full border-1 sm:border-2 border-background theme-transition">
                        2
                    </Badge>
                </Link>
            </Button>

            {/* Language Switcher - Responsive */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 sm:h-8 sm:w-8 px-0 transition-all duration-300 hover:text-primary hover:scale-110 theme-transition"
                    >
                        <Globe className="h-3 h-3 sm:h-4 sm:w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="theme-transition">
                    <DropdownMenuItem onClick={() => setLanguage("vi")}>🇻🇳 Tiếng Việt</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle - Mobile optimized */}
            <div className="scale-90 sm:scale-100">
                <ModeToggle />
            </div>

            {/* Notifications - Responsive */}
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 px-0 relative transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-primary/10 rounded-full theme-transition"
            >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <Badge className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs bg-red-500 text-white flex items-center justify-center rounded-full border-1 sm:border-2 border-background theme-transition">
                    3
                </Badge>
            </Button>

            {!isAuthenticated ? (
                <>
                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full px-3 lg:px-6 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 border border-primary/20 theme-transition text-xs lg:text-sm h-8 lg:h-9"
                            asChild
                        >
                            <Link to="/auth/login">
                                <span className="hidden lg:inline">Đăng nhập</span>
                                <span className="lg:hidden">Đăng nhập</span>
                            </Link>
                        </Button>

                        <Button
                            size="sm"
                            className="rounded-full px-3 lg:px-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 theme-transition text-xs lg:text-sm h-8 lg:h-9"
                            asChild
                        >
                            <Link to="/auth/register">
                                <span className="hidden lg:inline">Đăng Ký</span>
                                <span className="lg:hidden">Đăng ký</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Auth Indicator */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 transition-all duration-300 hover:text-primary hover:scale-110 theme-transition"
                            asChild
                        >
                            <Link to="/auth/login">
                                <User className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='relative h-8 w-8 lg:h-10 lg:w-10 rounded-full p-0'>
                                    <Avatar className='cursor-pointer w-8 h-8 lg:w-10 lg:h-10'>
                                        <AvatarImage src={user?.anhDaiDien || 'https://github.com/shadcn.png'} />
                                        <AvatarFallback className="text-xs lg:text-sm">{user?.ten?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-64 lg:w-80 cursor-pointer' align='end' forceMount>
                                <div className="p-3 border-b border-gray-100">
                                    <p className="font-medium text-sm truncate">{user?.ten || 'Người dùng'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                                </div>
                                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer p-3'>
                                    <User className='h-4 w-4' />
                                    <Link to='/profile' className="flex-1">Chi tiết tài khoản</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className='flex items-center gap-2 text-red-600 cursor-pointer p-3'
                                    onClick={() => dispatch(logout())}
                                >
                                    <LogOut className='h-4 w-4' />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile User Avatar */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='relative h-8 w-8 rounded-full p-0'>
                                    <Avatar className='cursor-pointer w-8 h-8'>
                                        <AvatarImage src={user?.anhDaiDien || 'https://github.com/shadcn.png'} />
                                        <AvatarFallback className="text-xs">{user?.ten?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56 cursor-pointer' align='end' forceMount>
                                <div className="p-3 border-b border-gray-100">
                                    <p className="font-medium text-sm truncate">{user?.ten || 'Người dùng'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                                </div>
                                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer p-3'>
                                    <User className='h-4 w-4' />
                                    <Link to='/profile' className="flex-1">Hồ sơ</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className='flex items-center gap-2 text-red-600 cursor-pointer p-3'
                                    onClick={() => dispatch(logout())}
                                >
                                    <LogOut className='h-4 w-4' />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>
            )}
        </>
    )
}
