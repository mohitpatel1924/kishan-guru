import Header from "@/components/Header";
import { Eye, DollarSign, AlertTriangle, TrendingUp, Sun, Leaf, Cloud, CloudRain } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getCurrentWeather, getWeatherForecast, getWeatherConditionTranslation, type WeatherData, type ForecastDay } from "@/lib/weather";

export default function Index() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      const weatherData = await getCurrentWeather('Mumbai');
      const forecastData = await getWeatherForecast('Mumbai');
      
      if (weatherData) setWeather(weatherData);
      if (forecastData.length > 0) setForecast(forecastData);
      setLoading(false);
    }
    
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain') || condition.includes('Drizzle')) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    } else if (condition.includes('Cloud')) {
      return <Cloud className="w-12 h-12 text-gray-400" />;
    }
    return <Sun className="w-12 h-12 text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {t("home.header")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("home.subheader")}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Crops Monitored */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {t("stats.cropsMonitored")}
                </p>
                <h3 className="text-3xl font-bold text-foreground">{t("stats.cropsMonitoredValue")}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("stats.cropsMonitoredDesc")}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Disease Detections */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {t("stats.diseaseDetections")}
                </p>
                <h3 className="text-3xl font-bold text-foreground">{t("stats.diseaseDetectionsValue")}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("stats.diseaseDetectionsDesc")}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {t("stats.activeAlerts")}
                </p>
                <h3 className="text-3xl font-bold text-foreground">{t("stats.activeAlertsValue")}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("stats.activeAlertsDesc")}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Yield Improvement */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {t("stats.yieldImprovement")}
                </p>
                <h3 className="text-3xl font-bold text-foreground">{t("stats.yieldImprovementValue")}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("stats.yieldImprovementDesc")}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Weather and Core Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t("weather.title")}
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading weather...</p>
              </div>
            ) : weather ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {weather.location}
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-foreground">
                        {weather.temperature}°C
                      </span>
                      {getWeatherIcon(weather.condition)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getWeatherConditionTranslation(weather.condition)}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-secondary p-3 rounded text-center">
                      <p className="text-muted-foreground text-xs mb-1">{t("weather.humidity")}</p>
                      <p className="font-semibold text-foreground">{weather.humidity}%</p>
                    </div>
                    <div className="bg-secondary p-3 rounded text-center">
                      <p className="text-muted-foreground text-xs mb-1">{t("weather.wind")}</p>
                      <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
                    </div>
                    <div className="bg-secondary p-3 rounded text-center">
                      <p className="text-muted-foreground text-xs mb-1">{t("weather.rainfall")}</p>
                      <p className="font-semibold text-foreground">{weather.rainfall.toFixed(1)}mm</p>
                    </div>
                  </div>

                  {forecast.length > 0 && (
                    <div className="border-t border-border pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-foreground mb-3">
                        {t("weather.forecast")}
                      </h3>
                      <div className="space-y-2 text-sm">
                        {forecast.map((day, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-muted-foreground w-20">{day.date}</span>
                            <span className="font-medium w-16">{day.temperature}°C</span>
                            <span className="text-muted-foreground flex-1 text-center">
                              {getWeatherConditionTranslation(day.condition)}
                            </span>
                            <span className="text-muted-foreground w-12 text-right">{day.rainChance}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Unable to load weather data</p>
                <p className="text-sm text-muted-foreground">{t("weather.location")}</p>
              </div>
            )}
          </div>

          {/* Core Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t("modules.coreModules")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Disease Detection */}
              <Link
                to="/disease-detection"
                className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t("disease.title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("disease.subtitle")}
                </p>
                <div className="bg-secondary p-3 rounded mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {t("disease.accuracy")}
                    </span>
                    <span className="font-semibold text-foreground">91%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "91%" }}
                    ></div>
                  </div>
                </div>
                <button className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  {t("disease.button")}
                </button>
              </Link>

              {/* Crop Recommendation */}
              <Link
                to="/crop-recommendation"
                className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded">
                    <svg
                      className="w-6 h-6 text-primary"
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
                  <h3 className="font-semibold text-foreground">
                    {t("crop.title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("crop.subtitle")}
                </p>
                <div className="bg-secondary p-3 rounded mb-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t("crop.match")}</span>
                    <p className="font-semibold text-foreground">94%</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  {t("crop.button")}
                </button>
              </Link>

              {/* Financial Management */}
              <Link
                to="/financial-management"
                className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t("financial.title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("financial.subtitle")}
                </p>
                <div className="bg-secondary p-3 rounded mb-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Track Expenses</span>
                    <p className="font-semibold text-foreground">Real-time</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Manage Finances
                </button>
              </Link>

              {/* Crop Management */}
              <Link
                to="/view-crops"
                className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t("viewCrops.title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("viewCrops.subtitle")}
                </p>
                <div className="bg-secondary p-3 rounded mb-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Crop Tracking</span>
                    <p className="font-semibold text-foreground">Monitor Progress</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  View Crops
                </button>
              </Link>

              {/* Expert Consultation */}
              <Link
                to="/expert-consultation"
                className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a4 4 0 00-4-4h-2a4 4 0 00-4 4v1h10z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t("expert.title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("expert.subtitle")}
                </p>
                <div className="bg-secondary p-3 rounded mb-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t("expert.online")}</span>
                    <p className="font-semibold text-primary">3 {t("expert.available")}</p>
                  </div>
                </div>
                <button className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  {t("expert.button")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
