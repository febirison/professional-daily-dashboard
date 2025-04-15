console.log("Professional Daily Dashboard initialized");

import { WeatherWidget } from './components/weatherWidget.js';
import { NewsWidget } from './components/newsWidget.js';
import { QuoteWidget } from './components/quoteWidget.js';

const weatherWidget = new WeatherWidget();
weatherWidget.init();

const newsWidget = new NewsWidget();
newsWidget.init();

const quoteWidget = new QuoteWidget();
quoteWidget.init();

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}