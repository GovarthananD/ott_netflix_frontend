import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk("movies", async () => {
    const response = await axios.get("https://ott-netflix-backend.onrender.com/allMovies");
    return response.data;
});


const dataSlice = createSlice({
    name: "movies",
    initialState: {
        isModalOpen:false,
        movies: [],
        status: "idle",
        error: null,
        selectedData:null,
    },

    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.selectedData = action.payload;
        },
        closeModal:(state) => {
            state.isModalOpen = false;
            state.selectedData = null;
        },
        setSelectedData:(state, action) => {
            state.selectedData = action.payload;
          },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "Loading...";
            })

            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.movies = action.payload;
            })

            .addCase(fetchData.rejected, (state, action) => {
                state.status = "Failed!";
                state.error = action.error.message;
            });
    }
});

export const {openModal, closeModal, selectedData} = dataSlice.actions;
export default dataSlice.reducer;


