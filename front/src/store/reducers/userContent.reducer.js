import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "constants";
import safeLocalStorage from "../../../src/safeLocalStorage";

export const toFavourites = createAsyncThunk(
  "userContent/toFavourites",
  async ({ owner, id, artist, title, preview }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.PLAYLISTS.FAVORITES.ADD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${safeLocalStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ owner, id, artist, title, preview }),
      });

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Failed to add to favourites");
      }
      return { id, artist, title, preview };
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchPersonalFavourites = createAsyncThunk(
  "userContent/fetchPersonalFavourites",
  async (owner, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.PLAYLISTS.FAVORITES.GET, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${safeLocalStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ owner }),
      });

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Failed to fetch favourites");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchPersonalUploads = createAsyncThunk(
  "userContent/fetchPersonalUploads",
  async (owner, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.TRACKS.UPLOADED, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${safeLocalStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ owner }),
      });

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Failed to fetch uploads");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const userContentSlice = createSlice({
  name: "userContent",
  initialState: {
    favourites: [],
    uploads: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favourites = [...state.favourites, action.payload];
      })
      .addCase(toFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchPersonalFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonalFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchPersonalFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchPersonalUploads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonalUploads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploads = action.payload;
      })
      .addCase(fetchPersonalUploads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userContentSlice.reducer;
