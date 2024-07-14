import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://kanban-reduxtk-typescript-production.up.railway.app/users" }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: { ...user }
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        }),
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/",
                method: "POST",
                body: user
            })
        })
    })
})

export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation } = userApi