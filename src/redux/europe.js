import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const FetchEurope = createAsyncThunk("europe", async () => {
    const response = await axios.get("https://ott-netflix-backend.onrender.com/europe");
    return response.data;
});


const europeSlice = createSlice({
    name:"europe",
    initialState:{
        isOpenModalEurope:false,
        shows:[],
        status:"idle",
        error:null,
        selectedEurope:null,
    },
    reducers:{
        openEuropeModal:(state, action) => {
            state.isOpenModalEurope = true;
            state.selectedEurope = action.payload;
        },

        closeEuropeModal:(state) => {
            state.isOpenModalEurope = false;
            state.selectedEurope = null;
        }
    },

    extraReducers:(builder)=>{
            builder
            .addCase(FetchEurope.pending, (state) => {
                state.status = "Loading..."
            })
    
            .addCase(FetchEurope.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.europe = action.payload;
            })
    
            .addCase(FetchEurope.rejected, (state,action) => {
                state.status = "Failed!";
                state.error = action.error.message;
            });
        }
});


export const {openEuropeModal, closeEuropeModal} = europeSlice.actions;
export default europeSlice.reducer;