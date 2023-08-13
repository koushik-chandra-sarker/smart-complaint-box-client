import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {API} from "./api.constant";

export const baseQuery = fetchBaseQuery({
    baseUrl: API.baseUrl,
    prepareHeaders: (headers, {getState, meta}) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});