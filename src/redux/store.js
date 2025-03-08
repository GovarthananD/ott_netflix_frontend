import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import topReducer from "./topSlice";
import tvReducer from "./tvShow";
import usMovieReducer from "./usMovie";
import romanceReducer from "./romance";
import europeReducer from "./europe";
import searchReducer from "./search";




export const store = configureStore({
    reducer:{
        movies:dataReducer,
        top10:topReducer,
        tvShows:tvReducer,
        usMovieData:usMovieReducer,
        romance:romanceReducer,
        europe:europeReducer,
        search: searchReducer,
    },
});

