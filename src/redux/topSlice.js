import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



export const top10data = createAsyncThunk("top10", async () => {
    const response = await axios.get("https://ott-netflix-backend.onrender.com/top10");
    return response.data;
});

const topSlice = createSlice({
    name:"top10",
    initialState:{
        isModalOpenTop:false,
        topdata:[],
        status:"idle",
        error:null,
        selectedTop:null,
    },
    reducers:{
        openTopModal:(state, action) => {
            state.isModalOpenTop = (true);
            state.selectedTop = action.payload;
        },
        closeTopModal:(state)=>{
            state.isModalOpenTop = (false);
            state.selectedTop = null;
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(top10data.pending, (state) => {
            state.status = "Loading..."
        })

        .addCase(top10data.fulfilled, (state, action) => {
            state.status = "Succeeded";
            state.top10 = action.payload;
        })

        .addCase(top10data.rejected, (state,action) => {
            state.status = "Failed!";
            state.error = action.error.message;
        });
    }
})

export const {openTopModal, closeTopModal} = topSlice.actions;
export default topSlice.reducer;