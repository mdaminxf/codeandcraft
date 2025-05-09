import { useState } from "react";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggleOpen = (index:any) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto mt-16 px-4 bg-zinc-800 text-white rounded-lg shadow-lg p-8">
      <h3 className="text-3xl font-bold text-purple-600 mb-6 text-center underline underline-offset-4">
        FAQ
      </h3>

      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        <div>
          <h2 id="accordion-flush-heading-1">
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-200 border-b border-gray-600 gap-3"
              onClick={() => toggleOpen(0)}
              aria-expanded={open === 0 ? "true" : "false"}
              aria-controls="accordion-flush-body-1"
            >
              <span>What services do you offer?</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 transform ${open === 0 ? "rotate-180" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5L5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {open === 0 && (
            <div
              id="accordion-flush-body-1"
              className="py-5 border-b border-gray-600"
              aria-labelledby="accordion-flush-heading-1"
            >
              <p className="mb-2 text-gray-300">
                I specialize in modern web development, including full-stack applications, responsive design, and UI/UX enhancements. I also offer code consulting and performance optimization.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 id="accordion-flush-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-200 border-b border-gray-600 gap-3"
              onClick={() => toggleOpen(1)}
              aria-expanded={open === 1 ? "true" : "false"}
              aria-controls="accordion-flush-body-2"
            >
              <span>How long does a typical project take?</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 transform ${open === 1 ? "rotate-180" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5L5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {open === 1 && (
            <div
              id="accordion-flush-body-2"
              className="py-5 border-b border-gray-600"
              aria-labelledby="accordion-flush-heading-2"
            >
              <p className="mb-2 text-gray-300">
                Timelines depend on project scope, but small to mid-sized projects typically take between 2 to 6 weeks. I’ll provide a detailed estimate after reviewing your requirements.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 id="accordion-flush-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-200 border-b border-gray-600 gap-3"
              onClick={() => toggleOpen(2)}
              aria-expanded={open === 2 ? "true" : "false"}
              aria-controls="accordion-flush-body-3"
            >
              <span>Can I hire you for ongoing work?</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 transform ${open === 2 ? "rotate-180" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5L5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {open === 2 && (
            <div
              id="accordion-flush-body-3"
              className="py-5 border-b border-gray-600"
              aria-labelledby="accordion-flush-heading-3"
            >
              <p className="mb-2 text-gray-300">
                Absolutely! I’m available for both short-term tasks and long-term collaborations. Let’s talk about how I can support your project over time.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 id="accordion-flush-heading-4">
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-200 border-b border-gray-600 gap-3"
              onClick={() => toggleOpen(3)}
              aria-expanded={open === 3 ? "true" : "false"}
              aria-controls="accordion-flush-body-4"
            >
              <span>What technologies do you work with?</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 transform ${open === 3 ? "rotate-180" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5L5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {open === 3 && (
            <div
              id="accordion-flush-body-4"
              className="py-5 border-b border-gray-600"
              aria-labelledby="accordion-flush-heading-4"
            >
              <p className="mb-2 text-gray-300">
                I primarily work with JavaScript, TypeScript, React, Next.js, Tailwind CSS, and Node.js — but I'm flexible with tools and frameworks depending on your needs.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 id="accordion-flush-heading-5">
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-200 border-b border-gray-600 gap-3"
              onClick={() => toggleOpen(4)}
              aria-expanded={open === 4 ? "true" : "false"}
              aria-controls="accordion-flush-body-5"
            >
              <span>How can I get a quote?</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 transform ${open === 4 ? "rotate-180" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5L5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {open === 4 && (
            <div
              id="accordion-flush-body-5"
              className="py-5"
              aria-labelledby="accordion-flush-heading-5"
            >
              <p className="mb-2 text-gray-300">
                Just use the contact form above with a short description of your project. I’ll reply with a personalized quote or request more details if needed.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
