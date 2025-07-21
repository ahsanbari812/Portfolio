import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building, ExternalLink, ChevronRight, Award, Code } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'freelance' | 'internship';
  logo?: string;
  link?: string;
}

const InteractiveTimeline: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [activeYear, setActiveYear] = useState<string>('2024');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const experiences: Experience[] = [
    {
      id: 'codealpha-intern',
      title: 'Frontend Developer Intern',
      company: 'CodeAlpha',
      location: 'Remote',
      period: 'May 2024 - June 2024',
      description: 'Collaborated with the frontend team to develop and optimize responsive UI components and user interfaces.',
      achievements: [
        'Improved website performance by 30% through component optimization and code splitting.',
        'Built reusable React components library improving development efficiency by 40%.',
        'Implemented responsive design principles ensuring cross-browser compatibility.'
      ],
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Git', 'Figma'],
      type: 'internship'
    },
    {
      id: 'self-employed',
      title: 'Frontend Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'Jan 2025 - Present',
      description: 'Creating modern, responsive web applications with focus on user experience and performance optimization.',
      achievements: [
        'Developed 5+ responsive web applications using React, TypeScript, and modern CSS.',
        'Achieved 95+ Lighthouse performance scores through optimization techniques.',
        'Implemented accessibility standards (WCAG 2.1) across all projects.'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      type: 'freelance'
    }
  ];

  const years = ['2025', '2024'];

  const TimelineItem: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
        
        {/* Content Card */}
        <motion.div
          className={`relative w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} group cursor-pointer`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedExperience(experience)}
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
          
          <div className="relative bg-zinc-900/90 p-4 md:p-6 rounded-xl border border-zinc-700/50 backdrop-blur-sm overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2 md:gap-0">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-400 break-words max-w-full">{experience.company}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                experience.type === 'full-time' ? 'bg-blue-500/20 text-blue-400' :
                experience.type === 'freelance' ? 'bg-green-500/20 text-green-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {experience.type}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 break-words max-w-full">
              {experience.title}
            </h3>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 text-sm text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="break-words max-w-full">{experience.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="break-words max-w-full">{experience.location}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 break-words max-w-full">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1">
              {experience.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-purple-400 break-words max-w-full"
                >
                  {tech}
                </span>
              ))}
              {experience.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-gray-400">
                  +{experience.technologies.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Timeline Dot */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-zinc-900 hidden md:block"
            animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto">
          My career progression and experience in frontend development
        </p>
      </motion.div>

      {/* Year Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {years.map((year) => (
          <motion.button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeYear === year
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-zinc-800/50 text-gray-400 hover:bg-zinc-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {year}
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {experiences.map((experience, index) => (
          <TimelineItem key={experience.id} experience={experience} index={index} />
        ))}
      </div>

      {/* Experience Details Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-zinc-900/95 rounded-2xl border border-zinc-700/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close X Button (inside card, always in corner) */}
              <button
                onClick={() => setSelectedExperience(null)}
                aria-label="Close details"
                className="absolute top-4 right-4 p-1 z-50 focus:outline-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path stroke="#FFA500" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8m0-8l-8 8" />
                </svg>
              </button>
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedExperience.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{selectedExperience.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedExperience.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      selectedExperience.type === 'full-time' ? 'bg-blue-500/20 text-blue-400' :
                      selectedExperience.type === 'freelance' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedExperience.type}
                    </span>
                    {selectedExperience.link && (
                      <a
                        href={selectedExperience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-purple-500" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedExperience.period}</span>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedExperience.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedExperience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-500" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 text-sm rounded-lg bg-zinc-800/50 text-purple-400 border border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTimeline; 