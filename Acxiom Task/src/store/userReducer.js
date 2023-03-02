import { createSlice } from "@reduxjs/toolkit";
import { getUsers, setUsers } from "../utilities/localStorage";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
