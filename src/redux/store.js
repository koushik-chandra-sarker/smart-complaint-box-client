"use client"
import {configureStore} from '@reduxjs/toolkit'
import {municipalityApi} from "@/redux/services/municipalityApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {institutionApi} from "@/redux/services/institutionApi";
import {userApi} from "@/redux/services/userApi";
import {commonPropertyApi} from "@/redux/services/commonPropertyApi";
import {complaintApi} from "@/redux/services/complaintApi";
import {authApi} from "@/redux/services/authApi";
import authReducer from "@/redux/slices/authSlice";
import {feedbackApi} from "@/redux/services/feedbackApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [municipalityApi.reducerPath]: municipalityApi.reducer,
        [institutionApi.reducerPath]: institutionApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [commonPropertyApi.reducerPath]: commonPropertyApi.reducer,
        [complaintApi.reducerPath]: complaintApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({})
            .concat([authApi.middleware])
            .concat([municipalityApi.middleware])
            .concat([institutionApi.middleware])
            .concat([userApi.middleware])
            .concat([commonPropertyApi.middleware])
            .concat([complaintApi.middleware])
            .concat([feedbackApi.middleware])
})
setupListeners(store.dispatch);