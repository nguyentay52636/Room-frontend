import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'

export default function CategoriesHeader() {
    const { t } = useLanguage()
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center space-x-1 transition-all duration-300 hover:text-primary hover:scale-105 theme-transition"
                    >
                        <span>{t("nav.categories")}</span>
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 theme-transition">
                    <DropdownMenuItem asChild>
                        <Link to="/apartments" className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2" />
                            newLife APARTMENT
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/1">CĂN HỘ QUẬN 1</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/2">CĂN HỘ QUẬN 2</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/3">CĂN HỘ QUẬN 3</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/4">CĂN HỘ QUẬN 4</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/5">CĂN HỘ QUẬN 5</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/7">CĂN HỘ QUẬN 7</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/8">CĂN HỘ QUẬN 8</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/10">CĂN HỘ QUẬN 10</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/district/11">CĂN HỘ QUẬN 11</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
