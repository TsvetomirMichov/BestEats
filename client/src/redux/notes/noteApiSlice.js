import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/getAllProducts',
            validateStatus: (response) => {
                return response.status === 200
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
        }),
        // getSeachData: builder.query({
        //     query: () => '/getAllProducts',
        //     validateStatus: (response) => {
        //         return response.status === 200
        //     },
        //     transformResponse: responseData => {
        //         const loadedNotes = responseData.map(note => {
                    
        //         });
        //         return loadedNotes
        //     },
          
        // }),
        getSignleProduct: builder.query({

            query: ({ id }) => `/getSingleProduct/${id}`,
            validateStatus: (response) => {
                return response.status === 200
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
        }),
        updateRecepi: builder.mutation({
            query: ({ initialNote }) => ({
                url: '/updateProduct',
                method: 'PUT',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
            deleteNote: builder.mutation({
                query: ({ id }) => ({
                    url: `/deleteProduct/${id}`,
                    method: 'DELETE',
                    body: { id }
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Note', id: arg.id }
                ]
            }),
            getSeachData: builder.query({
                query: () => ({
                    url: '/getAllProducts',
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
                    { type: 'Note', id: arg.id }
                ]
            }),
    }),
})

export const {
    useGetNotesQuery,
    useDeleteNoteMutation,
    useGetSeachDataQuery,
    useUpdateRecepiMutation,
    useGetSignleProductQuery
} = notesApiSlice

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)