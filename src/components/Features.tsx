"use client";

import React from "react";
import { Slide } from "react-awesome-reveal";
import { CheckCircleIcon, ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const features = [
    {
        icon: <ClockIcon className="h-10 w-10 text-pink-300" />,
        title: "Fast Claims",
        description: "Quick and hassle-free claim processing so you can focus on what matters.",
    },
    {
        icon: <ShieldCheckIcon className="h-10 w-10 text-green-600" />,
        title: "Trusted Providers",
        description: "We partner with top insurers to ensure your peace of mind.",
    },
    {
        icon: <CheckCircleIcon className="h-10 w-10 text-indigo-200" />,
        title: "24/7 Support",
        description: "Our team is here for you around the clock.",
    },
];

export default function Features() {
    return (
        <section className="my-20">
            <div className="mx-auto">
                <Slide cascade>
                    <h2 className="text-5xl font-semibold text-center mb-4">Why Choose InsureEase?</h2>
                    <p className="text-center mb-12">Know why InsureEase is best and safe</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map(({ icon, title, description }, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center  px-6 py-10 rounded-2xl shadow-lg
                                 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-b from-blue-800 to-indigo-900 text-white">
                                {icon}
                                <h3 className="text-xl font-semibold">{title}</h3>
                                <p className="text-sm">{description}</p>
                            </div>

                        ))}
                    </div>
                </Slide>
            </div>
        </section>
    );
}
