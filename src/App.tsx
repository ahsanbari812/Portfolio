import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Particles from './components/Particles';
import Footer from './components/Footer';

import CustomCursor from './components/CustomCursor';
import LenisProvider from './components/LenisProvider';

// Lazy load components
const Hero3D = lazy(() => import('./components/3DHero'));
const InteractiveTimeline = lazy(() => import('./components/InteractiveTimeline'));
const InteractiveSkills = lazy(() => import('./components/InteractiveSkills'));
const AdvancedProjects = lazy(() => import('./components/AdvancedProjects'));
const AdvancedContact = lazy(() => import('./components/AdvancedContact'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <LenisProvider>
            <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Background layers */}
        <div className="fixed inset-0 overflow-hidden">
          <Background />
          <Particles />
        </div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Navbar />
          
          <main className="w-full overflow-x-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <Hero3D />
              </section>
              
              <section id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <InteractiveTimeline />
              </section>
              
              <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <InteractiveSkills />
              </section>
              
              <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <AdvancedProjects />
              </section>
              
              <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <AdvancedContact />
              </section>
            </Suspense>
          </main>

          <Footer />
        </motion.div>
      </div>
    </LenisProvider>
  );
};

export default App;