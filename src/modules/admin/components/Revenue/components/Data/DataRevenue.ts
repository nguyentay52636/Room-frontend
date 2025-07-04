import { DollarSign, TrendingUp, Home, Users } from "lucide-react"

export const revenueStats = [
    {
        title: "Doanh thu tháng này",
      value: "₫125.4M",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "so với tháng trước",
    },
    {
      title: "Doanh thu năm nay",
      value: "₫1.2B",
      change: "+8.3%",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "so với năm trước",
    },
    {
      title: "Phí dịch vụ",
      value: "₫15.6M",
      change: "+5.2%",
      changeType: "increase" as const,
      icon: Home,
      description: "so với tháng trước",
    },
    {
      title: "Người dùng trả phí",
      value: "2,456",
      change: "-2.1%",
      changeType: "decrease" as const,
      icon: Users,
      description: "so với tháng trước",
    },
  ]

  export const chartData = [
    { month: "T1", revenue: 95, growth: 8.2 },
    { month: "T2", revenue: 102, growth: 7.4 },
    { month: "T3", revenue: 118, growth: 15.7 },
    { month: "T4", revenue: 125, growth: 6.3 },
    { month: "T5", revenue: 135, growth: 8.0 },
    { month: "T6", revenue: 142, growth: 5.2 },
  ]
