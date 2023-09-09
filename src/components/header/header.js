"use client"
import React from 'react';
import styles from "./header.module.css"
import LoginModal from "@/components/loginModal/loginModal";
import {useDispatch, useSelector} from "react-redux";
import {handleTokenExpiryAndRefresh, logout} from "@/redux/slices/authSlice";
import Link from "next/link";
import {authorizedNav, basicNav} from "@/utils/nav";
import Image from "next/image";
import logoutIcon from "/public/icon/logout.svg"
import loginIcon from "/public/icon/login.svg"
import menuIcon from "/public/icon/menu.svg"

const Header = () => {
    const dispatch = useDispatch()
    dispatch(handleTokenExpiryAndRefresh());
    const {isAuthenticated} = useSelector(state => state.auth)

    function handleLogout() {
        dispatch(logout())
    }

    return (
        <header className={styles.header}>
            <mian className={styles.inner}>

                <section className={"flex gap-5 "}>
                    <Link href={"/"} className={styles.logo}>
                        {/*<span>স্মার্ট অভিযোগ বক্স</span>*/}
                        <Image src={"/images/logo.png"} alt={"logo"} width={500} height={500}/>
                    </Link>
                    <div className={styles.menu}>
                        {
                            !isAuthenticated ?
                                basicNav.map((v, i) => (
                                    <Link href={v.url} key={i} className={styles.menuItem}>{v.name}</Link>

                                )) :
                                authorizedNav.map((v, i) => (
                                    <Link href={v.url} key={i} className={styles.menuItem}>{v.name}</Link>
                                ))

                        }
                    </div>
                </section>
                <div className={"hidden md:block"}>
                    {
                        !isAuthenticated ?
                            <Link href={'/login'}
                                  className={styles.button}
                            >
                                লগইন
                            </Link> :
                            <button
                                onClick={handleLogout}
                                className={styles.button}
                            >
                                লগআউট
                            </button>
                    }
                </div>
                <div className="dropdown dropdown-end z-[1000] md:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle pr-5">
                        <Image src={menuIcon} alt={"menuIcon"}/>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 mr-5 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            !isAuthenticated ?
                                basicNav.map((v, i) => (
                                    <li key={i}><Link href={v.url}>{v.name}</Link></li>
                                )) :
                                authorizedNav.map((v, i) => (
                                    <li key={i}><Link className={"p-2"} href={v.url}>{v.name}</Link></li>
                                ))

                        }
                        {/*<div className={"divider"}/>*/}
                        {
                            !isAuthenticated ?
                                <li className={"border-t-2 border-gray-200 pt-1"}><Link href={'/login'}
                                >
                                    <Image className={"w-4"} src={loginIcon} alt={"logout"}/>
                                    লগইন
                                </Link></li> :
                                <li className={"border-t-2 border-gray-200 pt-1"}>
                                    <button
                                        onClick={handleLogout}
                                        className={""}
                                    >
                                        <Image className={"w-4"} src={logoutIcon} alt={"logout"}/>
                                        লগআউট
                                    </button>
                                </li>
                        }
                    </ul>

                </div>


            </mian>
            <LoginModal/>
        </header>
    );
};

export default Header;