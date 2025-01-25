import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://www.omdbapi.com';
const API_KEY = "b0a1684e";

interface MovieState {
  movies: any[];
  totalResults: number;
  searchMovie: string;
  typeMovie: string;
  currentPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  status: "idle",
  error: null,
  totalResults: 0,
  searchMovie: "Pokemon",
  typeMovie: "",
  currentPage: 1
};

//GET MOVIES
export const fetchMovies = createAsyncThunk("movies/fetchMovies",
  async ({ search, page, type, year } : { search: string; page: number; type?: string; year?: string }) => {
    const params = new URLSearchParams({ apikey: API_KEY });

    if (search) params.append("s", search);
    if (page) params.append("page", page.toString());
    if (type) params.append("type", type);
    if (year) params.append("y", year);

    const response = await axios.get(`${URL}/?${params.toString()}`);
    return response.data;
  }
);

//GET MOVIE DETAIL
export const fetchMovieDetails = createAsyncThunk("movies/fetchMovieDetails",
  async (imdbID: string) => {
    const params = new URLSearchParams({ apikey: API_KEY, i: imdbID, plot: "full" });

    const response = await axios.get(`${URL}/?${params.toString()}`);
    return response.data;
  }
);

const movieSlice = createSlice({name: "movies", initialState,
  reducers: {
    setSearchMovie(state, action) {
      state.searchMovie = action.payload;
    },
    setType(state, action) {
      state.typeMovie = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (state.totalResults !== parseInt(action.payload.totalResults) || state.movies.length !== action.payload.Search?.length) {
          state.status = "succeeded";
          state.movies = action.payload.Search || [];
          state.totalResults = parseInt(action.payload.totalResults) || 0;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Bir hata oluştu.";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        const updatedMovies = state.movies.map((movie) =>
          movie.imdbID === action.payload.imdbID ? { ...movie, ...action.payload } : movie
        );
        state.movies = updatedMovies;
      });
  }
});

export const { setSearchMovie, setType, setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;