

import { useEffect, useState } from "react"

import { useLanguage } from "../language-provider"
import CategoriesHeader from "./components/CategoriesHeader"
import MobileMenuHeader from "./components/MobileMenuHeader"
import ButtonSwitchHeader from "./components/ButtonSwitchHeader"
import HeaderLogo from "./components/HeaderLogo"
import DesktopNavigate from "./components/DesktopNavigate"

export function Header() {
  const { t, } = useLanguage()
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
    { name: t("nav.services"), to: "/services" },
    { name: t("nav.news"), to: "/news" },
    { name: t("nav.about"), to: "/about" },
    { name: t("nav.contact"), to: "/contact" },
    { name: t("nav.admin"), to: "/admin" },
  ]
  return (
    <header
      className={`fixed  bg-white  flex justify-center border-b top-0 left-0 right-0 z-50 transition-all duration-500
    ${isScrolled
          ? "bg-white dark:bg-gray-900 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700"
          : "bg-transparent dark:bg-gray-900/80"
        }`
      }
    >
      <div className="container flex h-16 items-center justify-between text-gray-900 dark:text-gray-100">
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
