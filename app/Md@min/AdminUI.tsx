'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiLayers, FiMail, FiSend, FiSettings } from "react-icons/fi";
import ProjectsPage from "./components/projects";
import Newsletter from "./components/newsletter";
export default function AdminSinglePage() {

  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "messages" | "settings">("dashboard");

  // Inline sections as a map of labels, icons, and content
  const sections = {
    dashboard: {
      label: "Dashboard",
      icon: <FiHome />,
      content: (
        <>
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-zinc-400">Overview of your portfolio activity.</p>
        </>
      )
    },
    projects: {
      label: "Projects",
      icon: <FiLayers />,
      content: (
        <>
          <ProjectsPage refProjects={null} />
        </>
      )
    },
    messages: {
      label: "Messages",
      icon: <FiMail />,
      content: (
        <>
          <Newsletter /> {/* Pass show state to Newsletter */}
        </>
      )
    },
    settings: {
      label: "Settings",
      icon: <FiSettings />,
      content: (
        <>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-zinc-400">Configure your portfolio site preferences.</p>
        </>
      )
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 p-6 border-r border-zinc-700">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-3">
          {Object.entries(sections).map(([key, val]) => (
            <li key={key}>
              <button
                onClick={() => setActiveTab(key as keyof typeof sections)} // Set the active tab
                className={`flex items-center gap-3 px-3 py-2 w-full rounded text-left transition 
                ${activeTab === key ? "bg-indigo-600 font-semibold" : "hover:bg-zinc-700"}`}
              >
                {val.icon}
                <span>{val.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {sections[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
