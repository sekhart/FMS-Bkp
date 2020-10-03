import { createSlice } from "@reduxjs/toolkit";

import { getUserProfile, updateUser } from "../../utils/APIUtils";

export const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    userProfile: [],
  },
  reducers: {
    getUserDetails: (state, action) => {
      state.userProfile = action.payload;
    },
    addUserAction: (state, action) => {
      state.userProfile = action.payload;
    },
    updateUserAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  getUserDetails,
  addUserAction,
  updateUserAction,
} = UserProfileSlice.actions;

export const fetchUserProfile = (username) => async (dispatch) => {
  try {
    console.log("fetch  user: [" + username + "]");
    return await getUserProfile(username)
      .then((response) => {
        console.log(response);
        dispatch(getUserDetails(response));
      })
      .catch((error) => {
        if (error.status === 401) {
          alert(" Your Username is incorrect. Please try again!");
        } else {
          alert("  Sorry! Something went wrong. Please try again!");
        }
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const updateUserProfile = (values) => async (dispatch) => {
  try {
    const updateRequest = Object.assign({}, values);
    const id = updateRequest.id;
    return await updateUser(updateRequest, id)
      .then((response) => {
        dispatch(updateUserAction(response));
      })
      .catch((error) => {
        if (error.status === 401) {
          alert(" User Details incorrect. Please try again!");
        } else {
          alert("  Sorry! Something went wrong. Please try again!");
        }
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const selectUserProfile = (state) => state.userProfile;

export default UserProfileSlice.reducer;
