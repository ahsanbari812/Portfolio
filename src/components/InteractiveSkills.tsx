import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, Sparkles, Palette, Zap } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  color: string;
  description: string;
  technologies: string[];
}

const InteractiveSkills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const skills: Skill[] = [
    {
      name: 'React & Next.js',
      icon: <Code className="w-8 h-8" />,
      level: 95,
      color: '#61DAFB',
      description: 'Advanced React development with hooks, context, and modern patterns. Next.js for SSR and performance optimization.',
      technologies: ['React Hooks', 'Context API', 'Next.js 13+', 'App Router', 'Server Components']
    },
    {
      name: 'TypeScript',
      icon: <Code className="w-8 h-8" />,
      level: 90,
      color: '#3178C6',
      description: 'Strong TypeScript skills with advanced types, generics, and type-safe development practices.',
      technologies: ['Advanced Types', 'Generics', 'Utility Types', 'Type Guards', 'Decorators']
    },
    {
      name: 'JavaScript (ES6+)',
      icon: <Code className="w-8 h-8" />,
      level: 95,
      color: '#F7DF1E',
      description: 'Modern JavaScript with ES6+ features, async/await, and functional programming patterns.',
      technologies: ['ES6+', 'Async/Await', 'Promises', 'Modules', 'Functional Programming']
    },
    {
      name: 'TailwindCSS',
      icon: <Palette className="w-8 h-8" />,
      level: 92,
      color: '#06B6D4',
      description: 'Expert-level TailwindCSS with custom configurations, responsive design, and utility-first approach.',
      technologies: ['Custom Config', 'Responsive Design', 'Dark Mode', 'Animations', 'Plugins']
    },
    {
      name: 'CSS3 & SASS',
      icon: <Palette className="w-8 h-8" />,
      level: 88,
      color: '#1572B6',
      description: 'Advanced CSS with animations, Grid, Flexbox, and SASS preprocessing for maintainable styles.',
      technologies: ['CSS Grid', 'Flexbox', 'Animations', 'SASS/SCSS', 'CSS Variables']
    },
    {
      name: 'Framer Motion',
      icon: <Sparkles className="w-8 h-8" />,
      level: 85,
      color: '#FF0080',
      description: 'Complex animations and micro-interactions using Framer Motion for engaging user experiences.',
      technologies: ['Gestures', 'Variants', 'Layout Animations', 'Spring Physics', 'Exit Animations']
    },
    {
      name: 'Performance',
      icon: <Zap className="w-8 h-8" />,
      level: 87,
      color: '#FFD700',
      description: 'Web performance optimization including Core Web Vitals, lazy loading, and bundle optimization.',
      technologies: ['Core Web Vitals', 'Lazy Loading', 'Code Splitting', 'Bundle Analysis', 'Caching']
    },
    {
      name: 'Responsive Design',
      icon: <Smartphone className="w-8 h-8" />,
      level: 93,
      color: '#4CAF50',
      description: 'Mobile-first responsive design with cross-browser compatibility and accessibility standards.',
      technologies: ['Mobile-First', 'Cross-Browser', 'Accessibility', 'Touch Interactions', 'Progressive Enhancement']
    }
  ];

  const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {

    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
    const springConfig = { damping: 20, stiffness: 300 };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseXFromCenter = e.clientX - centerX;
      const mouseYFromCenter = e.clientY - centerY;
      mouseX.set(mouseXFromCenter / (rect.width / 2));
      mouseY.set(mouseYFromCenter / (rect.height / 2));
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}

        onMouseLeave={handleMouseLeave}
        onClick={() => setSelectedSkill(skill)}
        className="group cursor-pointer perspective-1000"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          style={{
            rotateX: useSpring(rotateX, springConfig),
            rotateY: useSpring(rotateY, springConfig),
          }}
          className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 p-6 rounded-2xl border border-zinc-700/50 backdrop-blur-sm"
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${skill.color}20, transparent 40%)`
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="p-3 rounded-xl transition-colors duration-300"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <div style={{ color: skill.color }}>
                  {skill.icon}
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-2xl font-bold"
                style={{ color: skill.color }}
              >
                {skill.level}%
              </motion.div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">
              {skill.name}
            </h3>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ backgroundColor: skill.color }}
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1">
              {skill.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {skill.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-gray-400">
                  +{skill.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto">
          Advanced frontend technologies and modern development practices
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>

      {/* Skill Details Modal */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-zinc-900/95 p-8 rounded-2xl border border-zinc-700/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: `${selectedSkill.color}20` }}
              >
                <div style={{ color: selectedSkill.color }}>
                  {selectedSkill.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-zinc-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${selectedSkill.level}%`,
                        backgroundColor: selectedSkill.color 
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{selectedSkill.level}%</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {selectedSkill.description}
            </p>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Technologies & Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 text-sm rounded-lg bg-zinc-800/50 text-gray-300 border border-zinc-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveSkills; 