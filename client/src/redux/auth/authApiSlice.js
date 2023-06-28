import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials } from "./AuthSlice";

export const authApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                credentials:'include',
                body:{...credentials},
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET',
                credentials:'include',
            }),
             onQueryStarted:async (arg, { dispatch, queryFulfilled })=>{
                try {
                    const { data } = await queryFulfilled;
                    // console.log("Data from refresh ",data)
                    const { accessToken } = data;
                    // console.log("accessToken from refresh ",accessToken)
                    dispatch(setCredentials({ accessToken }));
                  } catch (error) {
                    console.log(error);
                  }
            }
        }),
        logout:builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
             onQueryStarted:async (arg, { dispatch, queryFulfilled })=>{
                try {
                    // console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const { useLoginMutation ,useRefreshMutation ,useLogoutMutation } = authApiSlice