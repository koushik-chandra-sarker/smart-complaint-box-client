"use client"
import React, {useEffect, useState} from 'react';
import styles from "@/app/protected/report/report.module.css";
import {useGetComplaintByIdQuery} from "@/redux/services/complaintApi";
import Loading from "@/components/loader/loading";
import {getStatusBadgeClasses} from "@/utils/common";
import {statusList} from "@/utils/data";
import _ from "lodash"
import Feedback from "@/components/feedback/feedback";
import {useFormik} from "formik";

const Page = ({params}) => {
    const {data: complaint, isLoading: isComplaintLoading} = useGetComplaintByIdQuery(params.id)
    const [selectedStatus, setSelectedStatus] = useState()
    const [statusBadgeClasses, setStatusBadgeClasses] = useState()

    useEffect(() => {
        if (!_.isEmpty(complaint)) {
            setSelectedStatus(complaint.status)
            setStatusBadgeClasses(getStatusBadgeClasses(complaint.status))
        }
    }, [complaint])
    if (isComplaintLoading) {
        return (
            <Loading classes={"h-screen"}/>
        )
    }

    function handleSelectStatus(e) {
        setSelectedStatus(e.target.value)
        setStatusBadgeClasses(getStatusBadgeClasses(e.target.value))


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
                                        <h1 className={"text-xl"}><b>শিরোনাম: </b> {complaint.title}</h1>
                                        <div className={"flex gap-5"}>
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
                                    </div>
                                    <div className={'mt-5'}>বরাবর: {complaint.complained_to.name}</div>
                                    <div>বিষয়: {complaint.subject}</div>
                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>অভিযোগকারীর বিবরণ</h3>
                                        <div className={"divider"}/>
                                        <div className={"grid  gap-1"}>
                                            <div> ধরণ: {complaint.complainant_type}</div>
                                            <div> নাম: {complaint.complainant_name}</div>
                                            <div> ফোন: {complaint.complainant_phone}</div>
                                            <div> ইমেইল: {complaint.complainant_email}</div>

                                        </div>
                                    </div>

                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>শিক্ষার্থীর বিবরণ</h3>
                                        <div className={"divider"}/>
                                        <div className={"grid gap-1"}>
                                            <div> ছাত্রের নাম: {complaint.student_name}</div>
                                            <div> ছাত্রের রোল: {complaint.student_class}</div>
                                            <div> ছাত্রের শ্রেণী: {complaint.student_class}</div>
                                        </div>
                                    </div>
                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>প্রতিষ্ঠানের বিবরণ</h3>
                                        <div className={"divider"}/>
                                        <div className={" grid gap-1"}>
                                            <div> অঞ্চল: {complaint.institute.zone}</div>
                                            <div> ধরণ: {complaint.institute.institute_type}</div>
                                            <div> প্রতিষ্ঠান: {complaint.institute.name}</div>
                                            <div> ঠিকানা: {complaint.institute.address}</div>
                                        </div>
                                    </div>
                                    <div className={" mt-10"}>
                                        <h3 className={"font-bold"}>বিস্তারিত</h3>
                                        <div className={"divider"}/>
                                        <div className={" grid gap-1"}>
                                            {complaint.details}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <Feedback complaintId={complaint.id}/>
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