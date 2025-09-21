import React from 'react';
import { Github, Linkedin, Heart, Sparkles } from 'lucide-react';

const FooterPage = () => {
  return (
    <footer className="relative border-t border-purple-500/20 py-6 text-white w-full mt-auto overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Main content container */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          
          {/* Left side - Brand and Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400 animate-spin" style={{animationDuration: '3s'}} />
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Blogify
              </h3>
              <Sparkles className="w-5 h-5 text-blue-400 animate-spin" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
            </div>
            
            <div className="h-6 w-px bg-gray-600"></div>
            
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Don't Forget to Write a Blog Before You Log Off!
            </p>
          </div>
          
          {/* Right side - Made with, AI magic, and Social links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span className="text-gray-400">and</span>
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium">AI magic</span>
            </div>
            
            <div className="h-6 w-px bg-gray-600"></div>
            
            <a 
              href="https://github.com/SwastikaPradhan" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-purple-500/20"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">GitHub</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/swastika-pradhan-1a0532252/" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-blue-500/20"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">LinkedIn</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
          </div>
        </div>
        
      
      </div>
    </footer>
  );
};

export default FooterPage;