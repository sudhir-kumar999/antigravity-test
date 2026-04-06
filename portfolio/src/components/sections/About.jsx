import { motion } from 'framer-motion';
import { Code, Layout, Smartphone } from 'lucide-react';

const SERVICES = [
  {
    title: 'Full Stack Development',
    description: 'Building complete web applications using MERN stack with scalable architecture.',
  },
  {
    title: 'Frontend Development',
    description: 'Creating responsive and modern UI using React, Tailwind CSS and animations.',
  },
  {
    title: 'AI Integration',
    description: 'Integrating Generative AI features like chatbots, RAG systems, and automation.',
  }
];

export default function About() {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="heading-primary">About Me</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            Passionate about creating <span className="text-primary-500 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500">beautiful</span> web experiences
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
            I am a dedicated frontend developer with over 5 years of experience building modern web applications. 
            My journey began with a curiosity for how things work on the internet, which quickly turned into a passion for coding.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
            Today, I specialize in the React ecosystem, combining powerful logic with stunning UI/UX designs. 
            I love turning complex problems into simple, beautiful, and intuitive designs. 
            When I'm not pushing pixels, you'll find me exploring new technologies or hiking trails.
          </p> */}

          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
  Passionate about building <span className="text-primary-500 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500">modern</span> web applications
</h3>

<p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
  I am a passionate MERN Stack Developer and a recent graduate, with hands-on experience in building real-world projects. 
  I have completed my training from QSpiders Noida, where I worked on multiple full-stack applications and strengthened my core development skills.
</p>

<p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
  I specialize in React, Node.js, MongoDB, and also have a strong interest in Generative AI. 
  I have built projects like RAG-based AI bots and Mediconnect, focusing on solving real-world problems. 
  I enjoy learning new technologies and continuously improving my development skills.
</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Stats Glass Cards */}
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold ...">Fresher</span>
<span className="text-slate-600 dark:text-slate-400 font-medium">Experience Level</span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center mt-8">
            <span className="text-4xl font-bold ...">10+</span>
<span className="text-slate-600 dark:text-slate-400 font-medium">Projects Built</span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center -mt-8">
           <span className="text-4xl font-bold ...">MERN</span>
<span className="text-slate-600 dark:text-slate-400 font-medium">Tech Stack</span>
</div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold ...">Gen AI</span>
<span className="text-slate-600 dark:text-slate-400 font-medium">Learning & Building</span>
          </div>
        </motion.div>
      </div>

      {/* Services Section within About */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300"
          >
            {service.icon}
            <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{service.title}</h4>
            <p className="text-slate-600 dark:text-slate-400">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
