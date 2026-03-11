import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.dashboard"), path: "/" },
    { label: t("nav.diseaseDetection"), path: "/disease-detection" },
    { label: t("nav.cropRecommendation"), path: "/crop-recommendation" },
    { label: t("nav.financialManagement"), path: "/financial-management" },
    { label: t("nav.cropManagement"), path: "/view-crops" },
    { label: t("nav.expertConsultation"), path: "/expert-consultation" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">{t("app.title")}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Mobile menu button placeholder */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
