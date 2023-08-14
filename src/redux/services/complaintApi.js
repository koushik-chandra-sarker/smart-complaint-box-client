import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../utils/baseQuery.js";
import {API} from "@/redux/utils/api.constant";
import {baseQueryWithAuth} from "@/redux/utils/baseQueryWithAuth";

export const complaintApi = createApi({
    reducerPath: 'complaintApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getAllComplaint: builder.query({
            query: (url) => ({
                url: API.complaintBox.complaint.get+url,
                method: 'GET',
            }),
            meta: {requiredAuth: true},
            transformResponse: (data) => data.data
        }),
        getComplaintById: builder.query({
            query: (id) => ({
                url: API.complaintBox.complaint.get+`/${id}`,
                method: 'GET',
            }),
            transformResponse: (data) => data.data
        }),
        addComplaint: builder.mutation({
            query: (data) => ({
                url: API.complaintBox.complaint.add,
                method: 'POST',
                body: data
            }),
            // transformResponse: (data) => data
        }),
        updateComplaintStatus: builder.mutation({
            query: (data) => ({
                url: API.complaintBox.complaint.updateStatus+data.id+"/update_status/",
                method: 'PATCH',
                body: data
            }),
            // transformResponse: (data) => data
        }),
    }),
});

export const {
    useGetAllComplaintQuery,
    useGetComplaintByIdQuery,
    useAddComplaintMutation,
    useUpdateComplaintStatusMutation
} = complaintApi;
