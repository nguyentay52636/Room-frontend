import * as React from "react"
import { createContext, useContext, useState } from "react"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.categories": "Danh mục",
    "nav.search": "Tìm phòng",
    "nav.services": "Dịch vụ",
    "nav.news": "Bài đăng mới",
    "nav.about": "Về chúng tôi",
    "nav.contact": "Liên hệ",
    "nav.admin": "Quản trị",
    "nav.login": "Đăng nhập",
    "nav.register": "Đăng ký",
    "hero.title": "Tìm phòng trọ lý tưởng cho cuộc sống của bạn",
    "hero.subtitle":
      "Khám phá hàng ngàn phòng trọ chất lượng với đầy đủ tiện nghi, giá cả hợp lý và vị trí thuận tiện.",
    "hero.search.placeholder": "Nhập địa điểm bạn muốn tìm",
    "hero.search.button": "Tìm kiếm",
    "hero.cta.primary": "Tìm phòng ngay",
    "hero.cta.secondary": "Tìm hiểu thêm",
    "features.title": "Phòng trọ được yêu thích",
    "features.subtitle": "Khám phá những phòng trọ được nhiều người thuê và đánh giá cao nhất",
    "stats.rooms": "Phòng trọ",
    "stats.users": "Người dùng hài lòng",
    "stats.owners": "Chủ nhà tin tưởng",
    "stats.support": "Hỗ trợ khách hàng",
  },
  en: {
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.search": "Find Room",
    "nav.services": "Services",
    "nav.news": "News",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "nav.register": "Register",
    "hero.title": "Find Your Ideal Room for Your Life",
    "hero.subtitle":
      "Discover thousands of quality rooms with full amenities, reasonable prices and convenient locations.",
    "hero.search.placeholder": "Enter location you want to find",
    "hero.search.button": "Search",
    "hero.cta.primary": "Find Room Now",
    "hero.cta.secondary": "Learn More",
    "features.title": "Popular Rooms",
    "features.subtitle": "Explore the most rented and highest rated rooms",
    "stats.rooms": "Rooms",
    "stats.users": "Happy Users",
    "stats.owners": "Trusted Owners",
    "stats.support": "Customer Support",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["vi"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
