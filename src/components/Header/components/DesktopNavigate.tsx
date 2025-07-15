import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { selectAuth } from "@/redux/slices/authSlice"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
export default function DesktopNavigate() {
    const { t } = useLanguage()
    const { isAuthenticated, user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const navigation = [
        { name: t("nav.home"), to: "/" },
        { name: t("nav.services"), to: "/services" },
        { name: t("nav.news"), to: "/news" },
        { name: t("nav.about"), to: "/about" },
        { name: t("nav.contact"), to: "/contact" },

    ]

    const isAdmin = typeof user?.vaiTro === 'object' ? user?.vaiTro?.ten === "admin" : user?.vaiTro === "admin"

    return (
        <>
            {navigation.map((item: any) => (
                <Link
                    key={item.name}
                    to={item.to}
                    className="text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative group theme-transition"
                >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
            ))}
            {isAdmin && (
                <Link to="/admin" >
                    <Button variant="ghost" className="text-sm  font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative group theme-transition">
                        {t("nav.admin")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Button>
                </Link>
            )}
        </>
    )
}
