import InsurancePlansList from "./InsurancePlansList";


export default async function InsurancePage() {
  // fetch runs on server
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/insurance-plans`, {
  next: { revalidate: 60 },
});

  const plans = await res.json();

  //console.log(plans)

  return <InsurancePlansList plans={plans} />;
}

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Fade, Zoom } from "react-awesome-reveal";
// import LoadingState from "@/components/LoadingState";


// type InsurancePlan = {
//     _id: string;
//     type: string;
//     title: string;
//     coverage: string;
//     premium: string;
//     term: string;
//     bannerUrl: string;
// };


// export default function InsurancePage() {

//     const [plans, setPlans] = useState<InsurancePlan[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [search, setSearch] = useState("");
//     const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//     useEffect(() => {
//         async function fetchPlans() {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const res = await fetch("/api/insurance-plans");
//                 const data = await res.json();
//                 setPlans(data);
//             }
//             catch (err: unknown) {
//                 if (err instanceof Error) {
//                     setError(err.message);
//                 } else {
//                     setError("Unknown error");
//                 }
//             }
//             finally {
//                 setLoading(false);
//             }

//         }
//         fetchPlans();
//     }, []);


//     const filteredAndSortedPlans = useMemo(() => {
//         return plans
//             .filter((plan) => {
//                 const searchLower = search.toLowerCase();
//                 return (
//                     plan.title.toLowerCase().includes(searchLower) ||
//                     plan.type.toLowerCase().includes(searchLower)
//                 );
//             })
//             .sort((a, b) => {
//                 const compare = a.title.localeCompare(b.title);
//                 return sortOrder === "asc" ? compare : -compare;
//             });
//     }, [plans, search, sortOrder]);


//     if (loading) return <LoadingState></LoadingState>;
//     if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

//     return (
//         <div className="w-full md:w-10/12 mx-auto mb-20">
//             <div className="my-20">
//                 <Fade>
//                     <h2 className="text-5xl font-bold mb-8 text-center">Our Insurance Plans</h2>
//                     <p className="text-center">InsureEase helps you find the perfect insurance plan quickly and easily. Learn why Health Savings Accounts are a critical benefit in employee retention.</p>

//                     <div className="flex flex-col md:flex-row items-center justify-between my-8 gap-10">
//                         <label className="input">
//                             <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                                 <g
//                                     strokeLinejoin="round"
//                                     strokeLinecap="round"
//                                     strokeWidth="2.5"
//                                     fill="none"
//                                     stroke="currentColor"
//                                 >
//                                     <circle cx="11" cy="11" r="8"></circle>
//                                     <path d="m21 21-4.3-4.3"></path>
//                                 </g>
//                             </svg>
//                             <input type="search" className="grow" placeholder="Search by name or type" value={search} onChange={(e) => setSearch(e.target.value)} />
//                             <kbd className="kbd kbd-sm">⌘</kbd>
//                             <kbd className="kbd kbd-sm">K</kbd>
//                         </label>

//                         <select
//                             value={sortOrder}
//                             onChange={(e) =>
//                                 setSortOrder(e.target.value === "asc" ? "asc" : "desc")
//                             }
//                             className="select border rounded-lg px-3 py-1"
//                         >
//                             <option value="asc">Ascending Order</option>
//                             <option value="desc">Descending Order</option>
//                         </select>
//                     </div>


//                 </Fade>
//             </div>


//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//                 {
//                     filteredAndSortedPlans.length > 0 ? (
//                         filteredAndSortedPlans.map((plan) => (
//                             <Zoom key={plan._id} triggerOnce>
//                                 <div className="rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//                                     <Image
//                                         src={plan.bannerUrl}
//                                         alt={plan.title}
//                                         width={500}
//                                         height={300}
//                                         className="w-full h-48 object-cover"
//                                     />
//                                     <div className="p-5">
//                                         <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
//                                         <p className=" text-sm mb-2">Type: {plan.type}</p>
//                                         {/* <p className="text-gray-600 text-sm mb-2">Coverage: {plan.coverage}</p> */}
//                                         <p className=" font-bold mb-4">
//                                             Premium: {plan.premium} | Term: {plan.term}
//                                         </p>
//                                         <Link
//                                             href={`/insurance/${plan._id}`}
//                                             className="btn btn-sm rounded-full btn-primary"
//                                         >
//                                             View Details
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </Zoom>
//                         )

//                         )) : (
//                         <p className="col-span-full text-center text-gray-500">
//                             No plans match your search.
//                         </p>
//                     )

//                 }
//             </div>
//         </div>
//     )
// }
