import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = false
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signInFailure: (state, action) => {
            state.loading = false
            //state.error = action.payload        // we can get error data
            state.error = true
        },
        inputHandleActive: (state) => {
            state.loading = false
            state.error = false
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, inputHandleActive } = userSlice.actions
export default userSlice.reducer