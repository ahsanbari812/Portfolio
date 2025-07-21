import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero3D: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);



  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/20 to-zinc-800/20" />
      </div>

      {/* Playground Slider Tab */}
      <motion.div
        className="fixed top-1/2 right-0 z-50"
        style={{ transform: 'translateY(-50%)' }}
        initial={{ x: 80, opacity: 0.7 }}
        animate={{ x: hovered ? 0 : 80, opacity: hovered ? 1 : 0.7 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-l-2xl shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold backdrop-blur-lg border border-zinc-800 hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/playground')}
        >
          <Code className="w-5 h-5" />
          <span className="hidden md:inline">Playground</span>
        </button>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-8 max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Ahsan Bari
            </h1>
            
            {/* Animated subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl md:text-3xl text-gray-300 font-light mb-8"
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent bg-[length:200%_200%]"
              >
                Frontend Developer
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting exceptional digital experiences with modern web technologies. 
            Specializing in React, TypeScript, and cutting-edge frontend development.
          </motion.p>

          {/* Interactive Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.a
              href="/Muhammad_Ahsan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Resume
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#projects"
              className="group relative px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center gap-6"
          >
            <motion.a
              href="https://github.com/ahsanbari812"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-zinc-800/50 hover:bg-purple-500/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6 text-gray-300" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ahsanbari812"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-zinc-800/50 hover:bg-blue-500/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-6 h-6 text-gray-300" />
            </motion.a>
          </motion.div>


        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-purple-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero3D; 