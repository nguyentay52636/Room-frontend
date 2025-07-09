import { Badge } from "@/components/ui/badge"

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
    case "inactive":
      return <Badge variant="secondary">Không hoạt động</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
    case "blocked":
      return <Badge className="bg-red-100 text-red-800">Bị khóa</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export const getTypeBadge = (type: string) => {
  switch (type) {
    case "premium":
      return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
    case "regular":
      return <Badge variant="outline">Thường</Badge>
    case "new":
      return <Badge className="bg-blue-100 text-blue-800">Mới</Badge>
    default:
      return <Badge>{type}</Badge>
  }
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

export const validateCustomerForm = (formData: any) => {
  const errors: string[] = []

  if (!formData.name?.trim()) {
    errors.push("Họ và tên là bắt buộc")
  }

  if (!formData.email?.trim()) {
    errors.push("Email là bắt buộc")
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("Email không hợp lệ")
  }

  if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
    errors.push("Số điện thoại không hợp lệ")
  }

  return errors
} 