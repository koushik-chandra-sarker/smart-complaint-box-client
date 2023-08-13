import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../utils/baseQuery.js";
import {API} from "@/redux/utils/api.constant";

export const municipalityApi = createApi({
    reducerPath: 'municipalityApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllMunicipality: builder.query({
            query: () => ({
                url: API.complaintBox.municipality.getAll,
                method: 'GET',
            }),
            transformResponse: (data) => data.data
        })
    }),
});

export const {
    useGetAllMunicipalityQuery
} = municipalityApi;
