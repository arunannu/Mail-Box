import { createSlice } from "@reduxjs/toolkit";
const initialToken = localStorage.getItem("token");
const initialState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = action.payload;
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;

