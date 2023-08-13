import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const USER_INFO = "userInfo";
const AUTH_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
import _ from "lodash"

const localStorageService = {
    setAccessToken(token) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(AUTH_TOKEN, token);
        }
    },
    getAccessToken() {
      if (typeof window !== 'undefined') {
          return localStorage.getItem(AUTH_TOKEN);
      }
    },
    isAccessTokenExpired() {
            return dayjs.unix(jwtDecode(this.getAccessToken()).exp).diff(dayjs()) < 1;
    },
    removeAccessToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_TOKEN);
        }
    },
    setRefreshToken(token) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(REFRESH_TOKEN, token);
        }
    },
    getRefreshToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(REFRESH_TOKEN);
        }
    },
    isRefreshTokenExpired() {
        return dayjs.unix(jwtDecode(this.getRefreshToken()).exp).diff(dayjs()) < 1;
    },
    removeRefreshToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(REFRESH_TOKEN);
        }
    },
    setUserInfo(userInfo) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
        }
    },
    getUserInfo() {
        if (typeof window !== 'undefined') {
            const userinfo = window.localStorage.getItem(USER_INFO)
            if (!_.isEmpty(userinfo)) {
                return JSON.parse(window.localStorage.getItem(USER_INFO));
            }
            return {}
        }

    },
    removeUserInfo() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(USER_INFO);
        }
    },
    removeAuthInfo() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            localStorage.removeItem(USER_INFO);
        }
    }
};

export default localStorageService;