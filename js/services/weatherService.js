import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

export class WeatherService {
  async fetchWeatherData(lat, lon) {
    const cacheKey = `weather-${lat}-${lon}`;
    const cached = getLocalStorage(cacheKey);
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
      return cached.data;
    }

    const API_KEY = '6c2984ad535e4008aeb154320250904'; // API KEY
    const BASE_URL = 'https://api.weatherapi.com/v1';

    try {
      // Fetch current weather and 5-hour forecast
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&hourly=5`
      );
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      setLocalStorage(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  }
}