import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/components/language-provider'

export default function MobileMenuHeader() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const navigation = [
    { name: t("nav.home"), to: "/" },
    { name: t("nav.search"), to: "/search" },
    { name: t("nav.services"), to: "/services" },
    { name: t("nav.about"), to: "/about" },
  ]
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 px-0 theme-transition">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 theme-transition">
          <div className="flex flex-col space-y-4 mt-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-sm font-medium transition-colors hover:text-primary theme-transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t pt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/10 theme-transition"
                asChild
              >
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 theme-transition"
                asChild
              >
                <Link to="/register">{t("nav.register")}</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
