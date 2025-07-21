import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Play, Eye, Zap, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  features: string[];
  stats: {
    stars?: number;
    forks?: number;
    downloads?: number;
  };
  category: 'frontend' | 'fullstack' | 'ui/ux' | 'performance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const AdvancedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const projects: Project[] = [
    {
      id: 'ai-resume-builder',
      title: 'AI Resume Builder',
      description: 'Modern AI-powered resume builder with real-time preview and multiple templates',
      longDescription: 'A comprehensive resume building application that leverages AI to help users create professional resumes. Features include intelligent content suggestions, real-time preview, multiple professional templates, and export functionality in various formats.',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Framer Motion'],
      githubLink: 'https://github.com/your-github/ai-resume-builder',
      liveLink: 'https://ai-resume-builder-fast.vercel.app/',
      image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOEI1Q0Y2O3N0b3Atb3BhY2l0eTowLjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRUM0ODk5O3N0b3Atb3BhY2l0eTowLjEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNhcmRHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxRjI5MzciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJhaUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzhCNUNGNiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNFQzQ4OTkiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIAogIDwhLS0gQmFja2dyb3VuZCAtLT4KICA8cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzBGMDBGMjMiLz4KICA8cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNiZ0dyYWRpZW50KSIvPgogIAogIDwhLS0gUmVzdW1lIGNhcmQgLS0+CiAgPHJlY3QgeD0iMTUwIiB5PSI4MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyNDAiIHJ4PSIxMiIgZmlsbD0idXJsKCNjYXJkR3JhZGllbnQpIiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMSIvPgogIAogIDwhLS0gUmVzdW1lIGhlYWRlciAtLT4KICA8cmVjdCB4PSIxNzAiIHk9IjEwMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzZCNzI4MCIvPgogIDxyZWN0IHg9IjE3MCIgeT0iMTIwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjOUNBM0FGIi8+CiAgPHJlY3QgeD0iMTcwIiB5PSIxMzUiIHdpZHRoPSIxNDAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM5Q0EzQUYiLz4KICAKICA8IS0tIFJlc3VtZSBzZWN0aW9ucyAtLT4KICA8cmVjdCB4PSIxNzAiIHk9IjE2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjOEI1Q0Y2Ii8+CiAgPHJlY3QgeD0iMTcwIiB5PSIxNzUiIHdpZHRoPSIyNDAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiM2QjcyODAiLz4KICA8cmVjdCB4PSIxNzAiIHk9IjE4NSIgd2lkdGg9IjIyMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzZCNzI4MCIvPgogIDxyZWN0IHg9IjE3MCIgeT0iMTk1IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjNkI3MjgwIi8+CiAgCiAgPHJlY3QgeD0iMTcwIiB5PSIyMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iI0VDNDg5OSIvPgogIDxyZWN0IHg9IjE3MCIgeT0iMjI1IiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjNkI3MjgwIi8+CiAgPHJlY3QgeD0iMTcwIiB5PSIyMzUiIHdpZHRoPSIyMjAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiM2QjcyODAiLz4KICAKICA8cmVjdCB4PSIxNzAiIHk9IjI1MCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjRjU5RUIwIi8+CiAgPHJlY3QgeD0iMTcwIiB5PSIyNjUiIHdpZHRoPSIyNDAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiM2QjcyODAiLz4KICA8cmVjdCB4PSIxNzAiIHk9IjI3NSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzZCNzI4MCIvPgogIAogIDwhLS0gQUkgQnJhaW4gaWNvbiAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NTAsIDEyMCkiPgogICAgPGNpcmNsZSBjeD0iMTEiIGN5PSIxNSIgcj0iMTIiIGZpbGw9InVybCgjYWlHcmFkaWVudCkiIG9wYWNpdHk9IjAuMiIvPgogICAgPGNpcmNsZSBjeD0iMTEiIGN5PSI4IiByPSIyIiBmaWxsPSJ1cmwoI2FpR3JhZGllbnQpIi8+CiAgICA8Y2lyY2xlIGN4PSI2IiBjeT0iMTUiIHI9IjIiIGZpbGw9InVybCgjYWlHcmFkaWVudCkiLz4KICAgIDxjaXJjbGUgY3g9IjE2IiBjeT0iMTUiIHI9IjIiIGZpbGw9InVybCgjYWlHcmFkaWVudCkiLz4KICAgIDxjaXJjbGUgY3g9IjExIiBjeT0iMjIiIHI9IjIiIGZpbGw9InVybCgjYWlHcmFkaWVudCkiLz4KICAgIAogICAgPGxpbmUgeDE9IjExIiB5MT0iOCIgeDI9IjYiIHkyPSIxNSIgc3Ryb2tlPSJ1cmwoI2FpR3JhZGllbnQpIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNiIvPgogICAgPGxpbmUgeDE9IjExIiB5MT0iOCIgeDI9IjE2IiB5Mj0iMTUiIHN0cm9rZT0idXJsKCNhaUdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KICAgIDxsaW5lIHgxPSI2IiB5MT0iMTUiIHgyPSIxMSIgeTI9IjIyIiBzdHJva2U9InVybCgjYWlHcmFkaWVudCkiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC42Ii8+CiAgICA8bGluZSB4MT0iMTYiIHkxPSIxNSIgeDI9IjExIiB5Mj0iMjIiIHN0cm9rZT0idXJsKCNhaUdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KICA8L2c+CiAgCiAgPCEtLSBGbG9hdGluZyBlbGVtZW50cyAtLT4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMiIGZpbGw9IiM4QjVDRjYiIG9wYWNpdHk9IjAuMyIvPgogIDxjaXJjbGUgY3g9IjUwMCIgY3k9IjgwIiByPSIyIiBmaWxsPSIjRUM0ODk5IiBvcGFjaXR5PSIwLjMiLz4KICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjMwMCIgcj0iMiIgZmlsbD0iI0Y1OUVCMCIgb3BhY2l0eT0iMC4zIi8+CiAgPGNpcmNsZSBjeD0iNTIwIiBjeT0iMzIwIiByPSIzIiBmaWxsPSIjOEI1Q0Y2IiBvcGFjaXR5PSIwLjMiLz4KICAKICA8IS0tIERlY29yYXRpdmUgbGluZXMgLS0+CiAgPGxpbmUgeDE9IjUwIiB5MT0iMTUwIiB4Mj0iMTAwIiB5Mj0iMTUwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4yIi8+CiAgPGxpbmUgeDE9IjUwMCIgeTE9IjI1MCIgeDI9IjU1MCIgeTI9IjI1MCIgc3Ryb2tlPSIjRUM0ODk5IiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4K',
      features: [
        'AI-powered content suggestions',
        'Real-time preview with multiple themes',
        'Export to PDF, DOCX, and HTML',
        'Responsive design for all devices',
        'Dark/Light mode support',
        'Local storage for draft saving'
      ],
      stats: { stars: 45, forks: 12, downloads: 1200 },
      category: 'fullstack',
      difficulty: 'advanced'
    },
    {
      id: 'portfolio-website',
      title: 'Interactive Portfolio',
      description: 'Modern portfolio with 3D elements, animations, and interactive features',
      longDescription: 'A cutting-edge portfolio website showcasing advanced frontend skills with 3D elements, smooth animations, and interactive components. Built with modern technologies and optimized for performance.',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      githubLink: 'https://github.com/ahsanbari812/Portfolio',
      liveLink: '',
      image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOEI1Q0Y2O3N0b3Atb3BhY2l0eTowLjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRUM0ODk5O3N0b3Atb3BhY2l0eTowLjEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImN1YmVHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4QjVDRjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRUM0ODk5Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJzcGhlcmVHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNFQzQ4OTkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRjU5RUIwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICAKICA8IS0tIEJhY2tncm91bmQgZ3JhZGllbnQgLS0+CiAgPHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjYmdHcmFkaWVudCkiLz4KICAKICA8IS0tIDNEIEN1YmUgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAwLCAxNTApIj4KICAgIDwhLS0gRnJvbnQgZmFjZSAtLT4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0idXJsKCNjdWJlR3JhZGllbnQpIiBvcGFjaXR5PSIwLjgiLz4KICAgIDwhLS0gUmlnaHQgZmFjZSAtLT4KICAgIDxwb2x5Z29uIHBvaW50cz0iODAsMCAxMjAsMjAgMTIwLDEwMCA4MCw4MCIgZmlsbD0idXJsKCNjdWJlR3JhZGllbnQpIiBvcGFjaXR5PSIwLjYiLz4KICAgIDwhLS0gVG9wIGZhY2UgLS0+CiAgICA8cG9seWdvbiBwb2ludHM9IjAsMCA0MCwyMCAxMjAsMjAgODAsMCIgZmlsbD0idXJsKCNjdWJlR3JhZGllbnQpIiBvcGFjaXR5PSIwLjQiLz4KICAgIAogICAgPCEtLSBDdWJlIGVkZ2VzIC0tPgogICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iODAiIHkyPSIwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4zIi8+CiAgICA8bGluZSB4MT0iODAiIHkxPSIwIiB4Mj0iMTIwIiB5Mj0iMjAiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjMiLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iMjAiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjMiLz4KICA8L2c+CiAgCiAgPCEtLSBGbG9hdGluZyBzcGhlcmUgLS0+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTIwIiByPSIzMCIgZmlsbD0idXJsKCNzcGhlcmVHcmFkaWVudCkiIG9wYWNpdHk9IjAuNyIvPgogIDxjaXJjbGUgY3g9IjM5NSIgY3k9IjExNSIgcj0iOCIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4zIi8+CiAgCiAgPCEtLSBDb2RlIGVsZW1lbnRzIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwgMjgwKSI+CiAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjNkI3MjgwIi8+CiAgICA8cmVjdCB4PSIwIiB5PSIxNSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iIzlDQTNBRiIvPgogICAgPHJlY3QgeD0iMCIgeT0iMjgiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iIzlDQTNBRiIvPgogICAgPHJlY3QgeD0iMCIgeT0iNDEiIHdpZHRoPSIxMTAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM5Q0EzQUYiLz4KICA8L2c+CiAgCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzgwLCAyODApIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iOCIgcng9IjQiIGZpbGw9IiM4QjVDRjYiLz4KICAgIDxyZWN0IHg9IjAiIHk9IjE1IiB3aWR0aD0iODAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNFQzQ4OTkiLz4KICAgIDxyZWN0IHg9IjAiIHk9IjI4IiB3aWR0aD0iOTAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNGNTlFQjAiLz4KICAgIDxyZWN0IHg9IjAiIHk9IjQxIiB3aWR0aD0iNzAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM4QjVDRjYiLz4KICA8L2c+CiAgCiAgPCEtLSBJbnRlcmFjdGl2ZSBlbGVtZW50cyAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDAsIDgwKSI+CiAgICA8IS0tIE5hdmlnYXRpb24gZG90cyAtLT4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI0IiBmaWxsPSIjOEI1Q0Y2Ii8+CiAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjAiIHI9IjQiIGZpbGw9IiNFQzQ4OTkiLz4KICAgIDxjaXJjbGUgY3g9IjQwIiBjeT0iMCIgcj0iNCIgZmlsbD0iI0Y1OUVCMCIvPgogICAgPGNpcmNsZSBjeD0iNjAiIGN5PSIwIiByPSI0IiBmaWxsPSIjOEI1Q0Y2Ii8+CiAgPC9nPgogIAogIDwhLS0gQW5pbWF0ZWQgbGluZXMgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAsIDIwMCkiPgogICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSIwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC40Ij4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIwLjQ7MC44OzAuNCIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgIDwvbGluZT4KICA8L2c+CiAgCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAwLCAxODApIj4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjUwIiB5Mj0iMCIgc3Ryb2tlPSIjRUM0ODk5IiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuNCI+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC40OzAuODswLjQiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC41cyIvPgogICAgPC9saW5lPgogIDwvZz4KICAKICA8IS0tIEZsb2F0aW5nIHBhcnRpY2xlcyAtLT4KICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjgwIiByPSIyIiBmaWxsPSIjOEI1Q0Y2IiBvcGFjaXR5PSIwLjYiLz4KICA8Y2lyY2xlIGN4PSI1MjAiIGN5PSIxMDAiIHI9IjIiIGZpbGw9IiNFQzQ4OTkiIG9wYWNpdHk9IjAuNiIvPgogIDxjaXJjbGUgY3g9IjkwIiBjeT0iMzIwIiByPSIyIiBmaWxsPSIjRjU5RUIwIiBvcGFjaXR5PSIwLjYiLz4KICA8Y2lyY2xlIGN4PSI1MTAiIGN5PSIzMDAiIHI9IjIiIGZpbGw9IiM4QjVDRjYiIG9wYWNpdHk9IjAuNiIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjYwIiByPSIyIiBmaWxsPSIjRUM0ODk5IiBvcGFjaXR5PSIwLjYiLz4KICA8Y2lyY2xlIGN4PSI0NTAiIGN5PSIzNTAiIHI9IjIiIGZpbGw9IiNGNTlFQjAiIG9wYWNpdHk9IjAuNiIvPgogIAogIDwhLS0gRGVjb3JhdGl2ZSBnZW9tZXRyaWMgc2hhcGVzIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwLCA1MCkiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iIzhCNUNGNiIgb3BhY2l0eT0iMC4zIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiLz4KICA8L2c+CiAgCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTMwLCA1MCkiPgogICAgPHBvbHlnb24gcG9pbnRzPSIwLDAgMTUsMTUgMCwzMCAtMTUsMTUiIGZpbGw9IiNFQzQ4OTkiIG9wYWNpdHk9IjAuMyIvPgogIDwvZz4KICAKICA8IS0tIENvbm5lY3Rpb24gbGluZXMgLS0+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjE1MCIgeDI9IjQwMCIgeTI9IjEyMCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPgogIDxsaW5lIHgxPSIyODAiIHkxPSIyMzAiIHgyPSI0MDAiIHkyPSIxMjAiIHN0cm9rZT0iI0VDNDg5OSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjIiLz4KPC9zdmc+Cg==',
      features: [
        '3D interactive elements with Framer Motion',
        'Smooth page transitions and animations',
        'Responsive design with mobile optimization',
        'Performance optimized with lazy loading',
        'Accessibility compliant',
        'SEO optimized'
      ],
      stats: { stars: 23, forks: 8 },
      category: 'frontend',
      difficulty: 'advanced'
    },
    {
      id: 'ecommerce-dashboard',
      title: 'E-commerce Dashboard',
      description: 'Comprehensive admin dashboard with analytics and product management',
      longDescription: 'A full-featured e-commerce admin dashboard with real-time analytics, product management, order tracking, and customer insights. Built with modern React patterns and optimized for performance.',
      technologies: ['React', 'TypeScript', 'Chart.js', 'Redux Toolkit', 'Tailwind CSS'],
      githubLink: '#',
      liveLink: '#',
      image: '/ecommerce-dashboard.svg',
      features: [
        'Real-time analytics and reporting',
        'Product catalog management',
        'Order processing and tracking',
        'Customer relationship management',
        'Inventory management',
        'Multi-language support'
      ],
      stats: { stars: 67, forks: 15 },
      category: 'fullstack',
      difficulty: 'advanced'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'ui/ux', label: 'UI/UX', count: projects.filter(p => p.category === 'ui/ux').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

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
      setIsHovered(false);
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer perspective-1000"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 rounded-2xl border border-zinc-700/50 overflow-hidden backdrop-blur-sm"
        >
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-0" />
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-contain mx-auto block bg-transparent"
              style={{ zIndex: 10, position: 'relative' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            

            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 z-20"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                onClick={() => setSelectedProject(project)}
                aria-label="View Details"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  aria-label="Live Demo"
                >
                  <Play className="w-5 h-5" />
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.difficulty === 'advanced' ? 'bg-red-500/20 text-red-400' :
                  project.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {project.difficulty}
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-purple-400"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-gray-400">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {project.stats.stars && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stats.stars}</span>
                  </div>
                )}
                {project.stats.forks && (
                  <div className="flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    <span>{project.stats.forks}</span>
                  </div>
                )}
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
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-green-500" />
                  </a>
                )}
              </div>
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
          Featured Projects
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto">
          Showcasing innovative web applications built with modern technologies
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-zinc-800/50 text-gray-400 hover:bg-zinc-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label} ({filter.count})
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-zinc-900/95 rounded-2xl border border-zinc-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 border-b border-zinc-700/50">
                {/* Close X Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close details"
                  className="absolute top-2 right-2 p-1 z-[100] focus:outline-none"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <path stroke="#FFA500" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8m0-8l-8 8" />
                  </svg>
                </button>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      selectedProject.difficulty === 'advanced' ? 'bg-red-500/20 text-red-400' :
                      selectedProject.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {selectedProject.difficulty}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Features */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 text-sm rounded-lg bg-zinc-800/50 text-purple-400 border border-zinc-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    {Object.keys(selectedProject.stats).length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-xl font-semibold text-white mb-4">Project Stats</h4>
                        <div className="flex items-center gap-6">
                          {selectedProject.stats.stars && (
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="text-gray-300">{selectedProject.stats.stars} stars</span>
                            </div>
                          )}
                          {selectedProject.stats.forks && (
                            <div className="flex items-center gap-2">
                              <Github className="w-5 h-5 text-purple-500" />
                              <span className="text-gray-300">{selectedProject.stats.forks} forks</span>
                            </div>
                          )}
                          {selectedProject.stats.downloads && (
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-300">{selectedProject.stats.downloads} downloads</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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

export default AdvancedProjects; 