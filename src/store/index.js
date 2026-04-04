import { configureStore } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookies';
import { readReviewsFromCookie } from '../utils/reviewsStorage';
import { apiConsoleReducer } from './slices/apiConsoleSlice';
import { preloadReducer } from './slices/preloadSlice';
import { reviewsReducer } from './slices/reviewsSlice';
import { themeReducer } from './slices/themeSlice';

function initialThemeMode() {
  const raw = getCookie('theme');
  return raw === 'dark' ? 'dark' : 'light';
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    reviews: reviewsReducer,
    preload: preloadReducer,
    apiConsole: apiConsoleReducer,
  },
  preloadedState: {
    theme: { mode: initialThemeMode() },
    reviews: { items: readReviewsFromCookie() },
  },
});
