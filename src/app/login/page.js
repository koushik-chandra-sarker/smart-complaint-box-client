"use client"
import React from 'react';
import styles from "@/components/loginModal/loginModal.module.css";
import {useFormik} from "formik";
import {useLoginMutation} from "@/redux/services/authApi";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, selectIsAuthenticated} from "@/redux/slices/authSlice";
import {redirect, useRouter} from "next/navigation";
import {AppRoutes} from "@/utils/appRoutes";
import Link from "next/link";

const Page = () => {

    const router = useRouter()
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state => state.auth);
    if (isAuthenticated) {
        // router.push(AppRoutes.report);
         redirect(AppRoutes.report)
    }
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            login(values).unwrap().then((response) => {
                if (response.statusCode === 200){
                    dispatch(loginSuccess(response.data))
                }
            }, error => {
            })
        },
    });
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={loginForm.handleSubmit} className="modal-box max-w-[400px]">
                    <div className={styles.loginContainer}>
                        <h4>লগইন</h4>
                        <div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">ইমেইল</span>
                                </label>
                                <input type="email"
                                       id='email'
                                       name='email'
                                       onChange={loginForm.handleChange}
                                       placeholder="আপনার ইমেইল"
                                       className="input input-bordered w-full "/>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">পাসওয়ার্ড</span>
                                </label>
                                <input type="password"
                                       id='password'
                                       name='password'
                                       onChange={loginForm.handleChange}
                                       placeholder="আপনার পাসওয়ার্ড"
                                       className="input input-bordered w-full"/>
                            </div>
                            <div className="form-control w-full mt-5">
                                <button type={"submit"} className="btn btn-block bg-primary-400 hover:bg-primary-500 text-white">
                                    {
                                        isLoading? <span className="loading loading-dots loading-sm"></span>:  <>লগইন</>
                                    }
                                </button>
                            </div>
                            <div className="form-control w-full mt-5">
                                <Link className={"text-xs text-blue-400"} href={"#"}>রিসেট পাসওয়ার্ড।</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;