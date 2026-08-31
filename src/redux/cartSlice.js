import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ADD PRODUCT
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (existingProduct) {
        existingProduct.quantity +=
          Number(product.quantity) || 1;
      } else {
        state.items.push({
          ...product,
          quantity: Number(product.quantity) || 1,
        });
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    // UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.items.find(
        (item) =>
          String(item.id) === String(id)
      );

      if (product) {
        product.quantity = Number(quantity);
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    // REMOVE PRODUCT
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          String(item.id) !==
          String(action.payload)
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    // CLEAR CART
    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;