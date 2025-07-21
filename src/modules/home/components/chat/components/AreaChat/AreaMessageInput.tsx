import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageIcon, Paperclip, Camera, Smile, Mic, Send, X, FileText, Play, Pause, Reply, Quote, Bold, Italic, Underline, Link, MoreHorizontal } from 'lucide-react'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Emoji picker component (simplified version)
const EmojiPicker = ({ onEmojiSelect, onClose }: { onEmojiSelect: (emoji: string) => void, onClose: () => void }) => {
    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
        '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
        '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
        '👍', '👎', '👏', '🙌', '👋', '🤝', '🙏', '❤️', '💕', '💖',
        '🏠', '🏡', '🏢', '🏬', '🏭', '🏘️', '🌆', '🌇', '🌃', '🗾'
    ]

    return (
        <div className="absolute bottom-16 left-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-80 max-h-48 overflow-y-auto z-50">
            <div className="grid grid-cols-10 gap-2">
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => onEmojiSelect(emoji)}
                        className="text-lg hover:bg-gray-100 rounded p-1 transition-colors"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

// Voice recorder component
const VoiceRecorder = ({ onRecordingComplete, onCancel }: { onRecordingComplete: (audioBlob: Blob) => void, onCancel: () => void }) => {
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRecording])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data)
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
                onRecordingComplete(audioBlob)
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
            setRecordingTime(0)
        } catch (error) {
            console.error('Error starting recording:', error)
            alert('Không thể truy cập microphone. Vui lòng cho phép quyền truy cập.')
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    const cancelRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
        onCancel()
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="absolute bottom-16 left-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-64 z-50">
            <div className="flex items-center space-x-3">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="text-sm text-gray-600">
                            {isRecording ? `Đang ghi... ${formatTime(recordingTime)}` : 'Sẵn sàng ghi âm'}
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        {!isRecording ? (
                            <Button
                                onClick={startRecording}
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                <Mic className="w-4 h-4 mr-1" />
                                Bắt đầu
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={stopRecording}
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Pause className="w-4 h-4 mr-1" />
                                    Dừng
                                </Button>
                                <Button
                                    onClick={cancelRecording}
                                    size="sm"
                                    variant="outline"
                                >
                                    Hủy
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <button
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

// File preview component
const FilePreview = ({ files, onRemoveFile }: { files: File[], onRemoveFile: (index: number) => void }) => {
    if (files.length === 0) return null

    return (
        <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                    <div key={index} className="relative bg-white border border-gray-200 rounded-lg p-2 flex items-center space-x-2 max-w-xs">
                        <div className="flex-shrink-0">
                            {file.type.startsWith('image/') ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-8 h-8 object-cover rounded"
                                />
                            ) : (
                                <FileText className="w-8 h-8 text-blue-500" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                            onClick={() => onRemoveFile(index)}
                            className="flex-shrink-0 text-red-400 hover:text-red-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface ExtendedProps {
    newMessage: string
    setNewMessage: (value: string) => void
    handleSendMessage: (files?: File[], audioBlob?: Blob) => void
    replyingTo?: any
    onCancelReply?: () => void
    isTyping?: boolean
    selectedChat?: any
    currentUser?: any
}

export default function AreaMessageInput({
    newMessage,
    setNewMessage,
    handleSendMessage,
    replyingTo,
    onCancelReply,
    isTyping = false,
    selectedChat,
    currentUser
}: ExtendedProps) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [messageFormat, setMessageFormat] = useState({
        bold: false,
        italic: false,
        underline: false
    })
    const [showQuickReplies, setShowQuickReplies] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Quick reply templates
    const quickReplies = [
        "Cảm ơn bạn đã liên hệ! 👍",
        "Tôi sẽ kiểm tra và phản hồi lại bạn sớm nhất có thể",
        "Bạn có thể chia sẻ thêm thông tin chi tiết không?",
        "Chúng ta có thể hẹn gặp để thảo luận trực tiếp",
        "Giá này đã bao gồm phí quản lý chưa?",
        "Căn hộ này còn trống không?",
        "Khi nào tôi có thể xem nhà?",
        "Có thể thương lượng giá không?"
    ]

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [newMessage])

    const handleEmojiSelect = (emoji: string) => {
        setNewMessage(newMessage + emoji)
        setShowEmojiPicker(false)
        textareaRef.current?.focus()
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const newFiles = Array.from(files)
            setAttachedFiles(prev => [...prev, ...newFiles])
        }
        // Clear input for re-selection
        event.target.value = ''
    }

    const handleRemoveFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        setAttachedFiles(prev => [...prev, ...files])
    }

    const handleVoiceRecordingComplete = (audioBlob: Blob) => {
        setShowVoiceRecorder(false)
        // Send voice message
        handleSendMessage([], audioBlob)
    }

    const handleSend = () => {
        if (newMessage.trim() || attachedFiles.length > 0) {
            handleSendMessage(attachedFiles)
            setNewMessage('')
            setAttachedFiles([])
            setMessageFormat({ bold: false, italic: false, underline: false })
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const insertQuickReply = (reply: string) => {
        setNewMessage(reply)
        setShowQuickReplies(false)
        textareaRef.current?.focus()
    }

    const formatMessage = (format: keyof typeof messageFormat) => {
        setMessageFormat(prev => ({ ...prev, [format]: !prev[format] }))
        textareaRef.current?.focus()
    }

    return (
        <div className="relative">
            {/* Drag overlay */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-500/20 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center">
                        <Paperclip className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-blue-700 font-medium">Thả file để đính kèm</p>
                    </div>
                </div>
            )}

            {/* Reply indicator */}
            {replyingTo && (
                <div className="px-4 py-2 bg-blue-50 border-l-4 border-blue-500 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Reply className="w-4 h-4 text-blue-500" />
                        <div>
                            <p className="text-xs text-blue-600">Đang trả lời {replyingTo.senderName}</p>
                            <p className="text-sm text-gray-600 truncate max-w-xs">{replyingTo.content}</p>
                        </div>
                    </div>
                    <button
                        onClick={onCancelReply}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* File previews */}
            <FilePreview files={attachedFiles} onRemoveFile={handleRemoveFile} />

            {/* Typing indicator */}
            {isTyping && (
                <div className="px-4 py-2 text-xs text-gray-500 flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>{selectedChat?.user?.ten || 'Người khác'} đang nhập...</span>
                </div>
            )}

            <div
                className={cn(
                    "flex-shrink-0 p-4 bg-white/60 backdrop-blur-sm border-t border-gray-200/50",
                    isDragging && "bg-blue-50/60"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Message formatting tools */}
                <div className="flex items-center space-x-2 mb-3">
                    <Button
                        variant={messageFormat.bold ? "default" : "outline"}
                        size="sm"
                        onClick={() => formatMessage('bold')}
                        className="h-8 w-8 p-0"
                    >
                        <Bold className="w-3 h-3" />
                    </Button>
                    <Button
                        variant={messageFormat.italic ? "default" : "outline"}
                        size="sm"
                        onClick={() => formatMessage('italic')}
                        className="h-8 w-8 p-0"
                    >
                        <Italic className="w-3 h-3" />
                    </Button>
                    <Button
                        variant={messageFormat.underline ? "default" : "outline"}
                        size="sm"
                        onClick={() => formatMessage('underline')}
                        className="h-8 w-8 p-0"
                    >
                        <Underline className="w-3 h-3" />
                    </Button>
                    <div className="h-4 w-px bg-gray-300 mx-2"></div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQuickReplies(!showQuickReplies)}
                        className="h-8 px-3 text-xs"
                    >
                        <Quote className="w-3 h-3 mr-1" />
                        Mẫu
                    </Button>
                </div>

                {/* Quick replies dropdown */}
                {showQuickReplies && (
                    <div className="absolute bottom-20 left-4 bg-white border border-gray-200 rounded-xl shadow-lg p-2 w-80 max-h-48 overflow-y-auto z-50">
                        <div className="space-y-1">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => insertQuickReply(reply)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main input area */}
                <div className="flex items-end space-x-3">
                    {/* File attachment */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip className="w-4 h-4" />
                    </Button>

                    {/* Image attachment */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <ImageIcon className="w-4 h-4" />
                    </Button>

                    {/* Camera */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    >
                        <Camera className="w-4 h-4" />
                    </Button>

                    {/* Message input */}
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            placeholder="Nhập tin nhắn..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className={cn(
                                "w-full min-h-[44px] max-h-32 resize-none pr-20 py-3 text-sm bg-white/70 border-gray-200/50 focus:border-blue-400 focus:ring-blue-400 rounded-2xl backdrop-blur-sm transition-all",
                                messageFormat.bold && "font-bold",
                                messageFormat.italic && "italic",
                                messageFormat.underline && "underline"
                            )}
                            rows={1}
                        />
                        <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl h-8 w-8 p-0"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile className="w-4 h-4 text-yellow-500" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl h-8 w-8 p-0"
                                onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                            >
                                <Mic className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    </div>

                    {/* Send button */}
                    <Button
                        onClick={handleSend}
                        disabled={!newMessage.trim() && attachedFiles.length === 0}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Gửi
                    </Button>
                </div>

                {/* Enhanced Quick Actions */}
                <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertQuickReply("🏠 Tôi quan tâm đến bất động sản này. Bạn có thể chia sẻ thêm thông tin không?")}
                        className="text-xs bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-200 hover:from-blue-100/80 hover:to-purple-100/80 rounded-xl backdrop-blur-sm"
                    >
                        🏠 Quan tâm BDS
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertQuickReply("📍 Bạn có thể chia sẻ vị trí chính xác không?")}
                        className="text-xs bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200 hover:from-green-100/80 hover:to-emerald-100/80 rounded-xl backdrop-blur-sm"
                    >
                        📍 Hỏi vị trí
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertQuickReply("💡 Tôi cần tư vấn thêm về căn hộ này")}
                        className="text-xs bg-gradient-to-r from-purple-50/80 to-pink-50/80 border-purple-200 hover:from-purple-100/80 hover:to-pink-100/80 rounded-xl backdrop-blur-sm"
                    >
                        💡 Xin tư vấn
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertQuickReply("📅 Khi nào tôi có thể xem nhà?")}
                        className="text-xs bg-gradient-to-r from-orange-50/80 to-yellow-50/80 border-orange-200 hover:from-orange-100/80 hover:to-yellow-100/80 rounded-xl backdrop-blur-sm"
                    >
                        📅 Hẹn xem nhà
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertQuickReply("💰 Giá này có thể thương lượng không?")}
                        className="text-xs bg-gradient-to-r from-red-50/80 to-pink-50/80 border-red-200 hover:from-red-100/80 hover:to-pink-100/80 rounded-xl backdrop-blur-sm"
                    >
                        💰 Thương lượng giá
                    </Button>
                </div>

                {/* Message status */}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                        {attachedFiles.length > 0 && (
                            <span>📎 {attachedFiles.length} file đính kèm</span>
                        )}
                        <span>Nhấn Enter để gửi, Shift+Enter để xuống dòng</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Kết nối</span>
                    </div>
                </div>
            </div>

            {/* Hidden file inputs */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
            />
            <input
                ref={imageInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
            />

            {/* Emoji picker */}
            {showEmojiPicker && (
                <EmojiPicker
                    onEmojiSelect={handleEmojiSelect}
                    onClose={() => setShowEmojiPicker(false)}
                />
            )}

            {/* Voice recorder */}
            {showVoiceRecorder && (
                <VoiceRecorder
                    onRecordingComplete={handleVoiceRecordingComplete}
                    onCancel={() => setShowVoiceRecorder(false)}
                />
            )}
        </div>
    )
}
