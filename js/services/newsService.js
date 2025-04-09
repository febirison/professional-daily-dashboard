import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

const API_KEY = '1fea41509314400f94ba71175171a0ac'; // API KEY
const BASE_URL = 'https://newsapi.org/v2';

export class NewsService {
  async fetchTopHeadlines(category = 'business') {
    const cacheKey = `news-${category}`;
    const cached = getLocalStorage(cacheKey);
    if (cached && Date.now() - cached.timestamp < 3600000) {
      return cached.data;
    }

    try {
      const response = await fetch(`${BASE_URL}/top-headlines?category=${category}&apiKey=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      console.log('NewsAPI Response:', data); // Debug log
      setLocalStorage(cacheKey, { data: data.articles, timestamp: Date.now() });
      return data.articles;
    } catch (error) {
      console.error('News fetch error:', error);
      return [];
    }
  }
}