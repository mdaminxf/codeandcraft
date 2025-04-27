import { motion } from "framer-motion"
import { useState } from "react";

export default function NewsLetter ()
{
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

    return (
 
   <section className="relative py-10 transition-all duration-300 transform hover:scale-y-103">
   <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 
 text-white font-bold text-lg rounded-md
 shadow-lg"></div>
   <div className="relative container mx-auto px-4 text-center text-white">
     <motion.div
   initial={{ opacity: 0, y: 50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 1 }}
     >
   <h2 className="text-stone-300 font-bold mb-2 underline underline-offset-3">
    <span className="text-stone-100 text-3xl"> Newsletter</span> </h2>
   <p className="mb-8">
     Stay updated with the latest projects and news. Subscribe now!
   </p>
   <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
     <input
       type="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       placeholder="Your Email"
       className="w-full px-4 py-2 border rounded-lg text-white"
     />
     <button
       type="submit"
       className="w-full px-6 py-2 bg-stone-600 text-zinc-200 rounded-lg hover:bg-stone-700 cursor-pointer transition"
       disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
     </button>
   </form>
     </motion.div>
   </div>
 </section>
    );
}