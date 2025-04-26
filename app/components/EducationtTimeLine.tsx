import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiCode, FiDatabase, FiCpu, FiLayers } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

var i = 3;
const Timeline: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const learningJourney = [
    {
      year: "2020",
      title: "Started Coding Journey",
      skills: ["Computer Basics"],
      icon: <FiCode className="text-blue-600 text-2xl" />,
      isMilestone: true
    },
    {
      year: "2021",
      title: "Learned Fundamentals",
      skills: ["HTML", "CSS"],
      icon: <FiLayers className="text-green-800 text-2xl" />
    },
    {
      year: "2022",
      title: "Frontend Development",
      skills: ["JavaScript"],
      icon: <FiCpu className="text-yellow-600 text-2xl" />
    },
    {
      year: "2023",
      title: "Backend Foundations",
      skills: ["PHP", "MySQL"],
      icon: <FiDatabase className="text-purple-800 text-2xl" />
    },
    {
      year: "2024",
      title: "Modern Stack",
      skills: ["React", "MongoDB"],
      icon: <FiCpu className="text-cyan-800 text-2xl" />,
      isMilestone: true
    },
    {
      year: "2025",
      title: "Fullstack Mastery",
      skills: ["Next.js", "PostgreSQL"],
      icon: <FiDatabase className="text-white text-2xl" />,
      isActive: true
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-zinc-900 to-zinc-800 text-white"
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          className="text-3xl sm:text-4xl font-bold text-center mb-2 underline underline-offset-4"
        >
          my coding <span className="text-indigo-400 text-4xl">Journey</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1 }
          }}
          transition={{ delay: 0.2 }}
          className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto"
        >
          From fundamentals to fullstack development (2020 - Present)
        </motion.p>

        {/* Timeline Container */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute h-1.5 bg-zinc-700 top-[15px] left-0 right-0 z-0 hidden sm:block">
            <motion.div
              initial={{ width: 0 }}
              animate={controls}
              variants={{
                visible: { width: "100%" }
              }}
              transition={{ duration: i }}
              className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
            />
          </div>

          {/* Timeline Items */}
          <div className="flex flex-wrap justify-center sm:justify-between gap-y-12 relative z-10">
            {learningJourney.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: idx * 0.3 }}
                className="flex flex-col items-center w-4/5 sm:w-40"
              >
                {/* Icon */}
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 
                    ${item.isActive
                      ? "ring-4 ring-indigo-500/30 bg-indigo-500"
                      : item.isMilestone
                      ? "bg-gray-100"
                      : "bg-zinc-200"}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.div>

                {/* Year */}
                <span
                  className={`text-sm font-medium ${
                    item.isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {item.year}
                </span>

                {/* Card */}
                <motion.div
                  className={`mt-4 p-4 rounded-lg text-center w-full 
                    ${item.isActive
                      ? "bg-indigo-500/30 border border-indigo-400"
                      : "bg-zinc-800/50"} `}
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    {item.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        className={`text-xs px-2 py-1 rounded border border-1 ${
                          item.isActive
                            ? "bg-zinc-900/70 border-zinc-400"
                            : "bg-zinc-700/50 border-zinc-500"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
