import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      return initialState;
    },
    setUser: (state, action) => {
      const { result, token } = action.payload;
      return { name: result.name, email: result.email, id: result._id, token };
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
