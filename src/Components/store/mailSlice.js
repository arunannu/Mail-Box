import { createSlice } from "@reduxjs/toolkit";
const mailSlice = createSlice({
  name: "email",
  initialState: {
    recieved: [],
    sent: [],
    trash:[],
    unreadMails: localStorage.getItem("numberOfMails"),
    email:
      localStorage.getItem("email")?.replace(".", "")?.replace("@", "") || "",
  },
  reducers: {
    recievedMail(state, action) {
      state.recieved = action.payload;
    },
    sentMail(state, action) {
      state.sent = action.payload;
    },
    unreadMessage(state, action) {
      state.unreadMails = action.payload;
    },
    deleteMail(state, action){
      state.trash.push(action.payload);
    }
   
  },
});
export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
