import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCatFactText, fetchProductById, fetchRandomJoke } from '../../services/externalApi';

const initialState = {
  status: 'idle',
  joke: null,
  jokeError: null,
  catFact: null,
  catError: null,
  sampleProduct: null,
  productError: null,
};

export const preloadPublicApiData = createAsyncThunk('preload/publicApi', async () => {
  const [jokeR, catR, productR] = await Promise.allSettled([
    fetchRandomJoke(),
    fetchCatFactText(),
    fetchProductById(1),
  ]);

  return {
    joke: jokeR.status === 'fulfilled' ? jokeR.value : null,
    jokeError: jokeR.status === 'rejected' ? String(jokeR.reason) : null,
    catFact: catR.status === 'fulfilled' ? catR.value : null,
    catError: catR.status === 'rejected' ? String(catR.reason) : null,
    sampleProduct: productR.status === 'fulfilled' ? productR.value : null,
    productError: productR.status === 'rejected' ? String(productR.reason) : null,
  };
});

const preloadSlice = createSlice({
  name: 'preload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(preloadPublicApiData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(preloadPublicApiData.fulfilled, (state, action) => {
        state.status = 'success';
        state.joke = action.payload.joke;
        state.jokeError = action.payload.jokeError;
        state.catFact = action.payload.catFact;
        state.catError = action.payload.catError;
        state.sampleProduct = action.payload.sampleProduct;
        state.productError = action.payload.productError;
      })
      .addCase(preloadPublicApiData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const preloadReducer = preloadSlice.reducer;
