"use client"
import {useDispatch, useSelector} from "react-redux";
import {handleTokenExpiryAndRefresh} from "@/redux/slices/authSlice";
import {redirect} from "next/navigation";
import {useEffect} from "react";

export default function ProtectedLayout({children}) {
    const dispatch = useDispatch();
    dispatch(handleTokenExpiryAndRefresh());
    const {isAuthenticated} = useSelector(state => state.auth);
    useEffect(() => {
        if (!isAuthenticated) {
            redirect("/login")
        }
    }, [isAuthenticated])

    return (
        <div>
            {children}
        </div>

    )
}