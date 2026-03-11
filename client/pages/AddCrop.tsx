import Header from "@/components/Header";
import { Leaf, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCrop() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [harvestingDate, setHarvestingDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cropName && variety && plantingDate && harvestingDate) {
      // Get existing crops from localStorage
      const existingCrops = JSON.parse(localStorage.getItem("crops") || "[]");
      
      // Add new crop
      const newCrop = {
        id: Date.now().toString(),
        cropName,
        variety,
        plantingDate,
        harvestingDate,
      };
      
      existingCrops.push(newCrop);
      localStorage.setItem("crops", JSON.stringify(existingCrops));
      
      // Navigate to view crops page
      navigate("/view-crops");
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("addCrop.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("addCrop.subtitle")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("addCrop.cropName")}
                </label>
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder={t("addCrop.cropNamePlaceholder")}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("addCrop.variety")}
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder={t("addCrop.varietyPlaceholder")}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("addCrop.plantingDate")}
                </label>
                <input
                  type="date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("addCrop.harvestingDate")}
                </label>
                <input
                  type="date"
                  value={harvestingDate}
                  onChange={(e) => setHarvestingDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t("addCrop.addButton")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
