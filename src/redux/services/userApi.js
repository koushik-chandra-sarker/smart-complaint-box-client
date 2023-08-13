import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../utils/baseQuery.js";
import {API} from "@/redux/utils/api.constant";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllDesignation: builder.query({
            query: () => ({
                url: API.user.designation.getAll,
                method: 'GET',
            }),
            transformResponse: (data) => data.data
        })
    }),
});

export const {
    useGetAllDesignationQuery
} = userApi;
