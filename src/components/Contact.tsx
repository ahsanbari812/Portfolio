import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-3 md:mb-4">
          Get In Touch
        </h2>
        <p className="text-base md:text-lg text-gray-400 px-2">
          Have a project in mind or want to discuss Frontend solutions? I'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          <div className="relative bg-zinc-900/90 p-6 md:p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="text-gray-300 mb-1.5 md:mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-zinc-800/50 text-gray-300 p-2.5 md:p-3 rounded-lg border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-gray-300 mb-1.5 md:mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full bg-zinc-800/50 text-gray-300 p-2.5 md:p-3 rounded-lg border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-gray-300 mb-1.5 md:mb-2 block text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full bg-zinc-800/50 text-gray-300 p-2.5 md:p-3 rounded-lg border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all resize-none text-sm md:text-base"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm md:text-base"
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <div className="space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <div className="relative bg-zinc-900/90 p-6 md:p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 rounded-xl bg-zinc-800/50">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5 md:mb-2">Email</h3>
                  <a 
                    href="mailto:muhammadahsan0812@gmail.com"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm md:text-base break-all"
                  >
                    muhammadahsan0812@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <div className="relative bg-zinc-900/90 p-6 md:p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4 md:mb-6">
                Connect With Me
              </h3>
              <div className="flex gap-3 md:gap-4">
                <motion.a
                  href="https://github.com/ahsanbari812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-all group/icon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5 text-purple-500 group-hover/icon:text-pink-500 transition-colors" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/muhammad-ahsan-bari-2914a7221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-all group/icon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-purple-500 group-hover/icon:text-pink-500 transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;