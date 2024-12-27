import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(data.err || "Invalid username or password");
      }

      localStorage.setItem("token", data.token);
      return data.userInfo;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
