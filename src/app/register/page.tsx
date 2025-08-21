"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import Img from '../../../public/assets/Isometric data analysis.json'
import Swal from "sweetalert2";


const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/");
    }
  };

  return (
    <div className="pt-30">
      <div className='w-full md:w-10/12 mx-auto'>

        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">

          <div className="w-full md:w-2/3">
            <div className="max-w-md mx-auto p-6 rounded-lg shadow-2xl bg-gradient-to-r from-blue-800 to-indigo-900 ">
              <h1 className="text-4xl font-bold mb-4 text-center text-white">Register</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input {...register("name")} placeholder="Name" className="w-full p-2 input rounded " />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input {...register("email")} placeholder="Email" className="w-full p-2 input rounded " />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input type="password" {...register("password")} placeholder="Password" className="w-full p-2 input rounded " />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-full btn shadow-none border-0">
                  Register
                </button>
              </form>

              <div className="divider text-white">OR</div>ç

              <div className="mt-4 text-center">
                <button
                  onClick={() => signIn("google")}
                  className="btn w-full bg-red-500 text-white p-2 rounded-full shadow-none border-0"
                >
                  <FaGoogle /> Sign up with Google
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-white">Already have any account? <Link href='/login'> <span className="text-blue-300">Login</span></Link> </p>
              </div>
            </div>

          </div>

          <div className="w-full md:w-1/3 mx-auto">

            <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>

          </div>

        </div>
      </div>

    </div>
  );
}