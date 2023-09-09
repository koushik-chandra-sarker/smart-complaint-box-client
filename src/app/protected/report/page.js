"use client"
import React, {useState} from 'react';
import styles from './report.module.css'
import {
    useGetAllComplaintQuery,
    useGetIndividualReportPdfMutation
} from "@/redux/services/complaintApi";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import Loading from "@/components/loader/loading";
import _ from "lodash";
import Image from "next/image";

import 'rsuite/dist/rsuite-no-reset.min.css';
import Filter from "@/app/protected/report/filter";
import {useDispatch} from "react-redux";

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

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const Page = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [queryParam, setQueryParam] = useState("")

    const router = useRouter()
    const pathname = usePathname()
    const [getIndividualReportPdf, {isLoading}] = useGetIndividualReportPdfMutation()

    const {
        data: complaintList,
        isLoading: isComplListLoading,
        refetch,
        isFetching
    } = useGetAllComplaintQuery(queryParam, {refetchOnMountOrArgChange: true})

    function handleRowClick(id) {
        router.push(pathname + `/${id}`)
    }

    function handleFilter(queryParam) {
        setQueryParam(queryParam)
        refetch()
    }


    function handleDownloadPdf(id) {
        getIndividualReportPdf({ids: [id]}).unwrap().then(response => {
            console.log(response)
        }, error => {
            console.log(error)
        })
    }

    return (
        <div className={styles.reportContainer}>
            <div className={styles.innerContainer}>
                <div
                    className={`${styles.title} collapse  bg-base-200 ${openFilter ? "collapse-open" : "collapse-close"}`}>
                    {/*<input id={"filter"} type="radio" name="my-accordion-3" checked={openFilter} />*/}
                    <div className="collapse-title text-xl font-medium flex justify-between pr-4">
                        <h1>রিপোর্টস</h1>
                        {
                            !openFilter ?
                                <Image onClick={() => setOpenFilter(!openFilter)} className={'cursor-pointer'}
                                       src={"/icon/filter.svg"} alt={"Filter"}
                                       width={20} height={20}/>
                                :
                                <Image onClick={() => setOpenFilter(!openFilter)} className={'cursor-pointer'}
                                       src={"/icon/filter-close.svg"} alt={"Filter"}
                                       width={20} height={20}/>
                        }


                    </div>
                    <div className="collapse-content">
                        <Filter handleFilter={handleFilter}/>
                    </div>
                </div>
                <div className={styles.body}>
                    {
                        isComplListLoading || isFetching ?
                            <Loading/> :
                            <>
                                <div>
                                    <div className={`overflow-x-auto ${styles.table}`}>
                                        <p className={"text-xs mb-5 text-blue-400"}>
                                            নোট: বিস্তারিত দেখতে, একটি সারি নির্বাচন করুন।
                                        </p>
                                        <table className="table md:table-sm table-xs table-pin-rows table-zebra">
                                            {/*<colgroup>*/}
                                            {/*    <col/>*/}
                                            {/*    <col />*/}
                                            {/*    <col/>*/}
                                            {/*    <col/>*/}
                                            {/*    <col/>*/}
                                            {/*    <col/>*/}
                                            {/*    <col/>*/}
                                            {/*</colgroup>*/}
                                            <thead>

                                            <tr>
                                                <th>আইডি</th>
                                                <th>বরাবর</th>
                                                <th>বিষয়</th>
                                                <th>নাম</th>
                                                <th>ফোন</th>
                                                <th>সময়</th>
                                                <th>অবস্থা</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                complaintList && complaintList?.map((complaint, index) => (
                                                    <tr key={index}>
                                                        <th>{complaint.id}</th>
                                                        <th>{complaint.complained_to?.name}</th>
                                                        <th>{!_.isEmpty(complaint.subject) ? complaint.subject?.name : complaint.subject_alt}</th>
                                                        <th>{complaint.complainant_name}</th>
                                                        <th>{complaint.complainant_phone}</th>
                                                        <th>{complaint.created_at}</th>
                                                        <th>
                                                            <div
                                                                className={`inline-block px-2  text-sm font-semibold rounded-full ${getStatusBadgeClasses(complaint.status)}`}>
                                                                {complaint.status}
                                                            </div>
                                                        </th>
                                                        <th>
                                                            <div className={"flex gap-5 cursor-pointer"}>
                                                                <Image onClick={() => handleRowClick(complaint.id)}
                                                                       src={"/icon/view.svg"} alt={"view"} width={25}
                                                                       height={25}/>
                                                                <Image onClick={() => handleDownloadPdf(complaint.id)}
                                                                       src={"/icon/pdf.svg"} alt={"view"} width={20}
                                                                       height={20}/>
                                                            </div>
                                                        </th>

                                                    </tr>
                                                ))
                                            }

                                            </tbody>


                                            <tfoot>
                                            <tr>
                                                <th>আইডি</th>
                                                <th>বরাবর</th>
                                                <th>বিষয়</th>
                                                <th>নাম</th>
                                                <th>ফোন</th>
                                                <th>সময়</th>
                                                <th>অবস্থা</th>
                                                <th></th>
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