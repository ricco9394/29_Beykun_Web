import { createSlice } from '@reduxjs/toolkit';
import { persistReviews } from '../../utils/reviewsStorage';

const initialState = {
  items: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview(state, action) {
      state.items.unshift(action.payload);
      persistReviews(state.items);
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
