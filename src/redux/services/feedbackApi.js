import {createApi} from "@reduxjs/toolkit/query/react";
import {API} from "@/redux/utils/api.constant";
import {baseQueryWithAuth} from "@/redux/utils/baseQueryWithAuth";
import Toastify from "toastify-js";

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getFeedbackByComplaintId: builder.query({
            query: (id) => ({
                url: API.complaintBox.feedback.getByComId+id,
                method: 'GET',
            }),
            transformResponse: (data) => {
                console.log(data)
                if (data.statusCode === 200) return data.data
                else {
                    Toastify({
                         text: data.data.message,
                          className: "info",
                    }).showToast();
                }
            },
        }),
        addFeedback: builder.mutation({
            query: (data) => ({
                url: API.complaintBox.feedback.add,
                method: 'POST',
                body: data
            }),
            // transformResponse: (data) => data
        }),
    }),
});

export const {
    useGetFeedbackByComplaintIdQuery,
    useAddFeedbackMutation
} = feedbackApi;
