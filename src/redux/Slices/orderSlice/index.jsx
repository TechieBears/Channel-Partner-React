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
        removeOrder: (state, action) => {
            console.log('action=========================', action.payload)
            const index = state.newOrders.findIndex(order => order?.orderId === action.payload.orderId)
            let newBasket = [...state.newOrders]

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.log(`cant remove the order ${action.payload.orderId} as it is not in the basket`)
            };
            state.newOrders = newBasket
        },
    }
})

export const { setOrders, removeOrder } = orderSlice.actions;

export default orderSlice.reducer