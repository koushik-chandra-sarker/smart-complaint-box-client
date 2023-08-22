import {createSlice} from '@reduxjs/toolkit';
import localStorageService from "@/redux/utils/localStorage.service";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import {useRefreshTokenMutation} from "@/redux/services/authApi"; // Update the path to your localStorage service

const initialState = {
    isAuthenticated: !!localStorageService.getAccessToken(), // Check if there's an access token in localStorage
    userInfo: localStorageService.getUserInfo(),
    accessToken: localStorageService.getAccessToken(),
    refreshToken: localStorageService.getRefreshToken()
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload.author;
            state.accessToken = action.payload.access
            state.refreshToken = action.payload.refresh
            localStorageService.setAccessToken(action.payload.access);
            localStorageService.setRefreshToken(action.payload.refresh);
            localStorageService.setUserInfo(action.payload.author);
        },
        updateToken: (state, action) => {
            state.accessToken = action.payload
            localStorageService.setAccessToken(action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null
            state.refreshToken = null
            state.userInfo = null;
            localStorageService.removeAuthInfo();
        },
    },
});

export const {
    updateToken,
    loginSuccess,
    logout
} = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserInfo = (state) => state.auth.userInfo;

function isTokenExpired(token) {
    if (token) {
        return dayjs.unix(jwtDecode(token).exp).diff(dayjs()) < 1;
    }
    return true
}
export const handleTokenExpiryAndRefresh = () => async (dispatch, getState) => {
    const state = getState();
    const accessToken = state.auth.accessToken;
    const refreshToken = state.auth.refreshToken;
    if (accessToken && isTokenExpired(accessToken)) {
        if (refreshToken && !isTokenExpired(refreshToken)) {
            try {
                const {data: newAccessToken} = await dispatch(useRefreshTokenMutation({refresh: refreshToken}));
                dispatch(updateToken(newAccessToken));
            } catch (error) {
                dispatch(logout());
                // window.location.href("/login")
            }
        } else {
            dispatch(logout());
            // window.location.href("/login")
        }
    }
};

export default authSlice.reducer;
