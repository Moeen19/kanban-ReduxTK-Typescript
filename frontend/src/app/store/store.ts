import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../services/todoSlice";
import { userApi } from "../services/userSlice";

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware, userApi.middleware),
})