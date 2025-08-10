"use client";
import React from 'react'
import Lottie from "lottie-react";
import Img from '../../public/assets/Insurance.json'
import { GoCheckCircleFill } from "react-icons/go";

export default function Points() {
    return (
        <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="w-full md:w-1/2">
                <h2 className="text-5xl font-bold mt-16 mb-8">Why Trust Us?</h2>
                <ul>
                    <div className='flex gap-2 items-center mb-2'>
                        <GoCheckCircleFill className='text-blue-500'/>
                        <li>Clear, Transparent Pricing – No hidden fees, no surprises.</li>
                    </div>


                    <div className='flex gap-2 items-center mb-2'>
                        <GoCheckCircleFill className='text-blue-500'/>
                        <li>Flexible Plans – Tailored to your lifestyle and budget.</li>
                    </div>

                    <div className='flex gap-2 items-center mb-2'>
                        <GoCheckCircleFill className='text-blue-500'/>
                        <li>24/7 Customer Support – We’re here when you need us most.</li>
                    </div>

                    <div className='flex gap-2 items-center mb-2'>
                        <GoCheckCircleFill className='text-blue-500'/>
                        <li>Fast Claims Process – Hassle-free and efficient service.</li>
                    </div>


                    <div className='flex gap-2 items-center mb-2'>
                        <GoCheckCircleFill className='text-blue-500'/>
                        <li>Trusted by Thousands – Our growing community speaks for itself.</li>

                    </div>

                </ul>
            </div>

            <div className="w-full md:w-1/2">
                <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>
            </div>

        </div>
    )
}
