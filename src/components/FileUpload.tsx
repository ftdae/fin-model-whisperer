
import React, { useCallback, useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (excelFile) {
      processFile(excelFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onFileUpload(file);
  };

  if (isProcessing) {
    return (
      <div className="bg-white border-2 border-blue-200 rounded-xl p-12 text-center">
        <div className="animate-spin w-12 h-12 mx-auto mb-4">
          <FileSpreadsheet className="h-12 w-12 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Model</h3>
        <p className="text-gray-600">Analyzing sheets and identifying key metrics...</p>
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>File uploaded successfully</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Parsing Excel sheets</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-pulse w-4 h-4 bg-blue-400 rounded-full"></div>
            <span>Identifying financial metrics</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-white border-2 border-dashed rounded-xl p-12 text-center transition-all ${
        isDragging 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
      }`}
      onDrag={handleDrag}
      onDragStart={handleDrag}
      onDragEnd={handleDrag}
      onDragOver={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="space-y-4">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
          isDragging ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Upload className={`h-8 w-8 ${isDragging ? 'text-blue-600' : 'text-gray-600'}`} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragging ? 'Drop your Excel file here' : 'Upload your financial model'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your .xlsx file or click to browse
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Choose File
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          Supports .xlsx and .xls files up to 10MB
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
