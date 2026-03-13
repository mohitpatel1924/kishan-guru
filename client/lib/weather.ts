const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

export const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Chandigarh', state: 'Punjab' },
  { name: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'Patna', state: 'Bihar' },
  { name: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Nagpur', state: 'Maharashtra' },
  { name: 'Surat', state: 'Gujarat' },
  { name: 'Vadodara', state: 'Gujarat' },
  { name: 'Ludhiana', state: 'Punjab' },
  { name: 'Agra', state: 'Uttar Pradesh' },
  { name: 'Nashik', state: 'Maharashtra' },
  { name: 'Varanasi', state: 'Uttar Pradesh' },
  { name: 'Meerut', state: 'Uttar Pradesh' },
  { name: 'Rajkot', state: 'Gujarat' },
  { name: 'Amritsar', state: 'Punjab' },
  { name: 'Ranchi', state: 'Jharkhand' },
  { name: 'Guwahati', state: 'Assam' },
  { name: 'Bhubaneswar', state: 'Odisha' },
  { name: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Kochi', state: 'Kerala' },
  { name: 'Thiruvananthapuram', state: 'Kerala' },
];

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
      `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(city)},IN&appid=${WEATHER_API_KEY}&units=metric`
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
      location: `${data.name}, ${data.sys.country}`,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

export async function getWeatherForecast(city: string = 'Mumbai'): Promise<ForecastDay[]> {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE}/forecast?q=${encodeURIComponent(city)},IN&appid=${WEATHER_API_KEY}&units=metric&cnt=3`
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

export function getWeatherConditionKey(condition: string): string {
  const conditionMap: { [key: string]: string } = {
    'Clear': 'weather.clear',
    'Clouds': 'weather.clouds',
    'Rain': 'weather.rain',
    'Drizzle': 'weather.drizzle',
    'Thunderstorm': 'weather.thunderstorm',
    'Snow': 'weather.snow',
    'Mist': 'weather.mist',
    'Fog': 'weather.fog',
  };
  
  return conditionMap[condition] || 'weather.clear';
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
