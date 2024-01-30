import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorList: [],

}
const VendorSlice = createSlice({
    name: 'Vendor',
    initialState,
    reducers: {
        setVendorList: (state, action) => {
            state.vendorList = action.payload
        }
    }
})

export const { setVendorList } = VendorSlice.actions

export default VendorSlice.reducer