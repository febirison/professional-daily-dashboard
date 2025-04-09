console.log("Professional Daily Dashboard initialized");

import { WeatherWidget } from './components/weatherWidget.js'; // Import Weather Widget
import { NewsWidget } from './components/newsWidget.js'; // Import News Widget

const weatherWidget = new WeatherWidget(); // Initialize Weather Widget
weatherWidget.init();

const newsWidget = new NewsWidget(); // Initialize News Widget
newsWidget.init();