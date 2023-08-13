import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../utils/baseQuery.js";
import {API} from "@/redux/utils/api.constant";

export const institutionApi = createApi({
    reducerPath: 'institutionApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllInstitutionType: builder.query({
            query: () => ({
                url: API.complaintBox.institution.getAllType,
                method: 'GET',
            }),
            transformResponse: (data) => data.data
        }),
        getAllClass: builder.query({
            query: () => ({
                url: API.complaintBox.institution.getAllClass,
                method: 'GET',
            }),
            transformResponse: (data) => data.data
        })
    }),
});

export const {
    useGetAllInstitutionTypeQuery,
    useGetAllClassQuery
} = institutionApi;
