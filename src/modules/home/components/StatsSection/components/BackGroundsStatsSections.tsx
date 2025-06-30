import React from 'react'

export default function BackGroundsStatsSections() {
    return (
        <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-100 rounded-lg opacity-20 animate-float animation-delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-purple-100 rounded-full opacity-20 animate-float animation-delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-amber-100 rounded-lg opacity-20 animate-float animation-delay-500" />
    </div>

    )
}
