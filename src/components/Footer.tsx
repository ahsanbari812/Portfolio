import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full min-h-[40vh] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Logo */}
      <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-8">
        AB
      </div>

      {/* Social Links */}
      <div className="flex space-x-8 mb-8">
        <a
          href="https://github.com/ahsanbari812"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-ahsan-bari-2914a7221/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="mailto:muhammadahsan0812@gmail.com"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-gray-400 text-sm">
        © 2025 Ahsan Bari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 