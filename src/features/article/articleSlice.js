import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = "d427070e8ae140738dd32e1703072fe9";

const initialState = {
  articles: [],
  category: '',
  selectedArticle: '',
  status: 'idle', 
  error: null,
};

export const fetchInitialArticles = createAsyncThunk(
  'articles/fetchInitialArticles',
  async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`);
      return response.data.articles;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchArticlesByCategory = createAsyncThunk(
  'articles/fetchByCategory',
  async (categoryName) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${categoryName}&apiKey=${API_KEY}`);
      return response.data.articles;
    } catch (error) {
      throw error;
    }
  }
);

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchInitialArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchArticlesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setArticles, setCategory, setSelectedArticle } = articleSlice.actions;

export default articleSlice.reducer;
