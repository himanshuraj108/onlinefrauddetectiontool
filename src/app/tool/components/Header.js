'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animation sequence on load
    setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/tool' },
    { name: 'Dashboard', href: '/tool/dashboard' },
    // { name: 'Portfolio', href: '/tool/portfolio' },
    { name: 'Documentation', href: '/tool/documentation' },
    { name: 'About', href: '/tool/about' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className={`flex items-center transition-all duration-1000 ${
            animationComplete ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative h-10 w-10 mr-3">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-1 bg-purple-600 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-2 bg-indigo-800 rounded-full flex items-center justify-center text-white font-bold">
                FD
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Fraud<span className="text-white">Detection</span>
              </h1>
              <p className="text-xs text-gray-400">AI-Powered Protection</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`relative font-medium text-gray-300 hover:text-white transition-all duration-300 ${
                  animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 py-2 space-y-3">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="block text-gray-300 hover:text-white hover:bg-gray-800 rounded px-3 py-2 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
} 