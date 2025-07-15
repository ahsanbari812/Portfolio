import React, { useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Smartphone, Globe, Code, Zap, Brain, Github, Link as LinkIcon } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "AI Resume Builder",
      description: "A full-stack e-commerce platform with features like real-time inventory management, secure payment processing, and a responsive admin dashboard. Built with modern web technologies for optimal performance.",
      technologies: ["React.js", "JavaScript", "Gemini API"],
      icon: Brain,
      githubLink: "https://github.com/your-github/ai-resume-builder",
      projectLink: "https://ai-resume-builder-fast.vercel.app/"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Framer Motion. Features smooth animations, dynamic content loading, and optimized performance scores.",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "TypeScript", "Vite"],
      icon: Globe,
      githubLink: "https://github.com/ahsanbari812/Portfolio",
      projectLink: "https://ahsanportfolio-phi.vercel.app/"
    },
    {
      title: "Fitness Tracking App",
      description: "A cross-platform mobile application for tracking workouts, nutrition, and fitness goals. Features include custom workout plans, progress tracking, and social sharing capabilities.",
      technologies: ["React Native", "Redux", "Node.js", "MongoDB", "Firebase"],
      icon: Smartphone,
      githubLink: "#",
      projectLink: "#"
    },
    {
      title: "Task Management System",
      description: "A collaborative task management platform with real-time updates, team collaboration features, and automated workflow capabilities. Includes drag-and-drop interfaces and detailed analytics.",
      technologies: ["Vue.js", "Express", "Socket.io", "MySQL", "Docker"],
      icon: Layout,
      githubLink: "#",
      projectLink: "#"
    }
  ];

  // Memoize project card render
  const renderProjectCard = useCallback((project: any, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      <div className="relative bg-zinc-900/90 p-8 rounded-2xl border border-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent rounded-2xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl bg-zinc-800/50">
              <project.icon className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex items-center gap-2">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <Github className="w-4 h-4 text-purple-500" />
              </a>
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-orange-500" />
              </a>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-sm text-gray-400 mb-6 min-h-[80px] leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/50 text-purple-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  ), []);

  return (
    <div className="w-full">
      {/* Projects Section */}
      <section className="py-20">
        <div className="w-full max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-lg text-gray-400">
              Innovative web and mobile applications I've crafted
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => renderProjectCard(project, index))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-zinc-950/50">
        <div className="w-full max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Why Choose Me?
            </h2>
            <p className="text-base text-gray-400">
              Delivering exceptional web and mobile solutions with modern technologies and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-zinc-900/30 p-8 rounded-2xl backdrop-blur-sm">
                <div className="mb-6 inline-block p-3 rounded-xl bg-zinc-800/50">
                  <Code className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Full-Stack Expertise
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Proficient in both frontend and backend development, creating seamless and scalable applications from start to finish.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-zinc-900/30 p-8 rounded-2xl backdrop-blur-sm">
                <div className="mb-6 inline-block p-3 rounded-xl bg-zinc-800/50">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Cross-Platform Development
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Experienced in building responsive web applications and native mobile apps that work seamlessly across all devices.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-zinc-900/30 p-8 rounded-2xl backdrop-blur-sm">
                <div className="mb-6 inline-block p-3 rounded-xl bg-zinc-800/50">
                  <Zap className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Performance Focused
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Dedicated to creating fast, optimized applications with clean code and excellent user experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;