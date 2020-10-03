import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import LoginLogoutUserReducer from "../features/user/LoginLogoutUserSlice";
import UserProfileReducer from "../features/user/UserProfileSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: LoginLogoutUserReducer,
    userProfile: UserProfileReducer,
  },
});
