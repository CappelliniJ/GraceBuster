import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async (userId) => {
    const { data } = await axios.get(`/api/cart/${userId}`);
    return data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ userId, movieId }) => {
    const { data } = await axios.post(`/api/cart/${userId}/add`, { movieId });
    return data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ userId, movieId, quantity }) => {
    const { data } = await axios.put(`/api/cart/${userId}/update`, {
      movieId,
      quantity,
    });
    return data;
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, movieId }) => {
    await axios.delete(`/api/cart/${userId}/remove`, { data: { movieId } });
    return movieId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      const index = state.findIndex(
        (item) => item.Movie.id === action.payload.MovieId
      );
      if (index !== -1) {
        state[index].quantity = action.payload.quantity;
      }
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      return state.filter((item) => item.MovieId !== action.payload);
    });
  },
});

export default cartSlice.reducer;
