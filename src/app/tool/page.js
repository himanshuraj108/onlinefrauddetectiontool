'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadSection from './components/UploadSection';
import AnalyticsSection from './components/AnalyticsSection';
import ChatBot from './components/ChatBot';
import NotificationPopup from './components/NotificationPopup';

export default function FraudDetectionTool() {
  const [csvData, setCsvData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Show welcome notification on initial load
    setTimeout(() => {
      setNotificationMessage('Welcome to the Advanced Payment Fraud Detection Tool! Be vigilant about online payment fraud.');
      setShowNotification(true);
    }, 2000);
  }, []);

  const handleError = (error) => {
    console.error("Error during processing:", error);
    setNotification({
      message: `Error: ${error.message || 'An error occurred during file processing'}`,
      type: 'error'
    });
    setIsLoading(false);
    setProgress(0);
  };

  const handleFileUpload = async (data) => {
    setCsvData(data);
    setIsLoading(true);
    
    try {
      // For large datasets, we'll use a progressive analysis approach
      // First determine if dataset is large (over 10,000 rows)
      const isLargeDataset = data.length > 10000;
      
      if (isLargeDataset) {
        // For large datasets, we'll analyze in chunks with timeouts to avoid blocking the UI
        analyzeInChunks(data);
      } else {
        // For smaller datasets, analyze all at once
        // Simulate AI analysis with setTimeout
        setTimeout(() => {
          const mockResult = generateMockAnalysis(data);
          setAnalysisResults(mockResult);
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error analyzing data:', error);
      setIsLoading(false);
      setNotificationMessage('Error analyzing data. Please try again.');
      setShowNotification(true);
    }
  };

  // Function to analyze data in chunks for large datasets
  const analyzeInChunks = (data) => {
    // Determine optimal chunk size based on data size
    const totalRows = data.length;
    const chunkSize = totalRows > 100000 ? 10000 : 5000;
    const chunks = Math.ceil(totalRows / chunkSize);
    
    // Extract headers from first row
    const columns = Object.keys(data[0] || {});
    console.log("Processing CSV with columns:", columns);
    
    // Detect which columns might contain relevant information
    const amountColumn = findColumn(columns, ['amount', 'sum', 'total', 'price', 'cost', 'value']);
    const idColumn = findColumn(columns, ['id', 'transaction', 'txn', 'number']);
    const typeColumn = findColumn(columns, ['type', 'category', 'transaction_type']);
    const dateColumn = findColumn(columns, ['date', 'time', 'timestamp']);
    
    console.log("Identified key columns:", { amountColumn, idColumn, typeColumn, dateColumn });
    
    let processedChunks = 0;
    let fraudulent = 0;
    let suspicious = 0;
    
    // Sample transactions for detailed display (max 500)
    const transactionSample = [];
    
    // Create accumulated fraud type data
    const fraudTypes = [
      'credit_card', 
      'debit_card', 
      'otp', 
      'identity_theft', 
      'phishing',
      'account_takeover',
      'money_laundering',
      'merchant'
    ];
    
    // Create accumulator for fraud type counts
    const fraudTypeCounts = {};
    fraudTypes.forEach(type => {
      fraudTypeCounts[type] = {
        count: 0,
        riskScore: Math.floor(Math.random() * 100)
      };
    });
    
    // Create arrays for tracking fraud/flagged rows
    const fraudRowIds = [];
    const flaggedRowIds = [];
    
    // Keep all processed data for the data table
    const allProcessedData = [];
    
    // Process first chunk immediately to show quick results
    processChunk(0);
    
    function processChunk(chunkIndex) {
      setTimeout(() => {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, totalRows);
        const chunk = data.slice(start, end);
        
        // Process this chunk of data and identify suspicious patterns
        const chunkResults = analyzeChunk(chunk, start);
        fraudulent += chunkResults.fraudCount;
        suspicious += chunkResults.suspiciousCount;
        
        // Add identified fraud and flagged rows to our trackers
        fraudRowIds.push(...chunkResults.fraudRowIds);
        flaggedRowIds.push(...chunkResults.flaggedRowIds);
        
        // Add processed data from this chunk
        allProcessedData.push(...chunkResults.processedRows);
        
        // Add sample transactions (up to 500 total)
        if (transactionSample.length < 500) {
          transactionSample.push(...chunkResults.flaggedTransactions.slice(0, 500 - transactionSample.length));
        }
        
        // Update fraud type counts
        chunkResults.fraudTypeDistribution.forEach(item => {
          fraudTypeCounts[item.type].count += item.count;
        });
        
        processedChunks++;
        
        // Update progress for the UI
        const progress = Math.round((processedChunks / chunks) * 100);
        console.log(`Analyzed chunk ${processedChunks}/${chunks} (${progress}% complete)`);
        
        // If all chunks processed, finalize results
        if (processedChunks >= chunks) {
          finalizeResults();
        } else {
          // Process next chunk
          processChunk(chunkIndex + 1);
        }
      }, 10); // Small delay to prevent UI freezing
    }
    
    function analyzeChunk(chunk, startIndex) {
      // Analyze this chunk for fraud indicators using real analysis instead of random
      const chunkFraudRowIds = [];
      const chunkFlaggedRowIds = [];
      const flaggedTransactions = [];
      
      // Fraud type counters
      const fraudTypeDistribution = fraudTypes.map(type => ({
        type,
        count: 0
      }));
      
      // Process each row and look for fraud indicators
      const processedRows = chunk.map((row, index) => {
        const rowIndex = startIndex + index;
        
        // Initialize fraud indicators if not present
        let isFraud = false;
        let isFlagged = false;
        let fraudType = null;
        
        // Check for existing fraud indicators
        if (row.isFraud === '1' || row.isFraud === 1 || row.isFraud === true || row.isFraud === 'true') {
          isFraud = true;
        } else if (row.fraud === '1' || row.fraud === 1 || row.fraud === true || row.fraud === 'true') {
          isFraud = true;
        } else if (row.isFlaggedFraud === '1' || row.isFlaggedFraud === 1 || 
                  row.isFlaggedFraud === true || row.isFlaggedFraud === 'true') {
          isFlagged = true;
        }
        
        // Perform additional analysis based on the row data
        // 1. Check for large amounts
        if (amountColumn && row[amountColumn]) {
          const amount = parseFloat(row[amountColumn]);
          if (!isNaN(amount)) {
            if (amount > 10000) {
              isFlagged = true;
              fraudType = 'money_laundering';
            } else if (amount > 5000) {
              isFlagged = true;
            }
          }
        }
        
        // 2. Look for specific keywords
        const rowText = JSON.stringify(row).toLowerCase();
        if (rowText.includes('fraud')) {
          isFraud = true;
        } else if (rowText.includes('suspicious') || rowText.includes('suspect')) {
          isFlagged = true;
        }
        
        // 3. Determine fraud type if not set
        if ((isFraud || isFlagged) && !fraudType) {
          if (rowText.includes('credit') && rowText.includes('card')) {
            fraudType = 'credit_card';
          } else if (rowText.includes('debit')) {
            fraudType = 'debit_card';
          } else if (rowText.includes('otp') || rowText.includes('password')) {
            fraudType = 'otp';
          } else if (rowText.includes('identity')) {
            fraudType = 'identity_theft';
          } else if (rowText.includes('phish') || rowText.includes('email')) {
            fraudType = 'phishing';
          } else if (rowText.includes('account')) {
            fraudType = 'account_takeover';
          } else if (rowText.includes('merchant') || rowText.includes('seller')) {
            fraudType = 'merchant';
          } else {
            // Only assign a random fraud type as a last resort
            fraudType = fraudTypes[Math.floor(Math.random() * fraudTypes.length)];
          }
        }
        
        // Track fraud and suspicious rows
        if (isFraud) {
          chunkFraudRowIds.push(row.id || rowIndex.toString());
          
          // Update fraud type distribution
          const typeIndex = fraudTypes.indexOf(fraudType);
          if (typeIndex >= 0) {
            fraudTypeDistribution[typeIndex].count++;
          }
          
          // Create flagged transaction entry
          const txId = row.id || (idColumn ? row[idColumn] : `ROW-${rowIndex}`);
          const txAmount = amountColumn ? parseFloat(row[amountColumn]) || 0 : 0;
          const txDate = dateColumn ? row[dateColumn] : new Date().toISOString();
          const txType = typeColumn ? row[typeColumn] : '';
          
          flaggedTransactions.push({
            id: txId,
            amount: txAmount,
            timestamp: txDate,
            transactionType: txType,
            reason: `Suspicious ${fraudType || 'activity'} detected`,
            confidence: Math.floor(Math.random() * 40) + 60, // Higher confidence for actual fraud
            fraudType
          });
        } else if (isFlagged) {
          chunkFlaggedRowIds.push(row.id || rowIndex.toString());
          
          // Sometimes add flagged transactions to the list as well
          if (Math.random() > 0.7) {
            const txId = row.id || (idColumn ? row[idColumn] : `ROW-${rowIndex}`);
            const txAmount = amountColumn ? parseFloat(row[amountColumn]) || 0 : 0;
            const txDate = dateColumn ? row[dateColumn] : new Date().toISOString();
            const txType = typeColumn ? row[typeColumn] : '';
            
            flaggedTransactions.push({
              id: txId,
              amount: txAmount,
              timestamp: txDate,
              transactionType: txType,
              reason: 'Unusual pattern',
              confidence: Math.floor(Math.random() * 30) + 30, // Medium confidence
              fraudType: fraudType || fraudTypes[Math.floor(Math.random() * fraudTypes.length)]
            });
          }
        }
        
        // Return the processed row with added fraud indicators
        return {
          ...row,
          // Only add these if they don't exist already
          isFraud: row.hasOwnProperty('isFraud') ? row.isFraud : isFraud,
          isFlaggedFraud: row.hasOwnProperty('isFlaggedFraud') ? row.isFlaggedFraud : isFlagged,
          fraudType: row.hasOwnProperty('fraudType') ? row.fraudType : (isFraud || isFlagged) ? fraudType : null
        };
      });
      
      return {
        fraudCount: chunkFraudRowIds.length,
        suspiciousCount: chunkFlaggedRowIds.length,
        fraudRowIds: chunkFraudRowIds,
        flaggedRowIds: chunkFlaggedRowIds,
        fraudTypeDistribution,
        flaggedTransactions,
        processedRows
      };
    }
    
    function finalizeResults() {
      const safe = totalRows - fraudulent - suspicious;
      
      // Process all data to include fraud markers if they don't exist
      console.log(`Finalizing results with ${fraudulent} fraudulent and ${suspicious} suspicious transactions`);
      
      // Generate time series from real data if available
      const timeSeriesData = generateTimeSeriesFromRealData(data);
      
      // Generate transaction categories from real data
      const categories = generateCategoriesFromRealData(data);
      
      // Prepare fraud type data
      const fraudTypeData = {
        types: fraudTypes,
        counts: fraudTypes.map(type => fraudTypeCounts[type].count),
        riskScores: fraudTypes.map(type => fraudTypeCounts[type].riskScore)
      };
      
      // Calculate risk score based on fraud percentage
      const riskScore = Math.min(
        Math.round((fraudulent * 100 + suspicious * 30) / Math.max(totalRows, 1)),
        100
      );
      
      // Complete results and update state
      const results = {
        summary: {
          total: totalRows,
          fraudulent,
          suspicious,
          safe
        },
        timeSeriesData,
        categories,
        riskScore,
        flaggedTransactions: transactionSample,
        rawData: allProcessedData,
        fraudTypeData
      };
      
      setAnalysisResults(results);
      setIsLoading(false);
      
      // Store a reduced version of results in localStorage for the dashboard to access
      try {
        // Create a smaller version without the large rawData array
        const dashboardData = {
          summary: results.summary,
          timeSeriesData: results.timeSeriesData.slice(0, 12), // Limit time series to 12 periods
          categories: results.categories.slice(0, 5), // Limit to top 5 categories
          riskScore: results.riskScore,
          // Only include a small sample of flagged transactions
          flaggedTransactions: results.flaggedTransactions.slice(0, 10),
          // Include only basic fraud type data
          fraudTypeData: {
            types: results.fraudTypeData.types.slice(0, 5),
            counts: results.fraudTypeData.counts.slice(0, 5),
            riskScores: results.fraudTypeData.riskScores.slice(0, 5)
          }
        };
        
        localStorage.setItem('fraudAnalysisResults', JSON.stringify(dashboardData));
      } catch (error) {
        console.error('Error storing analysis results:', error);
        
        // If the first attempt fails, try with an even smaller dataset
        try {
          const minimalData = {
            summary: results.summary,
            riskScore: results.riskScore
          };
          localStorage.setItem('fraudAnalysisResults', JSON.stringify(minimalData));
          console.log('Stored minimal analysis results due to size constraints');
        } catch (innerError) {
          console.error('Failed to store even minimal results in localStorage:', innerError);
        }
      }
      
      // Show completion notification
      setNotificationMessage(`Analysis of ${totalRows.toLocaleString()} transactions complete.`);
      setShowNotification(true);
    }
  };

  const generateMockAnalysis = (data) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockResults = {
        summary: {
          total: 1000,
          fraud: 24,
          suspicious: 36,
        },
        timeSeriesData: [
          { date: '2023-01', fraud: 8, suspicious: 12 },
          { date: '2023-02', fraud: 5, suspicious: 10 },
          { date: '2023-03', fraud: 11, suspicious: 14 },
        ],
        categories: {
          'Identity Theft': 12,
          'Account Takeover': 8,
          'Payment Fraud': 15,
          'Phishing Attack': 5,
          'Other': 20,
        },
        riskScore: 38,
        flaggedTransactions: Array(20).fill().map((_, i) => ({
          id: `TX${1000 + i}`,
          date: new Date(2023, i % 12, i + 1).toISOString().split('T')[0],
          amount: (Math.random() * 1000).toFixed(2),
          merchant: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'PayPal'][i % 5],
          isFraud: i < 5,
          isFlagged: i < 15,
          riskScore: Math.floor(Math.random() * 100),
        })),
        rawData: Array(1000).fill().map((_, i) => ({
          id: `TX${i}`,
          date: new Date(2023, i % 12, i % 28 + 1).toISOString().split('T')[0],
          amount: (Math.random() * 1000).toFixed(2),
          merchant: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'PayPal'][i % 5],
          isFraud: i < 24,
          isFlagged: i < 60,
          riskScore: Math.floor(Math.random() * 100),
        })),
      };

      // Store only the dashboard data in localStorage
      try {
        // Create a reduced version for the dashboard
        const dashboardData = {
          summary: mockResults.summary,
          timeSeriesData: mockResults.timeSeriesData.slice(0, 12), // Limit time series to 12 periods
          categories: mockResults.categories,
          riskScore: mockResults.riskScore,
          flaggedTransactions: mockResults.flaggedTransactions.slice(0, 10) // Limit to 10 transactions
        };
        localStorage.setItem('fraudAnalysisResults', JSON.stringify(dashboardData));
      } catch (error) {
        console.error('Failed to store mock results in localStorage:', error);
        
        // If the first attempt fails, try with an even smaller dataset
        try {
          const minimalData = {
            summary: mockResults.summary,
            riskScore: mockResults.riskScore
          };
          localStorage.setItem('fraudAnalysisResults', JSON.stringify(minimalData));
          console.log('Stored minimal mock results due to size constraints');
        } catch (innerError) {
          console.error('Failed to store even minimal mock results in localStorage:', innerError);
        }
      }

      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  // New function to analyze real data for fraud indicators
  const analyzeRealData = (data) => {
    const fraudTypes = [
      'credit_card', 
      'debit_card', 
      'otp', 
      'identity_theft', 
      'phishing',
      'account_takeover',
      'money_laundering',
      'merchant'
    ];
    
    // Get column names from the data
    const columns = Object.keys(data[0] || {});
    
    // Detect which columns might contain relevant information
    const amountColumn = findColumn(columns, ['amount', 'sum', 'total', 'price', 'cost', 'value']);
    const idColumn = findColumn(columns, ['id', 'transaction', 'txn', 'number']);
    const typeColumn = findColumn(columns, ['type', 'category', 'transaction_type']);
    const dateColumn = findColumn(columns, ['date', 'time', 'timestamp']);
    
    console.log("Identified columns:", { amountColumn, idColumn, typeColumn, dateColumn });
    
    // Lists to track fraud and flagged rows
    const fraudRowIds = [];
    const flaggedRowIds = [];
    const flaggedTransactions = [];
    
    // Counters
    let fraudCount = 0;
    let suspiciousCount = 0;
    
    // Fraud type distribution
    const fraudTypeDistribution = fraudTypes.map(type => ({
      type,
      count: 0,
      riskScore: Math.floor(Math.random() * 100)
    }));
    
    // Analyze each row for fraud indicators
    data.forEach((row, index) => {
      // Determine if a row looks suspicious based on actual data
      let isFraud = false;
      let isFlagged = false;
      let fraudType = null;
      
      // 1. Check if there's existing fraud indicators in the data
      if (row.isFraud === '1' || row.isFraud === 1 || row.isFraud === true || row.isFraud === 'true') {
        isFraud = true;
      } else if (row.fraud === '1' || row.fraud === 1 || row.fraud === true || row.fraud === 'true') {
        isFraud = true;
      } else if (row.isFlaggedFraud === '1' || row.isFlaggedFraud === 1 || 
                row.isFlaggedFraud === true || row.isFlaggedFraud === 'true') {
        isFlagged = true;
      }
      
      // 2. Check amount-based anomalies if amount column exists
      if (amountColumn && row[amountColumn]) {
        const amount = parseFloat(row[amountColumn]);
        if (!isNaN(amount)) {
          if (amount > 10000) {
            // Very high amount transactions are suspicious (potential money laundering)
            isFlagged = true;
            fraudType = 'money_laundering';
          } else if (amount > 5000) {
            // High value transactions are worth flagging
            isFlagged = true;
          }
        }
      }
      
      // 3. Look for specific patterns in other columns
      const rowText = JSON.stringify(row).toLowerCase();
      if (rowText.includes('fraud')) {
        isFraud = true;
      } else if (rowText.includes('suspicious') || rowText.includes('suspect')) {
        isFlagged = true;
      }
      
      // 4. Infer fraud type from data if not set
      if ((isFraud || isFlagged) && !fraudType) {
        if (rowText.includes('credit') && rowText.includes('card')) {
          fraudType = 'credit_card';
        } else if (rowText.includes('debit')) {
          fraudType = 'debit_card';
        } else if (rowText.includes('otp') || rowText.includes('password')) {
          fraudType = 'otp';
        } else if (rowText.includes('identity')) {
          fraudType = 'identity_theft';
        } else if (rowText.includes('phish') || rowText.includes('email')) {
          fraudType = 'phishing';
        } else if (rowText.includes('account')) {
          fraudType = 'account_takeover';
        } else if (rowText.includes('merchant') || rowText.includes('seller')) {
          fraudType = 'merchant';
        } else {
          // Assign a random fraud type if we can't determine one
          fraudType = fraudTypes[Math.floor(Math.random() * fraudTypes.length)];
        }
      }
      
      // Track fraud and flagged transactions
      if (isFraud) {
        fraudCount++;
        fraudRowIds.push(row.id || index.toString());
        
        // Update fraud type distribution
        const typeIndex = fraudTypes.indexOf(fraudType);
        if (typeIndex >= 0) {
          fraudTypeDistribution[typeIndex].count++;
        }
        
        // Create flagged transaction entry
        const txId = row.id || idColumn ? row[idColumn] : `ROW-${index}`;
        const txAmount = amountColumn ? parseFloat(row[amountColumn]) || 0 : 0;
        const txDate = dateColumn ? row[dateColumn] : new Date().toISOString();
        const txType = typeColumn ? row[typeColumn] : '';
        
        flaggedTransactions.push({
          id: txId,
          amount: txAmount,
          timestamp: txDate,
          transactionType: txType,
          reason: `Suspicious ${fraudType || 'activity'} detected`,
          confidence: Math.floor(Math.random() * 40) + 60, // Higher confidence for actual fraud
          fraudType
        });
      } else if (isFlagged) {
        suspiciousCount++;
        flaggedRowIds.push(row.id || index.toString());
        
        // Sometimes add flagged transactions to the list as well (50% chance)
        if (Math.random() > 0.5) {
          const txId = row.id || idColumn ? row[idColumn] : `ROW-${index}`;
          const txAmount = amountColumn ? parseFloat(row[amountColumn]) || 0 : 0;
          const txDate = dateColumn ? row[dateColumn] : new Date().toISOString();
          const txType = typeColumn ? row[typeColumn] : '';
          
          flaggedTransactions.push({
            id: txId,
            amount: txAmount,
            timestamp: txDate,
            transactionType: txType,
            reason: 'Unusual pattern',
            confidence: Math.floor(Math.random() * 30) + 30, // Medium confidence
            fraudType: fraudType || fraudTypes[Math.floor(Math.random() * fraudTypes.length)]
          });
        }
      }
    });
    
    // Calculate risk score based on percentage of fraud/flagged transactions
    const riskScore = Math.min(
      Math.round((fraudCount * 100 + suspiciousCount * 30) / Math.max(data.length, 1)),
      100
    );
    
    return {
      fraudCount,
      suspiciousCount,
      fraudRowIds,
      flaggedRowIds,
      riskScore,
      flaggedTransactions,
      fraudTypeData: {
        types: fraudTypes,
        counts: fraudTypeDistribution.map(d => d.count),
        riskScores: fraudTypeDistribution.map(d => d.riskScore)
      }
    };
  };

  // Helper function to find a column matching any of the provided keywords
  const findColumn = (columns, keywords) => {
    for (const keyword of keywords) {
      const matchingColumn = columns.find(col => 
        col.toLowerCase().includes(keyword.toLowerCase())
      );
      if (matchingColumn) return matchingColumn;
    }
    return null;
  };

  // Generate time series data based on actual timestamps if available
  const generateTimeSeriesFromRealData = (data) => {
    // Try to find a date/time column
    const columns = Object.keys(data[0] || {});
    const dateColumn = findColumn(columns, ['date', 'time', 'timestamp', 'created', 'modified']);
    
    if (dateColumn && data.some(row => row[dateColumn])) {
      // Create monthly buckets
      const monthBuckets = {}; 
      let earliestMonth = new Date();
      
      // Group transactions by month
      data.forEach(row => {
        try {
          if (row[dateColumn]) {
            const date = new Date(row[dateColumn]);
            if (!isNaN(date.getTime())) {
              const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
              if (!monthBuckets[monthKey]) {
                monthBuckets[monthKey] = { 
                  month: date.getMonth() + 1,
                  year: date.getFullYear(),
                  totalTransactions: 0,
                  fraudAttempts: 0
                };
              }
              
              monthBuckets[monthKey].totalTransactions++;
              
              // Count fraud attempts
              if (row.isFraud === '1' || row.isFraud === 1 || 
                  row.isFraud === true || row.isFraud === 'true') {
                monthBuckets[monthKey].fraudAttempts++;
              }
              
              // Track earliest month
              if (date < earliestMonth) {
                earliestMonth = date;
              }
            }
          }
        } catch (e) {
          // Skip invalid dates
        }
      });
      
      // Convert buckets to array sorted by date
      const timeData = Object.values(monthBuckets).sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });
      
      // If we have meaningful time data, return it
      if (timeData.length > 0) {
        return timeData.map(d => ({
          month: d.month,
          year: d.year,
          monthLabel: `${d.month}/${d.year}`,
          totalTransactions: d.totalTransactions,
          fraudAttempts: d.fraudAttempts
        }));
      }
    }
    
    // Fallback: Create a simple 12-month period with relative fraud counts
    const fraudCount = data.filter(row => 
      row.isFraud === '1' || row.isFraud === 1 || 
      row.isFraud === true || row.isFraud === 'true'
    ).length;
    
    return Array(12).fill().map((_, i) => {
      const totalTxInMonth = Math.floor(data.length / 12) + Math.floor(Math.random() * 10);
      const fraudInMonth = Math.floor(fraudCount / 12) + Math.floor(Math.random() * 3);
      
      return {
        month: i + 1,
        totalTransactions: totalTxInMonth,
        fraudAttempts: Math.min(fraudInMonth, totalTxInMonth)
      };
    });
  };

  // Generate categories based on type columns if available
  const generateCategoriesFromRealData = (data) => {
    // Try to find a category/type column
    const columns = Object.keys(data[0] || {});
    const typeColumn = findColumn(columns, ['type', 'category', 'transaction_type', 'trans_type']);
    
    if (typeColumn && data.some(row => row[typeColumn])) {
      // Count by category type
      const categoryCounts = {};
      
      data.forEach(row => {
        if (row[typeColumn]) {
          const category = String(row[typeColumn]).trim();
          if (category) {
            if (!categoryCounts[category]) {
              categoryCounts[category] = 0;
            }
            categoryCounts[category]++;
          }
        }
      });
      
      // Convert to array and take top 5 categories
      const categories = Object.entries(categoryCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      
      if (categories.length > 0) {
        return categories;
      }
    }
    
    // Fallback: Detect possible categories from other columns
    const possibleCategories = {
      'Online Shopping': 0,
      'Travel': 0,
      'Entertainment': 0,
      'Bills & Utilities': 0,
      'Transfers': 0,
      'Other': 0
    };
    
    // Look for keywords in each row
    data.forEach(row => {
      const rowText = JSON.stringify(row).toLowerCase();
      
      if (rowText.includes('shop') || rowText.includes('purchase') || rowText.includes('buy')) {
        possibleCategories['Online Shopping']++;
      } else if (rowText.includes('travel') || rowText.includes('flight') || rowText.includes('hotel')) {
        possibleCategories['Travel']++;
      } else if (rowText.includes('movie') || rowText.includes('game') || rowText.includes('entertainment')) {
        possibleCategories['Entertainment']++;
      } else if (rowText.includes('bill') || rowText.includes('utility') || rowText.includes('payment')) {
        possibleCategories['Bills & Utilities']++;
      } else if (rowText.includes('transfer') || rowText.includes('send') || rowText.includes('receive')) {
        possibleCategories['Transfers']++;
      } else {
        possibleCategories['Other']++;
      }
    });
    
    // Convert to array format and filter out zero counts
    return Object.entries(possibleCategories)
      .map(([name, value]) => ({ name, value }))
      .filter(category => category.value > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Advanced Payment Fraud Detection Tool
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UploadSection 
              onUpload={handleFileUpload} 
              onError={handleError}
              isLoading={isLoading} 
            />
          </div>
          
          <div className="lg:col-span-2">
            <AnalyticsSection results={analysisResults} isLoading={isLoading} />
          </div>
        </div>
      </main>
      
      <ChatBot />
      <Footer />
      
      {showNotification && (
        <NotificationPopup 
          message={notificationMessage} 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </div>
  );
} 