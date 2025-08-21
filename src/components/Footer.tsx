"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaGoogle, FaLocationDot, FaTwitter } from 'react-icons/fa6'
import { IoIosCall } from 'react-icons/io'
import { LuInstagram } from 'react-icons/lu'
import { MdEmail } from 'react-icons/md'
import Logo from '../../public/insurance.png'
import { usePathname } from 'next/navigation'


export default function Footer() {

    const pathname = usePathname();

    // If inside /admin pages → hide footer
    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className='bg-base-200 mt-30 bg-gradient-to-r from-blue-800 to-indigo-900 text-white'>
            <footer className="footer sm:footer-horizontal w-full  mx-auto  py-30 px-10">
                <aside>
                    <Link href='/'> <Image src={Logo} width={50} alt='logo'></Image> </Link>
                    <h1 className='font-semibold text-3xl'>InsureEase</h1>
                    <p>
                        InsureEase Private Ltd. InsureEase helps you find the perfect <br />
                        insurance plan quickly and easily.

                    </p>

                    <nav className='mt-3'>

                        <div className='flex items-center gap-2 mb-2'>
                            <IoIosCall />
                            <p>+88 000 1111 2233 </p>
                        </div>
                        <div className='flex items-center gap-2 mb-2'>
                            <MdEmail />
                            <p>studyRoom@contact.com</p>
                        </div>
                        <div className='flex items-center gap-2 mb-2'>
                            <FaLocationDot />
                            <p>1216/1/A, Street No - 98, Gulshan <br />
                                Dhaka, Bangladesh</p>
                        </div>

                    </nav>
                </aside>
                <nav>
                    <h6 className="footer-title">General</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Insurance</a>
                    <a className="link link-hover">Policy</a>
                    <a className="link link-hover">Loans</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>

                    <p className='footer-title mt-4'>Follow Us:</p>
                    <div className='flex gap-2'>
                        <FaFacebook size={20} />
                        <FaGoogle size={20} />
                        <LuInstagram size={20} />
                        <FaTwitter size={20} />
                    </div>
                </nav>

            </footer>
        </div>
    )
}
