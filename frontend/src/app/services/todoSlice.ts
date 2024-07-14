import { nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todo {
    user: string
    title: string
    description: string
    __v: string
    isDone: boolean
    _id: string
}

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://kanban-reduxtk-typescript-production.up.railway.app/todos" }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (token) => ({
                url: "getTodos",
                method: "POST",
                body: { token }
            }),
            providesTags: ["Todos"]
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: "/",
                method: todo.meth,
                body: todo
            }),
            invalidatesTags: ["Todos"],
            async onQueryStarted({ title, meth, description, token, _id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todoApi.util.updateQueryData("getTodos", token, (draft) => {
                        if (meth === "POST") {
                            draft.push({
                                title,
                                description,
                                __v: 1,
                                user: nanoid(),
                                _id: nanoid(),
                                isDone: false,
                            })
                        } else if (meth === "PUT") {
                            console.log("Current draft array:", draft);
                            const todoIndex = draft.findIndex((Todo: Todo) => Todo._id === _id);
                            console.log("Found index:", todoIndex);
                            draft[todoIndex] = { ...draft[todoIndex], title: title, description: description }
                        }
                    })
                )
                try {
                    const serverResponse = await queryFulfilled
                    // patchResult(serverResponse)
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        deleteTodo: builder.mutation({
            query: ({ _id, token }) => ({
                url: "/",
                method: "DELETE",
                body: { _id, token }
            }),
            invalidatesTags: ['Todos'],
            async onQueryStarted({ _id, token }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todoApi.util.updateQueryData("getTodos", token, (draft) => {
                        return draft.filter((todo: Todo) => todo._id !== _id)
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        updateTodoStatus: builder.mutation({
            query: ({ _id, status, token }) => ({
                url: "/",
                method: "PUT",
                body: { _id, status, token }
            }),
            invalidatesTags: ["Todos"],
            async onQueryStarted({ _id, status, token }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todoApi.util.updateQueryData("getTodos", token, (draft) => {
                        const todoIndex = draft.findIndex((Todo: Todo) => Todo._id === _id)
                        draft[todoIndex] = { ...draft[todoIndex], isDone: status }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }
        })
    })
})

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoStatusMutation } = todoApi