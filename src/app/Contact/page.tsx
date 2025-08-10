
"use client";

import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import Img from '../../../public/assets/Animation - contact.json'


const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log("Form submitted:", data);
        // Here you can integrate backend email or DB saving
        reset();
    };

    return (
        <div className="w-full md:w-10/12 mx-auto my-20">
            {/* Hero */}
            <Fade triggerOnce direction="down">
                <h1 className="text-5xl font-bold text-center mb-4">Contact Us</h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Have questions or need assistance? Our friendly team is here to help you.
                </p>
            </Fade>

            {/* Contact Info */}
            <Slide triggerOnce direction="up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="card bg-base-100  p-6 text-center shadow-md hover:shadow-lg transition bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
                        <FaMapMarkerAlt className="text-4xl  mb-4 mx-auto" />
                        <h3 className="font-bold text-lg">Address</h3>
                        <p className="">123 InsureEase St, New York, NY</p>
                    </div>
                    <div className="card bg-base-100  p-6 text-center shadow-md hover:shadow-lg transition bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
                        <FaPhoneAlt className="text-4xl  mb-4 mx-auto" />
                        <h3 className="font-bold text-lg">Phone</h3>
                        <p className="">+1 (555) 123-4567</p>
                    </div>
                    <div className="card bg-base-100  p-6 text-center shadow-md hover:shadow-lg transition bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
                        <FaEnvelope className="text-4xl  mb-4 mx-auto" />
                        <h3 className="font-bold text-lg">Email</h3>
                        <p className="">support@insureease.com</p>
                    </div>
                </div>
            </Slide>

            {/* Contact Form */}
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2">
                    <Zoom triggerOnce>
                        <div className="mt-16 bg-base-100  rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="input input-ed w-full"
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="input input-ed w-full"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Your Message"
                                        className="textarea textarea-ed w-full"
                                        rows={5}
                                        {...register("message")}
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm">{errors.message.message}</p>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </Zoom>
                </div>

                <div className="w-full md:w-1/2 mx-auto">

                    <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>

                </div>
            </div>


        </div>
    );
}
