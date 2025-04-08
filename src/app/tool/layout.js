import { Inter } from 'next/font/google';
import '../globals.css';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FruadDetection - Advanced Payment Fraud Detection',
  description: 'Advanced AI-powered payment fraud detection tool',
};

export default function ToolLayout({ children }) {
  return (
    <div className={`${inter.className} bg-gray-900 text-white antialiased min-h-screen relative`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-64 -top-64 w-96 h-96 rounded-full bg-blue-900/10 blur-3xl"></div>
        <div className="absolute right-20 top-40 w-72 h-72 rounded-full bg-purple-900/10 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-20 w-80 h-80 rounded-full bg-indigo-900/10 blur-3xl"></div>
      </div>
      
      {children}
    </div>
  );
} 