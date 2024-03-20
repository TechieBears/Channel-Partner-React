import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSessionStarted: false,
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionStarted: (state, action) => {
            state.isSessionStarted = action.payload
        }
    }
})

export const { setSessionStarted } = sessionSlice.actions

export default sessionSlice.reducer