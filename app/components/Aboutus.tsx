'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutUsProps {
  refAbout?: React.Ref<HTMLElement>;
}

const AboutUs = ({ refAbout }: AboutUsProps) => {
  return (
    <section ref={refAbout} id="about" className="py-16 bg-white">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-700 underline underline-offset-3">
          <span className="text-purple-600 text-4xl">About </span> me
          </h2>
      <motion.div
        className="container mx-auto px-8 flex flex-col lg:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Image side */}
        <div className="w-full lg:w-1/2 relative h-80 lg:h-[400px]">
          <Image
            src="/aboutme.png" // Replace with your actual image path
            alt="Our Team"
            fill
            className="object-cover rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2">
  <p className="text-lg text-zinc-700 leading-relaxed mb-4">
    Hi, I'm <span className="underline underline-offset-4 font-bold text-purple-500">Muhammad Amin</span>, a passionate web developer with over 5 years of experience building dynamic and user-friendly web applications. Since 2020, I've been crafting digital solutions with a strong focus on performance, usability, and clean code.
  </p>
  <p className="text-lg text-zinc-700 leading-relaxed mb-4">
    I specialize in Java, React, Next.js, MongoDB, and various SQL and NoSQL databases—technologies I use to build scalable, secure, and responsive web apps. I take pride in writing clean, maintainable code and continuously strive to improve user experience across devices.
  </p>
  <p className="text-lg text-zinc-700 leading-relaxed">
    Beyond coding, I’m deeply invested in UI/UX best practices, accessibility, and SEO optimization. Whether you need a portfolio site, a real-time chat app, or a full-stack SaaS solution, I bring both technical skills and creative vision to the table. Let's build something exceptional together!
  </p>
</div>

      </motion.div>
    </section>
  );
};

export default AboutUs;
