import { useState, useEffect } from 'react'

// Responsive breakpoints (following Tailwind CSS conventions)
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

export interface ResponsiveInfo {
  width: number
  height: number
  breakpoint: Breakpoint
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  orientation: 'portrait' | 'landscape'
  aspectRatio: number
  pixelRatio: number
}

export function useResponsive(): ResponsiveInfo {
  const [responsiveInfo, setResponsiveInfo] = useState<ResponsiveInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        breakpoint: 'md' as Breakpoint,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        orientation: 'landscape',
        aspectRatio: 16 / 9,
        pixelRatio: 1,
      }
    }

    return calculateResponsiveInfo()
  })

  function calculateResponsiveInfo(): ResponsiveInfo {
    const width = window.innerWidth
    const height = window.innerHeight
    const pixelRatio = window.devicePixelRatio || 1
    const aspectRatio = width / height
    const orientation = width > height ? 'landscape' : 'portrait'

    // Determine breakpoint
    let breakpoint: Breakpoint = 'xs'
    if (width >= breakpoints['2xl']) breakpoint = '2xl'
    else if (width >= breakpoints.xl) breakpoint = 'xl'
    else if (width >= breakpoints.lg) breakpoint = 'lg'
    else if (width >= breakpoints.md) breakpoint = 'md'
    else if (width >= breakpoints.sm) breakpoint = 'sm'

    // Device type classification
    const isMobile = width < breakpoints.md // < 768px
    const isTablet = width >= breakpoints.md && width < breakpoints.lg // 768px - 1023px
    const isDesktop = width >= breakpoints.lg && width < breakpoints['2xl'] // 1024px - 1535px
    const isLargeDesktop = width >= breakpoints['2xl'] // >= 1536px

    return {
      width,
      height,
      breakpoint,
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      orientation,
      aspectRatio,
      pixelRatio,
    }
  }

  useEffect(() => {
    function handleResize() {
      setResponsiveInfo(calculateResponsiveInfo())
    }

    // Initial calculation
    handleResize()

    // Listen for window resize
    window.addEventListener('resize', handleResize)
    
    // Listen for orientation change (mobile devices)
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(handleResize, 100)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return responsiveInfo
}

// Utility functions for responsive design
export const responsive = {
  // Check if current width matches a breakpoint
  is: (breakpoint: Breakpoint): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= breakpoints[breakpoint]
  },

  // Check if current width is between two breakpoints
  between: (min: Breakpoint, max: Breakpoint): boolean => {
    if (typeof window === 'undefined') return false
    const width = window.innerWidth
    return width >= breakpoints[min] && width < breakpoints[max]
  },

  // Get responsive value based on current breakpoint
  value: <T>(values: Partial<Record<Breakpoint, T>>, fallback: T): T => {
    if (typeof window === 'undefined') return fallback
    
    const width = window.innerWidth
    let currentBreakpoint: Breakpoint = 'xs'
    
    // Find current breakpoint
    Object.entries(breakpoints)
      .reverse() // Start from largest
      .forEach(([bp, minWidth]) => {
        if (width >= minWidth) {
          currentBreakpoint = bp as Breakpoint
        }
      })

    // Find the best matching value
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint)

    // Look for value at current breakpoint or closest smaller one
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i]
      if (values[bp] !== undefined) {
        return values[bp]!
      }
    }

    return fallback
  },

  // Device-specific checks
  device: {
    isMobile: (): boolean => typeof window !== 'undefined' && window.innerWidth < breakpoints.md,
    isTablet: (): boolean => typeof window !== 'undefined' && 
      window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg,
    isDesktop: (): boolean => typeof window !== 'undefined' && window.innerWidth >= breakpoints.lg,
    isTouch: (): boolean => typeof window !== 'undefined' && 'ontouchstart' in window,
    isHighDPI: (): boolean => typeof window !== 'undefined' && (window.devicePixelRatio || 1) > 1,
  },

  // CSS class utilities
  classes: {
    // Hide on specific breakpoints
    hideOn: (breakpoints: Breakpoint[]): string => {
      return breakpoints.map(bp => {
        switch (bp) {
          case 'xs': return 'xs:hidden'
          case 'sm': return 'sm:hidden'
          case 'md': return 'md:hidden'
          case 'lg': return 'lg:hidden'
          case 'xl': return 'xl:hidden'
          case '2xl': return '2xl:hidden'
          default: return ''
        }
      }).join(' ')
    },

    // Show only on specific breakpoints
    showOn: (breakpoints: Breakpoint[]): string => {
      const hiddenClasses = ['hidden']
      breakpoints.forEach(bp => {
        switch (bp) {
          case 'xs': hiddenClasses.push('xs:block'); break
          case 'sm': hiddenClasses.push('sm:block'); break
          case 'md': hiddenClasses.push('md:block'); break
          case 'lg': hiddenClasses.push('lg:block'); break
          case 'xl': hiddenClasses.push('xl:block'); break
          case '2xl': hiddenClasses.push('2xl:block'); break
        }
      })
      return hiddenClasses.join(' ')
    },

    // Responsive spacing
    spacing: (values: Partial<Record<Breakpoint, string>>): string => {
      return Object.entries(values)
        .map(([bp, value]) => {
          const prefix = bp === 'xs' ? '' : `${bp}:`
          return `${prefix}${value}`
        })
        .join(' ')
    },

    // Responsive text sizes
    textSize: (values: Partial<Record<Breakpoint, string>>): string => {
      return Object.entries(values)
        .map(([bp, value]) => {
          const prefix = bp === 'xs' ? '' : `${bp}:`
          return `${prefix}${value}`
        })
        .join(' ')
    },
  },
}

// Hook for specific responsive scenarios
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    function checkBreakpoint() {
      setMatches(window.innerWidth >= breakpoints[breakpoint])
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [breakpoint])

  return matches
}

// Hook for mobile-first responsive design
export function useMobileFirst() {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive()
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isTouch: responsive.device.isTouch(),
    isHighDPI: responsive.device.isHighDPI(),
  }
} 