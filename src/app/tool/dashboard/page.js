'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronLeft,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  DollarSign,
  Percent,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Users,
  Shield,
  BarChart3,
  PieChart,
  LineChart,
  CheckCircle,
  XCircle,
  BellRing
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Card component for statistics
const StatCard = ({ icon, title, value, change, isPositive, isLoading }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
          {icon}
        </div>
        {change && (
          <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {change}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-300">{title}</h3>
      {isLoading ? (
        <div className="h-8 w-24 bg-gray-700 animate-pulse rounded mt-1"></div>
      ) : (
        <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      )}
    </div>
  );
};

// Chart placeholder component (would be replaced with actual chart library in production)
const ChartPlaceholder = ({ title, description, data, type }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <div className="p-1 rounded-md bg-blue-500/10 text-blue-400">
          <BarChart3 className="w-4 h-4" />
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-3">{description}</p>
      <div className="bg-gray-750 rounded-lg p-4 h-48 flex items-center justify-center">
        {data ? (
          <div className="w-full h-full">
            {/* We would render actual chart here with data */}
            <div className="flex flex-col h-full justify-center">
              <div className="text-center">
                {type === 'fraud-trends' && data.timeSeriesData && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {data.timeSeriesData.slice(0, 4).map((item, index) => (
                      <div key={index} className="bg-gray-800 p-2 rounded">
                        <div className="text-blue-400">{item.month || `Period ${index+1}`}</div>
                        <div className="mt-1 flex justify-between">
                          <span className="text-xs text-gray-400">Fraud:</span>
                          <span className="text-red-400">{item.fraudAttempts || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {type === 'fraud-types' && data.fraudTypeData && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {data.fraudTypeData.types.slice(0, 4).map((type, index) => (
                      <div key={index} className="bg-gray-800 p-2 rounded">
                        <div className="text-blue-400">{type.replace('_', ' ')}</div>
                        <div className="mt-1 flex justify-between">
                          <span className="text-xs text-gray-400">Count:</span>
                          <span className="text-red-400">{data.fraudTypeData.counts[index] || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Activity className="w-8 h-8 text-blue-500/50" />
            </div>
            <p className="mt-2 text-sm text-gray-400">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Recent activity item component
const ActivityItem = ({ icon, title, description, time, status }) => {
  return (
    <div className="flex items-start p-3 hover:bg-gray-750 rounded-lg transition-colors cursor-pointer">
      <div className={`p-2 rounded-lg mr-3 ${
        status === 'success' ? 'bg-green-500/10 text-green-400' :
        status === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
        status === 'danger' ? 'bg-red-500/10 text-red-400' :
        'bg-blue-500/10 text-blue-400'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-200 truncate">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{description}</p>
      </div>
      <div className="text-xs text-gray-500 whitespace-nowrap">
        {time}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    fraudTransactions: 0,
    suspiciousTransactions: 0,
    riskScore: 0
  });
  const [analysisResults, setAnalysisResults] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    // Load saved analysis results from localStorage
    try {
      const savedResults = localStorage.getItem('fraudAnalysisResults');
      if (savedResults) {
        const results = JSON.parse(savedResults);
        
        // Process the results for dashboard display
        setAnalysisResults(results);
        
        // Generate activity feed based on data
        if (results.flaggedTransactions && results.flaggedTransactions.length > 0) {
          generateActivityFromData(results);
        } else {
          // Generate minimal activity when only basic data is available
          generateMinimalActivity(results);
          setIsLoading(false);
        }
      } else {
        // If no results found, generate sample data for demonstration
        generateSampleData();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading saved results:', error);
      // Generate sample data if there's an error
      generateSampleData();
      setIsLoading(false);
    }
  }, []);
  
  // Generate activity items based on real data
  const generateActivityFromData = (results) => {
    const activities = [];
    
    if (results.flaggedTransactions && results.flaggedTransactions.length > 0) {
      // Add fraudulent transactions as alerts
      const fraudulent = results.flaggedTransactions.filter(tx => 
        tx.isFraud === true || tx.isFraud === 1 || tx.isFraud === '1' || tx.isFraud === 'true'
      );
      
      if (fraudulent.length > 0) {
        fraudulent.slice(0, 2).forEach((tx, index) => {
          activities.push({
            icon: <XCircle className="w-4 h-4" />,
            title: "Fraud Alert",
            description: `Transaction ${tx.id || '#' + (index + 1)} - Amount: ${tx.amount || 'Unknown'}`,
            time: `${index + 1} hour${index === 0 ? '' : 's'} ago`,
            status: "danger"
          });
        });
      }
      
      // Add suspicious transactions
      const suspicious = results.flaggedTransactions.filter(tx => 
        (tx.isFlagged === true || tx.isFlagged === 1 || tx.isFlagged === '1' || tx.isFlagged === 'true') &&
        !(tx.isFraud === true || tx.isFraud === 1 || tx.isFraud === '1' || tx.isFraud === 'true')
      );
      
      if (suspicious.length > 0) {
        suspicious.slice(0, 2).forEach((tx, index) => {
          activities.push({
            icon: <AlertTriangle className="w-4 h-4" />,
            title: "Suspicious Transaction",
            description: `Transaction ${tx.id || '#' + (index + 1)} - Amount: ${tx.amount || 'Unknown'}`,
            time: `${index + 5} min${index === 0 ? '' : 's'} ago`,
            status: "warning"
          });
        });
      }
    }
    
    // Add analysis completed activity
    activities.push({
      icon: <CheckCircle className="w-4 h-4" />,
      title: "Analysis Completed",
      description: `Analysis of ${results.summary?.total || 0} transactions complete`,
      time: "1 hour ago",
      status: "success"
    });
    
    // Add system status activity
    activities.push({
      icon: <Shield className="w-4 h-4" />,
      title: "System Status",
      description: `Overall risk score: ${results.riskScore || 0}%`,
      time: "2 hours ago",
      status: "info"
    });
    
    setRecentActivity(activities);
    setIsLoading(false);
  };

  // Generate minimal activity when only basic data is available
  const generateMinimalActivity = (results) => {
    const activities = [
      {
        icon: <CheckCircle className="w-4 h-4" />,
        title: "Analysis Completed",
        description: `Analysis of ${results.summary?.total || 0} transactions complete`,
        time: "1 hour ago",
        status: "success"
      },
      {
        icon: <Shield className="w-4 h-4" />,
        title: "System Status",
        description: `Overall risk score: ${results.riskScore || 0}%`,
        time: "2 hours ago",
        status: "info"
      },
      {
        icon: <BarChart3 className="w-4 h-4" />,
        title: "Dashboard Updated",
        description: "Dashboard metrics refreshed with latest data",
        time: "3 hours ago",
        status: "success"
      }
    ];
    
    setRecentActivity(activities);
  };

  // Generate sample data for demonstration
  const generateSampleData = () => {
    // Create sample analysis results
    const sampleResults = {
      summary: {
        total: 12548,
        fraudulent: 124,
        suspicious: 357,
        safe: 12067
      },
      riskScore: 14.8,
      timeSeriesData: [
        { month: 1, year: 2023, totalTransactions: 1050, fraudAttempts: 12 },
        { month: 2, year: 2023, totalTransactions: 980, fraudAttempts: 8 },
        { month: 3, year: 2023, totalTransactions: 1120, fraudAttempts: 15 }
      ]
    };
    
    setAnalysisResults(sampleResults);
    
    // Create sample activity items
    const activities = [
      {
        icon: <XCircle className="w-4 h-4" />,
        title: "Sample Fraud Alert",
        description: "Transaction #1234 - Amount: $852.30",
        time: "1 hour ago",
        status: "danger"
      },
      {
        icon: <AlertTriangle className="w-4 h-4" />,
        title: "Sample Suspicious Transaction",
        description: "Transaction #5678 - Amount: $425.60",
        time: "5 mins ago",
        status: "warning"
      },
      {
        icon: <CheckCircle className="w-4 h-4" />,
        title: "Sample Analysis Completed",
        description: "Analysis of 12,548 transactions complete",
        time: "1 hour ago",
        status: "success"
      },
      {
        icon: <Shield className="w-4 h-4" />,
        title: "Sample System Status",
        description: "Overall risk score: 14.8%",
        time: "2 hours ago",
        status: "info"
      }
    ];
    
    setRecentActivity(activities);
  };

  // Animated counter effect
  const Counter = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (isLoading) return;
      
      let start = 0;
      const end = parseInt(value);
      const incrementTime = (duration / end) * 1.5;
      const timer = setInterval(() => {
        start += 1;
        setCount(String(Math.floor(start)));
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      
      return () => {
        clearInterval(timer);
      };
    }, [value, duration, isLoading]);
    
    return <>{count}</>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/tool" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Tool
            </Link>
            <h1 className="text-2xl font-bold ml-8">Dashboard</h1>
          </div>
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        
        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <StatCard 
            icon={<CreditCard className="w-5 h-5" />}
            title="Total Transactions"
            value={isLoading ? "—" : <Counter value={stats.totalTransactions} />}
            change={analysisResults ? `${stats.totalTransactions} rows` : "12.5%"}
            isPositive={true}
            isLoading={isLoading}
          />
          <StatCard 
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Detected Fraud"
            value={isLoading ? "—" : <Counter value={stats.fraudTransactions} />}
            change={analysisResults ? `${((stats.fraudTransactions / stats.totalTransactions) * 100).toFixed(1)}%` : "3.2%"}
            isPositive={false}
            isLoading={isLoading}
          />
          <StatCard 
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Suspicious Transactions"
            value={isLoading ? "—" : <Counter value={stats.suspiciousTransactions} />}
            change={analysisResults ? `${((stats.suspiciousTransactions / stats.totalTransactions) * 100).toFixed(1)}%` : "2.1%"}
            isPositive={false}
            isLoading={isLoading}
          />
          <StatCard 
            icon={<Percent className="w-5 h-5" />}
            title="Risk Score"
            value={isLoading ? "—" : `${stats.riskScore}%`}
            change={analysisResults ? "Based on your data" : "1.8%"}
            isPositive={analysisResults ? stats.riskScore < 15 : true}
            isLoading={isLoading}
          />
        </motion.div>
        
        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <ChartPlaceholder 
              title="Fraud Detection Trends" 
              description="Fraud detection metrics over time"
              data={analysisResults}
              type="fraud-trends"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <ChartPlaceholder 
              title="Fraud Type Distribution" 
              description="Breakdown of fraud by category"
              data={analysisResults}
              type="fraud-types"
            />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800 rounded-xl shadow-lg lg:col-span-2"
          >
            <div className="p-5 border-b border-gray-700">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <p className="text-sm text-gray-400 mt-1">Latest fraud detection alerts and system events</p>
            </div>
            <div className="p-2 divide-y divide-gray-700/50">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="p-3">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="ml-3 flex-1">
                        <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2 mt-2 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <ActivityItem 
                    key={index}
                    icon={activity.icon}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                    status={activity.status}
                  />
                ))
              ) : (
                <ActivityItem 
                  icon={<CheckCircle className="w-4 h-4" />}
                  title="No Recent Activity"
                  description="Upload data to generate activity"
                  time="Just now"
                  status="info"
                />
              )}
            </div>
            <div className="p-3 border-t border-gray-700 text-center">
              <Link href="/tool" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Return to Tool
              </Link>
            </div>
          </motion.div>
          
          {/* System Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="p-5 border-b border-gray-700">
              <h3 className="text-lg font-medium">System Status</h3>
              <p className="text-sm text-gray-400 mt-1">Current state of fraud detection services</p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm">Fraud Detection Engine</span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900/20 text-green-400">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm">Analytics Services</span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900/20 text-green-400">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChart className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-sm">Reporting System</span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/20 text-yellow-400">Degraded</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LineChart className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm">ML Training Pipeline</span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900/20 text-green-400">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm">Real-time API</span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900/20 text-green-400">Operational</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium mb-2">System Metrics</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Average Response Time</span>
                      <span className="text-green-400">124ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Fraud Detection Accuracy</span>
                      <span className="text-blue-400">{analysisResults ? 
                        `${Math.min(99, 90 + (analysisResults.riskScore / 20))}%` : 
                        "95%"}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ 
                        width: analysisResults ? 
                          `${Math.min(99, 90 + (analysisResults.riskScore / 20))}%` : 
                          "95%" 
                      }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>System Risk Level</span>
                      <span className={`${
                        analysisResults && analysisResults.riskScore > 50 ? 
                          "text-red-400" : 
                          analysisResults && analysisResults.riskScore > 30 ?
                            "text-yellow-400" :
                            "text-green-400"
                      }`}>
                        {analysisResults ? `${analysisResults.riskScore}%` : "42%"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${
                        analysisResults && analysisResults.riskScore > 50 ? 
                          "bg-red-500" : 
                          analysisResults && analysisResults.riskScore > 30 ?
                            "bg-yellow-500" :
                            "bg-green-500"
                      }`} style={{ 
                        width: analysisResults ? 
                          `${analysisResults.riskScore}%` : 
                          "42%" 
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 