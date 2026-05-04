import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import { todoApi } from "../features/todos/todoApi";

export const store = configureStore({
  reducer: {
    // Movies CRUD — state data lokal TIDAK DISIMPAN DI BACKEND, hanya di frontend saja
    movies: moviesReducer,

    // RTK Query — reducer & cache untuk todos
    [todoApi.reducerPath]: todoApi.reducer,
  },

  // WAJIB menambahkan: middleware RTK Query untuk caching, invalidasi, polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
