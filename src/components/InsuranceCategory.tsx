"use client";

import { Fade } from "react-awesome-reveal";
import { FaCar, FaHome, FaHeartbeat, FaPlane } from "react-icons/fa";

const categories = [
  {
    name: "Car Insurance",
    icon: <FaCar className="text-5xl text-blue-500" />,
    description: "Comprehensive coverage for your vehicle with flexible plans.",
  },
  {
    name: "Home Insurance",
    icon: <FaHome className="text-5xl text-green-500" />,
    description: "Protect your home and belongings from unexpected events.",
  },
  {
    name: "Health Insurance",
    icon: <FaHeartbeat className="text-5xl text-red-500" />,
    description: "Affordable health plans for you and your family’s well-being.",
  },
  {
    name: "Travel Insurance",
    icon: <FaPlane className="text-5xl text-yellow-500" />,
    description: "Stay safe and protected during your travels worldwide.",
  },
];

export default function InsuranceCategory() {
  return (
    <div className="mx-auto py-20">
      <h2 className="text-4xl font-bold text-center mb-10">Insurance Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Fade key={index} direction="up" triggerOnce>
            <div
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-center mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
