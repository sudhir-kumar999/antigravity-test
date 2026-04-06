import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for initial animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-inter relative overflow-x-hidden selection:bg-primary-500 selection:text-white">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-900"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-primary-500 dark:border-t-primary-500 rounded-full animate-spin mb-4" />
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-500"
              >
                Portfolio.
              </motion.h2>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen"
          >
            {/* Global Layout Elements */}
            <ScrollProgress />
            <Navbar />
            <BackToTop />
            
            {/* Main Content */}
            <main className="flex-grow pb-20">
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
