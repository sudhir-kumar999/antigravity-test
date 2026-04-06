import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'React', level: 95, color: 'bg-blue-500' },
  { name: 'JavaScript (ES6+)', level: 90, color: 'bg-yellow-400' },
  { name: 'Tailwind CSS', level: 95, color: 'bg-cyan-400' },
  { name: 'Node.js', level: 80, color: 'bg-green-500' },
  { name: 'MongoDB', level: 75, color: 'bg-green-600' },
  // { name: 'Framer Motion', level: 85, color: 'bg-purple-500' },
  { name: 'Next js', level: 75, color: 'bg-green-600' },
  { name: 'Gen AI', level: 70, color: 'bg-yellow-600' },
];

const OTHER_SKILLS = [
  'TypeScript',
  'Next.js',
  'Redux / Zustand',
  'Context API',
  'Git & GitHub',
  'Vite',
  'Responsive Design',
  'REST APIs',
  'JWT Authentication',
  'Postman',
  'API Integration',
  'MVC Architecture',
  'Debugging',
  'Performance Optimization',
  'SEO Basics',
  'Deployment (Netlify / Vercel)',
  'RAG (Retrieval Augmented Generation)',
  'Prompt Engineering',
  'AI Chatbot Development',
  'Gemini API Integration',
];

export default function Skills() {
  return (
    <section id="skills" className="section-container relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="heading-primary">My Skills</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Technical Arsenal</h3>
          
          {SKILLS.map((skill, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                  className={`h-full ${skill.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Skill Tags */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Additional Tools & Tech</h3>
          <div className="flex flex-wrap gap-4">
            {OTHER_SKILLS.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="glass-card px-6 py-3 font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800/50 cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>

          {/* <div className="mt-12 glass-card p-8 bg-gradient-to-br from-primary-500/10 to-blue-500/10">
            <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-500">
              Always Learning
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              The tech landscape is always evolving. I spend a portion of my time researching new libraries, architectures, and design patterns to ensure my solutions are state of the art.
            </p>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
