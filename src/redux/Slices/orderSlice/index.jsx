import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    newOrders: [],
    mydata: [],
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        }
    }
})

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer