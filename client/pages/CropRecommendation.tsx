import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

export default function CropRecommendation() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 3a2 2 0 00-2 2v6h3V5h4v6h3V5a2 2 0 00-2-2H5z" />
              <path
                fillRule="evenodd"
                d="M15 13H5v2h10v-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("crop.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("crop.subtitle")}
          </p>
          <button className="bg-primary text-white font-medium py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors">
            Continue with this feature
          </button>
        </div>
      </main>
    </div>
  );
}
