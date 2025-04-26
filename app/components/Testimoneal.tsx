'use client'

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  message: string;
  avatarUrl: string;
  rating: number;
}

const ITEMS_PER_PAGE = 3;

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });


  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonial');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        } else {
          console.error('Failed to fetch testimonials');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Pagination logic
  const TOTAL_PAGES = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Pagination handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-zinc-100">
        <div className="container mx-auto px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-200 rounded w-24 mx-auto"></div>
            <div className="mt-4 h-8 bg-zinc-200 rounded w-24 mx-auto">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-10 bg-white" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 } }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-zinc-700 underline underline-offset-3">
            <span className="text-purple-600 text-4xl">Client</span> testimonials
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Hear what our clients say about working with us
          </p>
        </motion.div>

        <div className="flex flex-col">
          {currentTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={item}
                  className="bg-zinc-50 rounded-xl shadow-md hover:shadow-xl p-4 flex flex-col"
                  whileHover={{ y: -10 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                    </div>
                  </div>
                  <p className="text-zinc-700 mb-4 flex-grow">"{testimonial.message}"</p>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500">No testimonials to display</p>
            </div>
          )}

          {testimonials.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: TOTAL_PAGES }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === i + 1
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage < TOTAL_PAGES ? currentPage + 1 : TOTAL_PAGES)}
                disabled={currentPage === TOTAL_PAGES}
                className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
