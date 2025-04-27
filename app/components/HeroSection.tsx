import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  {
    name: "MongoDB",
    url: "/mongodb.svg",
    class: "border-green-600 bg-stone-200",
    positionClass: "top-[25%] left-[3%] lg:left-[16%] sm:top-[25%] sm:left-[3%] md:top-[25%] md:left-[3%]",
    initialRotation: 5,
  },
  {
    name: "PostgreSQL",
    url: "/postsql.svg",
    class: "border-indigo-600 bg-stone-200",
    positionClass: "top-[75%] left-[45%] sm:left-[45%] md:left-[48%]",
    initialRotation: -10,
  },
  {
    name: "MySQL",
    url: "/mysql.svg",
    class: "border-indigo-400 bg-stone-200",
    positionClass: "top-[20%] left-[75%] lg:left-[75%] sm:left-[75%] md:left-[80%]",
    initialRotation: -30,
  },
  {
    name: "Next.js",
    url: "/nextjs.svg",
    class: "border-stone-200 bg-black",
    positionClass: "top-[13%] left-[42%] lg:left-[46%] sm:left-[42%] md:left-[42%]",
    initialRotation: -5,
  },
  {
    name: "React",
    url: "/react.svg",
    class: "border-blue-200 bg-zinc-800",
    positionClass: "top-[65%] left-[75%] sm:top-[60%] sm:left-[70%] md:top-[58%] md:left-[75%]",
    initialRotation: 10,
  },
  {
    name: "TailwindCss",
    url: "/tailwindcss.svg",
    class: "border-sky-300 bg-zinc-300",
    positionClass: "top-[65%] left-[10%] lg:top-[] lg:left-[] sm:top-[60%] sm:left-[18%] md:top-[60%] md:left-[20%]",
    initialRotation: 10,
  },
];

interface HeroSectionProps {
  refHero: (node?: Element | null) => void;
  onScrollToProjects: () => void;
}

const HeroSection = ({ refHero, onScrollToProjects }: HeroSectionProps) => {
  const [text, setText] = useState("Power");
  const [color, setColor] = useState("text-cyan-400");
  const [transform, setTransform] = useState("none");

  const textVariants = [
    { text: "Power", color: "text-cyan-700", transform: "none" },
    { text: "p0wer", color: "text-indigo-500", transform: "lowercase" },
    { text: "POWER", color: "text-rose-500", transform: "uppercase" },
    { text: "p0wEr", color: "text-blue-500", transform: "lowercase" },
    { text: "PoWeR", color: "text-green-800", transform: "capitalize" },
    { text: "power", color: "text-purple-600", transform: "capitalize" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * textVariants.length);
      const { text, color, transform } = textVariants[randomIndex];
      setText(text);
      setColor(color);
      setTransform(transform);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={refHero} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 animated-grid-bg z-0" />

      {/* Floating Logos */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {logos.map((logo, index) => (
          <motion.img
            key={logo.name}
            src={logo.url}
            alt={logo.name}
            className={`h-24 w-24 object-contain rounded-full p-4 border-3 bg-opacity-20 shadow-md backdrop-blur-md absolute ${logo.class} ${logo.positionClass}`}
            animate={{
              y: [0, -25, 0],
              rotate: [
                logo.initialRotation,
                logo.initialRotation + 15,
                logo.initialRotation - 15,
                logo.initialRotation,
              ],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-0">
        <h1 className="text-3xl sm:text-3xl font-extrabold drop-shadow-md">
          <span
            className={`transform transition-all duration-300 ${transform} ${color}
             drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] 
            underline underline-offset-1`}
          >
            {text}
          </span>
          ing Innovation with Modern Tech
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-white/80 max-w-2xl mx-auto drop-shadow-sm">
          From databases to frontends — we integrate cutting-edge technologies like MongoDB, React, PostgreSQL, and more to deliver scalable, high-performance solutions.
        </p>
        <div className="space-x-4 mt-6">
          <button
            onClick={onScrollToProjects}
            className="px-6 py-3 bg-gradient-to-r animate-gradient-x from-purple-500 via-zinc-400 to-indigo-500 text-zinc-800 cursor-pointer font-semibold rounded-md shadow 
              hover:bg-purple-400 hover:text-stone-900 hover:scale-105 transition"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
