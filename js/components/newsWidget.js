import { NewsService } from '../services/newsService.js';

export class NewsWidget {
  constructor() {
    this.newsService = new NewsService();
    this.container = document.getElementById('businessNews');
  }

  async init() {
    await this.render();
  }

  async render() {
    const articles = await this.newsService.fetchTopHeadlines('business');

    if (!articles || articles.length === 0) {
      this.container.innerHTML = '<p>Unable to fetch news articles.</p>';
      return;
    }

    this.container.innerHTML = `
      <h2>Business News Headlines</h2>
      <div class="news-articles">
        ${articles.slice(0, 3).map(article => `
          <div class="news-article">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.link}" target="_blank">Read more</a>
          </div>
        `).join('')}
      </div>
    `;
  }
}