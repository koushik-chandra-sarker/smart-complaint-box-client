"use client"
import React, {useState} from 'react';
import styles from './report.module.css'
import {useGetAllComplaintQuery} from "@/redux/services/complaintApi";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import Loading from "@/components/loader/loading";
import {getStatusBadgeClasses} from "@/utils/common";
import {useFormik} from "formik";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const Page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
    const {data: complaintList, isLoading: isComplListLoading} = useGetAllComplaintQuery("/?ordering=-id", {refetchOnMountOrArgChange:true})

    function handleRowClick(id) {
        router.push(pathname + `/${id}`)
    }

    return (
        <div className={styles.reportContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.title}>
                    <h1>রিপোর্টস</h1>
                </div>
                <div className={styles.body}>
                    {
                        isComplListLoading ?
                            <Loading/> :
                            <>
                                <div>
                                    <div className={`overflow-x-auto ${styles.table}`}>
                                        <table className="table md:table-sm table-xs table-pin-rows table-zebra">
                                            <colgroup>
                                                <col/>
                                                <col/>
                                                <col className={"md:w-96"}/>
                                                <col/>
                                                <col/>
                                                <col/>
                                                <col/>
                                            </colgroup>
                                            <thead>

                                            <tr>
                                                <th></th>
                                                <th>আইডি</th>
                                                <th>শিরোনাম</th>
                                                <th>নাম</th>
                                                <th>ফোন</th>
                                                <th>সময়</th>
                                                <th>অবস্থা</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                complaintList && complaintList?.map((complaint, index) => (
                                                    <tr key={index} className={"cursor-pointer"}
                                                        onClick={() => handleRowClick(complaint.id)}>
                                                        <th>{index}</th>
                                                        <th>{complaint.id}</th>
                                                        <th>{complaint.title}</th>
                                                        <th>{complaint.complainant_name}</th>
                                                        <th>{complaint.complainant_phone}</th>
                                                        <th>{complaint.created_at}</th>
                                                        <th>
                                                            <div
                                                                className={`inline-block px-2  text-sm font-semibold rounded-full ${getStatusBadgeClasses(complaint.status)}`}>
                                                                {complaint.status}
                                                            </div>
                                                        </th>

                                                    </tr>
                                                ))
                                            }

                                            </tbody>


                                            <tfoot>
                                            <tr>
                                                <th></th>
                                                <th>আইডি</th>
                                                <th>শিরোনাম</th>
                                                <th>নাম</th>
                                                <th>ফোন</th>
                                                <th>সময়</th>
                                                <th>অবস্থা</th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                {/*<div className={styles.pagination}>
                                <SweetPagination // https://github.com/jahidulislamzim/sweetpagination?ref=reactjsexample.com
                                    currentPageData={setCurrentPageData}
                                    dataPerPage={1}
                                    getData={items}
                                    navigation={true}
                                    getStyle={"sweet"}
                                />
                                </div>*/}
                            </>
                    }


                </div>
            </div>

        </div>
    );
};

export default Page;