
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Users, Home, Calendar, Star, Clock, ArrowUpRight, Plus } from "lucide-react"

export default function DashBoard() {
  const todayStats = {
    newProperties: 12,
    newUsers: 28,
    newReviews: 15,
    revenue: 8500000,
  }

  const revenueData = [
    { month: "Tháng 1", income: 95000000, expense: 65000000 },
    { month: "Tháng 2", income: 102000000, expense: 68000000 },
    { month: "Tháng 3", income: 118000000, expense: 72000000 },
    { month: "Tháng 4", income: 125400000, expense: 75000000 },
    { month: "Tháng 5", income: 132000000, expense: 78000000 },
    { month: "Tháng 6", income: 145000000, expense: 82000000 },
  ]

  const recentProperties = [
    {
      id: 1,
      title: "Phòng trọ cao cấp Quận 1",
      location: "Quận 1, TP.HCM",
      price: "2.500.000",
      time: "2 giờ trước",
      status: "active",
    },
    {
      id: 2,
      title: "Căn hộ mini Quận 7",
      location: "Quận 7, TP.HCM",
      price: "3.200.000",
      time: "3 giờ trước",
      status: "pending",
    },
    {
      id: 3,
      title: "Phòng trọ sinh viên",
      location: "Quận 3, TP.HCM",
      price: "1.800.000",
      time: "5 giờ trước",
      status: "active",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Đang hoạt động</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Tổng quan</h1>
          <p className="text-muted-foreground mt-1">Xem tổng quan về hoạt động của hệ thống</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Phòng trọ mới hôm nay</p>
                <p className="text-2xl font-bold">{todayStats.newProperties}</p>
                <div className="flex items-center space-x-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+25%</span>
                  <span className="text-muted-foreground">so với hôm qua</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Người dùng mới hôm nay</p>
                <p className="text-2xl font-bold">{todayStats.newUsers}</p>
                <div className="flex items-center space-x-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+12%</span>
                  <span className="text-muted-foreground">so với hôm qua</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Đánh giá mới hôm nay</p>
                <p className="text-2xl font-bold">{todayStats.newReviews}</p>
                <div className="flex items-center space-x-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+8%</span>
                  <span className="text-muted-foreground">so với hôm qua</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Doanh thu hôm nay</p>
                <p className="text-2xl font-bold">{todayStats.revenue.toLocaleString("vi-VN")} đ</p>
                <div className="flex items-center space-x-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+15%</span>
                  <span className="text-muted-foreground">so với hôm qua</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ doanh thu</CardTitle>
          <CardDescription>Thống kê doanh thu theo tháng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <div className="flex flex-col space-y-4">
              {revenueData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{data.month}</span>
                    <span className="text-sm text-muted-foreground">
                      Thu: {data.income.toLocaleString("vi-VN")} đ | Chi: {data.expense.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex h-4 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="flex flex-col justify-center overflow-hidden bg-green-500 text-xs text-white text-center"
                        style={{ width: `${(data.income / (data.income + data.expense)) * 100}%` }}
                      ></div>
                      <div
                        className="flex flex-col justify-center overflow-hidden bg-red-500 text-xs text-white text-center"
                        style={{ width: `${(data.expense / (data.income + data.expense)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Phòng trọ thêm mới hôm nay</CardTitle>
              <CardDescription>Danh sách phòng trọ mới được thêm vào hệ thống hôm nay</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Xem tất cả
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{property.title}</div>
                  <div className="text-sm text-muted-foreground">{property.location}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">{property.price} đ/tháng</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {property.time}
                    </div>
                  </div>
                  {getStatusBadge(property.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
