import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });

      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll after navigation
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveLink(id.substring(1));
        }
      }, 100); // Wait for DOM to render
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-md shadow-lg' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#home"
            className="text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: '#home' } });
              } else {
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                setActiveLink('home');
              }
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Ahsan
          </motion.a>

          <ul className="flex space-x-8 lg:space-x-10">
            {navLinks.map(({ name, href }) => (
              <motion.li key={name}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname !== '/') {
                      navigate('/', { state: { scrollTo: href } });
                    } else {
                      document.querySelector(href)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                      setActiveLink(href.substring(1));
                    }
                  }}
                  className={`text-sm font-medium relative py-2 px-1 transition-colors hover:text-white ${
                    activeLink === href.substring(1) ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {name}
                  {activeLink === href.substring(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                      layoutId="underline"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;