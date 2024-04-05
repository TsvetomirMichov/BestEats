import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/getAllUsers',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                try {
                  const { data } = await queryFulfilled
                  return data
                  // `onSuccess` side-effect
                } catch (err) {
                  // `onError` side-effect
                    
                }
              },
              providesTags: ['User']

        }),
        updateUser: builder.mutation({
            query: ({ id }) => ({
                url: `/updateUser/${id}`,
                method: 'PUT',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/deleteUser/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = usersApiSlice

