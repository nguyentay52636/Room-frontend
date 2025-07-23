import React, { createContext, useContext, ReactNode } from 'react'
import { useResponsive, ResponsiveInfo, useMobileFirst } from '@/hooks/useResponsive'
import { cn } from '@/lib/utils'

// Context for responsive information
const ResponsiveContext = createContext<ResponsiveInfo | null>(null)

interface ResponsiveProviderProps {
    children: ReactNode
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
    const responsiveInfo = useResponsive()

    return (
        <ResponsiveContext.Provider value={responsiveInfo}>
            <div
                className={cn(
                    "min-h-screen w-full",
                    // Add responsive-specific classes
                    responsiveInfo.isMobile && "mobile-layout",
                    responsiveInfo.isTablet && "tablet-layout",
                    responsiveInfo.isDesktop && "desktop-layout",
                    responsiveInfo.isLargeDesktop && "large-desktop-layout",
                    responsiveInfo.orientation === 'portrait' && "portrait-orientation",
                    responsiveInfo.orientation === 'landscape' && "landscape-orientation"
                )}
                style={{
                    '--screen-width': `${responsiveInfo.width}px`,
                    '--screen-height': `${responsiveInfo.height}px`,
                    '--aspect-ratio': responsiveInfo.aspectRatio.toString(),
                    '--pixel-ratio': responsiveInfo.pixelRatio.toString(),
                } as React.CSSProperties}
            >
                {children}
            </div>
        </ResponsiveContext.Provider>
    )
}

// Hook to use responsive context
export function useResponsiveContext(): ResponsiveInfo {
    const context = useContext(ResponsiveContext)
    if (!context) {
        throw new Error('useResponsiveContext must be used within ResponsiveProvider')
    }
    return context
}

// Responsive component wrapper
interface ResponsiveProps {
    children: ReactNode
    mobile?: ReactNode
    tablet?: ReactNode
    desktop?: ReactNode
    className?: string
}

export function Responsive({ children, mobile, tablet, desktop, className }: ResponsiveProps) {
    const { isMobile, isTablet, isDesktop } = useMobileFirst()

    // Render specific content based on device type
    if (isMobile && mobile) {
        return <div className={cn("mobile-only", className)}>{mobile}</div>
    }

    if (isTablet && tablet) {
        return <div className={cn("tablet-only", className)}>{tablet}</div>
    }

    if (isDesktop && desktop) {
        return <div className={cn("desktop-only", className)}>{desktop}</div>
    }

    // Default content
    return <div className={className}>{children}</div>
}

// Show/Hide components based on breakpoints
interface ShowOnProps {
    breakpoints: ('mobile' | 'tablet' | 'desktop' | 'large-desktop')[]
    children: ReactNode
    className?: string
}

export function ShowOn({ breakpoints, children, className }: ShowOnProps) {
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useMobileFirst()

    const shouldShow = breakpoints.some(bp => {
        switch (bp) {
            case 'mobile': return isMobile
            case 'tablet': return isTablet
            case 'desktop': return isDesktop
            case 'large-desktop': return isLargeDesktop
            default: return false
        }
    })

    if (!shouldShow) return null

    return <div className={className}>{children}</div>
}

interface HideOnProps {
    breakpoints: ('mobile' | 'tablet' | 'desktop' | 'large-desktop')[]
    children: ReactNode
    className?: string
}

export function HideOn({ breakpoints, children, className }: HideOnProps) {
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useMobileFirst()

    const shouldHide = breakpoints.some(bp => {
        switch (bp) {
            case 'mobile': return isMobile
            case 'tablet': return isTablet
            case 'desktop': return isDesktop
            case 'large-desktop': return isLargeDesktop
            default: return false
        }
    })

    if (shouldHide) return null

    return <div className={className}>{children}</div>
}

// Responsive container with automatic padding and margins
interface ResponsiveContainerProps {
    children: ReactNode
    className?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    padding?: boolean
}

export function ResponsiveContainer({
    children,
    className,
    maxWidth = 'xl',
    padding = true
}: ResponsiveContainerProps) {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full'
    }

    return (
        <div
            className={cn(
                'w-full mx-auto',
                maxWidthClasses[maxWidth],
                padding && 'px-4 sm:px-6 lg:px-8',
                className
            )}
        >
            {children}
        </div>
    )
}

// Responsive grid component
interface ResponsiveGridProps {
    children: ReactNode
    className?: string
    cols?: {
        mobile?: number
        tablet?: number
        desktop?: number
        'large-desktop'?: number
    }
    gap?: {
        mobile?: string
        tablet?: string
        desktop?: string
        'large-desktop'?: string
    }
}

export function ResponsiveGrid({
    children,
    className,
    cols = { mobile: 1, tablet: 2, desktop: 3, 'large-desktop': 4 },
    gap = { mobile: 'gap-4', tablet: 'gap-6', desktop: 'gap-8' }
}: ResponsiveGridProps) {
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useMobileFirst()

    // Determine current grid columns
    let gridCols = 'grid-cols-1'
    if (isLargeDesktop && cols['large-desktop']) {
        gridCols = `grid-cols-${cols['large-desktop']}`
    } else if (isDesktop && cols.desktop) {
        gridCols = `grid-cols-${cols.desktop}`
    } else if (isTablet && cols.tablet) {
        gridCols = `grid-cols-${cols.tablet}`
    } else if (isMobile && cols.mobile) {
        gridCols = `grid-cols-${cols.mobile}`
    }

    // Determine current gap
    let currentGap = gap.mobile || 'gap-4'
    if (isLargeDesktop && gap['large-desktop']) {
        currentGap = gap['large-desktop']
    } else if (isDesktop && gap.desktop) {
        currentGap = gap.desktop
    } else if (isTablet && gap.tablet) {
        currentGap = gap.tablet
    }

    return (
        <div className={cn('grid', gridCols, currentGap, className)}>
            {children}
        </div>
    )
}

// Responsive text component
interface ResponsiveTextProps {
    children: ReactNode
    className?: string
    size?: {
        mobile?: string
        tablet?: string
        desktop?: string
        'large-desktop'?: string
    }
}

export function ResponsiveText({
    children,
    className,
    size = { mobile: 'text-sm', tablet: 'text-base', desktop: 'text-lg' }
}: ResponsiveTextProps) {
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useMobileFirst()

    let textSize = size.mobile || 'text-base'
    if (isLargeDesktop && size['large-desktop']) {
        textSize = size['large-desktop']
    } else if (isDesktop && size.desktop) {
        textSize = size.desktop
    } else if (isTablet && size.tablet) {
        textSize = size.tablet
    }

    return (
        <span className={cn(textSize, className)}>
            {children}
        </span>
    )
}

// Responsive spacing component
interface ResponsiveSpacingProps {
    size?: {
        mobile?: string
        tablet?: string
        desktop?: string
        'large-desktop'?: string
    }
    className?: string
}

export function ResponsiveSpacing({
    size = { mobile: 'h-4', tablet: 'h-6', desktop: 'h-8' },
    className
}: ResponsiveSpacingProps) {
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useMobileFirst()

    let spacingSize = size.mobile || 'h-4'
    if (isLargeDesktop && size['large-desktop']) {
        spacingSize = size['large-desktop']
    } else if (isDesktop && size.desktop) {
        spacingSize = size.desktop
    } else if (isTablet && size.tablet) {
        spacingSize = size.tablet
    }

    return <div className={cn(spacingSize, className)} />
} 