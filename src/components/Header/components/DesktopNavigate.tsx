import React from 'react'
import { Link } from 'react-router-dom'

export default function DesktopNavigate({ navigation }: { navigation: any }) {
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

        </>
    )
}
