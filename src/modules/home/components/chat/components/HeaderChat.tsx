import React from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Settings, Bell, Minimize2, Maximize2, Wifi, WifiOff } from 'lucide-react'


export default function HeaderChat({
    isFullscreen,
    setIsFullscreen,
    isRealtimeEnabled = true,
    toggleRealtime
}: {
    isFullscreen: boolean,
    setIsFullscreen: (isFullscreen: boolean) => void,
    isRealtimeEnabled?: boolean,
    toggleRealtime?: () => void
}) {
    return (
        <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                            <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                                💬 <span className="hidden sm:inline">Cộng đồng </span>Chat
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Kết nối và chia sẻ kinh nghiệm với cộng đồng</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                    {/* Realtime Toggle */}
                    {toggleRealtime && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleRealtime}
                            className={`rounded-lg sm:rounded-xl backdrop-blur-sm transition-all h-8 sm:h-auto px-2 sm:px-3 ${isRealtimeEnabled
                                ? 'bg-green-50/80 border-green-200 text-green-700 hover:bg-green-100/80'
                                : 'bg-gray-50/80 border-gray-200 text-gray-600 hover:bg-gray-100/80'
                                }`}
                        >
                            {isRealtimeEnabled ? (
                                <>
                                    <Wifi className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                                    <div className="hidden sm:flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                        Realtime
                                    </div>
                                </>
                            ) : (
                                <>
                                    <WifiOff className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Offline</span>
                                </>
                            )}
                        </Button>
                    )}

                    {/* Desktop only buttons */}
                    <Button variant="outline" size="sm" className="hidden md:flex rounded-xl bg-white/50 backdrop-blur-sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Cài đặt
                    </Button>
                    <Button variant="outline" size="sm" className="hidden md:flex rounded-xl bg-white/50 backdrop-blur-sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Thông báo
                    </Button>

                    {/* Mobile compact buttons */}
                    <Button variant="outline" size="sm" className="md:hidden rounded-lg bg-white/50 backdrop-blur-sm h-8 w-8 p-0">
                        <Settings className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="md:hidden rounded-lg bg-white/50 backdrop-blur-sm h-8 w-8 p-0">
                        <Bell className="w-3 h-3" />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm h-8 w-8 sm:h-auto sm:w-auto p-0 sm:px-3"
                    >
                        {isFullscreen ? (
                            <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                            <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
