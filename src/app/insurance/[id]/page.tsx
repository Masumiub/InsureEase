"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import Features from "@/components/Features";
import Points from "@/components/Points";
import { useSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import LoadingState from "@/components/LoadingState";

type InsurancePlan = {
    _id: string;
    type: string;
    title: string;
    coverage: string;
    premium: string;
    term: string;
    bannerUrl: string;
};


const bookingSchema = z
    .object({
        fullName: z.string().min(2, "Name required"),
        email: z.string().email("Invalid email"),
        age: z.number().int().min(18, "Must be 18+"),
        income: z.number().min(0, "Income must be >= 0"),
        carType: z.string().optional(),
        tripDate: z.string().optional(), // ISO date string
        notes: z.string().max(1000).optional(),
        planId: z.string(),
    })



type BookingForm = z.infer<typeof bookingSchema>;

export default function InsurancePlanDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [plan, setPlan] = useState<InsurancePlan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BookingForm>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: "",
            email: "",
            age: 18,
            income: 0,
            carType: "",
            tripDate: "",
            notes: "",
            planId: Array.isArray(id) ? id[0] : id ?? "",
        },
    });




    useEffect(() => {
        async function fetchPlan() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/insurance-plans/${id}`);
                if (!res.ok) throw new Error("Failed to fetch insurance plan");

                const data = await res.json();
                const p = data.plan || null;
                if (p) {
                    // normalize _id if needed
                    p._id = typeof p._id === "object" ? String(p._id) : p._id;
                }
                setPlan(p);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchPlan();
    }, [id]);


    useEffect(() => {
        if (session?.user) {
            const name = session.user.name ?? "";
            const email = session.user.email ?? "";
            setValue("fullName", name);
            setValue("email", email);
        }
    }, [session, setValue]);


    function openApplyModal() {
        // prefill planId
        setValue("planId", id as string);
        (document.getElementById("apply_modal") as HTMLDialogElement | null)?.showModal();
    }
    function closeApplyModal() {
        (document.getElementById("apply_modal") as HTMLDialogElement | null)?.close();
    }


    const onSubmit: SubmitHandler<BookingForm> = async (data) => {
        if (!plan) return;

        if (plan.type === "car" && !data.carType) {
            alert("Please provide car type for car insurance.");
            return;
        }
        if (plan.type === "travel" && !data.tripDate) {
            alert("Please provide trip date for travel insurance.");
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    planId: id,
                    planTitle: plan.title,
                    planType: plan.type,
                }),
            });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json?.error || "Failed to create booking");
            }

            closeApplyModal();
            reset();

            router.push("/my-policies");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            alert(msg);
        } finally {
            setSubmitting(false);
        }
    }



    if (loading) return <LoadingState></LoadingState>;
    if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
    if (!plan) return <p className="text-center py-10">Plan not found</p>;

    return (
        <div>
            <div className="bg-blue-50">
                <div className="w-full md:w-10/12 mx-auto mb-20">
                <Slide direction="left" triggerOnce>
                    <div className=" mx-auto p-6 rounded">
                        <div className="flex flex-col items-center md:flex-row gap-10">
                            <div className="w-full md:w-2/3">
                                <h1 className="text-5xl font-bold mb-6">{plan.title}</h1>
                                <p className="mb-2"><strong>Coverage:</strong> {plan.coverage}</p>
                                <p className="mb-2"><strong>Term:</strong> {plan.term}</p>
                                <p className="mb-2"><strong>Type:</strong> {plan.type}</p>

                                {status === "loading" ? (
                                    <button className="btn btn-disabled mt-4">Checking...</button>
                                ) : session ? (
                                    <button className="btn btn-primary mt-4 rounded-full" onClick={openApplyModal}>
                                        Apply Now
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline mt-4"
                                        onClick={() => signIn()}
                                    >
                                        Login to apply
                                    </button>
                                )}
                            </div>
                            <div className="w-full md:w-1/3">
                                <Image
                                    src={plan.bannerUrl}
                                    alt={plan.title}
                                    width={800}
                                    height={400}
                                    className="rounded-2xl mb-6 object-cover"
                                />
                                <div className="bg-primary text-center py-5 rounded-2xl shadow-lg">
                                    <p className="text-2xl text-white"><strong>Premium:</strong> {plan.premium}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </Slide>
                </div>
            </div>

            <div className="w-full md:w-10/12 mx-auto mb-20">
                <Features></Features>
                <Points></Points>

                <dialog id="apply_modal" className="modal">
                    <form
                        method="dialog"
                        className="modal-box max-w-xl"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className="font-bold text-lg mb-2">Apply for: {plan.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">Please complete the form to request a quote/booking.</p>

                        <div className="grid grid-cols-1 gap-2">
                            <label className="label">
                                <span className="label-text">Full name</span>
                            </label>
                            <input className="input input-bordered w-full" {...register("fullName", { required: true })} />
                            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input className="input input-bordered w-full" {...register("email", { required: true })} />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" {...register("age", { valueAsNumber: true })} />
                            {errors.age && <p className="text-red-600 text-sm">{errors.age.message}</p>}

                            <label className="label">
                                <span className="label-text">Annual Income</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" {...register("income", { valueAsNumber: true })} />
                            {errors.income && <p className="text-red-600 text-sm">{errors.income.message}</p>}

                            {/* Plan-specific fields */}
                            {plan.type === "car" && (
                                <>
                                    <label className="label"><span className="label-text">Car Type</span></label>
                                    <input className="input input-bordered w-full" {...register("carType")} />
                                    {errors.carType && <p className="text-red-600 text-sm">{errors.carType.message}</p>}
                                </>
                            )}

                            {plan.type === "travel" && (
                                <>
                                    <label className="label"><span className="label-text">Trip Date</span></label>
                                    <input type="date" className="input input-bordered w-full" {...register("tripDate")} />
                                    {errors.tripDate && <p className="text-red-600 text-sm">{errors.tripDate.message}</p>}
                                </>
                            )}

                            <label className="label"><span className="label-text">Notes (optional)</span></label>
                            <textarea className="textarea textarea-bordered w-full" {...register("notes")}></textarea>
                        </div>

                        <div className="modal-action mt-4">
                            <button type="submit" className="btn btn-primary rounded-full" disabled={submitting}>
                                {submitting ? "Submitting..." : "Submit Application"}
                            </button>
                            <button type="button" className="btn rounded-full" onClick={closeApplyModal}>Cancel</button>
                        </div>
                    </form>
                </dialog>
            </div>

        </div>
    );
}
