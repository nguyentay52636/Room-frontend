
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
import { User } from "lucide-react"
import { BasicInfoTab } from "./tabs/BasicInfoTab"
import { useAccountForm } from "../ActionAccountForm"
import { SecurityTab } from "./tabs/SecurityTab"
import { SettingsTab } from "./tabs/SettingsTab"
import { ActivityTab } from "./tabs/ActivityTab"
import { IUser } from "@/lib/apis/types"

interface AccountDialogProps {
    account: IUser | null
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: "view" | "edit" | "create"
    onSuccess?: () => void
}

export function AddAccountDialog({ account, open, onOpenChange, mode, onSuccess }: AccountDialogProps) {
    const {
        form,
        showPassword,
        showConfirmPassword,
        changePassword,
        isSubmitting,
        isReadOnly,
        isFormValid,
        setShowPassword,
        setShowConfirmPassword,
        setChangePassword,
        generateRandomPassword,
        handleSave
    } = useAccountForm({ account, mode, onOpenChange, onSuccess })

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

                <form onSubmit={handleSave}>
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                            <TabsTrigger value="security">Bảo mật</TabsTrigger>
                            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                            <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="space-y-4">
                            <BasicInfoTab
                                form={form}
                                account={account}
                                isReadOnly={isReadOnly}
                            />
                        </TabsContent>

                        <TabsContent value="security" className="space-y-4">
                            <SecurityTab
                                form={form}
                                account={account}
                                isReadOnly={isReadOnly}
                                mode={mode}
                                showPassword={showPassword}
                                showConfirmPassword={showConfirmPassword}
                                changePassword={changePassword}
                                onTogglePassword={setShowPassword}
                                onToggleConfirmPassword={setShowConfirmPassword}
                                onChangePassword={setChangePassword}
                                onGeneratePassword={generateRandomPassword}
                            />
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-4">
                            <SettingsTab
                                form={form}
                                isReadOnly={isReadOnly}
                            />
                        </TabsContent>

                        <TabsContent value="activity" className="space-y-4">
                            <ActivityTab account={account} />
                        </TabsContent>
                    </Tabs>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            {isReadOnly ? "Đóng" : "Hủy"}
                        </Button>
                        {!isReadOnly && (
                            <Button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                            >
                                {isSubmitting
                                    ? "Đang xử lý..."
                                    : mode === "create"
                                        ? "Tạo tài khoản"
                                        : "Lưu thay đổi"
                                }
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
} 