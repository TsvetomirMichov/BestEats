import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({
    baseUrl: 'http://localhost:1337',
    credentials:'include',
    prepareHeaders:(headers,{ getState })=>{
        const token=getState().auth.token
        // console.log("Token from baseQUery: ",token)
        if(token){
            // console.log(token)
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery:baseQuery,
    tagTypes: ['Note','User'],
    endpoints: builder => ({})
})