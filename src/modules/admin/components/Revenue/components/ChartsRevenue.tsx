import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { chartData, } from './Data/DataRevenue'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function ChartsRevenue() {
    const chartConfig = {
        revenue: {
            label: "Doanh thu",
            color: "hsl(var(--primary))",
        },
    }
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Doanh thu theo tháng</CardTitle>
                    <CardDescription>Biểu đồ doanh thu 6 tháng gần nhất</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}M`} />
                            <ChartTooltip
                                cursor={false}
                                content={({ active, payload, label }: { active: any, payload: any, label: any }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-md">
                                                <div className="grid gap-2">
                                                    <div className="font-medium">{`Tháng ${label}`}</div>
                                                    <div className="grid gap-1">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                                            <span>Doanh thu: ₫{payload[0].value}M</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <defs>
                                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="revenue"
                                type="natural"
                                fill="url(#fillRevenue)"
                                fillOpacity={0.4}
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Top nguồn doanh thu</CardTitle>
                    <CardDescription>Các nguồn doanh thu chính trong tháng</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <div className="space-y-1 flex-1">
                                <p className="text-sm font-medium leading-none">Phí đăng tin</p>
                                <p className="text-sm text-muted-foreground">Phí đăng tin cho thuê</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">₫85.2M</div>
                                <Badge variant="secondary" className="text-xs">
                                    68%
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                            <div className="space-y-1 flex-1">
                                <p className="text-sm font-medium leading-none">Phí premium</p>
                                <p className="text-sm text-muted-foreground">Gói nâng cấp tài khoản</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">₫25.8M</div>
                                <Badge variant="secondary" className="text-xs">
                                    21%
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                            <div className="space-y-1 flex-1">
                                <p className="text-sm font-medium leading-none">Phí quảng cáo</p>
                                <p className="text-sm text-muted-foreground">Quảng cáo tin đăng</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">₫14.4M</div>
                                <Badge variant="secondary" className="text-xs">
                                    11%
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
