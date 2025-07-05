import React from 'react'
import { Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Grid3X3, List, Plus } from 'lucide-react'

export default function HeaderManagerRealEstate({
  viewMode,
  setViewMode,
  totalItems,
  handleAddProperty
}: {
  viewMode: "grid" | "list",
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>,
  totalItems: number,
  handleAddProperty: () => void
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Quản lý Bất động sản
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Quản lý và theo dõi tất cả bất động sản trong hệ thống ({totalItems} bất động sản)
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-9"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-9"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleAddProperty}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm bất động sản
        </Button>
      </div>
    </div>
  )
}
