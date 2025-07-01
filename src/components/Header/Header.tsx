

import { useEffect, useState } from "react"

import { useLanguage } from "../language-provider"
import CategoriesHeader from "./components/CategoriesHeader"
import MobileMenuHeader from "./components/MobileMenuHeader"
import ButtonSwitchHeader from "./components/ButtonSwitchHeader"
import HeaderLogo from "./components/HeaderLogo"
import DesktopNavigate from "./components/DesktopNavigate"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: t("nav.home"), to: "/" },
    { name: t("nav.search"), to: "/search" },
    { name: t("nav.services"), to: "/services" },
    { name: t("nav.about"), to: "/about" },
    { name: t("nav.contact"), to: "/contact" },
    { name: t("nav.admin"), to: "/admin" },
  ]
  return (
    <header
      className={`fixed flex justify-center bg-white  border-b top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white backdrop-blur-lg shadow-lg border-b border-gray-200/50" : "bg-transparent"
        }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <HeaderLogo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <DesktopNavigate navigation={navigation} />

          {/* Categories Dropdown */}
          <CategoriesHeader />
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <ButtonSwitchHeader />
          {/* Mobile Menu */}
          <MobileMenuHeader />
        </div>
      </div>
    </header>
  )
}
