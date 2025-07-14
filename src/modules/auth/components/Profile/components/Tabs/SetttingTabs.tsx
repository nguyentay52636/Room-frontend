import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import React from 'react'

export default function SetttingTabs() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
          <CardDescription>Quản lý các thông báo bạn muốn nhận</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Thông báo email</h3>
              <p className="text-sm text-gray-600">Nhận thông báo qua email về các cập nhật quan trọng</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Thông báo SMS</h3>
              <p className="text-sm text-gray-600">Nhận tin nhắn SMS về các thông báo khẩn cấp</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Thông báo đẩy</h3>
              <p className="text-sm text-gray-600">Nhận thông báo đẩy trên trình duyệt</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Thông báo marketing</h3>
              <p className="text-sm text-gray-600">Nhận thông tin về các chương trình khuyến mãi</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
