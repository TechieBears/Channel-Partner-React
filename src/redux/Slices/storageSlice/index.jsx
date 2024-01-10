import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: {},
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        setStorageList: (state, action) => {
            state.list = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStorageList } = storageSlice.actions

export default storageSlice.reducer