

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
        <HeaderLogo />
        <nav className="hidden md:flex items-center space-x-6">
          <DesktopNavigate />
          <CategoriesHeader />
        </nav>
        <div className="flex items-center space-x-2">
          <ButtonSwitchHeader />
          <MobileMenuHeader />
        </div>
      </div>
    </header>
  )
}
