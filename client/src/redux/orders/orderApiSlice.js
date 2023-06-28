import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const orderAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = orderAdapter.getInitialState()

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // getOrders: builder.query({
        //     query: () => '/getAllOrders',
        //     validateStatus: (response) => {
        //         return response.status === 200
        //     },
        //     transformResponse: responseData => {
        //         const loadedNotes = responseData.map(note => {
        //             note.id = note._id
        //             return note
        //         });
        //         return orderAdapter.setAll(initialState, loadedNotes)
        //     },
        // }),
        getOrders: builder.query({
            query: () => ({
                url: '/getAllOrders',
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

// returns the query result object
export const selectNotesResult = ordersApiSlice.endpoints.getNotes.select()

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