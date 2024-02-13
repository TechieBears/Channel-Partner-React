import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    banner: [],
    city: [],
    designation: [],
    temperatureRange: [],
    product: [],
    storeCategory: [],
    Category: [],
    SubCategory: [],
    Product: [],
    Orders: [],
    Franchise : [],
    FranchiseVendors : [],
}
export const masterSlice = createSlice({
    name: 'master',
    initialState: initialState,
    reducers: {
        setBanner: (state, action) => {
            state.banner = action.payload;
        },
        setCityNames: (state, action) => {
            state.city = action.payload;
        },
        setDesignation: (state, action) => {
            state.designation = action.payload;
        },
        setTempRange: (state, action) => {
            state.temperatureRange = action.payload;
        },
        setProductNames: (state, action) => {
            state.product = action.payload;
        },
        setStoreCategory: (state, action) => {
            state.storeCategory = action.payload;
        },
        setCategory: (state, action) => {
            state.Category = action.payload;
        },
        setSubCategory: (state, action) => {
            state.SubCategory = action.payload;
        },
        setProduct: (state, action) => {
            state.Product = action.payload;
        },
        setOrders: (state, action) => {
            state.Orders = action.payload;
        },
        setFranchise: (state, action) => {
            state.Franchise = action.payload;
        },
        setFranchiseVendors: (state, action) => {
            state.FranchiseVendors = action.payload;
        },
    }
})

export const { setCityNames, setDesignation, setTempRange, setProductNames, setStoreCategory, setCategory, setSubCategory, setProduct, setBanner, setOrders, setFranchise, setFranchiseVendors } = masterSlice.actions;
export default masterSlice.reducer;