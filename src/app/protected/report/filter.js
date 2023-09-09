import React, {useState} from 'react';
import _ from "lodash";
import {DateRangePicker} from "rsuite";
import styles from "@/app/protected/report/report.module.css";
import {useFormik} from "formik";
import {useGetAllMunicipalityQuery} from "@/redux/services/municipalityApi";
import {useGetAllInstitutionTypeQuery} from "@/redux/services/institutionApi";
import {useGetAllDesignationQuery} from "@/redux/services/userApi";
import {useGetCommonPropertyQuery} from "@/redux/services/commonPropertyApi";
import {statusList} from "@/utils/data";

function addOneDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
}

const Filter = ({handleFilter}) => {
    const [dateRange, setDateRange] = useState([])
    const [selectedMunicipality, setSelectedMunicipality] = useState({})
    const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(0)
    const [selectedInstituteTypeId, setSelectedInstituteTypeId] = useState(0)
    const [filteredInstitution, setFilteredInstitution] = useState(0)
    const {data: municipalityList, isLoading: isMuniLoading} = useGetAllMunicipalityQuery();
    const {data: institutionTypeList, isLoading: isInstTypeLoading} = useGetAllInstitutionTypeQuery();
    const {data: designationList, isLoading: isDesigLoading} = useGetAllDesignationQuery();
    const {data: commonProperty, isLoading: isCommonPropLoading} = useGetCommonPropertyQuery();

    const filterForm = useFormik({
        initialValues: {
            student_class: 0,
            institute__municipality: 0,
            institute: 0,
            institute__institute_type: 0,
            complained_to: 0,
            complainant_type: 0,
            subject: 0,
            status: 0,
            date: "",
        },
        onSubmit: values => {
            const queryParams = Object.entries(values)
                .filter(([key, value]) => value !== 0 && value !== "0" && value !== null)
                .map(([key, value]) => {
                    if (key === 'date' && dateRange !== null && dateRange.length === 2) {
                        const date = [...dateRange]
                        return `created_at__gte=${encodeURIComponent(date[0].toLocaleDateString("en-CA"))}&created_at__lte=${encodeURIComponent(addOneDay(date[1]).toLocaleDateString("en-CA"))}`;
                    }
                    return `${key}=${encodeURIComponent(value)}`;

                })
                .join('&');
            handleFilter(queryParams)

        },

    });

    function handleReset() {
        filterForm.resetForm()
        setDateRange([])
        setSelectedMunicipality(0);
        setSelectedMunicipalityId(0)
        setSelectedInstituteTypeId(0)
        setFilteredInstitution(0)


    }

    function handleSelectMunicipality(e) {
        const municipalityId = e.target.value;
        setSelectedMunicipalityId(municipalityId)
        const municipality = municipalityList?.find(m => m.id == municipalityId);
        setSelectedMunicipality(municipality);
        setSelectedInstituteTypeId(0)
        filterForm.values.institute__municipality = municipalityId
        filterForm.values.institute = 0

    }


    function handleSelectInstituteType(e) {
        const id = e.target.value;
        setSelectedInstituteTypeId(id);
        const instList = selectedMunicipality?.institute_set?.filter(inst => inst.institute_type?.id == id);
        setFilteredInstitution(instList);
        filterForm.values.institute__institute_type = id;
    }

    return (
        <div>
            <form onSubmit={filterForm.handleSubmit}>
                <div className={' grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5'}>
                    {/*<div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">বরাবর</span>
                        </label>
                        <select className="select select-sm select-bordered w-full"
                                id={"complained_to"}
                                name={"complained_to"}
                                value={filterForm.values.complained_to}
                                onChange={filterForm.handleChange}
                        >

                            <option value="0">--নির্বাচন করুন--</option>
                            {designationList && designationList?.map((d, index) => (
                                <option value={d.id} key={index}>{d.name}</option>))}
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">বিষয়</span>
                        </label>
                        <select className="select select-sm select-bordered w-full"
                                id={"subject"}
                                name={"subject"}
                                value={filterForm.values.subject}
                                onChange={filterForm.handleChange}
                        >
                            <option disabled value="0">--নির্বাচন করুন--</option>
                            {commonProperty && commonProperty?.subject_list?.map((subject, index) => (
                                <option value={subject.id} key={index}>{subject.name}</option>))}
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">শিক্ষার্থীর সাথে সম্পর্ক</span>
                        </label>
                        <select className="select select-sm select-bordered w-full"
                                id={"complainant_type"}
                                name={"complainant_type"}
                                value={filterForm.values.complainant_type}
                                onChange={filterForm.handleChange}
                        >
                            <option value="0">--নির্বাচন করুন--</option>
                            {commonProperty && commonProperty?.complainant_type_list?.map((type, index) => (
                                <option value={type.id} key={index}>{type.name}</option>))}
                        </select>
                    </div>*/}

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">ইউনিয়নের নাম</span>
                        </label>
                        <select className="select select-sm select-bordered w-full "
                                onChange={handleSelectMunicipality}
                                value={selectedMunicipalityId}

                        >
                            <option value="0">--নির্বাচন করুন--</option>
                            {municipalityList && municipalityList?.map((m, index) => (
                                <option value={m.id} key={index}>{m.name}</option>))}
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">প্রতিষ্ঠানের ধরন</span>
                        </label>
                        <select className="select select-sm select-bordered w-full "
                                disabled={_.isEmpty(selectedMunicipality)}
                                value={selectedInstituteTypeId}
                                onChange={handleSelectInstituteType}

                        >
                            <option value="0">--নির্বাচন করুন--</option>
                            {institutionTypeList && institutionTypeList?.map((ins, index) => (
                                <option value={ins.id} key={index}>{ins.name}</option>))}
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">প্রতিষ্ঠানের নাম </span>
                        </label>
                        <select className="select select-sm select-bordered w-full"

                                disabled={selectedInstituteTypeId === 0}
                                id={"institute"}
                                name={"institute"}
                                value={filterForm.values.institute}
                                onChange={filterForm.handleChange}
                        >
                            <option value="0">--নির্বাচন করুন--</option>
                            {filteredInstitution && filteredInstitution?.map((inst, index) => (
                                <option value={inst.id} key={index}>{inst.name}</option>))}
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">শ্রেণী</span>
                        </label>
                        <select className="select select-sm select-bordered w-full"
                                disabled={filterForm.values.institute === 0}
                                id={"student_class"}
                                name={"student_class"}
                                value={filterForm.values.student_class}
                                onChange={filterForm.handleChange}
                        >
                            <option value="0">--নির্বাচন করুন--</option>
                            {commonProperty && commonProperty.class_list?.map((cls, index) => (
                                <option value={cls.id} key={index}>{cls.name}</option>))}
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">date</span>
                        </label>
                        <DateRangePicker
                            showOneCalendar
                            size="sm"
                            format="yyyy-MM-dd"
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">অবস্থা</span>
                        </label>
                        <select className={`select select-bordered select-sm `}
                                id={"status"}
                                name={"status"}
                                onChange={filterForm.handleChange}
                                value={filterForm.values.status}
                        >
                            <option value="0">--নির্বাচন করুন--</option>
                            {
                                statusList.map((status, i) => (
                                    <option
                                        key={i}
                                        value={status}
                                        className={`inline-block px-2  text-sm font-semibold rounded-full`}
                                    >
                                        {status}
                                    </option>

                                ))
                            }
                        </select>
                    </div>

                </div>
                <div className={'columns-1 mt-10'}>
                    <div className={styles.actionButton}>
                        <button type={"button"} onClick={handleReset} className={`${styles.button} !bg-secondary-400 mr-5`}>রিসেট</button>
                        <button type={"submit"} className={styles.button}>ফিল্টার করুন</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Filter;