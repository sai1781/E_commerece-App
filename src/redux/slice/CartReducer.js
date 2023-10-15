const {createSlice} = require('@reduxjs/toolkit');
const {create} = require('../../../Backend/src/models/user.model');

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //Here we are writing this logic to check whether the cart is having any item ot not...
      //If it is haivng any item then we can add another or pushing directly
      const itemPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeItem
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (itemPresent.quantity === 1) {
        itemPresent.quantity = 0;
        const removeItem = state.cart.filter(
          item => item.id !== action.payload.id,
        );
        state.cart = removeItem
      }else{
        itemPresent.quantity--;
      }
    },
    cleanCart:(state,action)=>{
        state.cart = [];
    }
  },
});

export const {addToCart, removeFromCart,incrementQuantity,decrementQuantity,cleanCart} = CartSlice.actions;
export default CartSlice.reducer;
export {CartSlice}