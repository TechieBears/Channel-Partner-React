import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newOrders: [],
    acceptedOrder: [],
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // ======================= new Orders =================
        setOrders: (state, action) => {
            state.newOrders = [action.payload, ...state.newOrders]
        },
        removeOrder: (state, action) => {
            const index = state.newOrders.findIndex(order => order?.orderId === action.payload.orderId);
            let newBasket = [...state.newOrders];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.log(`Can't remove the order ${action.payload.orderId} as it is not in the basket`);
            }
            state.newOrders = newBasket;
        },
        clearOrders: (state) => {
            return {
                ...state,
                newOrders: []
            }
        },
        // =========================== accepted Orders =========================
        setAcceptedOrders: (state, action) => {
            state.acceptedOrder = [action.payload, ...state.acceptedOrder]
        },
        removeAcceptedOrder: (state, action) => {
            const index = state.acceptedOrder.findIndex(order => order?.orderId === action.payload.orderId);
            let newAcceptedOrder = [...state.acceptedOrder];

            if (index >= 0) {
                newAcceptedOrder.splice(index, 1);
            } else {
                console.log(`Can't remove the order ${action.payload.orderId} as it is not in the basket`);
            }
            state.acceptedOrder = newAcceptedOrder;
        },
        clearAcceptedOrders: (state) => {
            return {
                ...state,
                acceptedOrder: [] // Empty the acceptedOrder array
            }
        },
    }
});

export const { setOrders, removeOrder, clearOrders, setAcceptedOrders, removeAcceptedOrder, clearAcceptedOrders } = orderSlice.actions;

export default orderSlice.reducer;
