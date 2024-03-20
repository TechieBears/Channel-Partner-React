import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newOrders: [],
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            console.log('action.payload', action.payload)
            return {
                ...state,
                newOrders: [...state.newOrders, action.payload]
            }
        }
    }
})

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer