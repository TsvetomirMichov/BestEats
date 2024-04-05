import { apiSlice } from "../api/apiSlice";

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => ({
                url: '/getAllProducts',
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) return data

                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Product']
        }),
        getSignleProduct: builder.query({
            query: (id) => ({
                url: `/getSingleProduct/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) return data
                    
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Product']
        }),
        getRelatedProducts : builder.query({
            query: (category)=>({
                url:`/getRelatedProducts/${category}`,
                method: "GET",
                credentials: 'include',

            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) return data

                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ({ initialNote }) => ({
                url: '/updateProduct',
                method: 'PUT',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/deleteProduct/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        getSeachData: builder.query({
            query: () => ({
                url: '/getAllProducts',
                method: 'GET',
                credentials: 'include',
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) return data

                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Product']

        }),
    }),
})

export const {
    useGetAllProductsQuery,
    useGetRelatedProductsQuery,
    useGetSeachDataQuery,
    useGetSignleProductQuery,
    useDeleteProductMutation,
    useUpdateProductMutation

} = notesApiSlice

