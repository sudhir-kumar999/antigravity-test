import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const EXPERIENCES = [
  {
    title: 'MERN Stack Developer Intern',
    company: 'Excellence Technology',
    date: '2026 (1 Month)',
    description: 'Worked on real-world web applications using MERN stack and Next.js. Built responsive UI components, integrated APIs, and optimized application performance. Gained hands-on experience in full-stack development and project workflows.',
    type: 'work',
    icon: <Briefcase size={20} />
  },
  {
    title: 'MERN Stack & Gen AI Trainee',
    company: 'QSpiders, Noida',
    date: '2025',
    description: 'Completed hands-on training in MERN stack development along with basics of Generative AI. Built multiple projects including AI chatbot (RAG-based) and Mediconnect. Strengthened skills in React, Node.js, MongoDB, and API integration.',
    type: 'work',
    icon: <Briefcase size={20} />
  },
  {
    title: 'B.Tech in Computer Science Engineering',
    company: 'Bihar Engineering University',
    date: '2021 - 2025',
    description: 'Completed graduation in Computer Science Engineering with focus on web development, data structures, and software engineering fundamentals.',
    type: 'education',
    icon: <GraduationCap size={20} />
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="heading-primary">Experience & Education</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-blue-500 transform md:-translate-x-1/2 opacity-30 rounded-full"></div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-4 border-primary-500 transform -translate-x-1/2 flex items-center justify-center text-primary-500 z-10 shadow-lg">
                {exp.icon}
              </div>

              {/* Content Card */}
              <div className="w-full pl-16 md:pl-0 md:w-1/2">
                <div className={`glass-card p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 ${
                  index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                }`}>
                  <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-bold rounded-full mb-4">
                    {exp.date}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{exp.title}</h3>
                  <h4 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-2">
                    {exp.company}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
