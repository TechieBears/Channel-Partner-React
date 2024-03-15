import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newOrders: [],
    mydata:[],
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setNewOrdersList: (state, action) => {
            console.log("🚀 ~ file: index.jsx:11 ~ action:", action)
            return {
                ...state,
                newOrders: [...state.newOrders, action.payload]
            }
        },
    }
})

export const { setNewOrdersList,setMyData } = orderSlice.actions

export default orderSlice.reducer