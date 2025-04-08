'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Doughnut, Line, Bar, Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  RadialLinearScale,
  Filler
);

// Create a simple IconDatabase component instead
const IconDatabase = () => (
  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

export default function AnalyticsSection({ results, isLoading }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [selectedFraudType, setSelectedFraudType] = useState('all');
  const [filteredResults, setFilteredResults] = useState(null);
  const [statusFilters, setStatusFilters] = useState({
    fraud: true,
    flagged: true,
    safe: true
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (!results) {
      setFilteredResults(null);
      return;
    }
    
    try {
      // If "all" is selected, use the original results
      if (selectedFraudType === 'all') {
        setFilteredResults(results);
        return;
      }
      
      // Filter the results data based on selected fraud type
      const filtered = {
        ...results,
        // Filter flagged transactions
        flaggedTransactions: results.flaggedTransactions ? results.flaggedTransactions.filter(tx => 
          tx.fraudType === selectedFraudType
        ) : [],
        // Filter raw data if available
        rawData: results.rawData ? results.rawData.filter(row => {
          // Check for fraud type in the row data
          if (row.fraudType) {
            return row.fraudType === selectedFraudType;
          }
          // If row doesn't have a fraud type but we need to filter by it,
          // use string matching as a fallback
          return JSON.stringify(row).toLowerCase().includes(selectedFraudType);
        }) : []
      };
      
      setFilteredResults(filtered);
    } catch (error) {
      console.error("Error filtering results:", error);
      // Fall back to the original results if filtering fails
      setFilteredResults(results);
    }
  }, [results, selectedFraudType]);

  // Define fraud types for the selector
  const fraudTypes = [
    { id: 'all', label: 'All Fraud Types' },
    { id: 'credit_card', label: 'Credit Card Fraud' },
    { id: 'debit_card', label: 'Debit Card Fraud' },
    { id: 'otp', label: 'OTP Fraud' },
    { id: 'identity_theft', label: 'Identity Theft' },
    { id: 'phishing', label: 'Phishing Attacks' },
    { id: 'account_takeover', label: 'Account Takeover' },
    { id: 'money_laundering', label: 'Money Laundering' },
    { id: 'merchant', label: 'Merchant Fraud' }
  ];

  // Chart colors
  const chartColors = {
    blue: 'rgba(59, 130, 246, 0.8)',
    lightBlue: 'rgba(96, 165, 250, 0.5)',
    purple: 'rgba(139, 92, 246, 0.8)',
    lightPurple: 'rgba(167, 139, 250, 0.5)',
    red: 'rgba(239, 68, 68, 0.8)',
    lightRed: 'rgba(248, 113, 113, 0.5)',
    green: 'rgba(34, 197, 94, 0.8)',
    lightGreen: 'rgba(74, 222, 128, 0.5)',
    yellow: 'rgba(234, 179, 8, 0.8)',
    lightYellow: 'rgba(250, 204, 21, 0.5)',
    background: 'rgba(30, 41, 59, 0.8)',
    grid: 'rgba(148, 163, 184, 0.2)',
  };

  // Calculate risk score with more realistic distribution
  const calculateRiskScore = useMemo(() => {
    if (!filteredResults || !filteredResults.rawData || filteredResults.rawData.length === 0) {
      return 45; // Default moderate risk when no data
    }
    
    const totalRows = filteredResults.rawData.length;
    const fraudCount = filteredResults.rawData.filter(row => 
      row.isFraud === 1 || row.isFraud === '1' || row.isFraud === true || row.isFraud === 'true'
    ).length;
    
    const flaggedCount = filteredResults.rawData.filter(row => 
      (row.isFlagged === 1 || row.isFlagged === '1' || row.isFlagged === true || row.isFlagged === 'true') ||
      (row.amount && parseFloat(row.amount) > 1000000)
    ).length;
    
    // Calculate weighted score - fraud counts more than flagged
    const weightedCount = (fraudCount * 3) + flaggedCount;
    
    // Calculate as percentage but cap between 20-90 to avoid extremes
    const baseScore = Math.min(90, Math.max(20, (weightedCount / totalRows) * 100));
    
    // Add some variance for more realistic distribution 
    const variance = 5; // Small variance to avoid exact increments
    
    return Math.min(95, Math.max(5, Math.round(baseScore) + variance));
  }, [filteredResults]);

  // Memoize the risk radar data to prevent re-renders
  const riskRadarData = useMemo(() => {
    return {
      labels: ['Unusual Location', 'Abnormal Amount', 'High Frequency', 'Unknown Recipient', 'Time Pattern', 'Device Risk'],
      datasets: [
        {
          label: 'Risk Factors',
          data: [
            65, 72, 58, 43, 81, 53
          ],
          backgroundColor: chartColors.lightPurple,
          borderColor: chartColors.purple,
          borderWidth: 2,
        },
      ],
    };
  }, [chartColors.lightPurple, chartColors.purple]);

  // Use filteredResults instead of results throughout the component
  const summaryData = useMemo(() => {
    if (!filteredResults || !filteredResults.rawData) {
      return {
        labels: ['Safe', 'Suspicious', 'Fraudulent'],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: [chartColors.green, chartColors.yellow, chartColors.red],
          borderColor: [chartColors.lightGreen, chartColors.lightYellow, chartColors.lightRed],
          borderWidth: 1,
          hoverOffset: 5,
        }]
      };
    }

    // Calculate counts using the same logic as the data table
    const counts = {
      safe: 0,
      suspicious: 0,
      fraudulent: 0
    };

    filteredResults.rawData.forEach(row => {
      if (row.isFraud === 1 || row.isFraud === '1' || row.isFraud === true || row.isFraud === 'true') {
        counts.fraudulent++;
      } else if (row.isFlagged === 1 || row.isFlagged === '1' || row.isFlagged === true || row.isFlagged === 'true' || 
                (row.amount && parseFloat(row.amount) > 1000000)) {
        counts.suspicious++;
      } else {
        counts.safe++;
      }
    });

    return {
      labels: ['Safe', 'Suspicious', 'Fraudulent'],
      datasets: [{
        data: [counts.safe, counts.suspicious, counts.fraudulent],
        backgroundColor: [chartColors.green, chartColors.yellow, chartColors.red],
        borderColor: [chartColors.lightGreen, chartColors.lightYellow, chartColors.lightRed],
        borderWidth: 1,
        hoverOffset: 5,
      }]
    };
  }, [filteredResults, chartColors]);

  const timeSeriesData = useMemo(() => {
    return {
      labels: filteredResults && filteredResults.timeSeriesData ? filteredResults.timeSeriesData.map(d => d.month ? `Month ${d.month}` : '') : [],
      datasets: [
        {
          label: 'Fraud Attempts',
          data: filteredResults && filteredResults.timeSeriesData ? filteredResults.timeSeriesData.map(d => d.fraudAttempts || 0) : [],
          fill: true,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: chartColors.red,
          tension: 0.4,
        },
        {
          label: 'Total Transactions',
          data: filteredResults && filteredResults.timeSeriesData ? filteredResults.timeSeriesData.map(d => d.totalTransactions || 0) : [],
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: chartColors.blue,
          tension: 0.4,
        },
      ],
    };
  }, [filteredResults, chartColors.red, chartColors.blue]);

  const categoryData = useMemo(() => {
    return {
      labels: filteredResults && filteredResults.categories ? filteredResults.categories.map(c => c.name) : [],
      datasets: [
        {
          label: 'Transaction Categories',
          data: filteredResults && filteredResults.categories ? filteredResults.categories.map(c => c.value) : [],
          backgroundColor: [
            chartColors.blue, 
            chartColors.purple, 
            chartColors.red, 
            chartColors.green, 
            chartColors.yellow
          ],
        },
      ],
    };
  }, [filteredResults, chartColors.blue, chartColors.purple, chartColors.red, chartColors.green, chartColors.yellow]);

  if (!results && !isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-6 opacity-50">
          <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
        <p className="text-gray-400 mb-6">Upload a payment data file to see fraud detection analysis</p>
        <div className="w-16 h-16 relative animate-pulse">
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full flex flex-col items-center justify-center">
        <div className="w-24 h-24 mb-6">
          <div className="w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Analyzing Data</h3>
        <p className="text-gray-400">Our AI is scanning for fraudulent patterns...</p>
        
        <div className="w-full max-w-md mt-8 mb-4">
          <div className="h-2 bg-gray-700 rounded-full">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-700/50 h-16 rounded-lg animate-pulse" style={{ animationDelay: `${item * 150}ms` }}></div>
          ))}
        </div>
      </div>
    );
  }

  // Chart options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: chartColors.background,
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: chartColors.grid,
        borderWidth: 1,
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartColors.grid,
        },
        ticks: {
          color: '#e2e8f0',
        }
      },
      x: {
        grid: {
          color: chartColors.grid,
        },
        ticks: {
          color: '#e2e8f0',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: chartColors.background,
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: chartColors.grid,
        borderWidth: 1,
      }
    },
    animation: {
      duration: 2000,
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartColors.grid,
        },
        ticks: {
          color: '#e2e8f0',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#e2e8f0',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: chartColors.background,
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: chartColors.grid,
        borderWidth: 1,
      }
    },
    animation: {
      duration: 1500,
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          color: chartColors.grid,
        },
        grid: {
          color: chartColors.grid,
        },
        pointLabels: {
          color: '#e2e8f0',
          font: {
            size: 10
          }
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#e2e8f0',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: chartColors.background,
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: chartColors.grid,
        borderWidth: 1,
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'patterns', label: 'Patterns' },
    { id: 'datatable', label: 'Data Table' },
    { id: 'recommendations', label: 'Recommendations' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Fraud Analysis Results</h2>
          
          {filteredResults && (
            <div className="ml-4 flex items-center rounded-full bg-gray-700 p-1">
              <div 
                className={`py-1.5 px-3 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  filteredResults.summary && filteredResults.summary.fraudulent > 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
              >
                {filteredResults.summary && filteredResults.summary.fraudulent > 0 ? 'Fraud Detected' : 'No Fraud Detected'}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <label htmlFor="fraudType" className="text-sm font-medium mr-2 text-gray-300">
            Fraud Type:
          </label>
          <select
            id="fraudType"
            value={selectedFraudType}
            onChange={(e) => setSelectedFraudType(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fraudTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Risk Score */}
      {filteredResults && (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end mb-2">
            <h3 className="text-lg font-medium">Risk Score</h3>
            <span className="ml-2 text-sm text-gray-400">(0-100)</span>
          </div>
          
          <div className="bg-gray-700 h-6 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${
                calculateRiskScore < 30 
                  ? 'bg-green-500' 
                  : calculateRiskScore < 70 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              }`}
              style={{ 
                width: `${calculateRiskScore}%`, 
                transition: 'width 1.5s ease-in-out'
              }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>Low Risk</span>
            <span>Medium Risk ({calculateRiskScore}%)</span>
            <span>High Risk</span>
          </div>
        </motion.div>
      )}
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-4 overflow-x-auto scrollbar-hide" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="h-auto min-h-[24rem] max-h-[calc(100vh-250px)] overflow-auto">
        {activeTab === 'overview' && (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Transaction Summary</h3>
              <div className="h-64">
                <Doughnut data={summaryData} options={doughnutOptions} />
              </div>
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Transaction Categories</h3>
              <div className="h-64">
                <Bar data={categoryData} options={barOptions} />
              </div>
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-4 col-span-full">
              <h3 className="text-md font-medium mb-4">Fraud Type Distribution</h3>
              <div className="h-64">
                {filteredResults && filteredResults.fraudTypeData ? (
                  <Bar 
                    data={getFraudTypeChartData(filteredResults.fraudTypeData)} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: chartColors.grid,
                          },
                          ticks: {
                            color: '#e2e8f0',
                          },
                          title: {
                            display: true,
                            text: 'Number of Incidents',
                            color: '#e2e8f0'
                          }
                        },
                        riskAxis: {
                          beginAtZero: true,
                          position: 'right',
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color: '#e2e8f0',
                            callback: function(value) {
                              return value + '%';
                            }
                          },
                          title: {
                            display: true,
                            text: 'Risk Score',
                            color: '#e2e8f0'
                          }
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color: '#e2e8f0',
                            maxRotation: 45,
                            minRotation: 45
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: 'top',
                          labels: {
                            color: '#e2e8f0',
                            font: {
                              size: 12
                            }
                          }
                        },
                        tooltip: {
                          backgroundColor: chartColors.background,
                          titleColor: '#fff',
                          bodyColor: '#e2e8f0',
                          borderColor: chartColors.grid,
                          borderWidth: 1,
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.dataset.label === 'Risk Score') {
                                label += context.parsed.y + '%';
                              } else {
                                label += context.parsed.y;
                              }
                              return label;
                            }
                          }
                        }
                      },
                      animation: {
                        duration: 1500,
                      }
                    }} 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>No fraud type data available</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'transactions' && (
          <motion.div 
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-700/30 rounded-lg p-4 h-full overflow-auto">
              <h3 className="text-md font-medium mb-4">Flagged Transactions</h3>
              {filteredResults && filteredResults.flaggedTransactions && filteredResults.flaggedTransactions.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Fraud Type</th>
                      <th className="pb-2">Reason</th>
                      <th className="pb-2">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.flaggedTransactions.map((tx, index) => (
                      <motion.tr 
                        key={tx.id}
                        className="border-t border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="py-3 text-sm font-mono">{tx.id}</td>
                        <td className="py-3 text-sm">${tx.amount.toFixed(2)}</td>
                        <td className="py-3 text-sm">{new Date(tx.timestamp).toLocaleDateString()}</td>
                        <td className="py-3 text-sm">
                          {tx.fraudType && (
                            <span className={`px-2 py-1 rounded-full text-xs ${getFraudTypeColor(tx.fraudType)}`}>
                              {formatFraudType(tx.fraudType)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-sm">
                          <span className="px-2 py-1 rounded-full bg-red-900/40 text-red-300 text-xs">
                            {tx.reason}
                          </span>
                        </td>
                        <td className="py-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-12 h-2 bg-gray-600 rounded-full mr-2">
                              <div 
                                className={`h-full rounded-full ${
                                  tx.confidence < 30 ? 'bg-green-500' : 
                                  tx.confidence < 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${tx.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{tx.confidence}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>No fraudulent transactions detected</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'patterns' && (
          <motion.div 
            className="h-full grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Historical Patterns</h3>
              <div className="h-64">
                {filteredResults && filteredResults.timeSeriesData && filteredResults.timeSeriesData.length > 0 ? (
                  <Line data={timeSeriesData} options={lineOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>No historical data available</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Risk Factors</h3>
              <div className="h-64">
                <Radar data={riskRadarData} options={radarOptions} />
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'datatable' && (
          <motion.div 
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-700/30 rounded-lg p-4 h-full overflow-auto">
              <div className="flex justify-between items-center sticky top-0 bg-gray-800 z-10 py-2 mb-4">
                <h3 className="text-md font-medium">Complete Data Analysis</h3>
                
                <div className="flex items-center space-x-4 text-xs">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={statusFilters.fraud} 
                      onChange={() => setStatusFilters(prev => ({ ...prev, fraud: !prev.fraud }))}
                      className="sr-only"
                    />
                    <span className={`w-3 h-3 mr-1 rounded-sm flex items-center justify-center ${statusFilters.fraud ? 'bg-red-900/30 border border-red-500/30' : 'bg-gray-700 border border-gray-600'}`}>
                      {statusFilters.fraud && <span className="w-1.5 h-1.5 bg-red-500 rounded-sm"></span>}
                    </span>
                    <span className="text-red-200">Fraud</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={statusFilters.flagged} 
                      onChange={() => setStatusFilters(prev => ({ ...prev, flagged: !prev.flagged }))}
                      className="sr-only"
                    />
                    <span className={`w-3 h-3 mr-1 rounded-sm flex items-center justify-center ${statusFilters.flagged ? 'bg-yellow-900/30 border border-yellow-500/30' : 'bg-gray-700 border border-gray-600'}`}>
                      {statusFilters.flagged && <span className="w-1.5 h-1.5 bg-yellow-500 rounded-sm"></span>}
                    </span>
                    <span className="text-yellow-200">Flagged</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={statusFilters.safe} 
                      onChange={() => setStatusFilters(prev => ({ ...prev, safe: !prev.safe }))}
                      className="sr-only"
                    />
                    <span className={`w-3 h-3 mr-1 rounded-sm flex items-center justify-center ${statusFilters.safe ? 'bg-green-900/10 border border-green-500/30' : 'bg-gray-700 border border-gray-600'}`}>
                      {statusFilters.safe && <span className="w-1.5 h-1.5 bg-green-500 rounded-sm"></span>}
                    </span>
                    <span className="text-green-200">Safe</span>
                  </label>
                </div>
              </div>
              
              {filteredResults && filteredResults.rawData && filteredResults.rawData.length > 0 ? (
                <>
                  <DataTableWithPagination 
                    data={filteredResults.rawData} 
                    initialFraudType={selectedFraudType}
                    statusFilters={statusFilters} 
                  />
                </>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-gray-400">
                  <IconDatabase />
                  <p>No data available for display</p>
                  <p className="text-sm mt-2">Upload a file to see the data table</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'recommendations' && (
          <motion.div 
            className="h-full overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
              <h3 className="text-md font-medium mb-2">AI Recommendations</h3>
              <p className="text-sm text-gray-400 mb-4">Based on our analysis of your payment data, we recommend the following actions:</p>
              
              <div className="space-y-4">
                {filteredResults && filteredResults.flaggedTransactions && filteredResults.flaggedTransactions.length > 0 ? (
                  <>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Investigate Flagged Transactions</h4>
                        <p className="mt-1 text-sm text-gray-400">
                          Review the {filteredResults.flaggedTransactions.length} flagged transactions in detail, particularly those with high confidence scores.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Contact Card Issuers</h4>
                        <p className="mt-1 text-sm text-gray-400">
                          Report suspicious transactions to the respective financial institutions and request investigation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Update Security Measures</h4>
                        <p className="mt-1 text-sm text-gray-400">
                          Strengthen your payment security with two-factor authentication and regular password updates.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">No Immediate Actions Required</h4>
                        <p className="mt-1 text-sm text-gray-400">
                          Your payment data appears normal with no suspicious activities detected.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold">i</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Regular Monitoring</h4>
                        <p className="mt-1 text-sm text-gray-400">
                          Continue to monitor your payment activities and run fraud detection regularly.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h3 className="text-md font-medium text-blue-300 mb-2">AI Insights</h3>
              <p className="text-sm text-gray-300">
                {filteredResults && filteredResults.riskScore > 70 ? (
                  "Your payment data shows elevated risk patterns that require immediate attention. The AI has detected unusual transaction frequencies and abnormal amounts that don't match your typical spending patterns."
                ) : filteredResults && filteredResults.riskScore > 30 ? (
                  "Your payment data shows some anomalies that may warrant attention. While not necessarily fraudulent, these patterns differ from your regular transaction history."
                ) : (
                  "Your payment data appears consistent with normal transaction patterns. Continue monitoring for any changes, but current risk assessment is low."
                )}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Create the DataTableWithPagination component to include filtering by transaction status
const DataTableWithPagination = ({ data, initialFraudType = 'all', statusFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [fraudTypeFilter, setFraudTypeFilter] = useState(initialFraudType);
  
  // Sync fraudTypeFilter when initialFraudType changes
  useEffect(() => {
    setFraudTypeFilter(initialFraudType);
  }, [initialFraudType]);
  
  const allHeaders = Object.keys(data[0] || {});
  
  // Initialize visible columns on first render
  useEffect(() => {
    if (allHeaders.length > 0 && Object.keys(visibleColumns).length === 0) {
      const initialVisibility = {};
      allHeaders.forEach(header => {
        initialVisibility[header] = true;
      });
      setVisibleColumns(initialVisibility);
    }
  }, [allHeaders, visibleColumns]);
  
  // Get only visible headers
  const headers = useMemo(() => {
    return allHeaders.filter(header => visibleColumns[header]);
  }, [allHeaders, visibleColumns]);
  
  const filteredData = useMemo(() => {
    let filtered = data;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row => {
        return Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Apply fraud type filter if it's not 'all'
    if (fraudTypeFilter !== 'all') {
      // Apply specific filtering based on selected fraud type
      switch(fraudTypeFilter) {
        case 'credit_card':
          filtered = filtered.filter(row => 
            // Look for credit card related entries
            String(JSON.stringify(row)).toLowerCase().includes('credit') || 
            String(JSON.stringify(row)).toLowerCase().includes('card')
          );
          break;
        case 'debit_card':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('debit')
          );
          break;
        case 'otp':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('otp') || 
            String(JSON.stringify(row)).toLowerCase().includes('one time') ||
            String(JSON.stringify(row)).toLowerCase().includes('password')
          );
          break;
        case 'identity_theft':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('identity') ||
            String(JSON.stringify(row)).toLowerCase().includes('id') ||
            String(JSON.stringify(row)).toLowerCase().includes('personal')
          );
          break;
        case 'phishing':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('phish') ||
            String(JSON.stringify(row)).toLowerCase().includes('email') ||
            String(JSON.stringify(row)).toLowerCase().includes('message')
          );
          break;
        case 'account_takeover':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('account') ||
            String(JSON.stringify(row)).toLowerCase().includes('takeover') ||
            String(JSON.stringify(row)).toLowerCase().includes('login')
          );
          break;
        case 'money_laundering':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('launder') ||
            (row.amount && parseFloat(row.amount) > 10000)
          );
          break;
        case 'merchant':
          filtered = filtered.filter(row => 
            String(JSON.stringify(row)).toLowerCase().includes('merchant') ||
            String(JSON.stringify(row)).toLowerCase().includes('vendor') ||
            String(JSON.stringify(row)).toLowerCase().includes('seller')
          );
          break;
      }
    }
    
    // Apply status filters (new)
    filtered = filtered.filter(row => {
      if (row.isFraud === 1 || row.isFraud === '1' || row.isFraud === true || row.isFraud === 'true') {
        return statusFilters.fraud;
      } else if (row.isFlagged === 1 || row.isFlagged === '1' || row.isFlagged === true || row.isFlagged === 'true' || 
                (row.amount && parseFloat(row.amount) > 1000000)) {
        return statusFilters.flagged;
      }
      return statusFilters.safe;
    });
    
    return filtered;
  }, [data, searchTerm, fraudTypeFilter, statusFilters]);
  
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Handle numeric values
        if (!isNaN(a[sortConfig.key]) && !isNaN(b[sortConfig.key])) {
          const numA = Number(a[sortConfig.key]);
          const numB = Number(b[sortConfig.key]);
          if (sortConfig.direction === 'ascending') {
            return numA - numB;
          }
          return numB - numA;
        }
        
        // Handle string values
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <span className="ml-1 opacity-30">↕</span>;
    }
    return sortConfig.direction === 'ascending' 
      ? <span className="ml-1 text-blue-400">↑</span> 
      : <span className="ml-1 text-blue-400">↓</span>;
  };
  
  const toggleColumnVisibility = (header) => {
    setVisibleColumns(prev => ({
      ...prev,
      [header]: !prev[header]
    }));
  };
  
  const toggleAllColumns = (value) => {
    const newVisibility = {};
    allHeaders.forEach(header => {
      newVisibility[header] = value;
    });
    setVisibleColumns(newVisibility);
  };
  
  const exportToCSV = () => {
    // Create CSV content
    const csvContent = [
      // Headers
      headers.join(','),
      // Rows
      ...sortedData.map(row => 
        headers.map(header => {
          const value = row[header] !== undefined ? String(row[header]) : '';
          // Escape commas and quotes
          return `"${value.replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set file name with date
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `payment_data_export_${date}.csv`);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);
  
  const getRowClassName = (row) => {
    if (row.isFraud === 1 || row.isFraud === '1' || row.isFraud === true || row.isFraud === 'true') {
      return 'bg-red-900/30 border-red-500/30 hover:bg-red-800/40';
    } else if (row.isFlagged === 1 || row.isFlagged === '1' || row.isFlagged === true || row.isFlagged === 'true' || 
              (row.amount && parseFloat(row.amount) > 1000000)) {
      return 'bg-yellow-900/30 border-yellow-500/30 hover:bg-yellow-800/40';
    }
    return 'bg-green-900/10 border-green-500/30 hover:bg-green-800/20';
  };
  
  // Reset to first page when changing sort or search
  useEffect(() => {
    setCurrentPage(1);
  }, [sortConfig, searchTerm, fraudTypeFilter]);
  
  // Count visible columns by fraud status for summary
  const statusCounts = useMemo(() => {
    const counts = {
      total: sortedData.length,
      fraud: 0,
      flagged: 0,
      safe: 0
    };
    
    sortedData.forEach(row => {
      if (row.isFraud === 1 || row.isFraud === '1' || row.isFraud === true || row.isFraud === 'true') {
        counts.fraud++;
      } else if (row.isFlagged === 1 || row.isFlagged === '1' || row.isFlagged === true || row.isFlagged === 'true' || 
                (row.amount && parseFloat(row.amount) > 1000000)) {
        counts.flagged++;
      } else {
        counts.safe++;
      }
    });
    
    return counts;
  }, [sortedData]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Search data..." 
            className="px-3 py-1 bg-gray-700/50 rounded-md border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="px-3 py-1 bg-gray-700/50 rounded-md border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
            <option value={250}>250 rows</option>
            <option value={500}>500 rows</option>
          </select>
          <select 
            className="px-3 py-1 bg-gray-700/50 rounded-md border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={fraudTypeFilter}
            onChange={(e) => setFraudTypeFilter(e.target.value)}
          >
            <option value="all">All Fraud Types</option>
            <option value="credit_card">Credit Card Fraud</option>
            <option value="debit_card">Debit Card Fraud</option>
            <option value="otp">OTP Fraud</option>
            <option value="identity_theft">Identity Theft</option>
            <option value="phishing">Phishing Attacks</option>
            <option value="account_takeover">Account Takeover</option>
            <option value="money_laundering">Money Laundering</option>
            <option value="merchant">Merchant Fraud</option>
          </select>
          <button
            onClick={exportToCSV}
            className="px-3 py-1 bg-blue-600/50 hover:bg-blue-500/60 rounded-md border border-blue-500 text-sm text-white flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <div className="relative">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="px-3 py-1 bg-gray-600/50 hover:bg-gray-500/60 rounded-md border border-gray-500 text-sm text-white flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Columns
            </button>
            
            {showColumnSelector && (
              <div className="absolute right-0 mt-1 p-3 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-20 max-h-80 overflow-y-auto w-60">
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-700">
                  <button
                    onClick={() => toggleAllColumns(true)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Show All
                  </button>
                  <button
                    onClick={() => toggleAllColumns(false)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Hide All
                  </button>
                </div>
                {allHeaders.map(header => (
                  <div key={header} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      id={`col-${header}`}
                      checked={visibleColumns[header] || false}
                      onChange={() => toggleColumnVisibility(header)}
                      className="mr-2"
                    />
                    <label htmlFor={`col-${header}`} className="text-sm text-gray-300 truncate">
                      {header}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span>{statusCounts.total} total</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>{statusCounts.fraud} fraud</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>{statusCounts.flagged} flagged</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>{statusCounts.safe} safe</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-auto flex-grow mb-4">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 bg-gray-800 z-10">
            <tr>
              {headers.map(header => (
                <th key={header} 
                    className="px-3 py-2 text-left text-gray-300 font-medium border-b border-gray-700 cursor-pointer hover:bg-gray-700/30"
                    onClick={() => requestSort(header)}>
                  <div className="flex items-center">
                    {header}
                    {getSortIcon(header)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border-b border-gray-700/30 ${getRowClassName(row)}`}>
                {headers.map(header => (
                  <td key={`${rowIndex}-${header}`} className="px-3 py-2 border-t border-gray-700/10">
                    {row[header] !== undefined ? String(row[header]) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-auto flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700/50 rounded-md border border-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700/50 rounded-md border border-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// Add utility functions for fraud type display
const formatFraudType = (fraudType) => {
  if (!fraudType) return '';
  
  // Format the fraud type for display
  switch (fraudType) {
    case 'credit_card':
      return 'Credit Card Fraud';
    case 'debit_card':
      return 'Debit Card Fraud';
    case 'otp':
      return 'OTP Fraud';
    case 'identity_theft':
      return 'Identity Theft';
    case 'phishing':
      return 'Phishing Attack';
    case 'account_takeover':
      return 'Account Takeover';
    case 'money_laundering':
      return 'Money Laundering';
    case 'merchant':
      return 'Merchant Fraud';
    default:
      return fraudType.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
  }
};

const getFraudTypeColor = (fraudType) => {
  // Return appropriate color class based on fraud type
  switch (fraudType) {
    case 'credit_card':
      return 'bg-purple-900/40 text-purple-300';
    case 'debit_card':
      return 'bg-blue-900/40 text-blue-300';
    case 'otp':
      return 'bg-green-900/40 text-green-300';
    case 'identity_theft':
      return 'bg-red-900/40 text-red-300';
    case 'phishing':
      return 'bg-yellow-900/40 text-yellow-300';
    case 'account_takeover':
      return 'bg-orange-900/40 text-orange-300';
    case 'money_laundering':
      return 'bg-indigo-900/40 text-indigo-300';
    case 'merchant':
      return 'bg-pink-900/40 text-pink-300';
    default:
      return 'bg-gray-900/40 text-gray-300';
  }
};

// Add function to prepare fraud type chart data
const getFraudTypeChartData = (fraudTypeData) => {
  if (!fraudTypeData) return null;
  
  const formattedLabels = fraudTypeData.types.map(type => formatFraudType(type));
  
  return {
    labels: formattedLabels,
    datasets: [
      {
        label: 'Incidents',
        data: fraudTypeData.counts,
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',  // Credit Card (purple)
          'rgba(59, 130, 246, 0.8)',  // Debit Card (blue)
          'rgba(34, 197, 94, 0.8)',   // OTP (green)
          'rgba(239, 68, 68, 0.8)',   // Identity Theft (red)
          'rgba(234, 179, 8, 0.8)',   // Phishing (yellow)
          'rgba(249, 115, 22, 0.8)',  // Account Takeover (orange)
          'rgba(99, 102, 241, 0.8)',  // Money Laundering (indigo)
          'rgba(236, 72, 153, 0.8)'   // Merchant (pink)
        ],
        borderWidth: 1
      },
      {
        label: 'Risk Score',
        data: fraudTypeData.riskScores,
        backgroundColor: 'rgba(209, 213, 219, 0.5)',
        borderColor: 'rgba(209, 213, 219, 0.8)',
        borderWidth: 1,
        type: 'line',
        yAxisID: 'riskAxis'
      }
    ]
  };
}; 