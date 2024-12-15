"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserInfo = exports.authSlice = void 0;
var _toolkit = require("@reduxjs/toolkit");
const initialState = {
  userInfo: undefined
};
const authSlice = exports.authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    }
  }
});
const {
  setUserInfo
} = authSlice.actions;
exports.setUserInfo = setUserInfo;