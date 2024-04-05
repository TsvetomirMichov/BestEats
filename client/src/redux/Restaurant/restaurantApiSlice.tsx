import { apiSlice } from "../api/apiSlice";

export const restaurantApiSclice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurants: builder.query({
            query: () => ({
                url: "/restaurants",
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data) return data
                } catch (err) {
                    console.log(err)
                }
            },
            providesTags: ['Restaurant']
        }),

        getSignleRestaurant: builder.query({
            query: (id) => ({
                url: `/restaurants/${id}`,
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data) return data
                } catch (err) {
                    console.log(err)
                }
            },
            providesTags: ['Restaurant']

        }),
        getRestaurantMenuItems: builder.query({
            query: () => ({
                url: "/restaurants/menuItems",
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data) return data
                } catch (err) {
                    console.log(err)
                }
            },
            providesTags: ['Restaurant']

        }),
        deleteRestaurant: builder.mutation({
            query: ({ id }) => ({
                url: `/restaurants/${id}/restaurant`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Restaurant', id: arg.id }
            ]
        }),
        updateRestaurantRaiting: builder.mutation({
            query: ({ customerId, customerRaiting ,id }) => ({
                url: `/restaurant/${id}/raiting`,
                method: 'PUT',
                body: { customerId, customerRaiting }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Restaurant', id: arg.id }
            ]
        }),
        updateRestaurant: builder.mutation({
            query: ({ initialResaurant }) => ({
                url: '/restaurant',
                method: 'PUT',
                body: {
                    ...initialResaurant,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Restaurant', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetRestaurantsQuery,
    useGetSignleRestaurantQuery,
    useGetRestaurantMenuItemsQuery,
    useDeleteRestaurantMutation,
    useUpdateRestaurantRaitingMutation,
    useUpdateRestaurantMutation
} = restaurantApiSclice


