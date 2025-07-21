import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageIcon, Paperclip, Camera, Smile, Mic, Send, X, FileText, Play, Pause, Reply, Quote, Bold, Italic, Underline, Link, MoreHorizontal } from 'lucide-react'
import React, { useState, useRef, useCallback, useEffect, useMemo, memo } from 'react'
import { cn } from '@/lib/utils'

// Debounce utility function
const useDebounce = (callback: Function, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    return useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => callback(...args), delay)
    }, [callback, delay])
}

// Throttle utility for high-frequency operations
const useThrottle = (callback: Function, delay: number) => {
    const lastRun = useRef(Date.now())

    return useCallback((...args: any[]) => {
        if (Date.now() - lastRun.current >= delay) {
            callback(...args)
            lastRun.current = Date.now()
        }
    }, [callback, delay])
}

// Memoized Emoji picker component
const EmojiPicker = memo(({ onEmojiSelect, onClose }: { onEmojiSelect: (emoji: string) => void, onClose: () => void }) => {
    const emojis = useMemo(() => [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
        '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
        '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
        '👍', '👎', '👏', '🙌', '👋', '🤝', '🙏', '❤️', '💕', '💖',
        '🏠', '🏡', '🏢', '🏬', '🏭', '🏘️', '🌆', '🌇', '🌃', '🗾'
    ], [])

    return (
        <div className="absolute bottom-16 left-0 right-0 mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-3 sm:p-4 max-h-48 overflow-y-auto z-50">
            <div className="grid grid-cols-8 sm:grid-cols-10 gap-1 sm:gap-2">
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => onEmojiSelect(emoji)}
                        className="text-base sm:text-lg hover:bg-gray-100 rounded p-1 transition-colors"
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
})

// Memoized Voice recorder component
const VoiceRecorder = memo(({ onRecordingComplete, onCancel }: { onRecordingComplete: (audioBlob: Blob) => void, onCancel: () => void }) => {
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

    const startRecording = useCallback(async () => {
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
    }, [onRecordingComplete])

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }, [isRecording])

    const cancelRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
        onCancel()
    }, [isRecording, onCancel])

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }, [])

    return (
        <div className="absolute bottom-16 left-0 right-0 mx-auto max-w-xs sm:max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-3 sm:p-4 z-50">
            <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="text-xs sm:text-sm text-gray-600">
                            {isRecording ? `Đang ghi... ${formatTime(recordingTime)}` : 'Sẵn sàng ghi âm'}
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        {!isRecording ? (
                            <Button
                                onClick={startRecording}
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm"
                            >
                                <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                Bắt đầu
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={stopRecording}
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm"
                                >
                                    <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    Dừng
                                </Button>
                                <Button
                                    onClick={cancelRecording}
                                    size="sm"
                                    variant="outline"
                                    className="text-xs sm:text-sm"
                                >
                                    Hủy
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <button
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
})

// Memoized File preview component
const FilePreview = memo(({ files, onRemoveFile }: { files: File[], onRemoveFile: (index: number) => void }) => {
    if (files.length === 0) return null

    return (
        <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                    <div key={index} className="relative bg-white border border-gray-200 rounded-lg p-2 flex items-center space-x-2 max-w-full sm:max-w-xs">
                        <div className="flex-shrink-0">
                            {file.type.startsWith('image/') ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
                                />
                            ) : (
                                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                            onClick={() => onRemoveFile(index)}
                            className="flex-shrink-0 text-red-400 hover:text-red-600"
                        >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
})

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
    // Local state for input value to reduce parent updates
    const [localMessage, setLocalMessage] = useState(newMessage)
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
    const inputRef = useRef<HTMLInputElement>(null)

    // Sync local state with parent prop
    useEffect(() => {
        setLocalMessage(newMessage)
    }, [newMessage])

    // Debounced auto-resize to reduce DOM manipulations
    const debouncedAutoResize = useDebounce(() => {
        if (inputRef.current) {
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    inputRef.current.style.height = 'auto'
                    inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
                }
            })
        }
    }, 100)

    // Throttled sync with parent to reduce state updates
    const throttledSyncWithParent = useThrottle((value: string) => {
        setNewMessage(value)
    }, 300)

    // Optimized input change handler
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLocalMessage(value)
        throttledSyncWithParent(value)
        debouncedAutoResize()
    }, [throttledSyncWithParent, debouncedAutoResize])

    // Memoized handlers
    const handleEmojiSelect = useCallback((emoji: string) => {
        const newValue = localMessage + emoji
        setLocalMessage(newValue)
        setNewMessage(newValue)
        setShowEmojiPicker(false)
        inputRef.current?.focus()
    }, [localMessage, setNewMessage])

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const newFiles = Array.from(files)
            setAttachedFiles(prev => [...prev, ...newFiles])
        }
        // Clear input for re-selection
        event.target.value = ''
    }, [])

    const handleRemoveFile = useCallback((index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        setAttachedFiles(prev => [...prev, ...files])
    }, [])

    const handleVoiceRecordingComplete = useCallback((audioBlob: Blob) => {
        setShowVoiceRecorder(false)
        handleSendMessage([], audioBlob)
    }, [handleSendMessage])

    const handleSend = useCallback(() => {
        if (localMessage.trim() || attachedFiles.length > 0) {
            // Sync final value with parent before sending
            setNewMessage(localMessage)
            handleSendMessage(attachedFiles)
            setLocalMessage('')
            setAttachedFiles([])
            setMessageFormat({ bold: false, italic: false, underline: false })
        }
    }, [localMessage, attachedFiles, setNewMessage, handleSendMessage])

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }, [handleSend])

    const formatMessage = useCallback((format: keyof typeof messageFormat) => {
        setMessageFormat(prev => ({ ...prev, [format]: !prev[format] }))
        inputRef.current?.focus()
    }, [])

    // Memoized computed values
    const canSend = useMemo(() => {
        return localMessage.trim() || attachedFiles.length > 0
    }, [localMessage, attachedFiles.length])

    const inputClassName = useMemo(() => cn(
        "w-full min-h-[40px] sm:min-h-[44px] max-h-32 resize-none pr-16 sm:pr-20 py-2 sm:py-3 text-sm bg-white/70 border-gray-200/50 focus:border-blue-400 focus:ring-blue-400 rounded-2xl backdrop-blur-sm transition-all",
        messageFormat.bold && "font-bold",
        messageFormat.italic && "italic",
        messageFormat.underline && "underline"
    ), [messageFormat])

    return (
        <div className="relative">
            {/* Drag overlay */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-500/20 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center">
                        <Paperclip className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm sm:text-base text-blue-700 font-medium">Thả file để đính kèm</p>
                    </div>
                </div>
            )}

            {/* Reply indicator */}
            {replyingTo && (
                <div className="px-3 sm:px-4 py-2 bg-blue-50 border-l-4 border-blue-500 flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <Reply className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-blue-600">Đang trả lời {replyingTo.senderName}</p>
                            <p className="text-sm text-gray-600 truncate">{replyingTo.content}</p>
                        </div>
                    </div>
                    <button
                        onClick={onCancelReply}
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* File previews */}
            <FilePreview files={attachedFiles} onRemoveFile={handleRemoveFile} />

            {/* Typing indicator */}
            {isTyping && (
                <div className="px-3 sm:px-4 py-2 text-xs text-gray-500 flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="truncate">{selectedChat?.user?.ten || 'Người khác'} đang nhập...</span>
                </div>
            )}

            <div
                className={cn(
                    "flex-shrink-0 p-3 sm:p-4 bg-white/60 backdrop-blur-sm border-t border-gray-200/50",
                    isDragging && "bg-blue-50/60"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Message formatting tools - Hidden on mobile, show on larger screens */}
                <div className="hidden sm:flex items-center space-x-2 mb-3">
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

                {/* Main input area */}
                <div className="flex items-end space-x-2 sm:space-x-3">
                    {/* File attachment buttons - Responsive layout */}
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 h-8 w-8 sm:h-9 sm:w-9 p-0"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 h-8 w-8 sm:h-9 sm:w-9 p-0"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>

                        {/* Camera button - Hidden on small screens */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 h-9 w-9 p-0"
                        >
                            <Camera className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Message input */}
                    <div className="flex-1 relative">
                        <Input
                            ref={inputRef}
                            placeholder="Nhập tin nhắn..."
                            value={localMessage}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            className={inputClassName}
                        />

                        {/* Input controls - Right side */}
                        <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl h-6 w-6 sm:h-8 sm:w-8 p-0"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl h-6 w-6 sm:h-8 sm:w-8 p-0"
                                onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                            >
                                <Mic className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                            </Button>
                        </div>
                    </div>

                    {/* Send button */}
                    <Button
                        onClick={handleSend}
                        disabled={!canSend}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex-shrink-0"
                    >
                        <Send className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Gửi</span>
                    </Button>
                </div>

                {/* Message status */}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                        {attachedFiles.length > 0 && (
                            <span className="flex-shrink-0">📎 {attachedFiles.length} file</span>
                        )}
                        <span className="hidden sm:inline truncate">Nhấn Enter để gửi, Shift+Enter để xuống dòng</span>
                        <span className="sm:hidden truncate">Enter để gửi</span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="hidden sm:inline">Kết nối</span>
                        <span className="sm:hidden">●</span>
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
