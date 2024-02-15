import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    customers:[]
}
export const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        },
        setCustomersData: (state, action) => {
            state.customers = action.payload;
        }
    }
})

export const { setUserList, setCustomersData } = userSlice.actions;
export default userSlice.reducer;