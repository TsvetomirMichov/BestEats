import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authSlice from "./auth/AuthSlice"
import { useSelector } from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import cartSlice from "./cart/cartSlice"

export const store = configureStore({
    // Add the generated reducer as a specific top-level slice
    reducer: {
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export const useAppselector = useSelector