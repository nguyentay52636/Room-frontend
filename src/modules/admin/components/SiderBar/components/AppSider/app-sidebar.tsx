
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  MessageSquare,
  BarChart3,
  Star,
  DollarSign,
  Settings,
  Menu,
  X,
  Home,

} from "lucide-react"

import { ProfileEditDialog } from "@/modules/admin/components/SiderBar/components/dialog/ProfileEditDialog"
import HeaderAppSider from "./components/HeaderAppSider"
import SearchBarAppSider from "./components/SearchBarAppSider"
import { NavigateItem } from "./components/NavigateItem"
import ToggerThemeAppSider from "./components/ToggerThemeAppSider"
import UserProfileAppSider from "./components/UserProfileAppSider"

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const pathname = useLocation()

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navigation = [
    {
      name: "Tổng quan",
      href: "/admin",
      icon: BarChart3,
      current: pathname.pathname === "/admin",
      badge: null,
    },
    {
      name: "Quản lý căn hộ",
      href: "/admin/realestate",
      icon: Building2,
      current: pathname.pathname === "/admin/realestate",
      badge: "12",
    },
    {
      name: "Thống kê Doanh thu",
      href: "/admin/revenue",
      icon: DollarSign,
      current: pathname.pathname === "/admin/revenue",
      badge: null,
    },
    {
      name: "Quản lý Chat",
      href: "/admin/chat",
      icon: MessageSquare,
      current: pathname.pathname === "/admin/chat",
      badge: "6",
    },
    {
      name: "Quản lý Đánh giá",
      href: "/admin/reviews",
      icon: Star,
      current: pathname.pathname === "/admin/reviews",
      badge: "3",
    },
    {
      name: "Khách hàng",
      href: "/admin/customers",
      icon: Users,
      current: pathname.pathname === "/admin/customers",
      badge: null,
    },
    {
      name: "Nhân viên",
      href: "/admin/employee",
      icon: Users,
      current: pathname.pathname === "/admin/employee",
      badge: null,
    },
    {
      name: "Tài khoản",
      href: "/admin/account",
      icon: Users,
      current: pathname.pathname === "/admin/account",
      badge: null,
    },
    {
      name: "Cài đặt",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.pathname === "/admin/settings",
      badge: null,
    },
  ]



  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div className="fixed inset-0 bg-blue-600 bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 bg-background text-foreground hover:bg-accent shadow-lg border"
          size="icon"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed" : "relative"} 
          ${isMobile && !isMobileOpen ? "-translate-x-full" : "translate-x-0"}
          ${isCollapsed && !isMobile ? "w-16" : "w-64"}
          h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50 theme-transition
        `}
      >
        {/* Header */}
        <HeaderAppSider isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobile={isMobile} />

        {/* Back to Homepage */}
        {!isCollapsed && (
          <div className="px-4 py-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Quay lại trang chủ</span>
            </Link>
          </div>
        )}

        <SearchBarAppSider isCollapsed={isCollapsed} isMobile={isMobile} />
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavigateItem key={item.name} item={item} isCollapsed={isCollapsed} isMobile={isMobile} setIsMobileOpen={setIsMobileOpen} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <ToggerThemeAppSider isCollapsed={isCollapsed} isMobile={isMobile} />
          <UserProfileAppSider isCollapsed={isCollapsed} isMobile={isMobile} setIsProfileDialogOpen={setIsProfileDialogOpen} />
        </div>
      </div>

      {/* Profile Edit Dialog */}
      <ProfileEditDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
    </>
  )
}
