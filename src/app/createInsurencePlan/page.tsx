"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  type: z.enum(["health", "car", "travel", "life"])
    .refine((val) => !!val, { message: "Select a valid insurance type" }),

  title: z.string().min(3, "Title too short"),

  coverage: z.string().min(3, "Coverage detail too short"),

  premium: z.number().positive("Premium must be positive"),

  term: z.string().min(2, "Term required"),
  bannerFile: z
    .any()
    .refine((files) => files?.length === 1, "Banner image is required"),
});

type FormData = z.infer<typeof schema>;

export default function CreateInsurancePlan() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user?.role !== "admin") {
    return <p className="text-center text-red-600 mt-10">Forbidden: Admins only</p>;
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imgBB_key}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.success) {
        setUploadError("Image upload failed");
        setUploading(false);
        return null;
      }
      setUploading(false);
      return data.data.url;
    } catch {
      setUploadError("Image upload error");
      setUploading(false);
      return null;
    }
  }

  async function onSubmit(data: FormData) {
    const bannerFile = data.bannerFile[0];
    const bannerUrl = await uploadImage(bannerFile);
    if (!bannerUrl) return;

    // Prepare payload for backend
    const payload = {
      type: data.type,
      title: data.title,
      coverage: data.coverage,
      premium: data.premium,
      term: data.term,
      bannerUrl,
    };

    const res = await fetch("/api/insurance-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (res.ok) {
      alert("Insurance Plan Created!");
      router.push("/");
    } else {
      alert(json.error || "Failed to create plan");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded shadow mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Create Insurance Plan</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          Type
          <select {...register("type")} className="input input-bordered w-full mt-1">
            <option value="">Select type</option>
            <option value="health">Health</option>
            <option value="car">Car</option>
            <option value="travel">Travel</option>
            <option value="life">Life</option>
          </select>
          {errors.type && <p className="text-red-600">{errors.type.message}</p>}
        </label>

        <label className="block">
          Title
          <input
            type="text"
            {...register("title")}
            className="input input-bordered w-full mt-1"
            placeholder="Title"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </label>

        <label className="block">
          Coverage
          <textarea
            
            {...register("coverage")}
            className="textarea w-full mt-1"
            placeholder="Coverage details"
          ></textarea>
          {errors.coverage && <p className="text-red-600">{errors.coverage.message}</p>}
        </label>

        <label className="block">
          Premium
          <input
            type="number"
            step="1"
            {...register("premium", { valueAsNumber: true })}
            className="input input-bordered w-full mt-1"
            placeholder="Premium amount"
          />
          {errors.premium && <p className="text-red-600">{errors.premium.message}</p>}
        </label>

        <label className="block">
          Term
          <input
            type="text"
            {...register("term")}
            className="input input-bordered w-full mt-1"
            placeholder="Term (e.g. 1 year, 6 months)"
          />
          {errors.term && <p className="text-red-600">{errors.term.message}</p>}
        </label>

        <label className="block">
          Banner Image
          <input
            type="file"
            {...register("bannerFile")}
            accept="image/*"
            className="input input-bordered w-full mt-1"
          />
          {errors.bannerFile && (
            <p className="text-red-600">{String(errors.bannerFile.message)}</p>
          )}
        </label>

        {uploadError && <p className="text-red-600">{uploadError}</p>}

        <button
          type="submit"
          disabled={uploading}
          className="btn btn-primary w-full mt-4 rounded-full"
        >
          {uploading ? "Uploading..." : "Create Plan"}
        </button>
      </form>
    </div>
  );
}
