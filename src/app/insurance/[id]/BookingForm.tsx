"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";

type InsurancePlan = {
  _id: string;
  title: string;
  type: string;
};

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  age: z.number().int().min(18, "Must be 18+"),
  income: z.number().min(0, "Income must be >= 0").optional(),
  carType: z.string().optional(),
  tripDate: z.string().optional(),
  notes: z.string().max(1000).optional(),
  planId: z.string(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm({ plan }: { plan: InsurancePlan }) {
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { planId: plan._id },
  });

  // Prefill session info
  useEffect(() => {
    if (session?.user) {
      setValue("fullName", session.user.name || "");
      setValue("email", session.user.email || "");
    }
  }, [session, setValue]);

  const openModal = () => {
    const modal = document.getElementById("apply_modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("apply_modal") as HTMLDialogElement;
    modal?.close();
  };

  const onSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    if (!session) return signIn();

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
        body: JSON.stringify({ ...data, planTitle: plan.title, planType: plan.type }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to create booking");

      alert("Booking submitted successfully!");
      closeModal();
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <button className="btn btn-disabled mt-4">Checking...</button>
      ) : session ? (
        <button className="btn btn-primary mt-4 rounded-full" onClick={openModal}>
          Apply Now
        </button>
      ) : (
        <button className="btn btn-outline mt-4" onClick={() => signIn()}>
          Login to apply
        </button>
      )}

      <dialog id="apply_modal" className="modal">
        <form className="modal-box max-w-xl" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-2">Apply for: {plan.title}</h3>
          <p className="text-sm text-gray-600 mb-4">Please complete the form to request a quote/booking.</p>

          <div className="grid grid-cols-1 gap-2">
            <label className="label">
              <span className="label-text">Full name</span>
            </label>
            <input className="input input-bordered w-full" {...register("fullName")} />
            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input className="input input-bordered w-full" {...register("email")} />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input type="number" className="input input-bordered w-full" {...register("age", { valueAsNumber: true })} />
            {errors.age && <p className="text-red-600 text-sm">{errors.age.message}</p>}

            <label className="label">
              <span className="label-text">Annual Income (optional)</span>
            </label>
            <input type="number" className="input input-bordered w-full" {...register("income", { valueAsNumber: true })} />
            {errors.income && <p className="text-red-600 text-sm">{errors.income.message}</p>}

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
            <button type="button" className="btn rounded-full" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
