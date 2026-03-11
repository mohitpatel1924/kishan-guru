const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  location: string;
}

export interface ForecastDay {
  date: string;
  temperature: number;
  condition: string;
  rainChance: number;
}

export async function getCurrentWeather(city: string = 'Mumbai'): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE}/weather?q=${city},IN&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      console.error('Weather API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      rainfall: data.rain?.['1h'] || 0,
      location: `${data.name}, India`,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

export async function getWeatherForecast(city: string = 'Mumbai'): Promise<ForecastDay[]> {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE}/forecast?q=${city},IN&appid=${WEATHER_API_KEY}&units=metric&cnt=3`
    );
    
    if (!response.ok) {
      console.error('Forecast API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return data.list.map((item: any, index: number) => ({
      date: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 'Day 3',
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].main,
      rainChance: Math.round((item.pop || 0) * 100), // Probability of precipitation
    }));
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return [];
  }
}

export function getWeatherConditionTranslation(condition: string): string {
  const conditions: { [key: string]: string } = {
    'Clear': 'Sunny',
    'Clouds': 'Partly Cloudy',
    'Rain': 'Rainy',
    'Drizzle': 'Rainy',
    'Thunderstorm': 'Stormy',
    'Snow': 'Snowy',
    'Mist': 'Misty',
    'Fog': 'Foggy',
  };
  
  return conditions[condition] || condition;
}
