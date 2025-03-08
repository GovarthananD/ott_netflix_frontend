import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const TVShowing = createAsyncThunk("tvShows", async () => {
    const response = await axios.get("https://ott-netflix-backend.onrender.com/tvShow");
    return response.data;
});


const tvSlice = createSlice({
    name:"tvShows",
    initialState:{
        isModalOpenTv:false,
        tvShows:[],
        status:"idle",
        error:null,
        selectedTV:null,
    },
    reducers:{
        openTvModal: (state,action) => {
            state.isModalOpenTv = true;
            state.selectedTV = action.payload;
        },
        closeTvModal:(state) => {
            state.isModalOpenTv = false;
            state.selectedTV = null;
        }
    },

    extraReducers:(builder)=>{
            builder
            .addCase(TVShowing.pending, (state) => {
                state.status = "Loading..."
            })
    
            .addCase(TVShowing.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.tvShows = action.payload;
            })
    
            .addCase(TVShowing.rejected, (state,action) => {
                state.status = "Failed!";
                state.error = action.error.message;
            });
        }
});


export const {openTvModal, closeTvModal} = tvSlice.actions;
export default tvSlice.reducer;