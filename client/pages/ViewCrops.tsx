import Header from "@/components/Header";
import { Leaf, Edit, Trash2, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Crop {
  id: string;
  cropName: string;
  variety: string;
  plantingDate: string;
  harvestingDate: string;
}

export default function ViewCrops() {
  const { t } = useTranslation();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = () => {
    const storedCrops = JSON.parse(localStorage.getItem("crops") || "[]");
    setCrops(storedCrops);
  };

  const deleteCrop = (id: string) => {
    const updatedCrops = crops.filter((crop) => crop.id !== id);
    setCrops(updatedCrops);
    localStorage.setItem("crops", JSON.stringify(updatedCrops));
  };

  const startEdit = (crop: Crop) => {
    setEditingCrop({ ...crop });
  };

  const cancelEdit = () => {
    setEditingCrop(null);
  };

  const saveEdit = () => {
    if (editingCrop) {
      const updatedCrops = crops.map((crop) =>
        crop.id === editingCrop.id ? editingCrop : crop
      );
      setCrops(updatedCrops);
      localStorage.setItem("crops", JSON.stringify(updatedCrops));
      setEditingCrop(null);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {t("viewCrops.title")}
                </h1>
                <p className="text-muted-foreground">
                  {t("viewCrops.subtitle")}
                </p>
              </div>
            </div>
            <Link
              to="/add-crop"
              className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t("viewCrops.addNew")}
            </Link>
          </div>

          {crops.length === 0 ? (
            <div className="bg-white rounded-lg p-12 shadow-sm border border-border text-center">
              <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {t("viewCrops.noCrops")}
              </p>
              <Link
                to="/add-crop"
                className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                {t("viewCrops.addFirst")}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border"
                >
                  {editingCrop?.id === crop.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editingCrop.cropName}
                        onChange={(e) =>
                          setEditingCrop({
                            ...editingCrop,
                            cropName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        value={editingCrop.variety}
                        onChange={(e) =>
                          setEditingCrop({
                            ...editingCrop,
                            variety: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="date"
                        value={editingCrop.plantingDate}
                        onChange={(e) =>
                          setEditingCrop({
                            ...editingCrop,
                            plantingDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="date"
                        value={editingCrop.harvestingDate}
                        onChange={(e) =>
                          setEditingCrop({
                            ...editingCrop,
                            harvestingDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                        >
                          {t("viewCrops.save")}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-foreground py-2 rounded-lg hover:bg-gray-300"
                        >
                          {t("viewCrops.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-green-100 p-2 rounded">
                          <Leaf className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(crop)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteCrop(crop.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {crop.cropName}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            {t("viewCrops.variety")}:{" "}
                          </span>
                          <span className="font-medium text-foreground">
                            {crop.variety}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            {t("viewCrops.planted")}:{" "}
                          </span>
                          <span className="font-medium text-foreground">
                            {new Date(crop.plantingDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            {t("viewCrops.harvest")}:{" "}
                          </span>
                          <span className="font-medium text-foreground">
                            {new Date(crop.harvestingDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
