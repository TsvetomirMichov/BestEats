import { apiSlice } from "../api/apiSlice"

export const cartSliceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query: ({ orderDetails, userName, phone, totalPrice ,date }) => ({
                url: "/createOrder",
                method: "POST",
                body: { orderDetails, userName, phone, totalPrice, date},
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        })
    })
})

export const { useCreateNewOrderMutation } = cartSliceApi
