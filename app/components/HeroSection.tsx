import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  {
    name: "MongoDB",
    url: "/mongodb.svg",
    class: "border-green-600 bg-stone-200",
    initialRotation: 5,
  },
  {
    name: "PostgreSQL",
    url: "/postsql.svg",
    class: "border-indigo-600 bg-stone-200",
    initialRotation: -10,
  },
  {
    name: "MySQL",
    url: "/mysql.svg",
    class: "border-indigo-400 bg-stone-200",
    initialRotation: -30,
  },
  {
    name: "Next.js",
    url: "/nextjs.svg",
    class: "border-stone-200 bg-black",
    initialRotation: -5,
  },
  {
    name: "React",
    url: "/react.svg",
    class: "border-blue-200 bg-zinc-800",
    initialRotation: 10,
  },
  {
    name: "TailwindCss",
    url: "/tailwindcss.svg",
    class: "border-sky-300 bg-zinc-300",
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

      {/* Floating Logos (behind the text) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] z-10 pointer-events-none">
        {logos.map((logo, index) => {
          const radius = 140; // radius of circle
          const angle = (360 / logos.length) * index - 90; // minus 90 to start at top
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.img
              key={logo.name}
              src={logo.url}
              alt={logo.name}
              className="absolute h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full p-2 border-2 shadow-md backdrop-blur-md bg-white/20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                rotate: [logo.initialRotation, logo.initialRotation + 10, logo.initialRotation - 10, logo.initialRotation],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Hero Content (Text in Center) */}
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
