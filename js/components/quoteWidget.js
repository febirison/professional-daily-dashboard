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

      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("QuoteWidget: Fetched data:", data);

      if (data && data.content && data.author) {
        this.render(data);
      } else {
        throw new Error("Invalid quote data received.");
      }
    } catch (error) {
      console.error("QuoteWidget: Error fetching quote:", error);
      // Fallback to a static quote if API fails
      this.container.innerHTML = `
        <h2>Daily Motivation</h2>
        <div class="quote-content">
          <blockquote>
            "The only way to do great work is to love what you do."
          </blockquote>
          <cite>— Steve Jobs</cite>
        </div>
      `;
    }
  }

  render(quoteData) {
    const quote = quoteData.content || "No quote available";
    const author = quoteData.author || "Unknown";

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