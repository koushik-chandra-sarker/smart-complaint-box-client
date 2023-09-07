"use client"
import React, {useEffect, useState} from 'react';
import styles from "@/app/protected/report/report.module.css";
import {useGetComplaintByIdQuery, useUpdateComplaintStatusMutation} from "@/redux/services/complaintApi";
import Loading from "@/components/loader/loading";
import {statusList} from "@/utils/data";
import _ from "lodash"
import Feedback from "@/components/feedback/feedback";
import Swal from "sweetalert2";
import ImageGallery from "@/app/protected/report/[id]/ImageGallery";
import FileViewer from "@/app/protected/report/[id]/FileViewer";

const getStatusBadgeClasses = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-gray-300 text-gray-800';
        case 'in_progress':
            return 'bg-yellow-300 text-yellow-800';
        case 'solved':
            return 'bg-green-300 text-green-800';
        case 'rejected':
            return 'bg-pink-300 text-pink-800';
        default:
            return '';
    }
};
const Page = ({params}) => {
    const {data: complaint, isLoading: isComplaintLoading} = useGetComplaintByIdQuery(params.id)
    const [selectedStatus, setSelectedStatus] = useState()
    const [statusBadgeClasses, setStatusBadgeClasses] = useState()
    const [updateComplaintStatus, {isLoading}] = useUpdateComplaintStatusMutation()

    useEffect(() => {
        if (!_.isEmpty(complaint)) {
            setSelectedStatus(complaint.status)
            setStatusBadgeClasses(getStatusBadgeClasses(complaint.status))

        }
    }, [complaint])
    if (isComplaintLoading) {
        return (
            <Loading classes={"h-[500px]"}/>
        )
    }

    function handleSelectStatus(e) {
        const initialStatus = selectedStatus;
        const initialBaseClass = statusBadgeClasses;
        setSelectedStatus(e.target.value)
        setStatusBadgeClasses(getStatusBadgeClasses(e.target.value))
        updateComplaintStatus({id: params.id, status: e.target.value}).unwrap().then(() => {

            Swal.fire(
                'Successful',
                'Status update successful',
                'success'
            ).then(r => {
            })

        }, () => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }).then(r => {
            })
            setSelectedStatus(initialStatus)
            setStatusBadgeClasses(initialBaseClass)
        })


    }

    return (
        <div className={`${styles.reportContainer} max-w-[1000px] mx-auto`}>
            <div className={styles.innerContainer}>
                {
                    !_.isEmpty(complaint) ?
                        <>
                            <div className={styles.body}>
                                <div>
                                    <div className={"flex justify-between"}>

                                        <div className={'text-sm'}><b>তারিখ: </b>{complaint.created_at}</div>
                                        <select className={`select select-bordered select-xs ${statusBadgeClasses}`}
                                                onChange={handleSelectStatus}
                                                value={selectedStatus}

                                        >
                                            {
                                                statusList.map((status, i) => (
                                                    <option
                                                        key={i}
                                                        value={status}
                                                        className={`inline-block px-2  text-sm font-semibold rounded-full ${getStatusBadgeClasses(status)}`}
                                                    >
                                                        {status}
                                                    </option>

                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className={'mt-5'}>বরাবর: {complaint.complained_to?.name}</div>
                                    <div>বিষয়: {!_.isEmpty(complaint.subject) ? complaint.subject?.name : complaint.subject_alt}</div>
                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>অভিযোগকারীর বিবরণ</h3>
                                        <div className={"divider"}/>
                                        <div className={"grid  gap-1"}>
                                            <div> শিক্ষার্থীর সাথে সম্পর্ক: {complaint.complainant_type?.name}</div>
                                            <div> নাম: {complaint.complainant_name}</div>
                                            <div> ফোন: {complaint.complainant_phone}</div>
                                            <div> ইমেইল: {complaint.complainant_email}</div>

                                        </div>
                                    </div>

                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>শিক্ষার্থীর বিবরণ</h3>
                                        <div className={"divider"}/>
                                        <div className={"grid gap-1"}>
                                            <div> নাম: {complaint.student_name}</div>
                                            <div> রোল: {complaint.student_roll}</div>
                                            <div> শ্রেণী: {complaint.student_class?.name}</div>
                                        </div>
                                    </div>
                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>প্রতিষ্ঠানের বিবরণ</h3>
                                        <div className={"divider"}/>
                                        <div className={" grid gap-1"}>
                                            <div> প্রতিষ্ঠান: {complaint.institute?.name}</div>
                                            <div> ধরণ: {complaint.institute?.institute_type?.name}</div>
                                            <div> ইউনিয়ন: {complaint.institute?.municipality?.name}</div>
                                            <div> ঠিকানা: {complaint.institute?.address}</div>
                                        </div>
                                    </div>
                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>বিস্তারিত</h3>
                                        <div className={"divider"}/>
                                        <div className={" grid gap-1"}>
                                            {complaint.details}
                                        </div>
                                    </div>

                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>সংযুক্তি</h3>
                                        <div className={"divider"}/>
                                        {
                                            !_.isEmpty(complaint.files) ?
                                                <div className={" grid gap-1"}>
                                                    <ImageGallery files={complaint.files}/>
                                                    <FileViewer files={complaint.files}/>
                                                </div>:
                                                <div className={"text-center flex justify-center"}>
                                                    <p>কোনো সংযুক্তি পাওয়া যায়নি</p>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <Feedback complaintId={complaint.id} complainantPhone={complaint.complainant_phone}/>
                            </div>
                        </>
                        :
                        <h1 className={"p-10 text-center mt-10"}> No Data Found </h1>
                }

            </div>


        </div>
    );
};

export default Page;