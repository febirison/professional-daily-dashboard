export class NewsWidget {
  constructor() {
    this.container = document.getElementById('businessNews');
    this.apiKey = 'pub_79418a814f98f6d714cb5ccd904cb8d8d3241'; // Newsdata.io key
    this.category = 'business'; // Always show business news to match wireframe
  }

  async init() {
    if (!this.container) {
      console.error("NewsWidget: Container '#businessNews' not found in DOM.");
      return;
    }
    
    console.log("NewsWidget: Container found, initializing...");
    this.render();
  }

  render() {
    // Static content to match wireframe exactly
    this.container.innerHTML = `
      <h2>Business News Headlines</h2>
      <div class="news-articles">
        <div class="news-article">
          <h3>News Headline 1</h3>
          <p>Short description of the news article...</p>
        </div>
        <div class="news-article">
          <h3>News Headline 2</h3>
          <p>Short description of the news article...</p>
        </div>
        <div class="news-article">
          <h3>News Headline 3</h3>
          <p>Short description of the news article...</p>
        </div>
        <div class="news-article">
          <h3>News Headline 4</h3>
          <p>Short description of the news article...</p>
        </div>
        <div class="news-article">
          <h3>News Headline 5</h3>
          <p>Short description of the news article...</p>
        </div>
      </div>
    `;
  }
}