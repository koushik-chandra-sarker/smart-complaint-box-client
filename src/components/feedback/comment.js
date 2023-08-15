import React from 'react';
import _ from "lodash"
import Replay from "@/components/feedback/repaly";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {useAddFeedbackMutation} from "@/redux/services/feedbackApi";


const Comment = ({complaintId, feedback, refetchFeedback}) => {
    const [addFeedback] = useAddFeedbackMutation()
    const replayForm = useFormik({
        initialValues: {
            comments: '',
            complain: complaintId,
            parent: feedback.id
        },
        onSubmit: values => {
            addFeedback(values).unwrap().then(response => {
                refetchFeedback()
                replayForm.resetForm()
            }, error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
        },
    });
    if (_.isEmpty(feedback)) {
        return null;
    }

    return (
        <div className={"flex md:gap-5 gap-2 items-start my-5"}>
            <div className="avatar placeholder md:block hidden ">
                <div className="bg-neutral-focus text-neutral-content rounded-full md:w-12 md:h-12 w-8 h-8">
                    <span>{_.isEmpty(feedback.user?.salutation) ? "UN" : feedback.user?.salutation}</span>
                </div>
            </div>
            <div className={"border rounded w-full p-4"}>
                <div>
                    <div className={'flex gap-5 items-center'}>
                        <h4 className={"font-semibold"}>
                            {feedback.user?.salutation} {feedback.user?.first_name} {feedback.user?.last_name}
                        </h4>
                        <span className={'text-gray-400 text-xs'}>{feedback.created_at}</span>
                    </div>
                    <p className={"mt-2"}>
                        {feedback.comments}
                    </p>
                </div>
                <div>
                    {
                        feedback?.replies?.map((replay, index) => (
                            <Replay key={index} fee replay={replay}/>
                        ))
                    }

                </div>
                <form onSubmit={replayForm.handleSubmit} className={"mt-10 flex md:gap-5 gap-2 items-end"}>
                    <textarea
                        id={"replay"}
                        name={"comments"}
                        value={replayForm.values.comments}
                        onChange={replayForm.handleChange}
                        className="textarea textarea-sm textarea-bordered w-full md:h-[10px] h-[8px]"
                        placeholder="Feedback"></textarea>
                    <button type={"submit"} className={"  btn btn-sm text-xs  bg-secondary-400 hover:bg-secondary-500 text-white"}>replay
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Comment;