'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [showDevInfo, setShowDevInfo] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleDevNameHover = () => {
    setShowDevInfo(true);
  };

  const handleDevNameLeave = () => {
    setShowDevInfo(false);
    setTimeout(() => {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    }, 300);
  };

  const technologies = [
    'Next.js', 'React', 'Tailwind CSS', 'Chart.js', 'Framer Motion', 'Mistral AI'
  ];

  return (
    <footer className="relative bg-gray-900 text-white pt-12 pb-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-blue-900/20 blur-3xl"></div>
        <div className="absolute right-20 top-10 w-60 h-60 rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute left-1/3 -top-20 w-60 h-60 rounded-full bg-indigo-900/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              FruadDetection
            </h3>
            <p className="text-gray-400 mb-4">
              Advanced AI-powered payment fraud detection tool for businesses and individuals.
            </p>
            <div className="flex space-x-4">
              {/* <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link> */}
              <Link href="https://github.com/himanshuraj108" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</Link>
              </li> */}
              {/* <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li> */}
              <li>
                <Link href="https://github.com/himanshuraj108" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">support@fruaddetection.com</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">9999999999</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 FruadDetection. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 relative">
            <p className="text-gray-500 text-sm">
              Developed by{' '}
              <span 
                className="text-blue-400 font-semibold cursor-pointer relative inline-block"
                onMouseEnter={handleDevNameHover}
                onMouseLeave={handleDevNameLeave}
              >
                Himanshu Raj
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </p>
            
            {/* Developer Info Popup */}
            {showDevInfo && (
              <div className="absolute bottom-full right-0 mb-2 p-4 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 transition-opacity duration-300">
                <h4 className="text-white font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Warning Notification */}
      {showWarning && (
        <div className="fixed bottom-4 right-4 max-w-sm bg-red-900/90 backdrop-blur-sm border border-red-700 shadow-lg rounded-lg p-4 z-50 animate-fade-up">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-white">Warning</h3>
              <div className="mt-1 text-sm text-red-200">
                Be cautious of online payment fraud! Always double-check transaction details.
              </div>
            </div>
            <button
              className="ml-auto bg-transparent text-red-300 hover:text-white"
              onClick={() => setShowWarning(false)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </footer>
  );
} 