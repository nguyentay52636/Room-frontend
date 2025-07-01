import { motion, MotionProps } from "framer-motion"
import React from "react"

interface FormMotionProps extends MotionProps {
    className?: string
    children: React.ReactNode
}

export function FormMotion({ className, children, ...motionProps }: FormMotionProps) {
    return (
        <motion.div className={className} {...motionProps}>
            {children}
        </motion.div>
    )
} 