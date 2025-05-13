import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const roles = ['Web Dev', 'App Dev'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.9
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            I'm Ahsan Bari
          </motion.div>
          <div className="h-20 relative flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} mode="wait" custom={currentIndex}>
              <motion.div
                key={roles[currentIndex]}
                custom={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { 
                    type: "spring", 
                    stiffness: 200,
                    damping: 20,
                    mass: 0.8,
                    restDelta: 0.01
                  },
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 }
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.9}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.y, velocity.y);

                  if (swipe < -swipeConfidenceThreshold) {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
                  } else if (swipe > swipeConfidenceThreshold) {
                    setCurrentIndex((prevIndex) => prevIndex === 0 ? roles.length - 1 : prevIndex - 1);
                  }
                }}
                className="text-white mt-2 absolute cursor-grab active:cursor-grabbing"
              >
                {roles[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </h1>

        <motion.p
          className="text-base md:text-lg text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Creative frontend developer crafting sleek, responsive web and app experiences.
          Skilled in React, JavaScript, and modern UI/UX design principles.
          Passionate about building fast, intuitive, and user-focused digital products.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            
            <motion.a
              href="/Muhammad_Ahsan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Download Resume</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;