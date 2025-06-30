import { useEffect, useRef, useState } from "react"


export default function AnimatedCounter({
  end,
  duration = 2000,
  isDecimal = false,
  suffix = "",
  onComplete,
}: {
  end: number
  duration?: number
  isDecimal?: boolean
  suffix?: string
  onComplete?: () => void
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible && !hasAnimated) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible, hasAnimated])

  useEffect(() => {
    if (!isVisible || hasAnimated) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      if (isDecimal) {
        setCount(Number((easeOutCubic * end).toFixed(1)))
      } else {
        setCount(Math.floor(easeOutCubic * end))
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Animation completed
        setHasAnimated(true)
        if (isDecimal) {
          setCount(Number(end.toFixed(1)))
        } else {
          setCount(end)
        }
        onComplete?.()
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isDecimal, isVisible, hasAnimated, onComplete])

  return (
    <div ref={countRef} className="text-4xl lg:text-5xl font-bold text-gray-900">
      {count}
      <span className="text-blue-600">{suffix}</span>
    </div>
  )
}