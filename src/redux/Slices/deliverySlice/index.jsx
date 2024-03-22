import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deliveryList: [],
}
const VendorSlice = createSlice({
    name: 'Vendor',
    initialState,
    reducers: {
        setDeliveryList: (state, action) => {
            state.deliveryList = action.payload
        }
    }
})

export const { setDeliveryList } = VendorSlice.actions

export default VendorSlice.reducer