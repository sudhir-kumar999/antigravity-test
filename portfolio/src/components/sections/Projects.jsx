import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
// import { motion } from "motion/react";
import Skills from "./Skills";
import book from "../../assets/book.png";
import omniagent from "../../assets/omniagent.png"
import chatapp from "../../assets/chatapp.png";
import notebookllm from "../../assets/notebookllm.png";
// import todo from "../assets/todo.png";
import drsaas from "../../assets/drsaas.png";
import bg from "../../assets/bg.png";
import qr from "../../assets/qr.png";
import music from "../../assets/music.png";

// const PROJECTS = [
//   {
//     title: 'E-Commerce Platform',
//     description: 'A full-featured modern e-commerce platform with cart functionality, payment gateway integration, and user authentication.',
//     image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     tech: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Stripe'],
//     demo: '#',
//     github: '#'
//   },
//   {
//     title: 'Task Management App',
//     description: 'A collaborative kanban board application with real-time updates and drag-and-drop functionality.',
//     image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     tech: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'Framer Motion'],
//     demo: '#',
//     github: '#'
//   },
//   {
//     title: 'Cryptocurrency Dashboard',
//     description: 'A real-time dashboard tracking top cryptocurrencies with interactive charts and portfolio management.',
//     image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     tech: ['React', 'Chart.js', 'CoinGecko API', 'Redux', 'CSS Modules'],
//     demo: '#',
//     github: '#'
//   }
// ];
const PROJECTS = [
  {
    title: "OmniAgent AI",
    description:
      "An AI-powered autonomous assistant enabling conversational interaction and multi-tool execution. Demonstrates agent workflows, tool calling, and modern Generative AI application architecture.",
    image: omniagent,
    tech: ["React", "JavaScript", "Tailwind CSS", "Node js","Express js","Mongo DB", "Gemini API", "AI Agents"],
    demo: "https://omniagent-ai-front.onrender.com",
    github: "https://github.com/sudhir-kumar999/OmniAgent-Ai.git",
  },
  {
    title: "RAG Bot (AI Knowledge Assistant)",
    description:
      "A Retrieval-Augmented Generation chatbot that delivers context-aware responses using semantic search and AI models. Showcases real-world LLM integration and knowledge retrieval techniques.",
    image: notebookllm,
    tech: ["React", "JavaScript", "Gemini API", "Vector Search", "RAG"],
    demo: "https://rag-bot-front.onrender.com",
    github: "https://github.com/sudhir-kumar999/Rag_Bot_LLM.git",
  },
  {
    title: "MediConnect AI (Doctor SaaS)",
    description:
      "A healthcare SaaS platform enabling secure patient-doctor interaction with authentication and AI features. Demonstrates scalable MERN stack architecture and real-world SaaS development.",
    image: drsaas,
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "AI Integration"],
    demo: "https://doctor-saas-systems.onrender.com",
    github: "https://github.com/sudhir-kumar999/Doctor-saas-system.git",
  },
  {
    title: "E-Commerce Book Store",
    description:
      "A responsive e-commerce frontend with product browsing, reusable components, and modern UI design. Focused on scalable frontend architecture and user experience.",
    image: book,
    tech: ["React", "JavaScript", "Tailwind CSS", "Redux"],
    demo: "https://e-comm-front-6mnh.onrender.com",
    github: "https://github.com/sudhir-kumar999/e-comm-payment.git",
  },
  {
    title: "Real-Time Chat App",
    description:
      "A real-time messaging application with instant communication and dynamic updates. Demonstrates modern web communication and interactive UI handling.",
    image: chatapp,
    tech: ["React", "Node.js", "Socket.io", "Express", "MongoDB"],
    demo: "https://realtimechatapp-id8w.onrender.com",
    github: "https://github.com/sudhir-kumar999/chat_app.git",
  },

];

export default function Projects() {
  return (
    <section id="projects" className="section-container bg-slate-100 dark:bg-slate-900/50 rounded-[3rem] my-10 shadow-inner">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 pt-10"
      >
        <h2 className="heading-primary">Featured Projects</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-card group overflow-hidden flex flex-col h-full"
          >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-primary-600/20 group-hover:bg-transparent transition-all duration-300 z-10" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>

            {/* Project Info */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 mt-auto">
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white bg-slate-800 dark:bg-slate-700 py-2 px-4 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                >
                  <FiGithub size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8 pb-12">
        <button className="btn-outline">
          <a href="https://github.com/sudhir-kumar999">View More on GitHub</a>
          
        </button>
      </div>
    </section>
  );
}
