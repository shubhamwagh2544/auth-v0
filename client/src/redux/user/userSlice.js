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
        },
        updateUserStart: (state) => {
            state.loading = true
            state.error = false
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = true
        },
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false
            state.error = false
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = true
        }
    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    inputHandleActive,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure } = userSlice.actions
export default userSlice.reducer