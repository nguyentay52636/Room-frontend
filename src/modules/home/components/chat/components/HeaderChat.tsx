import React from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Settings, Bell, Minimize2, Maximize2 } from 'lucide-react'    


export default function HeaderChat({ isFullscreen, setIsFullscreen }: { isFullscreen: boolean, setIsFullscreen: (isFullscreen: boolean) => void }) {
  return (
    <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        💬 Cộng đồng Chat
                    </h1>
                    <p className="text-sm text-gray-600">Kết nối và chia sẻ kinh nghiệm với cộng đồng</p>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                <Bell className="w-4 h-4 mr-2" />
                Thông báo
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="rounded-xl bg-white/50 backdrop-blur-sm"
            >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
        </div>
    </div>
</div>
  )
}
