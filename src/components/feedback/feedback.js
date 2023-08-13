import React from 'react';
import Comment from "@/components/feedback/comment";
import {useAddFeedbackMutation, useGetFeedbackByComplaintIdQuery} from "@/redux/services/feedbackApi";
import {useFormik} from "formik";
import {error} from "next/dist/build/output/log";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";

const Feedback = ({complaintId}) => {
    const [addFeedback] = useAddFeedbackMutation()
    const {data: feedbackList, isLoading: feedBackIsLoading, refetch} = useGetFeedbackByComplaintIdQuery(complaintId)
    const dispatch =useDispatch()
    const feedbackForm = useFormik({
        initialValues: {
            comments: '',
            complain: complaintId
        },
        onSubmit: values => {
            addFeedback(values).unwrap().then(response => {
                refetch()
                feedbackForm.resetForm()
            }, error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
        },
    });

    return (
        <div>
            <form onSubmit={feedbackForm.handleSubmit}>
                <textarea
                    id={"comments"}
                    name={"comments"}
                    value={feedbackForm.values.comments}
                    onChange={feedbackForm.handleChange}
                    className="textarea textarea-bordered w-full" placeholder="Feedback"></textarea>
                <div className={"flex justify-end"}>
                    <button type={"submit"}
                            className={"btn btn-sm bg-secondary-400 hover:bg-secondary-500 text-white mt-2"}>Submit
                    </button>
                </div>
            </form>
            <div className={"mt-5"}>
                {
                    feedbackList && feedbackList?.map((feedback, index) => (
                        <Comment key={index} feedback={feedback} complaintId={complaintId} refetchFeedback={refetch}/>
                    ))
                }

            </div>
        </div>
    );
};

export default Feedback;