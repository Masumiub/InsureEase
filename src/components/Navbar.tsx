"use client";

import React from 'react'
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";


export default function Navbar() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";


    return (
        <div className='bg-base-200 bg-gradient-to-r from-blue-800 to-indigo-900 text-white'>
            <div className="navbar w-full md:w-10/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href='/AllInsurances'>Insurances</Link></li>
                            {
                                session?.user?.role == 'admin' && (
                                    <>
                                        <li><Link href='/createInsurencePlan'>Create Insurance Plan</Link></li>
                                        <li><Link href='/managePlans'>Manage Plans</Link></li>
                                        <li><Link href='/manageRequest'>Manage Requests</Link></li>
                                    </>
                                )
                            }

                            {
                                session?.user?.role == 'user' && (
                                    <li><Link href='/my-policies'>My Policies</Link></li>
                                )
                            }
                            <li><Link href="/About">About</Link></li>
                            <li><Link href="/Contact">Contact</Link></li>

                        </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">InsureEase</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href='/AllInsurances'>Insurances</Link></li>
                        {
                            session?.user?.role == 'admin' && (
                                <>
                                    <li><Link href='/createInsurencePlan'>Create Insurance Plan</Link></li>
                                    <li><Link href='/managePlans'>Manage Plans</Link></li>
                                    <li><Link href='/manageRequest'>Manage Requests</Link></li>
                                </>
                            )
                        }

                        {
                            session?.user?.role == 'user' && (
                                <li><Link href='/my-policies'>My Policies</Link></li>
                            )
                        }

                        <li><Link href="/About">About</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : session ? (
                        <>
                            <span className="mr-4">Hi, {session.user?.name || "User"}</span>
                            <button onClick={() => signOut()} className="btn btn-outline rounded-full">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-outline mr-2 rounded-full">
                                Login
                            </Link>
                            <Link href="/register" className="btn bg-blue-200 rounded-full border-0 shadow-none">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
