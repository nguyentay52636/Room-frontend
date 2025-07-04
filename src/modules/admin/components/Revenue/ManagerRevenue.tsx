

import ChartsRevenue from "./components/ChartsRevenue"
import { chartData, revenueStats } from "./components/Data/DataRevenue"
import HeaderRevenue from "./components/HeaderRevenue"
import StatsCardRevenue from "./components/StatsCardRevenue"

export default function Revenue() {


  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <HeaderRevenue />

      {/* Stats Cards */}
      <StatsCardRevenue revenueStats={revenueStats} />

      {/* Charts */}
      <ChartsRevenue />
    </div>
  )
}
