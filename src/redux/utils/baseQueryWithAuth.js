import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {API} from "@/redux/utils/api.constant";
import localStorageService from "@/redux/utils/localStorage.service";
import {updateToken} from "@/redux/slices/authSlice";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const refreshToken = createAsyncThunk(API.auth.refreshToken, async (dispatch, refToken) => {
    try {
        const response = await fetchBaseQuery(API.auth.refreshToken, {
            method: 'POST',
            body: {refresh: refToken},
        });

        const {access: newAccessToken} = response.data;
        dispatch(updateToken(newAccessToken))
        return newAccessToken;
    } catch (error) {
        // Handle token refresh error
        throw error;
    }
});

function isTokenExpired(token) {
    if (token){
        return dayjs.unix(jwtDecode(token).exp).diff(dayjs()) < 1;
    }
    return true
}

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API.baseUrl,
    prepareHeaders: (headers, {getState}) => {
        console.log(getState())
        const token = getState().auth.accessToken;
        const refToken = getState().auth.refreshToken;
        if (!isTokenExpired(token)) {
            console.log("token valid")
            headers.set('Authorization', `Bearer ${token}`);
        } else if (!isTokenExpired(refToken)) {
            console.log("refreshing token")
            const newToken = refreshToken()
            headers.set('Authorization', `Bearer ${newToken}`);
        } else {
            console.log("redirecting to login")

            // window.location.href("/login")
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});