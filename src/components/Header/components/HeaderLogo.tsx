import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderLogo() {
    return (
        <>
            <Link to="/" className="flex items-center space-x-3 animate-fade-in">
                <div className="w-10 h-10 bg-bg-primary rounded-lg flex items-center justify-center theme-transition">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-primary theme-transition">NewLife</h1>
                    <p className="text-xs text-muted-foreground -mt-1 theme-transition">Cho thuê căn hộ</p>
                </div>
            </Link>

        </>
    )
}
