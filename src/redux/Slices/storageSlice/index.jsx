import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    availabalStorage: [],
    visitBooking: []
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        setStorageList: (state, action) => {
            state.list = action.payload
        },
        setAvailabalStorage: (state, action) => {
            state.availabalStorage = action.payload
        },
        setVisitBooking: (state, action) => {
            state.visitBooking = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setStorageList, setAvailabalStorage, setVisitBooking } = storageSlice.actions

export default storageSlice.reducer