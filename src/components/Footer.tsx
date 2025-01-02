import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/NABADEEP069"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/prashantshawrma/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
          <div className="text-gray-400 hover:text-white transition-colors duration-200">
            <p className="text-sm font-medium">
              Developed by{' '}
              <span className="text-indigo-400">Nabadeep</span> &{' '}
              <span className="text-indigo-400">Prashant</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}