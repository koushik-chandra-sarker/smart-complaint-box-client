import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../utils/baseQuery.js";
import {API} from "@/redux/utils/api.constant";
import {baseQueryWithAuth} from "@/redux/utils/baseQueryWithAuth";

export const commonPropertyApi = createApi({
    reducerPath: 'commonPropertyApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getCommonProperty: builder.query({
            query: () => ({
                url: API.complaintBox.commonProperty.get,
                method: 'GET',
            }),
            transformResponse: (data) => data.data
        })
    }),
});

export const {
    useGetCommonPropertyQuery
} = commonPropertyApi;
