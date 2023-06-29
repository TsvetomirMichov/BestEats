import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const orderAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = orderAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/getAllUsers',
                method: 'GET',
                credentials:'include',
            }),
            onQueryStarted:async (arg, { dispatch, queryFulfilled })=>{
                try {
                    const { products } = await queryFulfilled;
                    if(products) return products

                  } catch (error) {
                    console.log(error);
                  }
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        updateUser: builder.mutation({
            query: ({ id }) => ({
                url: `/updateUser/${id}`,
                method: 'PUT',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/deleteUser/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
})

export const {
   useGetUsersQuery,
   useDeleteUserMutation,
   useUpdateUserMutation
} = usersApiSlice

// returns the query result object
export const selectNotesResult = usersApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrdersIds
    // Pass in a selector that returns the notes slice of state
} = orderAdapter.getSelectors(state => selectNotesData(state) ?? initialState)