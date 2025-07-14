import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import React from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Building, DollarSign } from 'lucide-react'
export default function DocumentsTabs() {
  return (
    <>
      <TabsContent value="documents" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tài liệu xác thực</CardTitle>
            <CardDescription>Quản lý các tài liệu để xác thực danh tính</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium mb-1">CCCD/CMND</h3>
                <p className="text-sm text-gray-600 mb-3">Tải lên ảnh chụp CCCD hoặc CMND</p>
                <Button size="sm" variant="outline">
                  Tải lên
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Giấy tờ công việc</h3>
                <p className="text-sm text-gray-600 mb-3">Hợp đồng lao động hoặc giấy xác nhận</p>
                <Button size="sm" variant="outline">
                  Tải lên
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Chứng minh thu nhập</h3>
                <p className="text-sm text-gray-600 mb-3">Bảng lương hoặc sao kê ngân hàng</p>
                <Button size="sm" variant="outline">
                  Tải lên
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Tài liệu khác</h3>
                <p className="text-sm text-gray-600 mb-3">Các tài liệu bổ sung khác</p>
                <Button size="sm" variant="outline">
                  Tải lên
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  )
}
