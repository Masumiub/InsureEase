"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginPage from "../login/page";

type Policy = {
    _id: string;
    planId: string;
    planTitle: string;
    planType: string;
    status: string;
};



export default function MyPoliciesPage() {

    const { data: session, status } = useSession();
    const [policies, setPolicies] = useState<Policy[]>([]);

    useEffect(() => {
        if (!session?.user?.email) return;
        async function load() {
            const res = await fetch(
                `/api/bookings?user=${encodeURIComponent(session.user.email!)}`
            );
            const data = await res.json();
            setPolicies(Array.isArray(data) ? data : data.bookings || []);
        }

        load();
    }, [session?.user?.email]);

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <LoginPage></LoginPage>;


    return (
        <div className="w-full md:w-10/12 mx-auto mb-20 p-6">
            <h1 className="text-5xl font-bold mb-4 my-20 text-center">My Policies / Requests</h1>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies.length === 0 ? <tr><p>No policies yet</p></tr> : (

                            
                                policies.map((p, index) => (
                                    <tr key={p._id}>
                                        <td>{index+1}</td>
                                        <td className="font-semibold">{p.planTitle}</td>
                                        <td>{p.planType}</td>
                                        <td>{p.status}</td>
                                        <td><Link href={`/insurance/${p.planId}`} className="btn btn-sm btn-outline rounded-full">View Plan</Link></td>
                                    </tr>
                                ))
                            

                        )}

                    </tbody>
                </table>
            </div>





        </div>
    )
}
