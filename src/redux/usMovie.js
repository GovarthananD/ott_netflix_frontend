import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const FetchUSMovie = createAsyncThunk("usMovieData", async () => {
    const response = await axios.get("https://ott-netflix-backend.onrender.com/usMovies");
    return response.data;
});


const movieSlice = createSlice({
    name:"usMovieData",
    initialState:{
        isModalOpenUS:false,
        shows:[],
        status:"idle",
        error:null,
        selectedUS:null,
    },
    reducers:{
        openModalUS:(state,action)=>{
            state.isModalOpenUS = true;
            state.selectedUS = action.payload;
        },

        closeModalUS:(state)=>{
            state.isModalOpenUS = false;
            state.selectedUS = null;
        }
    },

    extraReducers:(builder)=>{
            builder
            .addCase(FetchUSMovie.pending, (state) => {
                state.status = "Loading..."
            })
    
            .addCase(FetchUSMovie.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.usMovieData = action.payload;
            })
    
            .addCase(FetchUSMovie.rejected, (state,action) => {
                state.status = "Failed!";
                state.error = action.error.message;
            });
        }
});


export const {openModalUS, closeModalUS} = movieSlice.actions;
export default movieSlice.reducer;