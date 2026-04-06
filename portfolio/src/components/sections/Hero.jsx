import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowRight } from 'lucide-react';
import sk from "../../assets/sk.png"
import resume from "../../assets/Sudhir_Mern_GenAi.pdf"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden section-container">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass-card text-sm font-semibold text-primary-600 dark:text-primary-400">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins text-slate-800 dark:text-white leading-tight mb-4">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500">Sudhir Kumar</span>
          </h1>
          <div className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6 h-12">
            I build{' '}
            <TypeAnimation
              sequence={[
                'dynamic web apps.',
                2000,
                'beautiful interfaces.',
                2000,
                'scalable systems.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-primary-500 dark:text-primary-400 font-bold"
              repeat={Infinity}
            />
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
            A passionate Full Stack Developer specializing in the MERN stack, TypeScript, and Basics of Next.js.
Additionally, skilled in Generative AI concepts, including building AI-powered applications such as RAG-based chatbots and intelligent assistants. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary flex items-center justify-center gap-2 group">
              Hire Me
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={resume}  download className="btn-outline flex items-center justify-center gap-2 group">
              Download Resume
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          {/* Image container with animated border */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 animate-[spin_8s_linear_infinite] opacity-50 blur-md"></div>
            <div className="relative w-full h-full rounded-full border-2 border-white/20 overflow-hidden shadow-2xl glass p-2">
              <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                {/* Fallback image if no avatar provided */}
                <img src={sk} alt="" />
                {/* <span className="text-5xl opacity-50">👨‍💻</span> */}
                {/* To use a real image, uncomment below and add avatar.jpg in public folder */}
                {/* <img src="/avatar.jpg" alt="John Doe" className="w-full h-full object-cover" /> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
