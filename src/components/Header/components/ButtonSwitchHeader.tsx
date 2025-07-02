import { Globe } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { Bell } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export default function ButtonSwitchHeader() {
    const { language, setLanguage, t } = useLanguage()
    return (
        <>
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
            <div className="hidden md:flex items-center space-x-3">
                <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full px-6 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 border border-primary/20 theme-transition"
                    asChild
                >
                    <Link to="/auth/login">Đăng nhập</Link>
                </Button>
                <Button
                    size="sm"
                    className="rounded-full px-6  bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white  transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-white border-0 theme-transition"

                    asChild
                >
                    <Link to="/auth/register">Đăng ký</Link>
                </Button>
            </div>
        </>
    )
}
