export const LOCAL_STORAGE_KEY = {
  SEARCH_TERM: 'searchTerm',
  THEME: 'theme',
} as const;

export const URL_PARAM = {
  PAGE: 'page',
  SEARCH: 'searchTerm',
  DETAILS: 'details',
} as const;

export const API_URL = 'https://swapi.dev/api/people';

export const API_QUERY = {
  PAGE: 'page',
  SEARCH: 'search',
} as const;

export const API_ITEMS_PER_PAGE = 10;

export const API_INITIAL_PAGE = '1';
