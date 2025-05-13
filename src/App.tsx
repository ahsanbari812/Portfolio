import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Particles from './components/Particles';
import Footer from './components/Footer';

// Lazy load components with prefetch
const Hero = lazy(() => import('./components/Hero'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Loading component with smoother animation
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <motion.div
      className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      {/* Background layers with hardware acceleration */}
      <div className="fixed inset-0 overflow-hidden transform-gpu">
        <Background />
        <Particles />
      </div>
      
      {/* Content with optimized animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <Navbar />
        
        <main className="container mx-auto px-4 py-20">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
              <section id="home" className="min-h-screen flex items-center justify-center py-20 sm:py-28">
                <Hero />
              </section>
              
              <section id="experience" className="min-h-screen flex items-center justify-center py-20 sm:py-28">
                <Experience />
              </section>
              
              <section id="skills" className="min-h-screen flex items-center justify-center py-20 sm:py-28">
                <Skills />
              </section>
              
              <section id="projects" className="min-h-screen flex items-center justify-center py-20 sm:py-28">
                <Projects />
              </section>
              
              <section id="contact" className="min-h-screen flex items-center justify-center py-20 sm:py-28">
                <Contact />
              </section>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
      </motion.div>
    </div>
  );
};

export default App;