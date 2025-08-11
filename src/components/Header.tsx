"use client";

import React from "react";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import Img from '../../public/assets/Family Insurance.json'
import Avatar from '../../public/assets/Avatar.png'
import Avatar2 from '../../public/assets/Avatar2.png'
import Avatar3 from '../../public/assets/Avatar3.png'
import Image from "next/image";

export default function Header() {
  return (
    <section className=" py-5 rounded-2xl">

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className='w-full lg:w-1/2 mx-auto'>
          <Fade cascade>
            <div className="avatar-group -space-x-3 my-5">
              <div className="avatar">
                <div className="w-9">
                  <Image src={Avatar} alt="avatar"/>
                </div>
              </div>
              <div className="avatar">
                <div className="w-9">
                  <Image src={Avatar2} alt="avatar"/>
                </div>
              </div>
              <div className="avatar">
                <div className="w-9">
                  <Image src={Avatar3} alt="avatar"/>
                </div>
              </div>
              <div className="z-10 mt-1.5">
                <div className="bg-white text-black p-2 rounded-full">
                  <p className="text-xs">26k Happy Customers</p>
                </div>
              </div>
            </div>
            
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