export class WeatherWidget {
  constructor() {
    this.container = document.getElementById('weatherForecast');
  }

  init() {
    if (!this.container) {
      console.error('Weather widget container not found!');
      return;
    }

    console.log('Weather widget initialized.');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <h2>Weather Forecast</h2>
      <div class="weather-content">
        <div class="weather-main">
          <div class="current-temp">72°F</div>
          <div class="weather-condition">Sunny</div>
        </div>
      </div>
    `;
  }
}