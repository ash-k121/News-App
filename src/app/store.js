// store.js
import { configureStore } from '@reduxjs/toolkit';
import articleReducer, { fetchInitialArticles } from '../features/article/articleSlice'

export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
});

store.dispatch(fetchInitialArticles());
