"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fade, Zoom } from "react-awesome-reveal";


type InsurancePlan = {
    _id: string;
    type: string;
    title: string;
    coverage: string;
    premium: string;
    term: string;
    bannerUrl: string;
};


export default function InsurancePlansListPage() {

    const [plans, setPlans] = useState<InsurancePlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlans() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/api/insurance-plans");
                const data = await res.json();
                setPlans(data);
            }
            catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            }
            finally {
                setLoading(false);
            }

        }
        fetchPlans();
    }, []);


    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-600">{error}</p>;



    return (
        <div className="w-full md:w-10/12 mx-auto mb-20">
            <div className="my-20">
                <Fade>
                    <h2 className="text-5xl font-bold mb-8 text-center">Our Insurance Plans</h2>
                </Fade>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Zoom key={plan._id} triggerOnce>
                        <div className="rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                            <Image
                                src={plan.bannerUrl}
                                alt={plan.title}
                                width={500}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                                <p className=" text-sm mb-2">Type: {plan.type}</p>
                                {/* <p className="text-gray-600 text-sm mb-2">Coverage: {plan.coverage}</p> */}
                                <p className=" font-bold mb-4">
                                    Premium: {plan.premium} | Term: {plan.term}
                                </p>
                                <Link
                                    href={`/insurance/${plan._id}`}
                                    className="btn btn-sm rounded-full btn-primary"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </Zoom>
                ))}
            </div>
        </div>
    )
}
