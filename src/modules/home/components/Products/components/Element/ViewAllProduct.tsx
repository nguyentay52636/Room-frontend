import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
export default function ViewAllProduct({ isVisible }: { isVisible: boolean }) {
    return (
        <div
            className={`text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
        >
            <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow border-0 transition-transform duration-200 hover:scale-105 group/btn cursor-pointer"
            >
                <Link to="/products">
                    <span>Khám phá tất cả bất động sản</span>
                    <ArrowRight className="h-5 w-5 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
            </Button>
        </div>
    )
}
