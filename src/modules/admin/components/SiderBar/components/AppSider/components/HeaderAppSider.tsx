import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'


export default function HeaderAppSider({ isCollapsed, setIsCollapsed, isMobile }: { isCollapsed: any, setIsCollapsed: any, isMobile: any }) {
    return (
        <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">NL</span>
                </div>
                {!isCollapsed && (
                    <div>
                        <h1 className="font-bold text-gray-900">NewLive</h1>
                        <p className="text-xs text-gray-500">Cho thuê căn hộ</p>
                    </div>
                )}
            </div>

            {/* Toggle Button */}
            {!isMobile && (
                <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    variant="ghost"
                    size="icon"
                    className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                >
                    <ChevronRight className={`h-3 w-3 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
                </Button>
            )}
        </div>
    )
}
