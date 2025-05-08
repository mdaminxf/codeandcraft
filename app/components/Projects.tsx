'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FiGlobe, FiLink2, FiSend, FiShare, FiShare2 } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  skills: string;
}

interface ProjectProps {
  refProjects: React.Ref<HTMLElement>;
}

// Fetcher function
const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch('/api/projects');
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
};

const Projects = ({ refProjects }: ProjectProps) => {
  const queryClient = useQueryClient(); // ✅ here

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Prefetching logic (optional, based on real pagination API)
  const prefetchNext = (pageNumber: number) => {
    // If your API supports page queries like `/api/projects?page=2`, you'd prefetch like:
    // queryClient.prefetchQuery(['projects', pageNumber], () => fetchProjects(pageNumber));
    // But for static list, it just simulates cache activity
    queryClient.prefetchQuery({ queryKey: ['projects'], queryFn: fetchProjects });
  };

  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => paginate(i + 1)}
        onMouseEnter={() => prefetchNext(i + 1)} // ✅ prefetch on hover
        className={`w-10 h-10 rounded-full flex items-center cursor-pointer justify-center ${
          currentPage === i + 1
            ? 'bg-blue-600 text-white'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-300'
        } transition-colors`}
      >
        {i + 1}
      </button>
    ));
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <section ref={refProjects} className="py-20 bg-zinc-100">
        <div className="container mx-auto px-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-purple-300 rounded w-32 mx-auto"></div>
            <div className="h-6 bg-purple-200 rounded w-48 mx-auto"></div>
            <div className="h-6 bg-purple-200 rounded w-40 mx-auto"></div>
            <div className="flex justify-center space-x-4 mt-6">
              <div className="h-10 w-10 bg-purple-300 rounded-full"></div>
              <div className="h-10 w-10 bg-purple-300 rounded-full"></div>
              <div className="h-10 w-10 bg-purple-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error instanceof Error) {
    return (
      <section ref={refProjects} className="py-20 bg-zinc-100">
        <div className="container mx-auto px-8 text-center text-red-500">
          <p>Error loading projects: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={refProjects} className="py-10 bg-zinc-100" id="projects">
      <motion.div
        className="container mx-auto px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-10 underline underline-offset-3">
          <span className="text-purple-600 text-4xl">My</span> projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {currentProjects.length>0 ? currentProjects.map((project) => (
    <motion.div
      key={project.id}
      className="bg-zinc-300 shadow-xl rounded-xl shadow-md p-4 flex flex-col"
    >
     <div className="w-full aspect-video overflow-hidden rounded-md bg-gray-200">
  <img
    src={project.image}
    alt={project.title}
    loading="lazy"
    className="w-full h-full object-cover object-center"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>

      <div className="p-6">
        <h3 className="flex w-full flex-1 justify-between items-center text-xl font-bold text-gray-900 mb-2">
          {project.title}
          <span className="flex">
            <FiLink2 className="m-1 text-purple-500" />
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 underline underline-offset-2"
            >
              demo
            </a>
          </span>
        </h3>
        <p className="text-zinc-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills.split(',').map((skill, index) => (
            <span
              key={index} // Ensure each skill has a unique key (index is a fallback here)
              className="px-3 py-1 bg-purple-700/20 text-purple-800 text-xs rounded-md border border-1 border-purple-800"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
)) : (
  <p className="text-md font-bold text-zinc-500 text-center mb-10">
    NO Data Found {' :('}
  </p>
)}
</div>


        {projects.length > projectsPerPage && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => paginate(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700
                cursor-pointer disabled:cursor-auto disabled:opacity-50 hover:bg-zinc-200"
              >
                Previous
              </button>
              {paginationButtons}
              <button
                onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700 
                cursor-pointer disabled:cursor-auto disabled:opacity-50 hover:bg-zinc-200"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
