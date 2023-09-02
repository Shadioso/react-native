import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  updateUserData,
  refreshUser,
} from "./operations";

const STATUS = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

const actionGenerators = [register, logIn, updateUserData];

const getActionGeneratorsWithType = (status) =>
  actionGenerators.map((generator) => generator[status]);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      login: null,
      email: null,
      password: null,
      photo: null,
    },
    isLoggedIn: false,
    isRefreshing: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, handleRefreshUserPending)
      .addCase(refreshUser.fulfilled, handleRefreshUserFulfilled)
      .addCase(refreshUser.rejected, handleRefreshUserRejected)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.FULFILLED)),
        handleUserLoggingFulfilled
      );
  },
});

function handleUserLoggingFulfilled(state, action) {
  state.user = action.payload;
  state.isLoggedIn = true;
}

function handleLogOutFulfilled(state, action) {
  state.user = action.payload;
  state.isLoggedIn = false;
}

function handleRefreshUserPending(state) {
  state.isRefreshing = true;
}

function handleRefreshUserFulfilled(state, action) {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
}

function handleRefreshUserRejected(state, action) {
  state.isRefreshing = false;
}

export const authReducer = authSlice.reducer;
