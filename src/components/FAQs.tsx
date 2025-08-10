
"use client";

import React from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      'Click the "Sign Up" button in the top right corner and follow the registration process.',
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
  },
  {
    question: "How do I update my profile information?",
    answer:
      'Go to "My Account" settings and select "Edit Profile" to make changes.',
  },
];

export default function FAQs() {
  return (
    <div className="w-full mx-auto my-20">
        <div>
            <h1 className="font-semibold text-5xl text-center mb-10">FAQs</h1>
        </div>
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="collapse collapse-arrow bg-base-100 border border-base-300 mb-2"
        >
          <input
            type="radio"
            name="my-accordion"
            defaultChecked={i === 0}
            aria-labelledby={`faq-title-${i}`}
            aria-describedby={`faq-content-${i}`}
          />
          <div
            id={`faq-title-${i}`}
            className="collapse-title font-semibold cursor-pointer"
          >
            {faq.question}
          </div>
          <div id={`faq-content-${i}`} className="collapse-content text-sm">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
