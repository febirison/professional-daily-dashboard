import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

const API_KEY = 'pub_79418a814f98f6d714cb5ccd904cb8d8d3241'; // Newsdata.io API key
const BASE_URL = 'https://newsdata.io/api/1';

export class NewsService {
  async fetchTopHeadlines(category = 'business') {
    const cacheKey = `news-${category}`;
    const cached = getLocalStorage(cacheKey);
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
      return cached.data;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/latest?apikey=${API_KEY}&category=${category}&language=en`
      );
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      console.log('Newsdata.io Response:', data); // Debug log
      setLocalStorage(cacheKey, { data: data.results, timestamp: Date.now() });
      return data.results;
    } catch (error) {
      console.error('News fetch error:', error);
      return [];
    }
  }
}