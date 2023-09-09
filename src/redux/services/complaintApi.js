import {createApi} from "@reduxjs/toolkit/query/react";
import {API} from "@/redux/utils/api.constant";
import {baseQueryWithAuth} from "@/redux/utils/baseQueryWithAuth";

export const complaintApi = createApi({
    reducerPath: 'complaintApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getAllComplaint: builder.query({
            query: (queryParam) => ({
                url: API.complaintBox.complaint.get+'/?ordering=-created_at&'+queryParam,
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
        getIndividualReportPdf: builder.mutation({
            query: (data) => ({
                url: API.complaintBox.complaint.individualReportPdf,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useGetAllComplaintQuery,
    useGetComplaintByIdQuery,
    useAddComplaintMutation,
    useUpdateComplaintStatusMutation,
    useGetIndividualReportPdfMutation
} = complaintApi;
