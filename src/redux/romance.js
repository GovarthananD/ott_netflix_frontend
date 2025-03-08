import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const FetchRomance = createAsyncThunk("romance", async () => {
    const response = await axios.get("https://ott-netflix-backend.onrender.com/romance");
    return response.data;
});


const romanceSlice = createSlice({
    name:"romance",
    initialState:{
        isOpenModalRomance:false,
        shows:[],
        status:"idle",
        error:null,
        selectedRomance:null,
    },
    reducers:{
        openRomanceModal:(state, action) => {
            state.isOpenModalRomance = true;
            state.selectedRomance = action.payload;
        },

        closeRomanceModal:(state) => {
            state.isOpenModalRomance = false;
            state.selectedRomance = null;
        }
    },

    extraReducers:(builder)=>{
            builder
            .addCase(FetchRomance.pending, (state) => {
                state.status = "Loading..."
            })
    
            .addCase(FetchRomance.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.romance = action.payload;
            })
    
            .addCase(FetchRomance.rejected, (state,action) => {
                state.status = "Failed!";
                state.error = action.error.message;
            });
        }
})


export const {openRomanceModal, closeRomanceModal} = romanceSlice.actions;
export default romanceSlice.reducer;