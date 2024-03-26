import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    roleIs: undefined,
    loggedUserDetails: undefined,
    FranchiseeDetails: [],
    vendorDetails: undefined
}
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoggedUser: (state, action) => {
            state.isLogged = action.payload
        },
        setRoleIs: (state, action) => {
            state.roleIs = action.payload
        },
        setLoggedUserDetails: (state, action) => {
            state.loggedUserDetails = action.payload
        },
        setFranchiseeDetails: (state, action) => {
            state.FranchiseeDetails = action.payload
        },
        setVendorDetails: (state, action) => {
            state.vendorDetails = action.payload
        }
    }
})

export const { setLoggedUser, setRoleIs, setLoggedUserDetails, setFranchiseeDetails, setConfigurations, setVendorDetails } = loginSlice.actions

export default loginSlice.reducer