import {createApi} from "@reduxjs/toolkit/query/react";
import {API} from "@/redux/utils/api.constant";
import {baseQueryWithAuth} from "@/redux/utils/baseQueryWithAuth";
import Toastify from "toastify-js";

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                data.forEach(file=>{
                     formData.append('file', file);
                })
                return {
                    url: API.complaintBox.file.upload,
                    method: 'POST',
                    body: formData,
                    formData: true
                }

            }
        }),
    }),
});

export const {
    useUploadFileMutation
} = fileApi;
