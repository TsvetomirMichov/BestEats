import {  createSlice } from '@reduxjs/toolkit'

type CartType = {
  id: number,
  title: string,
  desc: string,
  price: number,
  quantity: number

}

type CartState = {
  products: CartType[]
}

const initialState: CartState = {
  products:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id)

      if (item) {
        item.quantity += action.payload.quantity;
      }
      else {
        state.products.push(action.payload)
      }
    },
    removeItem: (state, action:any | null) => {
      state.products = state.products.filter(item => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.products = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeItem, resetCart } = cartSlice.actions

export default cartSlice