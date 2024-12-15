import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userInfo: undefined,
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
});


export const { setUserInfo } = authSlice.actions;

