import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
  name: "reminders",
  initialState: [],
  reducers: {
    setReminder: (state, action) => {
      action.payload.map((x) => state.push(x));
      state = state.sort(function (a, b) {
        var Adate = new Date(a.date);
        var Bdate = new Date(b.date);
        return Bdate - Adate;
      });
      // setRemindersLocal("reminders", JSON.stringify(state));
    },
    addReminder: (state, action) => {
      state.push(action.payload);
      state = state.sort(function (a, b) {
        var Adate = new Date(a.date);
        var Bdate = new Date(b.date);
        return Bdate - Adate;
      });
      return state;
      // setRemindersLocal("reminders", JSON.stringify(state));
    },
    modifyRemainder: (state, action) => {
      state = state.filter((x) => x._id !== action.payload._id);
      state.push(action.payload);
      state = state.sort(function (a, b) {
        var Adate = new Date(a.date);
        var Bdate = new Date(b.date);
        return Bdate - Adate;
      });
      return state;
    },
    deleteReminder: (state, action) => {
      state = state.filter((x) => x._id !== action.payload);
      return state;
      // for (let i = 0; i < state.length; i++) {
      //   if (state[i].username == action.payload.username && state[i].text == action.payload.text) {
      //     state.splice(i, 1);
      //     break;
      //   }
      // }
      // setRemindersLocal("reminders", JSON.stringify(state));
    },
  },
});

export const { setReminder, addReminder, modifyRemainder, deleteReminder } = reminderSlice.actions;

export const reminderReducer = reminderSlice.reducer;
