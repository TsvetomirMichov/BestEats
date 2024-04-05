import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    token: null,
    review: number
}

const initialState: AuthState = {
    token: null,
    review: 0
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
        logOut: (state: any | null) => {
            state.token = null;
        },
        setUserReview: (state, action) => {
            state.review = action.payload
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice;
export const selectCurrentToken = (state: any) => state.auth.token
