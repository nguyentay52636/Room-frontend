import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Calendar } from 'lucide-react'
import React from 'react'

export default function FooterDialogAddManagerRealEsate({ property, mode, onOpenChange, handleSubmit }: any) {
    return (
        <>

            <DialogFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-between items-center w-full">
                    {mode === "view" && property && (
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Tạo: {new Date(property.createdAt).toLocaleDateString("vi-VN")}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Cập nhật: {new Date(property.updatedAt).toLocaleDateString("vi-VN")}</span>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end space-x-3 ml-auto">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="px-6 h-10 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {mode === "view" ? "Đóng" : "Hủy"}
                        </Button>
                        {mode !== "view" && (
                            <Button
                                onClick={handleSubmit}
                                className="px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
                            >
                                {mode === "add" ? "Thêm bất động sản" : "Cập nhật"}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogFooter>
        </>
    )
}
