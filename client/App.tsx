import "./global.css";
import "./i18n/config";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropRecommendation from "./pages/CropRecommendation";
import FinancialManagement from "./pages/FinancialManagement";
import AddCrop from "./pages/AddCrop";
import ViewCrops from "./pages/ViewCrops";
import ExpertConsultation from "./pages/ExpertConsultation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
          <Route path="/financial-management" element={<FinancialManagement />} />
          <Route path="/add-crop" element={<AddCrop />} />
          <Route path="/view-crops" element={<ViewCrops />} />
          <Route path="/expert-consultation" element={<ExpertConsultation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
