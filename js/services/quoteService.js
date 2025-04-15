import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

export class QuoteService {
  async fetchRandomQuote() {
    const cacheKey = 'daily-quote';
    const cached = getLocalStorage(cacheKey);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    if (cached && cached.date === today) {
      return cached.data;
    }

    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) throw new Error('Failed to fetch quote');
      const data = await response.json();
      setLocalStorage(cacheKey, { data: { content: data.content, author: data.author }, date: today });
      return { content: data.content, author: data.author };
    } catch (error) {
      console.error('Quote fetch error:', error);
      return null;
    }
  }
}