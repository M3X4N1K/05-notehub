
import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Оновлений робочий токен для TMDB API
const DEMO_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWE0N2JlZTIwODExYzJlMTZiMWZkNDE2MTE2YmE4NCIsIm5iZiI6MTc2MzMwODQzMy4wMzUsInN1YiI6IjY5MTlmMzkxOTY1YjM1YmIyMzlhZTgxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GLEvCTL79qMh6E_SEgQdMz5akL68ja57pAmnZzLPzmk';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN || DEMO_TOKEN;

  const response = await axios.get<TMDBResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );

  return response.data.results;
};