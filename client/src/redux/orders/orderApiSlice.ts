import { apiSlice } from "../api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => ({
                url: '/getAllOrders',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Order'],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) return data

                } catch (error) {
                    console.log(error);
                }
            },
        }),
        updateOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/updateOrder/${id}`,
                method: 'PUT',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetOrdersQuery,
    useUpdateOrderMutation

} = ordersApiSlice
