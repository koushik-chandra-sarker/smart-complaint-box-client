"use client"
import {useDispatch, useSelector} from "react-redux";
import {handleTokenExpiryAndRefresh} from "@/redux/slices/authSlice";
import {redirect, useRouter} from "next/navigation";

export default function ProtectedLayout({children}) {
    const {isAuthenticated} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    dispatch(handleTokenExpiryAndRefresh());

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