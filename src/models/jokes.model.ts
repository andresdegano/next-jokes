export interface JokeModel {
  Body: string;
  Title: string;
  Views: number;
  Author: string;
  CreatedAt: string;
}

export interface Joke extends JokeModel {
  id: string;
}

export interface PaginatedJokes {
  jokes: Joke[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  order: string;
  query: string;
}
