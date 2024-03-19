import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRestaurants: [],
}

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setAllRestaurant: (state, action) => {
            state.allRestaurants = action.payload
        },
    }
})

export const { setAllRestaurant, } = restaurantSlice.actions

export default restaurantSlice.reducer;