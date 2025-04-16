export class WeatherWidget {
  constructor() {
    this.container = document.getElementById('weatherForecast');
    this.apiKey = 'a2080e2709ac6ae0d61a7f533078aade'; // OpenWeatherMap API key
    this.city = 'London'; // Default city
  }

  async init() {
    if (!this.container) {
      console.error('Weather widget container not found!');
      return;
    }

    console.log('Weather widget initialized.');
    await this.fetchWeather();
  }

  async fetchWeather() {
    try {
      this.container.innerHTML = `
        <h2>Weather Forecast</h2>
        <div class="weather-content">
          <div class="weather-main">
            <p>Loading weather...</p>
          </div>
        </div>
      `;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("WeatherWidget: Fetched data:", data);

      this.render(data);
    } catch (error) {
      console.error("WeatherWidget: Error fetching weather:", error);
      this.container.innerHTML = `
        <h2>Weather Forecast</h2>
        <div class="weather-content">
          <div class="weather-main">
            <p>Unable to load weather. Please try again later.</p>
          </div>
        </div>
      `;
    }
  }

  render(data) {
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main;

    this.container.innerHTML = `
      <h2>Weather Forecast</h2>
      <div class="weather-content">
        <div class="weather-main">
          <div class="current-temp">${temp}°F</div>
          <div class="weather-condition">${condition}</div>
        </div>
      </div>
    `;
  }
}