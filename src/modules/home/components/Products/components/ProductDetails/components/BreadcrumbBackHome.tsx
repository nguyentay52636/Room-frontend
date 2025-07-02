import React from 'react'
import { Link } from "react-router-dom"
import { Home, ChevronLeft } from "lucide-react"
import { Button } from '@/components/ui/button'

export default function BreadcrumbBackHome() {
    return (
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b sticky-header">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="text-muted-foreground hover:text-foreground">
                            <Home className="h-4 w-4" />
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <Link to="/products" className="text-muted-foreground hover:text-foreground">
                            Danh sách nhà
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-foreground">Chi tiết</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link to="/products">
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Quay lại
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
