export class QuoteWidget {
  constructor() {
    this.container = document.getElementById('dailyMotivation');
  }

  init() {
    if (!this.container) {
      console.error("QuoteWidget: Container '#dailyMotivation' not found.");
      return;
    }
    
    console.log("QuoteWidget: Container found, initializing...");
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <h2>Daily Motivation</h2>
      <div class="quote-content">
        <blockquote>
          "Success is not final, failure is not fatal: it is the courage to continue that counts."
        </blockquote>
        <cite>— Winston Churchill</cite>
      </div>
    `;
  }
}