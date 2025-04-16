export class QuoteWidget {
  constructor() {
    this.container = document.getElementById('dailyMotivation');
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds delay between retries
    // Local cache of quotes as a fallback
    this.localQuotes = [
      { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { content: "Success is not the absence of obstacles, but the courage to push through.", author: "Unknown" },
      { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
      { content: "The best way to predict the future is to create it.", author: "Peter Drucker" }
    ];
  }

  async init() {
    if (!this.container) {
      console.error("QuoteWidget: Container '#dailyMotivation' not found.");
      return;
    }
    
    console.log("QuoteWidget: Container found, initializing...");
    await this.fetchQuote();
  }

  async fetchQuote(attempt = 1) {
    try {
      this.container.innerHTML = `
        <h2>Daily Motivation</h2>
        <div class="quote-content">
          <p>Loading quote...</p>
        </div>
      `;

      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        if (response.status === 429 && attempt <= this.maxRetries) {
          console.warn(`QuoteWidget: Rate limit hit, retrying (${attempt}/${this.maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          return this.fetchQuote(attempt + 1);
        }
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
      // Use a random local quote if API fails after retries
      const randomLocalQuote = this.localQuotes[Math.floor(Math.random() * this.localQuotes.length)];
      this.render(randomLocalQuote);
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