import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User } from "lucide-react"
import { BasicInfoTab } from "./tabs/BasicInfoTab"
import { useAccountForm } from "./hooks/useAccountForm"
import { SecurityTab } from "./tabs/SecurityTab"
import { SettingsTab } from "./tabs/SettingsTab"
import { ActivityTab } from "./tabs/ActivityTab"

interface AccountDialogProps {
    account: any
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: "view" | "edit" | "create"
}

export function DialogAddAccount({ account, open, onOpenChange, mode }: AccountDialogProps) {
    const {
        formData,
        showPassword,
        showConfirmPassword,
        changePassword,
        handleInputChange,
        setShowPassword,
        setShowConfirmPassword,
        setChangePassword,
        generateRandomPassword,
        handleSave,
        isFormValid
    } = useAccountForm(account, mode, onOpenChange)

    const isReadOnly = mode === "view"

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>
                            {mode === "create" ? "Tạo tài khoản mới" : mode === "edit" ? "Chỉnh sửa tài khoản" : "Chi tiết tài khoản"}
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Tạo tài khoản mới cho hệ thống"
                            : mode === "edit"
                                ? "Chỉnh sửa thông tin tài khoản"
                                : "Xem chi tiết thông tin tài khoản"}
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                        <TabsTrigger value="security">Bảo mật</TabsTrigger>
                        <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                        <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                        <BasicInfoTab
                            formData={formData}
                            account={account}
                            isReadOnly={isReadOnly}
                            onInputChange={handleInputChange}
                        />
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <SecurityTab
                            formData={formData}
                            account={account}
                            isReadOnly={isReadOnly}
                            mode={mode}
                            showPassword={showPassword}
                            showConfirmPassword={showConfirmPassword}
                            changePassword={changePassword}
                            onInputChange={handleInputChange}
                            onTogglePassword={setShowPassword}
                            onToggleConfirmPassword={setShowConfirmPassword}
                            onChangePassword={setChangePassword}
                            onGeneratePassword={generateRandomPassword}
                        />
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                        <SettingsTab
                            formData={formData}
                            isReadOnly={isReadOnly}
                            onInputChange={handleInputChange}
                        />
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                        <ActivityTab account={account} />
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {isReadOnly ? "Đóng" : "Hủy"}
                    </Button>
                    {!isReadOnly && (
                        <Button onClick={handleSave} disabled={!isFormValid}>
                            {mode === "create" ? "Tạo tài khoản" : "Lưu thay đổi"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 