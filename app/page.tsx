'use client';
import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import ExperienceEducation from "./components/EducationtTimeLine";
import NewsLetter from "./components/NewsLetter";
import ContactUs from "./components/ContectUs";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import HeroSection from "./components/HeroSection";
import Testimonial from "./components/Testimoneal";
import AboutUs from "./components/Aboutus";
import Head from "next/head";

export default function Home() {
  // Refs for scroll and animations
  const heroRef = useRef(null);
  const projectRef = useRef<HTMLElement>(null);
  const contactRef = useRef(null);

  const [refHero, inViewHero] = useInView({ triggerOnce: true });
  const [refProjects, inViewProjects] = useInView({ triggerOnce: true });
  const [refContact, inViewContact] = useInView({ triggerOnce: true });

  const heroControls = useAnimation();
  const projectsControls = useAnimation();
  const contactControls = useAnimation();

  // Smooth scroll to Projects
  const scrollToProjects = () => {
    projectRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Trigger animations when in view
  useEffect(() => {
    if (inViewHero) heroControls.start({ opacity: 1, y: 0 });
    if (inViewProjects) projectsControls.start({ opacity: 1, y: 0 });
    if (inViewContact) contactControls.start({ opacity: 1, y: 0 });
  }, [inViewHero, inViewProjects, inViewContact]);

  return (
    <>
    <Head>
        <title>Muhammad Amin | Web Developer Portfolio</title>
        <meta name="description" content="Web developer portfolio showcasing responsive websites, React apps, and creative frontend design." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Muhammad Amin" />
        <meta property="og:title" content="Muhammad Amin | Web Developer" />
        <meta property="og:description" content="See my projects, skills, and get in touch for freelance or full-time work." />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:url" content="https://codeandcraft-six.vercel.app/" />
      </Head>
      {/* rest of your code */}


    <div className="min-h-screen flex flex-col">
      {/* Hero Section with scroll button */}
      <HeroSection refHero={refHero} onScrollToProjects={scrollToProjects} />
      {/* Aboutus section */}
      <AboutUs />

      {/* Timeline, Testimonials, etc. */}
      <ExperienceEducation />
      {/* Projects Section */}
      <Projects
        refProjects={projectRef}
      />
      {/* <Testimonial /> */}
      <NewsLetter />
      <ContactUs contactControls={contactControls} refContact={refContact} />
      <Footer />
    </div>
    </>
  );
}
