import { QuoteService } from '../services/quoteService.js';

export class QuoteWidget {
  constructor() {
    this.quoteService = new QuoteService();
    this.container = document.getElementById('dailyMotivation');
  }

  async init() {
    await this.render();
  }

  async render() {
    const quote = await this.quoteService.fetchRandomQuote();

    if (!quote) {
      this.container.innerHTML = '<p>Unable to fetch a quote.</p>';
      return;
    }

    this.container.innerHTML = `
      <h2>Daily Motivation</h2>
      <blockquote>
        <p>"${quote.content}"</p>
        <footer>— ${quote.author}</footer>
      </blockquote>
    `;
  }
}