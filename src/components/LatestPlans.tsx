"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

type Plan = {
  _id: string;
  title: string;
  type: string;
  coverage: string;
  premium: number;
  bannerUrl?: string;
};

export default function LatestPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/insurance-plans");
        const data = await res.json();

        console.log("Fetched plans:", data); 

        let plansArray: Plan[] = [];

        if (Array.isArray(data)) {
          plansArray = data;
        } else if (Array.isArray(data.plans)) {
          plansArray = data.plans;
        }

        setPlans(plansArray.slice(0, 4));
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading latest plans...</p>;
  }

  if (plans.length === 0) {
    return <p className="text-center py-10">No plans available</p>;
  }

  return (
    <div className="mx-auto py-20 mb-20">
      <h2 className="text-4xl font-bold text-center mb-20">Latest Insurance Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <Fade key={plan._id} direction="up" delay={index * 100} triggerOnce>
            <div className="bg-base-200 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-3 hover:scale-105">
              {plan.bannerUrl && (
                <Image
                  src={plan.bannerUrl}
                  alt={plan.title}
                  width={300} height={300}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                <button className="btn btn-xs btn-outline rounded-full">{plan.type}</button>
                <p className="text-sm mb-4 line-clamp-2 mt-4">
                  {plan.coverage}
                </p>
                <div className="flex flex-row items-center justify-between">

                
                <p className="text-blue-500 font-bold text-xl">${plan.premium}</p>
                <Link
                  href={`/insurance/${plan._id}`}
                  className="btn btn-sm bg-blue-500 text-white rounded-full"
                >
                  View Details
                </Link>

                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
