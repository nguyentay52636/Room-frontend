import { Menu, X, Home, Search, Settings, User, LogIn, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/redux/slices/authSlice'

export default function MobileMenuHeader() {
  const { t } = useLanguage()
  const { isAuthenticated, user } = useSelector(selectAuth)
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: t("nav.home"), to: "/", icon: Home },
    { name: t("nav.search"), to: "/search", icon: Search },
    { name: t("nav.services"), to: "/services", icon: Settings },
    { name: t("nav.about"), to: "/about", icon: User },
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-10 w-10 p-0 theme-transition hover:bg-primary/10 active:scale-95 transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:w-80 p-0 theme-transition border-l-0 bg-white/95 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">NewLive</h2>
                <p className="text-xs text-gray-500">Menu</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeMenu}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Điều hướng
              </h3>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                      onClick={closeMenu}
                    >
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="px-6 mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Tính năng nổi bật
              </h3>
              <div className="space-y-3">
                <Link
                  to="/chat"
                  onClick={closeMenu}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Chat</p>
                      <p className="text-xs text-gray-500">Trò chuyện ngay</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500 text-white">2</Badge>
                </Link>

                <Link
                  to="/create-post-news"
                  onClick={closeMenu}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:from-orange-100 hover:to-red-100 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Đăng tin</p>
                      <p className="text-xs text-gray-500">Cho thuê nhà</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* User Actions */}
            <div className="px-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {isAuthenticated ? 'Tài khoản' : 'Đăng nhập'}
              </h3>

              {isAuthenticated ? (
                <div className="space-y-3">
                  {/* User Profile Card */}
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-purple-50 rounded-xl border border-primary/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user?.ten?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {user?.ten || 'Người dùng'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="text-xs bg-white/50 hover:bg-white/80 text-gray-700 px-3 py-2 rounded-lg transition-colors text-center"
                      >
                        Hồ sơ
                      </Link>
                      <button
                        onClick={() => {
                          // Handle logout
                          closeMenu()
                        }}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/20 hover:bg-primary/5 hover:border-primary/30 text-primary rounded-xl h-12"
                    asChild
                  >
                    <Link to="/auth/login" onClick={closeMenu}>
                      <LogIn className="w-4 h-4 mr-3" />
                      {t("nav.login")}
                    </Link>
                  </Button>

                  <Button
                    className="w-full justify-start bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                    asChild
                  >
                    <Link to="/auth/register" onClick={closeMenu}>
                      <UserPlus className="w-4 h-4 mr-3" />
                      {t("nav.register")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>© 2024 NewLive</span>
              <span>•</span>
              <Link to="/privacy" onClick={closeMenu} className="hover:text-primary transition-colors">
                Điều khoản
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
