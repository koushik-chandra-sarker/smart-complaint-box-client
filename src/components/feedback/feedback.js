import React, {useEffect} from 'react';
import Comment from "@/components/feedback/comment";
import {useAddFeedbackMutation, useGetFeedbackByComplaintIdQuery} from "@/redux/services/feedbackApi";
import {useFormik} from "formik";
import {error} from "next/dist/build/output/log";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {useSendSmsMutation} from "@/redux/services/smsApi";
import {lngtype} from "@/utils/common";

const Feedback = ({complaintId, complainantPhone}) => {
    const [addFeedback] = useAddFeedbackMutation()
    const [sendSms] = useSendSmsMutation()
    const {data: feedbackList, isLoading: feedBackIsLoading, refetch} = useGetFeedbackByComplaintIdQuery(complaintId)
    const dispatch = useDispatch()

    const feedbackForm = useFormik({
        initialValues: {
            comments: '',
            complain: complaintId
        },
        onSubmit: values => {
            addFeedback(values).unwrap().then(response => {
                Swal.fire({
                    title: 'আপনি কি প্রেরকের কাছে এসএমএস পাঠাতে চান?',
                    text: "আপনার এসএমএস সম্পূর্ণ বাংলায় হতে হবে অন্যথায় আপনার এসএমএস সার্ভিসটি ব্লক করা হবে",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'হ্যাঁ',
                    denyButtonText: `না`,
                }).then((result) => {

                    if (result.isConfirmed) {
                        sendSms({to:complainantPhone, message:values.comments}).unwrap().then(
                            (res)=>{
                                if (res.statusCode === 200){
                                    Swal.fire('প্রেরকের কাছে এসএমএস পাঠানো হয়েছে।', '', 'success')
                                }
                            },()=>{
                                Swal.fire('Something went wrong.', '','error')
                            }
                        )
                    } else if (result.isDenied) {
                        Swal.fire('প্রতিক্রিয়া সংরক্ষণ করা হয়েছে', '', 'info')
                    }
                })
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