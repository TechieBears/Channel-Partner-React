import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []

}
export const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        }
    }
})

export const { setUserList } = userSlice.actions;
export default userSlice.reducer;