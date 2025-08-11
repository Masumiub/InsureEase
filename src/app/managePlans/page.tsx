"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast"; // Optional, for notifications
import LoadingState from "@/components/LoadingState";
import Swal from "sweetalert2";

type InsurancePlan = {
    _id: string;
    type: string;
    title: string;
    coverage: string;
    premium: number;
    term: string;
    bannerUrl: string;
};

const schema = z.object({
    type: z.enum(["health", "car", "travel", "life"]),
    title: z.string().min(3, "Title too short"),
    coverage: z.string().min(5, "Coverage too short"),
    premium: z.number().positive("Premium must be positive"),
    term: z.string().min(2, "Term required"),
    bannerUrl: z.string().url("Invalid URL"),
});

type FormData = z.infer<typeof schema>;

export default function ManagePlansPage() {
    const { data: session, status } = useSession();
    const [plans, setPlans] = useState<InsurancePlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // For modal and editing
    const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "admin") {
            fetchPlans();
        }
    }, [status, session]);

    async function fetchPlans() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/insurance-plans");
            if (!res.ok) throw new Error("Failed to fetch plans");
            const data = await res.json();
            setPlans(data || []);
        } catch (err) {
            setError((err as Error).message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    function openEditModal(plan: InsurancePlan) {
        setSelectedPlan(plan);
        reset({
            type: plan.type as "health" | "car" | "travel" | "life",
            title: plan.title,
            coverage: plan.coverage,
            premium: plan.premium,
            term: plan.term,
            bannerUrl: plan.bannerUrl,
        });
        (document.getElementById("edit_modal") as HTMLDialogElement | null)?.showModal();
    }

    function closeEditModal() {
        (document.getElementById("edit_modal") as HTMLDialogElement | null)?.close();
        setSelectedPlan(null);
    }

    async function onSubmit(data: FormData) {
        if (!selectedPlan) return;

        try {
            const res = await fetch("/api/insurance-plans", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedPlan._id, ...data }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to update plan");
            //toast.success("Plan updated successfully!");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Plan updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            closeEditModal();
            fetchPlans();
        } catch (err) {
            //toast.error((err as Error).message);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${err}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this plan?")) return;

        try {
            const res = await fetch(`/api/insurance-plans?id=${id}`, {
                method: "DELETE",
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to delete plan");
            toast.success("Plan deleted successfully!");
            fetchPlans();
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    if (status === "loading") return <LoadingState></LoadingState>;

    if (!session || session.user?.role !== "admin") {
        return <p className="text-center text-red-600 mt-10">Forbidden: Admins only</p>;
    }

    return (
        <div className="w-full md:w-10/12 mx-auto my-20">
            <h1 className="text-5xl font-bold text-center mb-20">Manage Insurance Plans</h1>

            {loading && <p>Loading plans...</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Title</th>

                            <th>Premium</th>
                            <th>Term</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan, i) => (
                            <tr key={plan._id}>
                                <th>{i + 1}</th>
                                <td>{plan.type}</td>
                                <td>{plan.title}</td>
                                <td>{plan.premium}</td>
                                <td>{plan.term}</td>
                                <td className="space-x-2">
                                    <button
                                        className="btn btn-xs btn-info rounded-full text-white"
                                        onClick={() => openEditModal(plan)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-xs btn-error rounded-full text-white"
                                        onClick={() => handleDelete(plan._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <dialog id="edit_modal" className="modal">
                <form
                    method="dialog"
                    className="modal-box max-w-lg"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className="font-bold text-lg mb-4">Edit Insurance Plan</h3>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Type</span>
                        </label>

                        <select {...register("type")} className="select select-bordered w-full">
                            <option value="">Select type</option>
                            <option value="health">Health</option>
                            <option value="car">Car</option>
                            <option value="travel">Travel</option>
                            <option value="life">Life</option>
                        </select>
                        {errors.type && (
                            <p className="text-red-600">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            {...register("title")}
                            className="input input-bordered w-full"
                        />
                        {errors.title && (
                            <p className="text-red-600">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Coverage</span>
                        </label>
                        <textarea
                            {...register("coverage")}
                            className="textarea textarea-bordered w-full"
                            rows={3}
                        />
                        {errors.coverage && (
                            <p className="text-red-600">{errors.coverage.message}</p>
                        )}
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Premium</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("premium", { valueAsNumber: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.premium && (
                            <p className="text-red-600">{errors.premium.message}</p>
                        )}
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Term</span>
                        </label>
                        <input
                            type="text"
                            {...register("term")}
                            className="input input-bordered w-full"
                        />
                        {errors.term && (
                            <p className="text-red-600">{errors.term.message}</p>
                        )}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Banner URL</span>
                        </label>
                        <input
                            type="text"
                            {...register("bannerUrl")}
                            className="input input-bordered w-full"
                        />
                        {errors.bannerUrl && (
                            <p className="text-red-600">{errors.bannerUrl.message}</p>
                        )}
                    </div>

                    <div className="modal-action">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-full">
                            Save
                        </button>
                        <button type="button" className="btn rounded-full" onClick={closeEditModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}
