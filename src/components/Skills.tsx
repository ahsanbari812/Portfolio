import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Smartphone, Database, Server, GitBranch, Sparkles, Palette } from 'lucide-react';

const Skills: React.FC = () => {
  const skills = [
    { name: 'React & Next.js', icon: <Code className="w-6 h-6" /> },
    { name: 'TypeScript', icon: <Code className="w-6 h-6" /> },
    { name: 'React Native', icon: <Smartphone className="w-6 h-6" /> },
    { name: 'Flutter', icon: <Smartphone className="w-6 h-6" /> },
    { name: 'Node.js', icon: <Server className="w-6 h-6" /> },
    { name: 'TailwindCSS', icon: <Palette className="w-6 h-6" /> },
    { name: 'MongoDB', icon: <Database className="w-6 h-6" /> },
    { name: 'PostgreSQL', icon: <Database className="w-6 h-6" /> },
    { name: 'Docker', icon: <Server className="w-6 h-6" /> },
    { name: 'Git', icon: <GitBranch className="w-6 h-6" /> },
    { name: 'CI/CD', icon: <GitBranch className="w-6 h-6" /> },
    { name: 'UI/UX Design', icon: <Layout className="w-6 h-6" /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Technical Arsenal</h2>
        <p className="text-xl text-gray-300">
          A comprehensive toolkit for building modern web and mobile applications
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            className="relative group"
            variants={item}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#7F00FF] via-[#E100FF] to-[#FF7F00] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"/>
            <div className="relative bg-card-bg p-6 rounded-lg flex flex-col items-center group-hover:bg-card-bg/80 transition-all duration-300">
              <div className="mb-3 text-gray-200">
                {skill.icon}
              </div>
              <span className="text-sm text-gray-200 text-center">{skill.name}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.button
          className="bg-[#2D1A47] rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#3D2A57] transition-all duration-300 relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7F00FF] via-[#E100FF] to-[#FF7F00] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"/>
          <Sparkles className="text-[#E100FF] relative z-10" size={20} />
          <span className="sr-only">And More</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Skills;