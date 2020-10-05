import { createSlice } from "@reduxjs/toolkit";

import { ACCESS_TOKEN } from "../../constants";
import { login } from "../../utils/APIUtils";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const LoginLogoutUserSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
});

export const { loginSuccess, logoutSuccess } = LoginLogoutUserSlice.actions;

export const loginUser = (values) => async (dispatch) => {
  try {
    const loginRequest = Object.assign({}, values);
    const userName = loginRequest.usernameOrEmail;
    const response = await login(loginRequest);
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    dispatch(loginSuccess(userName));
  } catch (e) {
    // return console.error(e.message);
    return e;
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
export const selectUser = (state) => state.user;

export default LoginLogoutUserSlice.reducer;
