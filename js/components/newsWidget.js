export class NewsWidget {
  constructor() {
    this.container = document.getElementById('businessNews');
    this.apiKey = 'pub_79418a814f98f6d714cb5ccd904cb8d8d3241'; // Newsdata.io key
    this.category = 'business'; 
  }

  async init() {
    if (!this.container) {
      console.error("NewsWidget: Container '#businessNews' not found in DOM.");
      return;
    }
    
    console.log("NewsWidget: Container found, initializing...");
    await this.fetchNews();
  }

  async fetchNews() {
    try {
      this.container.innerHTML = `
        <h2>Business News Headlines</h2>
        <div class="news-articles">
          <p>Loading news...</p>
        </div>
      `;

      const response = await fetch(
        `https://newsdata.io/api/1/news?category=${this.category}&language=en&apikey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("NewsWidget: Fetched data:", data);

      if (data.status === "success" && data.results && data.results.length > 0) {
        this.render(data.results);
      } else {
        throw new Error("No news articles found.");
      }
    } catch (error) {
      console.error("NewsWidget: Error fetching news:", error);
      this.container.innerHTML = `
        <h2>Business News Headlines</h2>
        <div class="news-articles">
          <p>Unable to load news. Please try again later.</p>
        </div>
      `;
    }
  }

  render(articles) {
    const newsArticles = articles.slice(0, 5).map(article => {
      const title = article.title || "No title available";
      const description = article.description || "No description available";
      return `
        <div class="news-article">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <h2>Business News Headlines</h2>
      <div class="news-articles">
        ${newsArticles}
      </div>
    `;
  }
}