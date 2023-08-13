"use client"
import React, {useEffect, useState} from 'react';
import styles from './complaint.module.css'
import {useGetAllMunicipalityQuery} from "@/redux/services/municipalityApi";
import {useGetAllInstitutionTypeQuery} from "@/redux/services/institutionApi";
import _ from "lodash"
import {useGetAllDesignationQuery} from "@/redux/services/userApi";
import {useGetCommonPropertyQuery} from "@/redux/services/commonPropertyApi";
import {useFormik} from "formik";
import {complaint_form_validation} from "@/utils/validations";
import {useAddComplaintMutation} from "@/redux/services/complaintApi";
import Swal from "sweetalert2";

const Page = () => {
    const [selectedMunicipality, setSelectedMunicipality] = useState(0)
    const [selectedZone, setSelectedZone] = useState(0)
    const [selectedInstituteTypeId, setSelectedInstituteTypeId] = useState(0)
    const [filteredInstitution, setFilteredInstitution] = useState(0)
    const [addComplaint, {isLoading}] = useAddComplaintMutation()
    const {data: municipalityList} = useGetAllMunicipalityQuery();
    const {data: institutionTypeList} = useGetAllInstitutionTypeQuery();
    const {data: designationList} = useGetAllDesignationQuery();
    const {data: commonProperty} = useGetCommonPropertyQuery();


    function handleSelectMunicipality(e) {
        const municipalityId = e.target.value;
        const municipality = municipalityList?.find(m => m.id == municipalityId);
        setSelectedMunicipality(municipality);
    }

    function handleSelectZone(e) {
        const zoneId = e.target.value;
        const zone = selectedMunicipality?.zone_set?.find(zone => zone.id == zoneId);
        setSelectedZone(zone);
    }

    function handleSelectInstituteType(e) {
        const id = e.target.value;
        setSelectedInstituteTypeId(id);
        const instList = selectedZone?.institute_set?.filter(inst => inst.institute_type?.id == id);
        setFilteredInstitution(instList);
    }


    const complaintFormik = useFormik({
        initialValues: {
            title: '',
            details: '',
            complainant_name: '',
            complainant_email: '',
            complainant_phone: '',
            file: '',
            student_name: '',
            student_roll: '',
            student_class: 0,
            institute: 0,
            complained_to: 0,
            complainant_type: 0,
            subject: 0
        },
        validate: complaint_form_validation,
        onSubmit: values => {
            addComplaint(values).unwrap().then(res => {
                Swal.fire(
                    'Successful',
                    'Complaint sent to authority',
                    'success'
                ).then(r => {})
                complaintFormik.resetForm()
                setSelectedMunicipality(0)
                setSelectedZone(0)
                setSelectedInstituteTypeId(0)
            }, error =>{
               Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
               }).then(r => {})
            })

        },

    });

    return (
        <div className={styles.complaintContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.title}>
                    <h1>অভিযোগ / মতামত / পরামর্শ </h1>
                </div>
                <div className={styles.body}>
                    <form onSubmit={complaintFormik.handleSubmit}>
                        <div className={' grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5'}>
                            <div className="form-control w-full ">
                                <label className="label">
                                    {/*<span className="label-text">Complaint To</span>*/}
                                    <span className="label-text">বরাবর</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.complained_to}
                                    </span>
                                </label>
                                <select className="select select-bordered w-full"

                                        // disabled={complaintFormik.values.student_class === 0}
                                        id={"complained_to"}
                                        name={"complained_to"}
                                        value={complaintFormik.values.complained_to}
                                        onChange={complaintFormik.handleChange}
                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        designationList && designationList?.map((d, index) => (
                                            <option value={d.id} key={index}>{d.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    {/*<span className="label-text">Subject/Topic</span>*/}
                                    <span className="label-text">বিষয়</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.subject}
                                    </span>
                                </label>
                                <select className="select select-bordered w-full"

                                        // disabled={complaintFormik.values.complained_to === 0}
                                        id={"subject"}
                                        name={"subject"}
                                        value={complaintFormik.values.subject}
                                        onChange={complaintFormik.handleChange}
                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        commonProperty && commonProperty?.subject_list?.map((subject, index) => (
                                            <option value={subject.id} key={index}>{subject.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    {/*<span className="label-text">Title</span>*/}
                                    <span className="label-text">শিরোনাম</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.title}
                                    </span>
                                </label>
                                <input type="text" placeholder="শিরোনাম লিখুন.."

                                       id={"complaintTitle"}
                                       name={"title"}
                                       value={complaintFormik.values.title}
                                       onChange={complaintFormik.handleChange}
                                       className="input input-bordered w-full "/>


                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    {/*<span className="label-text">Complainant Type</span>*/}
                                    <span className="label-text">ভুক্তভোগীর সাথে সম্পর্ক</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.complainant_type}
                                    </span>
                                </label>
                                <select className="select select-bordered w-full"

                                        id={"complainant_type"}
                                        name={"complainant_type"}
                                        value={complaintFormik.values.complainant_type}
                                        onChange={complaintFormik.handleChange}
                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        commonProperty && commonProperty?.complainant_type_list?.map(
                                            (type, index) => (
                                                <option value={type.id} key={index}>{type.name}</option>
                                            ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">প্রেরকের নাম </span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.complainant_name}
                                    </span>
                                </label>
                                <input
                                    disabled={complaintFormik.values.complainant_type === 0}

                                    id={"complainant_name"}
                                    name={"complainant_name"}
                                    onChange={complaintFormik.handleChange}
                                    value={complaintFormik.values.complainant_name}
                                    type="text" placeholder="প্রেরকের নাম লিখুন "
                                    className="input input-bordered w-full "/>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">মোবাইল নম্বর</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.complainant_phone}
                                    </span>
                                </label>
                                <input type="text" placeholder="মোবাইল নম্বর লিখুন"

                                       id={"complainant_phone"}
                                       name={"complainant_phone"}
                                       value={complaintFormik.values.complainant_phone}
                                       onChange={complaintFormik.handleChange}
                                       className="input input-bordered w-full "/>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">ইমেইল (যদি থাকে)</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.complainant_email}
                                    </span>
                                </label>
                                <input type="email" placeholder="ইমেইল এড্রেস লিখুন"

                                       id={"complainant_email"}
                                       name={"complainant_email"}
                                       value={complaintFormik.values.complainant_email}
                                       onChange={complaintFormik.handleChange}
                                       className="input input-bordered w-full "/>
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">ইউনিয়ন</span>
                                </label>
                                <select className="select select-bordered w-full "
                                        onChange={handleSelectMunicipality}
                                        value={selectedMunicipality}

                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        municipalityList && municipalityList?.map((m, index) => (
                                            <option value={m.id} key={index}>{m.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    {/*<span className="label-text">Zone</span>*/}
                                    <span className="label-text">গ্রামের নাম</span>
                                </label>
                                <select className="select select-bordered w-full "
                                        disabled={_.isEmpty(selectedMunicipality)}
                                        value={selectedZone}
                                        onChange={handleSelectZone}

                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        selectedMunicipality && selectedMunicipality?.zone_set?.map((zone, index) => (
                                            <option value={zone.id} key={index}>{zone.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">শিক্ষালয়ের ধরণ</span>
                                </label>
                                <select className="select select-bordered w-full "
                                        disabled={_.isEmpty(selectedZone)}
                                        defaultValue="0"
                                        onChange={handleSelectInstituteType}

                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        institutionTypeList && institutionTypeList?.map((ins, index) => (
                                            <option value={ins.id} key={index}>{ins.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">শিক্ষালয়ের নাম </span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.institute}
                                    </span>
                                </label>
                                <select className="select select-bordered w-full"

                                        disabled={selectedInstituteTypeId === 0}
                                        id={"institute"}
                                        name={"institute"}
                                        value={complaintFormik.values.institute}
                                        onChange={complaintFormik.handleChange}
                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        filteredInstitution && filteredInstitution?.map((inst, index) => (
                                            <option value={inst.id} key={index}>{inst.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">শ্রেণী</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.student_class}
                                    </span>
                                </label>
                                <select className="select select-bordered w-full"

                                        disabled={complaintFormik.values.institute === 0}
                                        id={"student_class"}
                                        name={"student_class"}
                                        value={complaintFormik.values.student_class}
                                        onChange={complaintFormik.handleChange}
                                >
                                    <option disabled value="0">--নির্বাচন করুন--</option>
                                    {
                                        commonProperty && commonProperty.class_list?.map((cls, index) => (
                                            <option value={cls.id} key={index}>{cls.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">শিক্ষার্থীর নাম</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.student_name}
                                    </span>
                                </label>
                                <input type="text"
                                       placeholder="শিক্ষার্থীর নাম লিখুন"

                                       id={"student_name"}
                                       name={"student_name"}
                                       value={complaintFormik.values.student_name}
                                       onChange={complaintFormik.handleChange}
                                       className="input input-bordered w-full "/>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">শিক্ষার্থীর রোল নম্বর</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.student_roll}
                                    </span>
                                </label>
                                <input type="text"
                                       placeholder="শিক্ষার্থীর রোল নম্বর লিখুন"
                                       id={"student_roll"}
                                       name={"student_roll"}
                                       value={complaintFormik.values.student_roll}
                                       onChange={complaintFormik.handleChange}
                                       className="input input-bordered w-full "/>
                            </div>



                            {/* <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Attachment</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full"/>
                            </div>*/}
                        </div>
                        <div className={'grid grid-cols-1 gap-5'}>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">বিস্তারিত</span>
                                    <span
                                        className="label-text bg-red-200 px-2 rounded text-red-500">
                                        {complaintFormik.errors.details}
                                    </span>
                                </label>
                                <textarea className="textarea textarea-bordered"
                                          disabled={complaintFormik.values.subject === 0}

                                          id={"details"}
                                          name={"details"}
                                          value={complaintFormik.values.details}
                                          onChange={complaintFormik.handleChange}
                                          placeholder="অভিযোগ / মতামত / পরার্মশ এর বিস্তারিত লিখুন "/>
                            </div>

                        </div>
                        <div className={'columns-1 mt-10'}>
                            <div className={styles.actionButton}>
                                <button type={"submit"} className={styles.button}>দাখিল করুন</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Page;