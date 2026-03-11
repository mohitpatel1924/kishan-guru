import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

export default function ExpertConsultation() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a4 4 0 00-4-4h-2a4 4 0 00-4 4v1h10z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("expert.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("expert.subtitle")}
          </p>
          <button className="bg-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors">
            Continue with this feature
          </button>
        </div>
      </main>
    </div>
  );
}
