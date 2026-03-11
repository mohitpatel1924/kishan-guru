import Header from "@/components/Header";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DiseaseDetection() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("disease.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("disease.subtitle")}
          </p>
          <button className="bg-primary text-white font-medium py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors">
            Continue with this feature
          </button>
        </div>
      </main>
    </div>
  );
}
