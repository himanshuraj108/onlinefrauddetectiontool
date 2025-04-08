'use client';

import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';

export default function UploadSection({ onUpload, isLoading, onError }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [processingStatus, setProcessingStatus] = useState('');
  const [processedRows, setProcessedRows] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const processedDataRef = useRef([]);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFileInChunks = (file) => {
    setFileError('');
    setProcessingStatus('Preparing to process file...');
    setProcessedRows(0);
    setTotalRows(0);
    setProgress(0);
    processedDataRef.current = [];
    
    // First, count total rows to track progress
    let lineCount = 0;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') lineCount++;
      }
      setTotalRows(lineCount);
      startParsing(file);
    };
    
    reader.onerror = (error) => {
      setFileError('Error reading file');
      setProcessingStatus('');
      // Call the onError prop if provided
      if (onError) {
        onError(new Error('Failed to read file'));
      }
    };
    
    // Read first 5MB to estimate total rows
    const sampleSlice = file.slice(0, 5 * 1024 * 1024);
    reader.readAsText(sampleSlice);
    
    // Start the actual parsing process
    function startParsing(file) {
      setProcessingStatus('Starting file processing...');
      let isFirstChunk = true;
      let rowCount = 0;
      
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true, // Use PapaParse's built-in worker
        chunk: (results, parser) => {
          if (results.errors.length > 0) {
            console.warn('Chunk parsing errors:', results.errors);
            // Continue anyway, non-fatal errors
          }
          
          // Validate first chunk
          if (isFirstChunk) {
            if (results.data.length === 0 || !validateChunkHeaders(results.data[0])) {
              parser.abort();
              setFileError('CSV format doesn\'t appear to contain payment data fields');
              setProcessingStatus('');
              if (onError) {
                onError(new Error('CSV format doesn\'t contain required payment data fields'));
              }
              return;
            }
            isFirstChunk = false;
          }
          
          // Process this chunk
          const chunk = results.data;
          processedDataRef.current = [...processedDataRef.current, ...chunk];
          rowCount += chunk.length;
          setProcessedRows(rowCount);
          
          // Update progress
          const percentComplete = Math.min(99, Math.round((rowCount / totalRows) * 100)) || 0;
          setProgress(percentComplete);
          setProcessingStatus(`Processing: ${percentComplete}% complete (${rowCount.toLocaleString()} rows)`);
          
          // If we've processed enough rows, finalize early
          if (rowCount >= 500000) {
            parser.abort();
            finalizeProcessing();
          }
        },
        complete: () => {
          if (processedDataRef.current.length === 0) {
            setFileError('No valid data found in file');
            setProcessingStatus('');
            if (onError) {
              onError(new Error('No valid data found in file'));
            }
            return;
          }
          finalizeProcessing();
        },
        error: (error) => {
          setFileError(`Failed to read file: ${error.message}`);
          setProcessingStatus('');
          if (onError) {
            onError(error);
          }
        }
      });
    }
    
    function finalizeProcessing() {
      setProcessingStatus('Finalizing analysis...');
      setTimeout(() => {
        setProgress(100);
        setProcessingStatus('');
        onUpload(processedDataRef.current);
      }, 500);
    }
  };
  
  function validateChunkHeaders(firstRow) {
    if (!firstRow) return false;
    
    // Get all header names
    const headers = Object.keys(firstRow).map(h => h.toLowerCase());
    console.log("CSV Headers:", headers);
    
    // Expanded list of common payment data fields including your specific fields
    const paymentFields = [
      // Standard fields
      'amount', 'transaction', 'payment', 'date', 'time', 'card', 
      'account', 'id', 'merchant', 'description', 'currency', 'price',
      'money', 'transfer', 'value', 'cost', 'credit', 'debit', 'balance',
      'charge', 'sum', 'total', 'fee', 'number', 'fraud', 'flag',
      // Special case for joined words like 'oldbalance' - check for partial matches
      'step', 'type', 'orig', 'dest', 'name'
    ];
    
    // Check for exact matches or substrings
    const foundFields = [];
    
    // First check exact matches
    for (const header of headers) {
      if (paymentFields.includes(header)) {
        foundFields.push(header);
      } else {
        // Check for partial matches (when fields are combined like 'oldbalance')
        for (const field of paymentFields) {
          if (header.includes(field)) {
            foundFields.push(header);
            break;
          }
        }
      }
    }
    
    console.log("Matched fields:", foundFields);
    
    // If we find at least one field, consider it valid
    return foundFields.length >= 1;
  }
  
  const validateAndProcessFile = (file) => {
    setFileError('');
    
    // Check if file is CSV
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setFileError('Please upload a CSV file');
      if (onError) {
        onError(new Error('Please upload a CSV file'));
      }
      return;
    }
    
    // Reset filename
    setFileName(file.name);
    
    // Check file size
    const fileSize = file.size / (1024 * 1024); // Size in MB
    if (fileSize > 1024) {
      setFileError('File too large. Maximum size is 1GB');
      if (onError) {
        onError(new Error('File too large. Maximum size is 1GB'));
      }
      return;
    }
    
    // Process file in chunks regardless of size (simpler code path)
    setProcessingStatus('Preparing file for processing...');
    processFileInChunks(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Payment Data</h2>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive 
            ? 'border-blue-500 bg-blue-900/20' 
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".csv"
          className="hidden" 
          onChange={handleFileChange}
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium">
              {fileName ? fileName : 'Drag & drop your CSV file here'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {fileName ? 'Click to change file' : 'or click to browse files'}
            </p>
          </div>
        </div>
      </div>
      
      {fileError && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200 text-sm">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {fileError}
          </p>
        </div>
      )}
      
      {processingStatus && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{processingStatus}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 h-2.5 rounded-full gradient-animate" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">File Requirements:</h3>
        <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
          <li>CSV format only (up to 1GB)</li>
          <li>Headers must include transaction details</li>
          <li>Common fields: amount, balance, transaction type, fraud indicators</li>
          <li>Advanced processing for large files is enabled</li>
        </ul>
      </div>
      
      {isLoading && !processingStatus && (
        <div className="mt-6 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 mb-2">
              <svg className="animate-spin h-full w-full text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-blue-400">Analyzing your data...</p>
          </div>
        </div>
      )}
    </div>
  );
} 