import { MainLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';

export default function HomePage() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">{t("hero.cta.primary")}</Button>
            <Button variant="outline" size="lg">{t("hero.cta.secondary")}</Button>
          </div>
        </section>

        {/* Language Switcher */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
          >
            {language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
          </Button>
        </div>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{t("features.title")}</h2>
          <p className="text-center text-gray-600 mb-8">{t("features.subtitle")}</p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">1000+</h3>
            <p className="text-gray-600">{t("stats.rooms")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-gray-600">{t("stats.users")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">200+</h3>
            <p className="text-gray-600">{t("stats.owners")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">24/7</h3>
            <p className="text-gray-600">{t("stats.support")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
