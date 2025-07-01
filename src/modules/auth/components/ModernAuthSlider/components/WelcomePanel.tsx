import { Button } from "@/components/ui/button"
import React from "react"

interface WelcomePanelProps {
    mode: "login" | "register"
    isTransitioning: boolean
    onSwitchMode: () => void
    children?: React.ReactNode
}

export function WelcomePanel({ mode, isTransitioning, onSwitchMode, children }: WelcomePanelProps) {
    return (
        <div
            className={`text-center bg-white/10 p-8 rounded-xl z-10 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${!isTransitioning && mode ? "translate-x-0 opacity-100" : mode === "login" ? "translate-x-12 opacity-0" : "-translate-x-12 opacity-0"}`}
        >
            {children}
            <Button
                onClick={onSwitchMode}
                className="bg-white/30 cursor-pointer hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-3 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-lg"
            >
                {mode === "login" ? "ĐĂNG KÝ NGAY" : "ĐĂNG NHẬP"}
            </Button>
        </div>
    )
} 