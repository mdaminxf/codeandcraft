'use client';
import { useState } from "react";

// FAQ Data in JSON format
const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in modern web development, including full-stack applications, responsive design, and UI/UX enhancements. I also offer code consulting and performance optimization.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on project scope, but small to mid-sized projects typically take between 2 to 6 weeks. I’ll provide a detailed estimate after reviewing your requirements.",
  },
  {
    question: "Can I hire you for ongoing work?",
    answer:
      "Absolutely! I’m available for both short-term tasks and long-term collaborations. Let’s talk about how I can support your project over time.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "I primarily work with JavaScript, TypeScript, React, Next.js, Tailwind CSS, and Node.js — but I'm flexible with tools and frameworks depending on your needs.",
  },
  {
    question: "How can I get a quote?",
    answer:
      "Just use the contact form above with a short description of your project. I’ll reply with a personalized quote or request more details if needed.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="w-auto bg-zinc-800 py-12 px-4 sm:px-6 lg:px-12">
      <h3 className="text-3xl font-bold text-white mb-6 text-center underline underline-offset-4">
        F<span className="text-purple-500 mx-1">&</span>Q
      </h3>
      <div
  id="accordion-modern"
  className="rounded-xl overflow-hidden"
>
  {faqData.map((faq, index) => (
    <div key={index} className="mb-2 last:mb-0 rounded-xl overflow-hidden shadow-sm dark:shadow-md">
      <h2 id={`accordion-modern-heading-${index}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full px-6 py-4 font-semibold text-left text-slate-800 bg-white dark:bg-zinc-800 dark:text-slate-200 hover:bg-violet-100 dark:hover:bg-zinc-700 transition-colors duration-200 ${open === index ? "border-b border-slate-200 dark:border-zinc-700" : "rounded-xl"}`}
          onClick={() => toggleOpen(index)}
          aria-expanded={open === index ? "true" : "false"}
          aria-controls={`accordion-modern-body-${index}`}
        >
          <span>{faq.question}</span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${open === index ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>

      {open === index && (
        <div
          id={`accordion-modern-body-${index}`}
          className="px-6 py-5 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 transition-colors duration-200 border-t border-slate-100 dark:border-zinc-700"
          aria-labelledby={`accordion-modern-heading-${index}`}
        >
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  ))}
</div>

    </section>
  );
};

export default FAQ;
