import { Heart } from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-500 mb-2">Portfolio.</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
            Building digital products, brands, and experience with modern tech.
          </p>
        </div>

        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="https://github.com/sudhir-kumar999" className="text-slate-400 hover:text-primary-500 transition-colors">
            <FiGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/sudhir-kumar-sk966/" className="text-slate-400 hover:text-blue-500 transition-colors">
            <FiLinkedin size={24} />
          </a>
          {/* <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
            <FiTwitter size={24} />
          </a> */}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-400 text-sm">
        <p>&copy; {currentYear} Sudhir Kumar. All rights reserved.</p>
        <p className="flex items-center mt-2 md:mt-0">
          Made with <Heart size={16} className="mx-1 text-red-500" /> using React & Tailwind
        </p>
      </div>
    </footer>
  );
}
