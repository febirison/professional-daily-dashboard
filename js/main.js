import { NewsWidget } from './components/newsWidget.js';
import { WeatherWidget } from './components/weatherWidget.js';
import { QuoteWidget } from './components/quoteWidget.js';

window.onload = function () {
  const newsWidget = new NewsWidget();
  const weatherWidget = new WeatherWidget();
  const quoteWidget = new QuoteWidget();

  newsWidget.init();
  weatherWidget.init();
  quoteWidget.init();
};