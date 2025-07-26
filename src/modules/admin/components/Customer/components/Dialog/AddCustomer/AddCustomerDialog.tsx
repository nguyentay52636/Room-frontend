
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { User } from "lucide-react"

// interface CustomerCreateDialogProps {
//     open: boolean
//     onOpenChange: (open: boolean) => void
//     onCreate: (customerData: any) => void
// }

// export function AddCustomerDialog({ open, onOpenChange, onCreate }: CustomerCreateDialogProps) {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         type: "regular",
//         status: "active",
//         notes: "",
//     })

//     const getStatusBadge = (status: string) => {
//         switch (status) {
//             case "active":
//                 return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
//             case "inactive":
//                 return <Badge variant="secondary">Không hoạt động</Badge>
//             case "pending":
//                 return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
//             case "blocked":
//                 return <Badge className="bg-red-100 text-red-800">Bị khóa</Badge>
//             default:
//                 return <Badge>{status}</Badge>
//         }
//     }

//     const getTypeBadge = (type: string) => {
//         switch (type) {
//             case "premium":
//                 return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
//             case "regular":
//                 return <Badge variant="outline">Thường</Badge>
//             case "new":
//                 return <Badge className="bg-blue-100 text-blue-800">Mới</Badge>
//             default:
//                 return <Badge>{type}</Badge>
//         }
//     }

//     const handleCreate = () => {
//         onCreate(formData)
//         handleReset()
//         onOpenChange(false)
//     }

//     const handleInputChange = (field: string, value: string) => {
//         setFormData((prev) => ({ ...prev, [field]: value }))
//     }

//     const handleCancel = () => {
//         handleReset()
//         onOpenChange(false)
//     }

//     const handleReset = () => {
//         setFormData({
//             name: "",
//             email: "",
//             phone: "",
//             address: "",
//             type: "regular",
//             status: "active",
//             notes: "",
//         })
//     }

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle className="flex items-center space-x-2">
//                         <User className="h-5 w-5" />
//                         <span>Thêm khách hàng mới</span>
//                     </DialogTitle>
//                     <DialogDescription>
//                         Thêm khách hàng mới vào hệ thống
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="space-y-4">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center space-x-2">
//                                 <User className="h-4 w-4" />
//                                 <span>Thông tin cá nhân</span>
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div className="flex items-center space-x-4 mb-6">
//                                 <Avatar className="h-20 w-20">
//                                     <AvatarImage src="/placeholder.svg?height=80&width=80" />
//                                     <AvatarFallback className="text-lg">{formData.name.charAt(0) || "?"}</AvatarFallback>
//                                 </Avatar>
//                                 <div className="space-y-2">
//                                     <Button variant="outline" size="sm">
//                                         Thêm ảnh
//                                     </Button>
//                                     <div className="flex items-center space-x-2">
//                                         {getTypeBadge(formData.type)}
//                                         {getStatusBadge(formData.status)}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="name">Họ và tên *</Label>
//                                     <Input
//                                         id="name"
//                                         value={formData.name}
//                                         onChange={(e) => handleInputChange("name", e.target.value)}
//                                         placeholder="Nhập họ và tên"
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email *</Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         value={formData.email}
//                                         onChange={(e) => handleInputChange("email", e.target.value)}
//                                         placeholder="Nhập địa chỉ email"
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="phone">Số điện thoại</Label>
//                                     <Input
//                                         id="phone"
//                                         value={formData.phone}
//                                         onChange={(e) => handleInputChange("phone", e.target.value)}
//                                         placeholder="Nhập số điện thoại"
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="type">Loại khách hàng</Label>
//                                     <Select
//                                         value={formData.type}
//                                         onValueChange={(value) => handleInputChange("type", value)}
//                                     >
//                                         <SelectTrigger>
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="new">Mới</SelectItem>
//                                             <SelectItem value="regular">Thường</SelectItem>
//                                             <SelectItem value="premium">Premium</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="address">Địa chỉ</Label>
//                                 <Input
//                                     id="address"
//                                     value={formData.address}
//                                     onChange={(e) => handleInputChange("address", e.target.value)}
//                                     placeholder="Nhập địa chỉ"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="status">Trạng thái</Label>
//                                 <Select
//                                     value={formData.status}
//                                     onValueChange={(value) => handleInputChange("status", value)}
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="active">Hoạt động</SelectItem>
//                                         <SelectItem value="inactive">Không hoạt động</SelectItem>
//                                         <SelectItem value="pending">Chờ duyệt</SelectItem>
//                                         <SelectItem value="blocked">Bị khóa</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="notes">Ghi chú</Label>
//                                 <Textarea
//                                     id="notes"
//                                     value={formData.notes}
//                                     onChange={(e) => handleInputChange("notes", e.target.value)}
//                                     rows={3}
//                                     placeholder="Thêm ghi chú về khách hàng này..."
//                                 />
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 <DialogFooter>
//                     <Button variant="outline" onClick={handleCancel}>
//                         Hủy
//                     </Button>
//                     <Button onClick={handleCreate} disabled={!formData.name || !formData.email}>
//                         Thêm khách hàng
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// } 