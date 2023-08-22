
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../utils/baseQuery.js";
import {API} from "@/redux/utils/api.constant";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: API.auth.login,
                method: 'POST',
                body: credentials
            }), transformResponse: (data) => data,
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: API.auth.refreshToken,
                method: 'POST',
                body: {refreshToken},
            }),
            transformResponse: (data) => {
                return data.access_token; // Return the new access token
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRefreshTokenMutation
} = authApi;