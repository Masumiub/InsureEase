"use client";

import React from "react";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import Img from '../../public/assets/Family Insurance.json'


export default function Header() {
  return (
    <section className=" py-5 rounded-2xl">

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className='w-full lg:w-1/2 mx-auto'>
          <Fade cascade>
            <h3 className="text-2xl mb-3">Manage your Insurance benefits</h3>
            <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
              Protect What Matters Most
            </h1>
            <p className=" mx-auto text-lg mb-8 drop-shadow-md">
              InsureEase helps you find the perfect insurance plan quickly and easily. Learn why Health Savings Accounts are a critical benefit in employee retention and a great tool to promote financial health and well-being.
            </p>
            <button className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform rounded-full">
              Get Your Quote Now
            </button>
          </Fade>
        </div>

        <div className='w-full lg:w-1/2 mx-auto'>
          <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>
        </div>
      </div>

    </section>
  );
}

//bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white 