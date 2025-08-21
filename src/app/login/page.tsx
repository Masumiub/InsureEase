"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Img from '../../../public/assets/login.json.json'
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2'



const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!res?.error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login was successful",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/insurance");
    }
  };

  return (
    <div className=" pt-30">
      <div className='w-full md:w-10/12 mx-auto '>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">


          <div className="w-full md:w-2/3">
            <div className="max-w-md mx-auto bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg p-6 rounded-2xl ">
              <h1 className="text-4xl font-bold mb-4 text-center text-white">Login</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input {...register("email")} placeholder="Email" className="w-full p-2 input rounded " defaultValue="admin@gmail.com" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Password" className="w-full p-2 input rounded " defaultValue="samsung77" />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <div className="flex gap-3 text-white">
                  <input type="checkbox" className="checkbox text-white" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                  Show Password
                </div>


                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-full">
                  Login
                </button>
              </form>

              <div className="divider text-white">OR</div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="btn w-full bg-red-500 text-white p-2 rounded-full shadow-none border-0"
                >
                  <FaGoogle /> Sign in with Google
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-white">Dont have any account? <Link href='/register'> <span className="text-blue-300">Register</span></Link> </p>
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