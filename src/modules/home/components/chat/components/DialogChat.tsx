"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    User,
    Building2,
    Phone,
    Mail,
    Calendar,
    MessageSquare,
    Star,
    Clock,
    MapPin,
    DollarSign,
    FileText,
    Send,
    Archive,
    Flag,
    Heart,
    Zap,
    TrendingUp,
} from "lucide-react"

interface ChatDialogProps {
    chat: any
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DialogChat({ chat, open, onOpenChange }: ChatDialogProps) {
    const [status, setStatus] = useState(chat?.status || "active")
    const [priority, setPriority] = useState(chat?.priority || "normal")
    const [notes, setNotes] = useState("")
    const [response, setResponse] = useState("")

    if (!chat) return null

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white"
            case "pending":
                return "bg-gradient-to-r from-amber-400 to-amber-500 text-white"
            case "resolved":
                return "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
            case "archived":
                return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
            default:
                return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "text-red-600 bg-gradient-to-r from-red-50 to-red-100 border-red-200"
            case "high":
                return "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
            case "normal":
                return "text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
            case "low":
                return "text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
            default:
                return "text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
        }
    }

    const getMoodEmoji = (mood: string) => {
        switch (mood) {
            case "excited":
                return "😊"
            case "satisfied":
                return "😌"
            case "concerned":
                return "😟"
            case "interested":
                return "🤔"
            default:
                return "😊"
        }
    }

    const handleSave = () => {
        console.log("Saving chat updates:", { status, priority, notes })
        onOpenChange(false)
    }

    const handleSendResponse = () => {
        if (response.trim()) {
            console.log("Sending response:", response)
            setResponse("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-lg">
                                <AvatarImage src={chat.customerAvatar || "/placeholder.svg"} alt={chat.customerName} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                                    {chat.customerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${chat.isOnline ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : "bg-gray-400"
                                    }`}
                            >
                                {chat.isOnline && <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400"></div>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                {chat.customerName}
                                <span className="text-2xl">{getMoodEmoji(chat.mood)}</span>
                            </h3>
                            <p className="text-sm text-gray-500 font-normal">Chi tiet cuoc tro chuyen</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[70vh]">
                    <div className="space-y-6 p-1">
                        {/* Status and Priority Controls */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Trang thai</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Hoat dong</SelectItem>
                                        <SelectItem value="pending">Cho xu ly</SelectItem>
                                        <SelectItem value="resolved">Da giai quyet</SelectItem>
                                        <SelectItem value="archived">Luu tru</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priority">Uu tien</Label>
                                <Select value={priority} onValueChange={setPriority}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Thap</SelectItem>
                                        <SelectItem value="normal">Binh thuong</SelectItem>
                                        <SelectItem value="high">Cao</SelectItem>
                                        <SelectItem value="urgent">Khan cap</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Thong tin khach hang
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <Mail className="h-4 w-4 text-blue-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="font-medium">{chat.customerEmail}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <Phone className="h-4 w-4 text-green-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Dien thoai</p>
                                                <p className="font-medium">{chat.customerPhone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <MapPin className="h-4 w-4 text-purple-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Dia chi</p>
                                                <p className="font-medium">TP. Ho Chi Minh</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <Clock className="h-4 w-4 text-orange-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Trang thai</p>
                                                <p className="font-medium flex items-center gap-1">
                                                    <span className={chat.isOnline ? "text-emerald-600" : "text-gray-500"}>{chat.lastSeen}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Property Information */}
                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-green-600" />
                                    Thong tin bat dong san
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-lg">{chat.propertyName}</h4>
                                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                            {chat.propertyId}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                            <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Ngan sach</p>
                                            <p className="font-semibold text-blue-600">{chat.budget}</p>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                            <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Timeline</p>
                                            <p className="font-semibold text-purple-600">{chat.timeline}</p>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                                            <Star className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Giai doan</p>
                                            <p className="font-semibold text-orange-600 text-xs">{chat.projectPhase}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Chat Statistics */}
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-purple-600" />
                                    Thong ke cuoc tro chuyen
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                Tong tin nhan
                                            </span>
                                            <span className="font-semibold">{chat.messageCount}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Thoi gian phan hoi
                                            </span>
                                            <span className="font-semibold text-green-600">2 phut</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                                <Flag className="h-4 w-4" />
                                                Chua doc
                                            </span>
                                            <span className="font-semibold text-red-600">{chat.unreadCount}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Bat dau
                                            </span>
                                            <span className="font-semibold">{chat.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-600" />
                                    Trang thai hien tai
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status).replace("text-white", "")}`}></div>
                                        <span className="font-medium">Trang thai:</span>
                                    </div>
                                    <Badge className={getStatusColor(status)}>
                                        {status === "active"
                                            ? "Hoat dong"
                                            : status === "pending"
                                                ? "Cho xu ly"
                                                : status === "resolved"
                                                    ? "Da giai quyet"
                                                    : "Luu tru"}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <Star className="h-4 w-4 text-purple-600" />
                                        <span className="font-medium">Uu tien:</span>
                                    </div>
                                    <Badge className={`${getPriorityColor(priority)} border`}>
                                        {priority === "urgent"
                                            ? "Khan cap"
                                            : priority === "high"
                                                ? "Cao"
                                                : priority === "normal"
                                                    ? "Binh thuong"
                                                    : "Thap"}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Staff Notes */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Ghi chu nhan vien
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="Them ghi chu ve cuoc tro chuyen nay..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="min-h-[100px] bg-white dark:bg-gray-800 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                                />
                            </CardContent>
                        </Card>

                        {/* Quick Response */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Send className="h-5 w-5 text-green-600" />
                                    Phan hoi nhanh
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    placeholder="Nhap phan hoi cho khach hang..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    className="min-h-[80px] bg-white dark:bg-gray-800 border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleSendResponse}
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl"
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        Gui phan hoi
                                    </Button>
                                    <Button variant="outline" className="rounded-xl bg-transparent">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Gui tai lieu
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>

                <Separator />

                <div className="flex justify-between items-center pt-4">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                            <Archive className="h-4 w-4 mr-2" />
                            Luu tru
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                            <Flag className="h-4 w-4 mr-2" />
                            Bao cao
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                            <Heart className="h-4 w-4 mr-2" />
                            Yeu thich
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
                            Huy
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                        >
                            Luu thay doi
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
