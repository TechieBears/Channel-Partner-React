import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newOrders: [],
    orderStatus: []
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            return {
                ...state,
                newOrders: [...state.newOrders, action.payload]
            }
        },
        setOrderStatus: (state, action) => {
            return {
                ...state,
                orderStatus: [...state.orderStatus, action.payload]
            }
        }
    }
})

export const { setOrders, orderStatus } = orderSlice.actions;

export default orderSlice.reducer