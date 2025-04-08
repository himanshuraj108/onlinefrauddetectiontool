'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  FileText, 
  Database, 
  Search, 
  AlertTriangle, 
  Code, 
  Lightbulb,
  CheckCircle,
  XCircle,
  LifeBuoy
} from 'lucide-react';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');
  
  const sections = [
    { id: 'getting-started', label: 'Getting Started', icon: <FileText className="w-5 h-5" /> },
    { id: 'data-requirements', label: 'Data Requirements', icon: <Database className="w-5 h-5" /> },
    { id: 'fraud-detection', label: 'Fraud Detection', icon: <Search className="w-5 h-5" /> },
    { id: 'analyzing-results', label: 'Analyzing Results', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'api-integration', label: 'API Integration', icon: <Code className="w-5 h-5" /> },
    { id: 'faq', label: 'FAQ', icon: <LifeBuoy className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-10">
          <Link href="/tool" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Tool
          </Link>
          <h1 className="text-2xl font-bold ml-8">Documentation</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full lg:w-64 mb-6 lg:mb-0 lg:mr-8"
          >
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg sticky top-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Documentation</h2>
              <nav className="space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            {activeSection === 'getting-started' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Getting Started</h2>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Introduction</h3>
                  <p className="text-gray-300 mb-4">
                    Welcome to the FraudShield Online Payment Fraud Detection Tool. This application helps you identify potentially fraudulent transactions from your payment data, protecting your business from financial losses and reputational damage.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Upload Your Data</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Navigate to the main tool page and click on the upload section.</li>
                    <li>Drag and drop your CSV file or click to browse and select.</li>
                    <li>The system will automatically analyze your data for fraud indicators.</li>
                    <li>Review the analysis results in the Analytics Section.</li>
                  </ol>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <Lightbulb className="w-6 h-6 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">Pro Tip</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        For better results, ensure your CSV contains columns like transaction date, amount, and transaction ID. The more detailed your data, the more accurate our fraud detection will be.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">Support for large CSV files (up to 1GB)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">Advanced fraud detection algorithms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">Real-time analysis with progress tracking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">Interactive dashboards and visualizations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">AI-powered chatbot assistant for help</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeSection === 'data-requirements' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Data Requirements</h2>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">CSV File Format</h3>
                  <p className="text-gray-300 mb-4">
                    The system accepts CSV (Comma Separated Values) files with a header row. Your CSV file should include column headers that identify the type of data in each column.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Required Columns</h3>
                  <p className="text-gray-300 mb-2">
                    While our system can work with any CSV data, the following columns significantly improve fraud detection accuracy:
                  </p>
                  <div className="bg-gray-750 rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Column Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Description</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Importance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-300">Transaction ID</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Unique identifier for each transaction</td>
                          <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">High</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-300">Amount</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Transaction amount</td>
                          <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">High</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-300">Date/Time</td>
                          <td className="px-4 py-3 text-sm text-gray-300">When the transaction occurred</td>
                          <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">High</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-300">Transaction Type</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Category or type of transaction</td>
                          <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs">Medium</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-300">Location/IP</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Where the transaction originated</td>
                          <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs">Medium</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-300">Customer ID</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Identifier for the customer</td>
                          <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">Low</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-400">Important Note</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        The system supports files up to 1GB in size. For optimal performance with very large files, consider splitting into multiple smaller files or using the API integration for batch processing.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Column Matching</h3>
                  <p className="text-gray-300 mb-4">
                    Our system automatically tries to identify important columns based on common naming patterns:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Amount:</strong> Will match columns with names like &quot;amount&quot;, &quot;sum&quot;, &quot;total&quot;, &quot;price&quot;, etc.</li>
                    <li>• <strong>Transaction ID:</strong> Will match columns like &quot;id&quot;, &quot;transaction&quot;, &quot;txn&quot;, &quot;number&quot;, etc.</li>
                    <li>• <strong>Date:</strong> Will match columns like &quot;date&quot;, &quot;time&quot;, &quot;timestamp&quot;, etc.</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeSection === 'fraud-detection' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Fraud Detection</h2>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">How We Detect Fraud</h3>
                  <p className="text-gray-300 mb-4">
                    Our fraud detection system uses a combination of rule-based algorithms, pattern recognition, and machine learning techniques to identify potentially fraudulent transactions in your data.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Types of Fraud Detected</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">Credit Card Fraud</h4>
                      <p className="text-sm text-gray-300">Unauthorized use of credit card information to make purchases or withdraw funds.</p>
                    </div>
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">Debit Card Fraud</h4>
                      <p className="text-sm text-gray-300">Unauthorized transactions against debit cards, often via skimming or phishing.</p>
                    </div>
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">OTP Fraud</h4>
                      <p className="text-sm text-gray-300">Interception of one-time passwords to gain unauthorized transaction approval.</p>
                    </div>
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">Identity Theft</h4>
                      <p className="text-sm text-gray-300">Using stolen personal information to make unauthorized transactions.</p>
                    </div>
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">Account Takeover</h4>
                      <p className="text-sm text-gray-300">Unauthorized access and control of a user&apos;s account to make fraudulent transactions.</p>
                    </div>
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">Money Laundering</h4>
                      <p className="text-sm text-gray-300">Processing illegally obtained money through legitimate businesses.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Fraud Indicators</h3>
                  <p className="text-gray-300 mb-4">
                    Our system looks for these common indicators of potential fraud:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                      <span className="text-gray-300"><strong>Unusual Transaction Amounts:</strong> Transactions that are significantly larger than the user&apos;s average.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                      <span className="text-gray-300"><strong>Velocity Checks:</strong> Multiple transactions in a short time frame.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                      <span className="text-gray-300"><strong>Geographical Anomalies:</strong> Transactions from unusual locations for a given user.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                      <span className="text-gray-300"><strong>Time-of-day Anomalies:</strong> Transactions at unusual hours for a given user.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                      <span className="text-gray-300"><strong>Pattern Recognition:</strong> Detecting known fraud patterns in transaction sequences.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <Lightbulb className="w-6 h-6 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">Pro Tip</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        For the most accurate fraud detection, include as much contextual data as possible in your CSV files, such as customer age, account age, device information, and historical transaction patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'analyzing-results' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Analyzing Results</h2>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Overview Tab</h3>
                  <p className="text-gray-300 mb-4">
                    The Overview tab provides a high-level summary of your data analysis, including:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Overall risk score for your dataset</li>
                    <li>• Summary of safe, suspicious, and fraudulent transactions</li>
                    <li>• Transaction categories distribution</li>
                    <li>• Fraud type distribution chart</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Transactions Tab</h3>
                  <p className="text-gray-300 mb-4">
                    This tab shows detailed information about flagged transactions that may require your attention. Each transaction includes:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Transaction ID and date</li>
                    <li>• Amount and transaction type</li>
                    <li>• Fraud indicators detected</li>
                    <li>• Risk level assessment</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Patterns Tab</h3>
                  <p className="text-gray-300 mb-4">
                    The Patterns tab provides visual insights into the trends and patterns in your transaction data:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Historical patterns chart showing fraud attempts over time</li>
                    <li>• Risk factors radar chart showing vulnerability areas</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Data Table Tab</h3>
                  <p className="text-gray-300 mb-4">
                    This tab displays all your transaction data with color-coding:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-4 h-4 bg-red-900/30 border border-red-500/30 rounded-sm mt-1 mr-2"></div>
                      <span className="text-gray-300"><strong>Red:</strong> Fraudulent transactions that require immediate attention</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 bg-yellow-900/30 border border-yellow-500/30 rounded-sm mt-1 mr-2"></div>
                      <span className="text-gray-300"><strong>Yellow:</strong> Suspicious transactions that need review</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 bg-green-900/10 border border-green-500/30 rounded-sm mt-1 mr-2"></div>
                      <span className="text-gray-300"><strong>Green:</strong> Safe transactions with no fraud indicators</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Recommendations Tab</h3>
                  <p className="text-gray-300 mb-4">
                    Based on the analysis, this tab provides actionable recommendations to:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Address detected fraud issues</li>
                    <li>• Strengthen your payment security</li>
                    <li>• Reduce false positives in fraud detection</li>
                    <li>• Optimize your transaction monitoring</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-400">Important Note</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        While our system provides advanced fraud detection, it&apos;s recommended to review flagged transactions before taking action. Some legitimate transactions may be flagged due to unusual patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'api-integration' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">API Integration</h2>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">API Overview</h3>
                  <p className="text-gray-300 mb-4">
                    Our REST API allows you to integrate fraud detection capabilities directly into your applications. The API supports both real-time transaction screening and batch processing.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Authentication</h3>
                  <p className="text-gray-300 mb-4">
                    All API requests require authentication using an API key. You can generate your API key in the account settings.
                  </p>
                  <div className="bg-gray-750 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>
                        {`// Example API request with authentication header
fetch('https://api.fraudshield.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    transactions: [/* transaction data */]
  })
})`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Endpoints</h3>
                  <div className="bg-gray-750 rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Endpoint</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="px-4 py-3 text-sm text-blue-400">/v1/analyze</td>
                          <td className="px-4 py-3 text-sm text-gray-300">POST</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Analyze a batch of transactions</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-blue-400">/v1/analyze/stream</td>
                          <td className="px-4 py-3 text-sm text-gray-300">POST</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Stream analysis for large datasets</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-blue-400">/v1/transaction/check</td>
                          <td className="px-4 py-3 text-sm text-gray-300">POST</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Check a single transaction in real-time</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-blue-400">/v1/reports</td>
                          <td className="px-4 py-3 text-sm text-gray-300">GET</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Retrieve analysis reports</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-blue-400">Sample Code</h3>
                  <div className="bg-gray-750 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>
                        {`// Example: Check a single transaction
const checkTransaction = async (transaction) => {
  try {
    const response = await fetch('https://api.fraudshield.com/v1/transaction/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ transaction })
    });
    
    const result = await response.json();
    
    if (result.isFraudulent) {
      console.log('Warning: Potential fraud detected!');
      console.log('Risk score:', result.riskScore);
      console.log('Fraud indicators:', result.indicators);
    } else {
      console.log('Transaction appears safe');
    }
  } catch (error) {
    console.error('Error checking transaction:', error);
  }
};

// Example transaction data
const transaction = {
  id: 'TR-12345',
  amount: 299.99,
  currency: 'USD',
  date: '2025-04-01T14:30:00Z',
  customerId: 'CUST-789',
  paymentMethod: 'credit_card',
  cardLast4: '1234'
};

checkTransaction(transaction);`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <Lightbulb className="w-6 h-6 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">Pro Tip</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        For high-volume applications, use the streaming API endpoint which provides better performance for large datasets and real-time processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Frequently Asked Questions</h2>
                
                <div className="space-y-5">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">How large can my CSV file be?</h3>
                    <p className="text-gray-300">
                      The system supports CSV files up to 1GB in size. For larger datasets, we recommend splitting them into multiple files or using the API for streaming analysis.
                    </p>
                  </div>
                  
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">What if my CSV doesn&apos;t have all the recommended columns?</h3>
                    <p className="text-gray-300">
                      The system will work with whatever data you provide, but the accuracy of fraud detection improves with more information. At minimum, transaction amounts and dates are most helpful for basic analysis.
                    </p>
                  </div>
                  
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">Is my data secure?</h3>
                    <p className="text-gray-300">
                      Yes, all data is processed locally in your browser and is not stored on our servers. For the web-based tool, your data never leaves your computer. API integrations use encrypted connections and follow industry security standards.
                    </p>
                  </div>
                  
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">How accurate is the fraud detection?</h3>
                    <p className="text-gray-300">
                      Our system typically achieves 85-95% accuracy depending on the quality and completeness of your data. False positives are minimized through continuous algorithm improvements, but all flagged transactions should be reviewed.
                    </p>
                  </div>
                  
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">Can I integrate this with my existing payment system?</h3>
                    <p className="text-gray-300">
                      Yes, our API allows for seamless integration with most payment systems. See the API Integration section for details on implementing real-time fraud checks in your application.
                    </p>
                  </div>
                  
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">What fraud types can be detected?</h3>
                    <p className="text-gray-300">
                      The system can detect multiple fraud types including credit card fraud, identity theft, account takeovers, phishing attacks, and money laundering patterns. See the Fraud Detection section for more details.
                    </p>
                  </div>
                  
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-400">How do I get support?</h3>
                    <p className="text-gray-300">
                      You can use the AI chatbot in the bottom left corner for immediate assistance with common questions. For more complex issues, email support@fraudshield.com or visit our support center.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <LifeBuoy className="w-6 h-6 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">Need More Help?</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        If you couldn&apos;t find an answer to your question, use the AI chatbot or contact our support team at support@fraudshield.com. We typically respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 