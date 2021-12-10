import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Product } from 'models';

export interface CartState {
  items: { [itemId: string]: number };
  cartList: Product[];
  quantity: number;
}

const initialState: CartState = {
  items: {},
  cartList: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      // console.log('id  product: ', id);

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
      console.log('ID: ', id, 'QUANTITY: ', quantity);
    },
  },
});

//Actions
export const cartActions = cartSlice.actions;

//Selectors
export const selectCartList = (state: RootState) => state.cartReducer.cartList;

export const getNumberItems = createSelector(
  (state: RootState) => state.cartReducer.items,
  (items) => {
    let numItems = 0;
    for (let id in items) {
      numItems += items[id];
    }
    return numItems;
  }
)

export const getTotalPrice = createSelector(
  (state: RootState) => state.cartReducer.items,
  (state: RootState) => state.productReducer.list,
  (items, products) => {
    let total = 0;
    for (let id in items) {
      const item = products.find((pro) => pro.id === id);
      total += item?.price || 0;
    }
    return total;
  }
);

const cartReducer = cartSlice.reducer;
export default cartReducer;
