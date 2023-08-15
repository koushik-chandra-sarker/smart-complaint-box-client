import {createApi} from "@reduxjs/toolkit/query/react";
import {API} from "@/redux/utils/api.constant";
import {baseQueryWithAuth} from "@/redux/utils/baseQueryWithAuth";
import Toastify from "toastify-js";

export const smsApi = createApi({
    reducerPath: 'smsApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        sendSms: builder.mutation({
            query: (data) => ({
                url: API.complaintBox.sendSms,
                method: 'POST',
                body: data
            }),
            // transformResponse: (data) => data
        }),
    }),
});

export const {
    useSendSmsMutation
} = smsApi;
