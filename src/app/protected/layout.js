"use client"
import {useDispatch, useSelector} from "react-redux";
import {handleTokenExpiryAndRefresh} from "@/redux/slices/authSlice";
import {redirect} from "next/navigation";

export default function ProtectedLayout({children}) {
    const dispatch = useDispatch();
    dispatch(handleTokenExpiryAndRefresh());
    const {isAuthenticated} = useSelector(state => state.auth);

    if (!isAuthenticated) {
        redirect("/login")
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