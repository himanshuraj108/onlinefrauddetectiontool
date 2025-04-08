'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Code, 
  Laptop, 
  Github,
  ExternalLink,
  BookOpen,
  Medal,
  Star,
  Brain,
  Bot,
  Cpu,
  LineChart,
  Codesandbox,
  Zap,
  ArrowRight,
  Database,
  Mail,
  MapPin,
  Briefcase,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function Portfolio() {
  // Refs for scroll animations
  const controlsHero = useAnimation();
  const controlsProjects = useAnimation();
  const controlsSkills = useAnimation();
  const controlsAI = useAnimation();
  
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const aiRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: false, threshold: 0.3 });
  const projectsInView = useInView(projectsRef, { once: false, threshold: 0.1 });
  const skillsInView = useInView(skillsRef, { once: false, threshold: 0.1 });
  const aiInView = useInView(aiRef, { once: false, threshold: 0.1 });
  
  // Particle animation state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Cursor spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Scroll animations
  useEffect(() => {
    if (heroInView) controlsHero.start('visible');
    if (projectsInView) controlsProjects.start('visible');
    if (skillsInView) controlsSkills.start('visible');
    if (aiInView) controlsAI.start('visible');
  }, [heroInView, projectsInView, skillsInView, aiInView, controlsHero, controlsProjects, controlsSkills, controlsAI]);
  
  // Sample projects data
  const projects = [
    {
      title: "Online Payment Fraud Detection Tool",
      description: "An AI-powered tool that analyzes transaction data to identify potentially fraudulent activities using advanced ML algorithms and neural networks.",
      tech: ["Next.js", "React", "TailwindCSS", "Machine Learning", "Neural Networks"],
      image: "/project1.jpg",
      github: "https://github.com/himanshuraj108/online_payment_fraud_detection_tool",
      live: "#",
      featured: true,
      category: "AI & Machine Learning"
    },
    {
      title: "Resume Analyzer",
      description: "NLP-powered tool that parses and analyzes resumes to extract key information and provide insights using advanced text processing algorithms.",
      tech: ["JavaScript", "Natural Language Processing", "Data Analysis", "AI"],
      image: "/project2.jpg",
      github: "https://github.com/himanshuraj108/Resume-Analyzer",
      live: "#",
      featured: true, 
      category: "AI & Machine Learning"
    },
    {
      title: "CPU Scheduling & Innovation",
      description: "Implementation and visualization of various CPU scheduling algorithms with performance analysis and optimization techniques.",
      tech: ["JavaScript", "Algorithm Visualization", "Data Structures"],
      image: "/project3.jpg",
      github: "https://github.com/himanshuraj108/cpu-scheduling-and-innovation",
      live: "#",
      featured: false,
      category: "Software Development"
    },
  ];

  // Skills data with expertise levels
  const skills = {
    ai: [
      { name: "Machine Learning", level: 95, icon: <Brain className="w-4 h-4" /> },
      { name: "Neural Networks", level: 90, icon: <Cpu className="w-4 h-4" /> },
      { name: "NLP", level: 92, icon: <Bot className="w-4 h-4" /> },
      { name: "Computer Vision", level: 85, icon: <Laptop className="w-4 h-4" /> },
      { name: "Data Analysis", level: 94, icon: <LineChart className="w-4 h-4" /> },
    ],
    languages: [
      { name: "Python", level: 95, icon: <Code className="w-4 h-4" /> },
      { name: "Java", level: 90, icon: <Code className="w-4 h-4" /> },
      { name: "C++", level: 88, icon: <Code className="w-4 h-4" /> },
      { name: "JavaScript", level: 92, icon: <Code className="w-4 h-4" /> },
      { name: "TypeScript", level: 85, icon: <Code className="w-4 h-4" /> },
    ],
    frontend: [
      { name: "React", level: 90, icon: <Laptop className="w-4 h-4" /> },
      { name: "Next.js", level: 92, icon: <Laptop className="w-4 h-4" /> },
      { name: "HTML/CSS", level: 95, icon: <Laptop className="w-4 h-4" /> },
      { name: "TailwindCSS", level: 94, icon: <Laptop className="w-4 h-4" /> },
    ],
    backend: [
      { name: "Node.js", level: 88, icon: <Database className="w-4 h-4" /> },
      { name: "Express", level: 85, icon: <Database className="w-4 h-4" /> },
      { name: "MongoDB", level: 90, icon: <Database className="w-4 h-4" /> },
      { name: "REST APIs", level: 92, icon: <Database className="w-4 h-4" /> },
    ],
    tools: ["Git", "Docker", "AWS", "TensorFlow", "PyTorch", "Scikit-Learn", "VS Code", "Jupyter"],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Mouse follower gradient */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity opacity-0 md:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Floating grid background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/0 via-gray-950/80 to-gray-950 backdrop-blur-sm"></div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        <nav className="flex items-center mb-16 sticky top-0 z-40 py-4 backdrop-blur-md bg-gray-950/50">
          <Link href="/tool" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Tool
          </Link>
          <h1 className="text-2xl font-bold ml-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
            Portfolio
          </h1>
          
          <div className="ml-auto space-x-6 hidden md:flex">
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
            <a href="#ai-expertise" className="text-gray-300 hover:text-white transition-colors">AI Expertise</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </nav>
        
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          initial="hidden"
          animate={controlsHero}
          variants={containerVariants}
          className="mb-32 relative"
        >
          {/* Animated ring decorations */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative glass-container p-10 rounded-3xl border border-gray-800/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                variants={itemVariants}
                className="w-40 h-40 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-900 to-gray-950"></div>
                
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                <div className="absolute top-0 left-0 w-full h-full border-b-2 border-r-2 border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                
                <div className="text-5xl font-bold text-white z-10 relative glow-text">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">&lt;/&gt;</span>
                  
                  {/* Orbiting particles */}
                  <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-blue-500/30 animate-orbit" style={{ '--orbit-size': '120%', '--orbit-duration': '6s' }}></div>
                  <div className="absolute top-1/4 right-0 w-2 h-2 rounded-full bg-purple-500/40 animate-orbit" style={{ '--orbit-size': '100%', '--orbit-duration': '8s', '--orbit-delay': '1s' }}></div>
                  <div className="absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-cyan-500/40 animate-orbit" style={{ '--orbit-size': '90%', '--orbit-duration': '7s', '--orbit-delay': '2s' }}></div>
                </div>
              </motion.div>
              
              <div className="flex-1">
                <motion.h1 
                  variants={itemVariants}
                  className="text-5xl md:text-7xl font-bold mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500"
                >
                  Himanshu Raj
                </motion.h1>
                
                <motion.h2 
                  variants={itemVariants}
                  className="text-xl md:text-2xl text-gray-300 mb-6 flex items-center"
                >
                  <span className="typing-text">Software Engineer & AI Specialist</span>
                  <span className="h-6 w-px bg-blue-500 ml-1 animate-blink"></span>
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-gray-400 max-w-2xl mb-8 leading-relaxed"
                >
                  B.Tech in Computer Science from Lovely Professional University. Specialized in 
                  AI/ML with expertise in developing cutting-edge solutions that leverage neural networks, 
                  computer vision, and natural language processing. Passionate about solving complex problems 
                  with clean, efficient, and scalable code.
                </motion.p>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <a 
                    href="https://github.com/himanshuraj108" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button group"
                  >
                    <Github className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                    <span>GitHub</span>
                    <span className="absolute inset-0 rounded-lg border border-gray-700 group-hover:border-blue-500/50 transition-colors"></span>
                  </a>
                  
                  <a 
                    href="https://leetcode.com/u/himanshuraj48512/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button group"
                  >
                    <Code className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                    <span>LeetCode</span>
                    <span className="absolute inset-0 rounded-lg border border-gray-700 group-hover:border-blue-500/50 transition-colors"></span>
                  </a>
                  
                  <a 
                    href="#contact" 
                    className="glass-button-primary group"
                  >
                    <span>Contact Me</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="absolute inset-0 rounded-lg border border-blue-500/50 group-hover:border-blue-400 transition-colors"></span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* AI Expertise Section */}
        <motion.section
          id="ai-expertise"
          ref={aiRef}
          initial="hidden"
          animate={controlsAI}
          variants={containerVariants}
          className="mb-32 relative"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
          
          <motion.div variants={itemVariants} className="flex items-center mb-12">
            <Brain className="w-7 h-7 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold glow-text">AI Expertise</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              variants={itemVariants}
              className="glass-container p-8 rounded-2xl border border-gray-800/50 relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Cpu className="w-5 h-5 text-blue-400 mr-2" />
                <span>AI Development Mastery</span>
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                I specialize in developing sophisticated AI solutions that push the boundaries of what&apos;s possible. My expertise spans across
                multiple domains of artificial intelligence, from neural networks to natural language processing.
              </p>
              
              <div className="space-y-6">
                {skills.ai.map((skill, index) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-2">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="glass-container p-8 rounded-2xl border border-gray-800/50 relative overflow-hidden"
            >
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Zap className="w-5 h-5 text-blue-400 mr-2" />
                <span>LLM & AI Integration</span>
              </h3>
              
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 mt-0.5">
                    <Star className="w-3 h-3" />
                  </span>
                  <div>
                    <span className="font-medium text-white">Advanced Prompt Engineering</span>
                    <p className="mt-1 text-sm">
                      Expert at crafting precise prompts that unlock the full potential of large language models.
                      Skilled in creating complex instruction sets that produce consistent, high-quality outputs.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 mt-0.5">
                    <Star className="w-3 h-3" />
                  </span>
                  <div>
                    <span className="font-medium text-white">LLM Fine-tuning & Optimization</span>
                    <p className="mt-1 text-sm">
                      Experienced in fine-tuning large language models for specialized tasks and domains,
                      achieving exceptional performance for specific use cases.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 mt-0.5">
                    <Star className="w-3 h-3" />
                  </span>
                  <div>
                    <span className="font-medium text-white">AI API Integration</span>
                    <p className="mt-1 text-sm">
                      Proficient in seamlessly integrating various AI services into applications,
                      including OpenAI, Mistral AI, HuggingFace, and custom-trained models.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 mt-0.5">
                    <Star className="w-3 h-3" />
                  </span>
                  <div>
                    <span className="font-medium text-white">Conversational AI Development</span>
                    <p className="mt-1 text-sm">
                      Built sophisticated conversational agents with context awareness, memory management,
                      and natural dialogue flow for enhanced user interactions.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Projects Section */}
        <motion.section 
          id="projects"
          ref={projectsRef}
          initial="hidden"
          animate={controlsProjects}
          variants={containerVariants}
          className="mb-32 relative"
        >
          <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
          
          <motion.div variants={itemVariants} className="flex items-center mb-12">
            <Codesandbox className="w-7 h-7 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold glow-text">Featured Projects</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="glass-container p-6 rounded-2xl border border-gray-800/50 relative group overflow-hidden transition-all duration-300 hover:border-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="h-48 mb-6 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl text-white/20 font-bold">{project.title.charAt(0)}</div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span key={tech} className="text-xs text-gray-400 px-2 py-1 rounded-md bg-gray-800/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-button-small group"
                    >
                      <Github className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                      <span>Code</span>
                    </a>
                    
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-button-small group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="mt-10 flex justify-center">
            <a 
              href="#" 
              className="glass-button-primary group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.section>
        
        {/* Skills Section */}
        <motion.section
          id="skills"
          ref={skillsRef}
          initial="hidden"
          animate={controlsSkills}
          variants={containerVariants}
          className="mb-32 relative"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
          
          <motion.div variants={itemVariants} className="flex items-center mb-12">
            <Medal className="w-7 h-7 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold glow-text">Technical Skills</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              variants={itemVariants}
              className="glass-container p-8 rounded-2xl border border-gray-800/50 relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Code className="w-5 h-5 text-blue-400 mr-2" />
                <span>Programming Languages</span>
              </h3>
              
              <div className="space-y-6">
                {skills.languages.map((skill, index) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-2">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="glass-container p-8 rounded-2xl border border-gray-800/50 relative overflow-hidden"
            >
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Laptop className="w-5 h-5 text-blue-400 mr-2" />
                <span>Frontend Development</span>
              </h3>
              
              <div className="space-y-6">
                {skills.frontend.map((skill, index) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-2">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="glass-container p-8 rounded-2xl border border-gray-800/50 relative overflow-hidden"
            >
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Database className="w-5 h-5 text-blue-400 mr-2" />
                <span>Backend Development</span>
              </h3>
              
              <div className="space-y-6">
                {skills.backend.map((skill, index) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-2">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="glass-container p-8 rounded-2xl border border-gray-800/50 relative overflow-hidden"
            >
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Codesandbox className="w-5 h-5 text-blue-400 mr-2" />
                <span>Tools & Technologies</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.tools.map((tool, index) => (
                  <motion.div 
                    key={tool}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                    className="px-3 py-2 rounded-lg bg-gray-800/50 text-gray-300 text-center text-sm hover:bg-blue-900/20 hover:text-blue-300 transition-colors"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24 relative"
        >
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
          
          <div className="glass-container p-10 rounded-3xl border border-gray-800/50 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 glow-text">Get In Touch</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out to me. 
                I&apos;m always open to discussing new opportunities and challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-400">himanshuraj48512@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Location</h3>
                    <p className="text-gray-400">Delhi, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Employment</h3>
                    <p className="text-gray-400">Open to opportunities</p>
                  </div>
                </div>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-200 relative overflow-hidden group"
                >
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </form>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="text-xl font-bold text-blue-400 mb-2">Himanshu Raj</div>
              <p className="text-gray-400 text-sm">© 2025 All rights reserved</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://github.com/himanshuraj108" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://leetcode.com/u/himanshuraj48512/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                <Code className="w-5 h-5" />
              </a>
              {/* <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a> */}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Add custom styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .glass-container {
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .glass-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(31, 41, 55, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 0.5rem;
          font-weight: 500;
          color: #e5e7eb;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .glass-button:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #ffffff;
        }
        
        .glass-button-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(37, 99, 235, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 0.5rem;
          font-weight: 500;
          color: #60a5fa;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .glass-button-primary:hover {
          background: rgba(37, 99, 235, 0.3);
          color: #93c5fd;
        }
        
        .glass-button-small {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          background: rgba(31, 41, 55, 0.4);
          backdrop-filter: blur(4px);
          border-radius: 0.375rem;
          font-weight: 500;
          font-size: 0.875rem;
          color: #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .glass-button-small:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #ffffff;
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end) 1s 1 normal both;
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(calc(var(--orbit-size, 100%) / 2)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(calc(var(--orbit-size, 100%) / 2)) rotate(-360deg); }
        }
        
        .animate-orbit {
          animation: orbit calc(var(--orbit-duration, 10s)) linear infinite;
          animation-delay: calc(var(--orbit-delay, 0s));
        }
      `}</style>
    </div>
  );
} 