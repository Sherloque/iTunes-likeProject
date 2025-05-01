import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "constants";
import safeLocalStorage from "../../../src/safeLocalStorage";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.AUTH.LOGIN, {
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

export const signUser = createAsyncThunk(
  "auth/signUser",
  async (
    { login, password, firstname, lastname, router },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(API_ROUTES.AUTH.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ login, password, firstname, lastname }),
      });

      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(
          data.err || "Signup failed. Login already taken."
        );
      }

      localStorage.setItem("token", data.token);
      router.push("/feed"); // later move to component on fullfilment
      return data.userInfo;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const changeUserInfo = createAsyncThunk(
  "auth/changeUserInfo",
  async ({ id, login, firstname, lastname, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.AUTH.PROFILE_UPDATE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${safeLocalStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id, login, firstname, lastname, password }),
      });
      const data = await response.json();

      if (!response.ok || data.err) {
        return rejectWithValue(
          data.err || "Signup failed. Login already taken."
        );
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
      })

      .addCase(signUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(signUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(changeUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(changeUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
