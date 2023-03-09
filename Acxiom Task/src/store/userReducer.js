import { createSlice } from "@reduxjs/toolkit";
// import { getUsers, setUsers } from "../utilities/localStorage";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: true,
    auth: false,
    username: "",
  },
  reducers: {
    loaded: (state, action) => {
      state.loading = false;
    },
    loading: (state, action) => {
      state.loading = true;
    },
    loggedIn: (state, action) => {
      state.loading = false;
      state.auth = true;
      state.username = action.payload;
    },
    loggedOut: (state, action) => {
      localStorage.clear();
      state.loading = false;
      state.auth = false;
      state.username = "";
    },
  },
});

export const { loaded, loading, loggedIn, loggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
