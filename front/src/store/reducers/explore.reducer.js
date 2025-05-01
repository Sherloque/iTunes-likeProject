import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "constants";
import safeLocalStorage from "../../../src/safeLocalStorage";

export const fetchHotChart = createAsyncThunk(
  "explore/fetchHotChart",
  async (_, { rejectWithValue }) => {
    console.log("poshlo");

    try {
      const response = await fetch(API_ROUTES.EXTERNAL.HOT_CHART, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Unable to fetch hot chart");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchSearch = createAsyncThunk(
  "explore/fetchSearch",
  async (value, { rejectWithValue }) => {
    try {
      const response = await fetch(
        API_ROUTES.TRACKS.SEARCH(value),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${safeLocalStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Error during search");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchRecentUploads = createAsyncThunk(
  "explore/fetchRecentUploads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.TRACKS.RECENT_UPLOADS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${safeLocalStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Invalid username or password");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    hotChart: [],
    recentUploads: [],
    searchResults: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHotChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hotChart = action.payload.tracks;
      })
      .addCase(fetchHotChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchRecentUploads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentUploads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentUploads = action.payload;
      })
      .addCase(fetchRecentUploads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchSearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.searchResults = [];
      });
  },
});

export default exploreSlice.reducer;
