
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
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw]">
                <DialogHeader className="px-4 sm:px-6">
                    <DialogTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                        <User className="h-5 w-5" />
                        <span>
                            {mode === "create" ? "Tạo tài khoản mới" : mode === "edit" ? "Chỉnh sửa tài khoản" : "Chi tiết tài khoản"}
                        </span>
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">
                        {mode === "create"
                            ? "Tạo tài khoản mới cho hệ thống"
                            : mode === "edit"
                                ? "Chỉnh sửa thông tin tài khoản"
                                : "Xem chi tiết thông tin tài khoản"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSave} className="px-4 sm:px-6">
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto sm:h-10">
                            <TabsTrigger value="basic" className="text-xs sm:text-sm py-2 sm:py-0">Thông tin cơ bản</TabsTrigger>
                            <TabsTrigger value="security" className="text-xs sm:text-sm py-2 sm:py-0">Bảo mật</TabsTrigger>
                            <TabsTrigger value="settings" className="text-xs sm:text-sm py-2 sm:py-0">Cài đặt</TabsTrigger>
                            <TabsTrigger value="activity" className="text-xs sm:text-sm py-2 sm:py-0">Hoạt động</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="space-y-4 mt-4">
                            <BasicInfoTab
                                form={form}
                                account={account}
                                isReadOnly={isReadOnly}
                            />
                        </TabsContent>

                        <TabsContent value="security" className="space-y-4 mt-4">
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

                        <TabsContent value="settings" className="space-y-4 mt-4">
                            <SettingsTab
                                form={form}
                                isReadOnly={isReadOnly}
                            />
                        </TabsContent>

                        <TabsContent value="activity" className="space-y-4 mt-4">
                            <ActivityTab account={account} />
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto order-2 sm:order-1"
                        >
                            {isReadOnly ? "Đóng" : "Hủy"}
                        </Button>
                        {!isReadOnly && (
                            <Button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full sm:w-auto order-1 sm:order-2"
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