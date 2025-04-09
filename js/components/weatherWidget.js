import { WeatherService } from '../services/weatherService.js';

export class WeatherWidget {
  constructor() {
    this.weatherService = new WeatherService();
    this.container = document.getElementById('weatherForecast');
  }

  async init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation success:', position.coords); // Debug log
          this.render(position.coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.container.innerHTML = '<p>Unable to fetch location. Using default (New York City).</p>';
          this.render({ latitude: 40.7128, longitude: -74.0060 }); // Fallback to NYC
        }
      );
    } else {
      this.container.innerHTML = '<p>Geolocation not supported. Using default (New York City).</p>';
      this.render({ latitude: 40.7128, longitude: -74.0060 });
    }
  }

  async render(coords) {
    const weatherData = await this.weatherService.fetchWeatherData(coords.latitude, coords.longitude);

    if (!weatherData || !weatherData.current || !weatherData.forecast) {
      this.container.innerHTML = '<p>Unable to fetch weather data.</p>';
      return;
    }

    const current = weatherData.current;
    const hourly = weatherData.forecast.forecastday[0].hour.slice(0, 5); // Next 5 hours

    this.container.innerHTML = `
      <h2>Weather Forecast</h2>
      <div class="current-weather">
        <p>${Math.round(current.temp_f)}°F</p>
        <p>${current.condition.text}</p>
        <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
      </div>
      <div class="hourly-forecast">
        ${hourly.map((hour) => `
          <div>
            <p>${new Date(hour.time).getHours() % 12 || 12}${new Date(hour.time).getHours() >= 12 ? 'PM' : 'AM'}</p>
            <p>${Math.round(hour.temp_f)}°F</p>
            <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" style="width: 32px; height: 32px;" />
          </div>
        `).join('')}
      </div>
    `;
  }
}