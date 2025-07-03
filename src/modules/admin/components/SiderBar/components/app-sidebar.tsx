
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Building2,
  Users,
  MessageSquare,
  BarChart3,
  Star,
  DollarSign,
  Settings,
  Search,
  Menu,
  ChevronRight,
  Moon,
  Sun,
  X,
  Home,
  Edit,
  LogOut,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ProfileEditDialog } from "@/modules/admin/components/SiderBar/components/ProfileEditDialog"

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
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
      name: "Quản lý Nhà trọ",
      href: "/admin/properties",
      icon: Building2,
      current: pathname.pathname === "/admin/properties",
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
      href: "/admin/messages",
      icon: MessageSquare,
      current: pathname.pathname === "/admin/messages",
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
      name: "Nhân viên",
      href: "/admin/staff",
      icon: Users,
      current: pathname.pathname === "/admin/staff",
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

  const NavItem = ({ item, isCollapsed }: { item: any; isCollapsed: any }) => {
    const content = (
      <Link
        to={item.href}
        onClick={() => isMobile && setIsMobileOpen(false)}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
          ${item.current
            ? "bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }
          ${isCollapsed && !isMobile ? "justify-center px-2" : ""}
        `}
      >
        <item.icon className={`${isCollapsed && !isMobile ? "h-5 w-5" : "h-5 w-5"} flex-shrink-0`} />
        {!isCollapsed && (
          <>
            <span className="font-medium">{item.name}</span>
            {item.badge && (
              <Badge className="ml-auto bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                {item.badge}
              </Badge>
            )}
          </>
        )}
        {item.current && !isCollapsed && (
          <div className="absolute right-2">
            <ChevronRight className="h-4 w-4 text-emerald-600" />
          </div>
        )}
      </Link>
    )

    if (isCollapsed && !isMobile) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right" className="bg-gray-900 text-white">
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return content
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
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
          h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NL</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-gray-900">NewLife Admin</h1>
                <p className="text-xs text-gray-500">Cho thuê căn hộ</p>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          {!isMobile && (
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              variant="ghost"
              size="icon"
              className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            >
              <ChevronRight className={`h-3 w-3 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
            </Button>
          )}
        </div>

        {/* Back to Homepage */}
        {!isCollapsed && (
          <div className="px-4 py-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Quay lại trang chủ</span>
            </Link>
          </div>
        )}

        {/* Search Bar */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          )}
          {isCollapsed && !isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-full h-10">
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-900 text-white">
                  <p>Tìm kiếm</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* Theme Toggle */}
          <div className="flex items-center">
            {isCollapsed && !isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full h-10"
                    >
                      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-gray-900 text-white">
                    <p>{isDarkMode ? "Chế độ sáng" : "Chế độ tối"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full justify-start gap-3 px-3 py-2 h-auto"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {!isCollapsed && <span className="text-sm">{isDarkMode ? "Chế độ sáng" : "Chế độ tối"}</span>}
              </Button>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            {isCollapsed && !isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-full h-10">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-emerald-600 text-white text-xs">AD</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="end" className="w-56">
                        <DropdownMenuLabel>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">Quản trị viên</p>
                            <p className="text-xs text-gray-500">admin@newlife.vn</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa hồ sơ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Tài khoản</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Cài đặt</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Đăng xuất</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-gray-900 text-white">
                    <div>
                      <p className="font-medium">Quản trị viên</p>
                      <p className="text-xs opacity-75">admin@newlife.vn</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-emerald-600 text-white">AD</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">Quản trị viên</p>
                        <p className="text-xs text-gray-500">admin@newlife.vn</p>
                      </div>
                    )}
                    {!isCollapsed && <ChevronRight className="h-4 w-4 text-gray-400" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Quản trị viên</p>
                      <p className="text-xs text-gray-500">admin@newlife.vn</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Chỉnh sửa hồ sơ</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Tài khoản</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Dialog */}
      <ProfileEditDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
    </>
  )
}
