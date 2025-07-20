import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ChevronRight, Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      role: "Frontend Developer Intern",
      company: "CodeAlpha",
      period: "May 2024 - June 2024",
      description: "Collaborated with the frontend team to develop and optimize responsive UI components and user interfaces.",
      achievements: [
        "Improved website performance by 30% through component optimization and code splitting.",
        "Built reusable React components library improving development efficiency by 40%.",
        "Implemented responsive design principles ensuring cross-browser compatibility."
      ],
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Git", "Figma"]
    },
    {
      role: "Frontend Developer",
      company: "Self-Employed",
      period: "Jan 2025 - Present",
      description: "Creating modern, responsive web applications with focus on user experience and performance optimization.",
      achievements: [
        "Developed 5+ responsive web applications using React, TypeScript, and modern CSS.",
        "Achieved 95+ Lighthouse performance scores through optimization techniques.",
        "Implemented accessibility standards (WCAG 2.1) across all projects."
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-6">
          Experience
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          My professional journey and achievements
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Timeline line with gradient animation */}
        <div className="absolute left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 animate-pulse"></div>
        </div>

        {/* Experience cards */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative pl-16 group"
            >
              {/* Animated timeline dot */}
              <motion.div
                className="absolute left-[17px] -translate-x-1/2 top-8 z-10"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 rounded-full bg-zinc-950 border-4 border-purple-500 group-hover:border-pink-500 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
                </div>
              </motion.div>

              {/* Card */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <div className="relative bg-zinc-900/90 p-8 lg:p-10 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                  {/* Icon and title */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      className="p-3 rounded-xl bg-zinc-800/50"
                    >
                      {index === 0 ? (
                        <Code2 className="w-6 h-6 text-purple-500" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-pink-500" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                        {exp.role}
                      </h3>
                      <p className="text-purple-400 font-medium">{exp.company}</p>
                      <p className="text-gray-400 text-sm">{exp.period}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-gray-400 group/item"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <ChevronRight className="w-5 h-5 mt-0.5 text-purple-500 group-hover/item:text-pink-500 transition-colors" />
                        <span className="group-hover/item:text-gray-300 transition-colors text-sm">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 text-xs rounded-md bg-zinc-800/50 text-purple-400 hover:text-pink-400 hover:bg-zinc-800/80 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;