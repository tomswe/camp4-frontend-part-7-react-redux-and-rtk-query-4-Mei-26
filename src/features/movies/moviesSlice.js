import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

// State awal — data dummy bawaan
const initialState = {
  // buat object isinya key misal data atau nama movies, lalu isi dengan array of objects
  // tambah data lain misal loading, error, dsb sesuai kebutuhan
  list: [
    { id: nanoid(), title: "Interstellar", year: "2014", genre: "Sci-Fi" },
    { id: nanoid(), title: "The Dark Knight", year: "2008", genre: "Action" },
    { id: nanoid(), title: "Inception", year: "2010", genre: "Sci-Fi" },
  ],
  error: null,
};

const moviesSlice = createSlice({
  name: "movies", // Nama slice, digunakan sebagai prefix untuk action types NAMA YANG UNIK
  initialState: initialState,
  reducers: {
    // Tambah film baru
    // action.payload berisi objek film baru yang berisi id, title, year, dan genre.
    // Karena Redux Toolkit menggunakan Immer di balik layar, kita dapat menulis kode seperti
    // mutasi langsung (push ke array), sementara Immer yang menangani pembuatan state
    // baru secara imutabel.
    addMovie: (state, action) => {
      state.list.push(action.payload);
    },

    // Update film berdasarkan id
    // Cari indeks film yang id-nya sama dengan action.payload.id.
    // Jika ada, ganti item di posisi tersebut dengan data film baru dari payload.
    updateMovie: (state, action) => {
      const index = state.list.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        /// 1 !== -1 berarti film ditemukan
        state.list[index] = action.payload;
      }
    },

    // Hapus film berdasarkan id
    // Filter list film agar hanya tersisa film-film dengan id berbeda dari payload.
    deleteMovie: (state, action) => {
      state.list = state.list.filter((m) => m.id !== action.payload);
    },
  },
});

// Export action creators (di-generate otomatis oleh createSlice) diambil dari moviesSlice.actions
export const { addMovie, updateMovie, deleteMovie } = moviesSlice.actions;

// Export reducer untuk didaftarkan ke store
export default moviesSlice.reducer;
