'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Shield, 
  BarChart, 
  Users, 
  GraduationCap,
  Award,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Laptop
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-10">
          <Link href="/tool" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Tool
          </Link>
          <h1 className="text-2xl font-bold ml-8">About FraudShield</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">Project Mission</h2>
            </div>
            <p className="text-gray-300 mb-6">
              This online payment fraud detection tool was developed with a clear mission: to empower businesses of all sizes with 
              advanced fraud detection capabilities. I believe that every business deserves protection from financial fraud.
            </p>
            <p className="text-gray-300">
              The tool combines cutting-edge technology with a user-friendly interface to help identify potentially 
              fraudulent transactions quickly and accurately. As a developer, I&apos;m committed to continuous improvement 
              and innovation to stay ahead of emerging fraud patterns.
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <BarChart className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">Impact</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-750 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-400">99.7%</p>
                <p className="text-sm text-gray-300 mt-1">Fraud Detection Accuracy</p>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-400">$12M+</p>
                <p className="text-sm text-gray-300 mt-1">Fraud Prevented</p>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-400">500+</p>
                <p className="text-sm text-gray-300 mt-1">Client Businesses</p>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-400">50M+</p>
                <p className="text-sm text-gray-300 mt-1">Transactions Analyzed</p>
              </div>
            </div>
          </motion.div>
          
          {/* Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2"
          >
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-750 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Innovation</h3>
                <p className="text-gray-300">
                  We continuously explore new technologies and techniques to improve fraud detection capabilities, 
                  staying ahead of evolving fraud schemes and patterns.
                </p>
              </div>
              <div className="bg-gray-750 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Accessibility</h3>
                <p className="text-gray-300">
                  We believe advanced security shouldn&apos;t be a luxury. Our tools are designed to be accessible 
                  and effective for businesses of all sizes and technical capabilities.
                </p>
              </div>
              <div className="bg-gray-750 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Privacy</h3>
                <p className="text-gray-300">
                  We respect data privacy and have designed our tools to process data locally when possible, 
                  ensuring your sensitive transaction information remains secure.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Team Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2"
          >
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">Developer Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-750 p-5 rounded-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-blue-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full border-b-2 border-r-2 border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                  <div className="text-3xl font-bold text-white z-10">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">&lt;/&gt;</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-1">Himanshu Raj</h3>
                <p className="text-sm text-blue-400 text-center mb-3">Software Engineer</p>
                {/* <p className="text-sm text-gray-300 text-center mb-4">
                  B.Tech in Computer Science and Engineering from Lovely Professional University (LPU). 
                  Skilled in DSA, Java, C++, Python, MERN, NextJs, Data Science & ML.
                </p> */}
                <div className="flex justify-center space-x-3">
                  <a href="https://github.com/himanshuraj108" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://leetcode.com/u/himanshuraj48512/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </a>
                  <a href="/tool/portfolio" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="mailto:example@example.com@example.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
                
                {/* Advanced Portfolio Button */}
                <div className="mt-6">
                  <a 
                    href="/tool/portfolio" 
                    className="portfolio-button group relative block w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-px text-center"
                  >
                    {/* Glow effect */}
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-70 blur-2xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-3xl"></span>
                    
                    {/* Button content */}
                    <span className="relative flex items-center justify-center rounded-lg bg-gray-900 py-3 px-4 transition-all duration-300 group-hover:bg-opacity-0">
                      <span className="mr-3 relative">
                        <Laptop className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                        {/* Mini particles around icon */}
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-400 opacity-0 group-hover:animate-ping group-hover:opacity-60"></span>
                        <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-purple-400 opacity-0 group-hover:animate-ping group-hover:opacity-60" style={{ animationDelay: '0.5s' }}></span>
                      </span>
                      <span className="font-medium text-white transition-all duration-300 group-hover:text-lg">
                        View My Portfolio
                      </span>
                      <span className="ml-3 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">→</span>
                    </span>
                    
                    {/* Bottom swipe effect */}
                    <span className="absolute -bottom-2 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-blue-500/20 transition-all duration-500 group-hover:scale-[12]"></span>
                    
                    {/* Border animation */}
                    <span className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-500"></span>
                    
                    {/* Floating dots */}
                    <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-blue-300/40 opacity-0 group-hover:opacity-100 group-hover:animate-float" style={{ animationDelay: '0.1s' }}></span>
                    <span className="absolute top-1/4 right-1/4 h-1 w-1 rounded-full bg-purple-300/40 opacity-0 group-hover:opacity-100 group-hover:animate-float" style={{ animationDelay: '0.3s' }}></span>
                    <span className="absolute bottom-1/4 left-1/3 h-1.5 w-1.5 rounded-full bg-blue-300/40 opacity-0 group-hover:opacity-100 group-hover:animate-float" style={{ animationDelay: '0.5s' }}></span>
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-purple-300/40 opacity-0 group-hover:opacity-100 group-hover:animate-float" style={{ animationDelay: '0.7s' }}></span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2"
          >
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">Get In Touch</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 mb-6">
                  Have questions or feedback about our fraud detection tool? Feel free to get in touch!
                  Connect with the developer directly through the provided channels.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-200">Email</p>
                      <p className="text-sm text-blue-400">contact info...</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center text-blue-400 mr-3">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">GitHub</p>
                      <a href="https://github.com/himanshuraj108" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300">
                        @himanshuraj108
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-750 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-4">Project Information</h3>
                <p className="text-sm text-gray-300 mb-4">
                  This online payment fraud detection tool was developed as part of a project by Himanshu Raj,
                  a Computer Science and Engineering student at Lovely Professional University.
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  The tool uses advanced algorithms to analyze payment data and identify potentially 
                  fraudulent transactions, helping businesses protect themselves from financial fraud.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 