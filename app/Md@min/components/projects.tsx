import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: string;
  link:string;
}

interface ProjectProps {
  refProjects: React.Ref<HTMLElement>;
}

const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

const Projects = ({ refProjects }: ProjectProps) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const [form, setForm] = useState<Partial<Project>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

// CREATE or UPDATE project
const mutation = useMutation({
    mutationFn: async (newProject: Partial<Project>) => {
      const res = await fetch(`/api/projects/${editingId ?? ""}`, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) throw new Error("Failed to save project");
      return res.json();
    },
    onSuccess: (savedProject) => {
      queryClient.setQueryData<Project[]>(["projects"], (old = []) => {
        if (editingId) {
          // Update existing project in cache
            setShow(false);
            setMsg("Successfully Updated");
            setTimeout(() => setMsg(""), 3000);
          return old.map((proj) => (proj.id === savedProject.id ? savedProject : proj));
        } else {
          // Add new project to cache
          setShow(false);
          return [...old, savedProject];
        }
      });
      setForm({});
      setEditingId(null);
    },
  });
  
  // DELETE project
  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      return id;
    },
    onSuccess: (deletedId) => {
      setMsg("Successfully Deleted");
      setTimeout(() => setMsg(""), 3000);
      queryClient.setQueryData<Project[]>(["projects"], (old = []) =>
        old.filter((proj) => proj.id !== deletedId)
      );
    },
  });
  
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return; // basic validation
    mutation.mutate(form);
  };
  

  const handleEdit = (project: Project) => {
    setShow(true);
    setForm(project);
    setEditingId(project.id);
  };

  return (
    <section ref={refProjects} className="text-white relative">
      {msg &&
      (
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="absolute top-0 inset-0 w-[100%] h-10 bg-green-800/80 p-2 w-100 text-center">
      <p className="text-gray-200 font-bold">
        {msg} 
      </p>
      </motion.div>
      )
      }
   <div className="flexed flex justify-between">
                      <h1 className="text-2xl font-bold mb-1">Projects</h1>
                      <button 
                        onClick={() => {setShow(true)}} // Set state to show the modal
                        className="flex border border-dashed bg-gray-200/80 font-semibold text-gray-800 p-2 pl-4 rounded-sm hover:scale-103 cursor-pointer">
                        Create New
                        <FiPlus className="m-1"/>
                      </button>
                    
          
          </div>
          <p className="text-zinc-400">View uploaded projects.</p>

      {show && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
          }`}
        >
          <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 w-[50%] rounded space-y-4"
          >
        <input
          type="text"
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={form.skills || ""}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image || ""}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />
         <input
          type="text"
          placeholder="Demo URL"
          value={form.link || ""}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />
        <textarea
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
        />
        <button
          type="submit"
          className="bg-indigo-600 px-4 cursor-pointer mr-2 py-2 rounded"
        >
          {editingId ? "Update" : "Add"} Project
        </button>
        <button
          onClick={() => {
            setShow(false);
            setTimeout(() => setForm({}), 300); // Optional: Clear form after animation
          }}
          className="bg-rose-600/70 px-4 py-2 cursor-pointer rounded"
        >
          Close
        </button>
          </form>
        </div>
      )}
    

      {isLoading ? (
          <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="mt-6 text-red-400">Error loading projects.</p>
      ) : (
        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length >0 ? projects.map((project) => (
            <div key={project.id} className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
              src={project.image}
              alt={project.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
              />
              <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
              <p className="text-sm text-indigo-400 font-medium mb-4">{project.skills}</p>
              <div className="flex justify-end space-x-4">
                <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 text-sm font-semibold text-blue-400 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition"
                >
                Edit
                </button>
                <button
                onClick={() => deleteProject.mutate(project.id)}
                className="px-3 py-1 text-sm font-semibold text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                >
                Delete
                </button>
              </div>
              </div>
            </div>
          )):<>
          <div className="col-span-full text-center py-10">
            <p className="text-zinc-400 text-lg">No data found :(</p>
          </div>
          </>}
        </div>
      )}
    </section>
  );
};

export default Projects;
