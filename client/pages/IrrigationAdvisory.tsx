import Header from "@/components/Header";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function IrrigationAdvisory() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-cyan-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-cyan-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("irrigation.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("irrigation.subtitle")}
          </p>
          <button className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Continue with this feature
          </button>
        </div>
      </main>
    </div>
  );
}
