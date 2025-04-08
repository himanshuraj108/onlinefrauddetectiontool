'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  ShieldCheck,
  ChartBar,
  FileText,
  Users,
  ArrowUpRight,
  Github
} from 'lucide-react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold">FraudDetection</h1>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/tool/documentation" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/tool/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <a 
                href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 mr-1" />
                <span>GitHub</span>
              </a>
              <Link 
                href="/tool" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <main>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Detect Payment Fraud</span>
              <span className="block text-blue-500 mt-2">Protect Your Business</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced fraud detection for online payments. Upload your CSV data and let 
              our powerful AI identify suspicious transactions with industry-leading accuracy.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/tool" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                Try the Tool
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/tool/dashboard" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                View Dashboard
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
          
          {/* Features */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="py-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Detection</h3>
                <p className="text-gray-300">
                  State-of-the-art algorithms identify fraudulent transactions with 99.7% accuracy.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                  <ChartBar className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Dashboard</h3>
                <p className="text-gray-300">
                  Visualize fraud patterns and monitor key metrics with our intuitive dashboard.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">CSV Analysis</h3>
                <p className="text-gray-300">
                  Upload your transaction data in CSV format for quick and secure processing.
                </p>
              </div>
        </div>
            
            <div className="mt-16 text-center">
              <Link 
                href="/tool/documentation" 
                className="text-blue-400 hover:text-blue-300 flex items-center justify-center transition-colors"
              >
                <span>Learn more about our features</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          
          {/* Navigation Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-12 mb-10"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Explore the Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/tool" className="block">
                <div className="bg-gray-800 hover:bg-gray-750 transition-colors rounded-xl p-6 shadow-lg border border-gray-700 h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Fraud Detection Tool</h3>
                      <p className="text-gray-300 mb-4">
                        Upload your CSV data and analyze it for potential fraud. Get detailed insights and recommendations.
                      </p>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-blue-400">
                    <span>Go to Tool</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
              
              <Link href="/tool/dashboard" className="block">
                <div className="bg-gray-800 hover:bg-gray-750 transition-colors rounded-xl p-6 shadow-lg border border-gray-700 h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                      <p className="text-gray-300 mb-4">
                        Monitor fraud metrics, view trends, and track the performance of your fraud detection system.
                      </p>
                    </div>
                    <div className="bg-green-600 p-3 rounded-lg">
                      <ChartBar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-400">
                    <span>View Dashboard</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
              
              <Link href="/tool/documentation" className="block">
                <div className="bg-gray-800 hover:bg-gray-750 transition-colors rounded-xl p-6 shadow-lg border border-gray-700 h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                      <p className="text-gray-300 mb-4">
                        Learn how to use the platform, understand CSV requirements, and get detailed API information.
                      </p>
                    </div>
                    <div className="bg-yellow-600 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-yellow-400">
                    <span>Read Documentation</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
              
              <Link href="/tool/about" className="block">
                <div className="bg-gray-800 hover:bg-gray-750 transition-colors rounded-xl p-6 shadow-lg border border-gray-700 h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">About Us</h3>
                      <p className="text-gray-300 mb-4">
                        Learn about our mission, team, and how we&apos;re helping businesses combat payment fraud.
                      </p>
                    </div>
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-purple-400">
                    <span>Meet the Team</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </main>
        
        {/* Footer */}
        <footer className="py-8 mt-10 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-500 p-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="ml-2 text-sm font-medium">FraudDetection © 2025</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/tool" className="text-sm text-gray-400 hover:text-white transition-colors">
                Tool
              </Link>
              <Link href="/tool/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/tool/documentation" className="text-sm text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/tool/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>
      </footer>
      </div>
    </div>
  );
}
