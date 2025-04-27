import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Ref, useState } from "react";

interface ContactUsProps {
  refContact: Ref<HTMLElement>;
  contactControls: any; // Replace 'any' with the appropriate type if known
}

export default function ContactUs({ refContact, contactControls }: ContactUsProps)
{
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');
      return res.json();
    },
    onSuccess: () => {
      setShowPopup(true); // 🎉 show confirmation
      setFormData({ name: '', email: '', message: '' }); // reset form
    },
    onError:()=>{
      setShowError(true);
      setFormData({name:'', email:'', message:''});
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

 // Basic validation
 if (!name || !email || !message) {
  setError("All fields are required.");
  setShowError(true);
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setError("Please enter a valid email address.");
  setShowError(true);
  return;
}

    mutation.mutate();
  };


    return(
      <section
        ref={refContact}
        className="flex flex-col justify-center items-center bg-gray-100 py-10 sm:px-6 "
      >
        <h2 className="text-3xl font-bold text-zinc-700 mb-8 text-center underline underline-offset-3">
            <span className="text-4xl text-indigo-600">Contact </span>us
          </h2>
          <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-zinc-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-zinc-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-zinc-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div>
            <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full px-6 py-2 bg-indigo-500 text-zinc-200 rounded-lg hover:bg-indigo-600 cursor-pointer transition"
        >
        {mutation.isPending ? 'Sending...' : 'Send Message'}
      </button>
      {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn scale-100 transition-all duration-300">
      {/* ✅ Success icon */}
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
      <p className="text-sm text-gray-600">Thanks for reaching out — I’ll get back to you shortly.</p>

      <button
        onClick={() => setShowPopup(false)}
        className="mt-6 inline-flex items-center cursor-pointer justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

      {showError && <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn scale-100 transition-all duration-300">
      {/* ❌ Error icon */}
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong.</h3>
      <p className="text-sm text-gray-600">
        We couldn't send your message. Please try again or contact us directly.
      </p>

      <button
        onClick={() => setShowError(false)}
        className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
      >
        Close
      </button>
    </div>
  </div>
      </>}
            </div>
          </form>
      </section>
    );
}
