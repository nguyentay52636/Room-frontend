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
            <Link to="/create-post-news">
                <Button
                    size="sm"

                    className="hidden cursor-pointer mx-4 sm:flex items-center gap-2 transition-all duration-300 hover:scale-105 bg-orange-600 hover:bg-orange-700 text-white"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden lg:inline">Đăng tin</span>
                </Button>
            </Link>

            <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 px-0 relative transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-primary/10 rounded-full theme-transition"
                asChild
            >
                <Link to="/chat">
                    <MessageCircle className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-primary text-white flex items-center justify-center rounded-full border-2 border-background theme-transition">
                        2
                    </Badge>
                </Link>
            </Button>
            {/* Language Switcher */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 px-0 transition-all duration-300 hover:text-primary hover:scale-110 theme-transition"
                    >
                        <Globe className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="theme-transition">
                    <DropdownMenuItem onClick={() => setLanguage("vi")}>🇻🇳 Tiếng Việt</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* Theme Toggle */}
            <ModeToggle />

            {/* Notifications */}
            <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 px-0 relative transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-primary/10 rounded-full theme-transition"
            >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white flex items-center justify-center rounded-full border-2 border-background theme-transition">
                    3
                </Badge>
            </Button>
            {!isAuthenticated ? (
                <>
                    <div className="hidden md:flex items-center space-x-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full px-6 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 border border-primary/20 theme-transition"
                            asChild
                        >


                            <Link to="/auth/login">    Đăng nhập
                            </Link>
                        </Button>

                        <Button
                            size="sm"
                            className="rounded-full px-6  bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white  transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-white border-0 theme-transition"

                            asChild
                        >
                            <Link to="/auth/register">
                                Đăng Ký
                            </Link>
                        </Button>

                    </div>
                </>
            ) : (

                <>
                    <div className="hidden md:flex items-center cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='relative h-10 w-10 rounded-full p-0'>
                                    <Avatar className='cursor-pointer w-10 h-10'>
                                        <AvatarImage src='https://github.com/shadcn.png' />
                                        <AvatarFallback>{user?.ten?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-80 cursor-pointer' align='end' forceMount>
                                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                                    <User className='h-4 w-4' />
                                    <Link to='/profile'>Chi tiết tài khoản</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className='flex items-center gap-2 text-red-600 cursor-pointer'
                                    onClick={() => dispatch(logout())}
                                >
                                    <LogOut className='h-4 w-4' />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <h1 className='text-sm space-x-2 mx-2 font-bold text-black'> {user?.tenDangNhap}</h1> */}
                    </div>
                </>
            )}
        </>
    )
}
