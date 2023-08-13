"use client"
import {useDispatch, useSelector} from "react-redux";
import {handleTokenExpiryAndRefresh} from "@/redux/slices/authSlice";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";
import {AppRoutes} from "@/utils/appRoutes";

export default function ProtectedLayout({children}) {
    const router = useRouter()
    const dispatch = useDispatch();
    dispatch(handleTokenExpiryAndRefresh());
    const {isAuthenticated} = useSelector(state => state.auth);

    if (!isAuthenticated) {
        // router.replace('/login');
        redirect("/login")

        return null;
    } else {
        return (
            <>
                <div>
                    {children}
                </div>
            </>

        )
    }

}