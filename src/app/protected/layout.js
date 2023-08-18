"use client"
import {useDispatch, useSelector} from "react-redux";
import {handleTokenExpiryAndRefresh} from "@/redux/slices/authSlice";
import {redirect, useRouter} from "next/navigation";

export default function ProtectedLayout({children}) {
    const router = useRouter()
    const dispatch = useDispatch();
    dispatch(handleTokenExpiryAndRefresh());
    const {isAuthenticated} = useSelector(state => state.auth);

    if (!isAuthenticated) {
        router.push("/login")
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