export class QuoteWidget {
  constructor() {
    this.container = document.getElementById('dailyMotivation');
  }

  async init() {
    if (!this.container) {
      console.error("QuoteWidget: Container '#dailyMotivation' not found.");
      return;
    }
    
    console.log("QuoteWidget: Container found, initializing...");
    await this.fetchQuote();
  }

  async fetchQuote() {
    try {
      this.container.innerHTML = `
        <h2>Daily Motivation</h2>
        <div class="quote-content">
          <p>Loading quote...</p>
        </div>
      `;

      const response = await fetch('https://zenquotes.io/api/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("QuoteWidget: Fetched data:", data);

      if (data && data.length > 0) {
        this.render(data[0]);
      } else {
        throw new Error("No quote found.");
      }
    } catch (error) {
      console.error("QuoteWidget: Error fetching quote:", error);
      this.container.innerHTML = `
        <h2>Daily Motivation</h2>
        <div class="quote-content">
          <p>Unable to load quote. Please try again later.</p>
        </div>
      `;
    }
  }

  render(quoteData) {
    const quote = quoteData.q || "No quote available";
    const author = quoteData.a || "Unknown";

    this.container.innerHTML = `
      <h2>Daily Motivation</h2>
      <div class="quote-content">
        <blockquote>
          "${quote}"
        </blockquote>
        <cite>— ${author}</cite>
      </div>
    `;
  }
}