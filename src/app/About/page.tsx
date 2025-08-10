// app/about/page.tsx
"use client";

import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { FaShieldAlt, FaHandsHelping, FaGlobe, FaUserTie, FaCode, FaChartLine } from "react-icons/fa";
import Lottie from "lottie-react";
import Img from '../../../public/assets/Insurance.json'


export default function AboutPage() {
    const team = [
        {
            name: "John Doe",
            role: "Founder & CEO",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Visionary leader with 15+ years in the insurance industry.",
            icon: <FaUserTie className="text-3xl text-white" />,
        },
        {
            name: "Jane Smith",
            role: "Lead Developer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "Full-stack engineer building seamless user experiences.",
            icon: <FaCode className="text-3xl text-white" />,
        },
        {
            name: "David Lee",
            role: "Marketing Head",
            image: "https://randomuser.me/api/portraits/men/55.jpg",
            bio: "Growth-driven strategist connecting people with solutions.",
            icon: <FaChartLine className="text-3xl text-white" />,
        },
    ];

    const features = [
        {
            title: "Trusted Protection",
            description: "We provide reliable coverage tailored to your needs.",
            icon: <FaShieldAlt className="text-4xl text-green-200" />,
        },
        {
            title: "Customer Support",
            description: "Our team is available 24/7 to assist you anytime.",
            icon: <FaHandsHelping className="text-4xl text-white" />,
        },
        {
            title: "Global Reach",
            description: "We operate across multiple countries with local expertise.",
            icon: <FaGlobe className="text-4xl text-violet-200" />,
        },
    ];

    return (
        <div className="w-full md:w-10/12 mx-auto mb-20">
            {/* Hero */}
            <Fade direction="down" triggerOnce>
                <h1 className="text-5xl font-bold text-center mt-20 mb-15">About Us</h1>
                <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
                    At InsureEase, our mission is to simplify insurance and empower customers
                    with transparent, affordable, and comprehensive coverage.
                </p>
            </Fade>


            <Fade direction="down" triggerOnce>
                <h1 className="text-3xl font-bold text-center mt-20 mb-15">Who We Are</h1>
                <p className="text-lg text-gray-600 mx-auto">
                    InsureEase is a forward-thinking insurance solutions provider dedicated to making coverage simple, transparent, and accessible. Our mission is to remove the complexity from insurance by offering straightforward plans that meet real-life needs. Backed by a passionate team of industry experts, we blend technology, expertise, and customer-first values to ensure you get the protection you deserve — without the confusion.
                </p>
            </Fade>


            {/* Features */}
            <Slide direction="up" triggerOnce>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                    {features.map((f, idx) => (
                        <div
                            key={idx}
                            className="card bg-base-100 shadow-md  hover:shadow-lg transition px-6 py-10 text-center bg-gradient-to-b from-blue-800 to-indigo-900 text-white"
                        >
                            <div className="mb-4 flex justify-center">{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="">{f.description}</p>
                        </div>
                    ))}
                </div>
            </Slide>


            <Fade direction="down" triggerOnce>
                <h1 className="text-3xl font-bold text-center mt-20 mb-15">What We Do</h1>
                <p className="text-lg text-gray-600  mx-auto">
                    We specialize in offering a wide range of insurance plans tailored to health, life, travel, and vehicle protection. From affordable premiums to comprehensive coverage, our services are designed to fit both personal and business needs. We leverage modern digital platforms to help you compare, choose, and manage your policies with ease — anytime, anywhere.
                </p>
            </Fade>


            <div className="flex flex-col md:flex-row items-center gap-10">
                
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold mt-16 mb-8">Why Choose Us?</h2>
                    <ul className="space-y-2">
                        <li>✅ Clear, Transparent Pricing – No hidden fees, no surprises.</li>
                        <li>✅ Flexible Plans – Tailored to your lifestyle and budget.</li>
                        <li>✅ 24/7 Customer Support – We’re here when you need us most.</li>
                        <li>✅ Fast Claims Process – Hassle-free and efficient service.</li>
                        <li>✅ Trusted by Thousands – Our growing community speaks for itself.</li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2">
                    <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>
                </div>

            </div>



            {/* Team */}
            <Zoom triggerOnce>
                <h2 className="text-3xl font-bold text-center mt-16 mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className="card bg-base-100 shadow-md  hover:shadow-lg transition px-6 py-12 bg-gradient-to-b from-blue-800 to-indigo-900 text-white"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 -4 -primary"
                            />
                            <div className="flex justify-center mb-2">{member.icon}</div>
                            <h3 className="text-xl font-bold text-center">{member.name}</h3>
                            <p className="text-center font-medium">{member.role}</p>
                            <p className="text-center  mt-2">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </Zoom>



        </div>
    );
}
