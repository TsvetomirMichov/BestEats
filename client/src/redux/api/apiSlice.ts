import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://besteats-production.up.railway.app/',
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        // console.log("Token from baseQUery: ",token)
        if (token) {
            // console.log(token)
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Product','Order', 'User','Restaurant',"Cart"],
    endpoints: (build) => ({})
})
