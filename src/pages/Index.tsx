
import React, { useState } from 'react';
import { Upload, MessageCircle, TrendingUp, FileText, Zap } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import ChatInterface from '../components/ChatInterface';
import ScenarioPanel from '../components/ScenarioPanel';
import ModelOverview from '../components/ModelOverview';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [modelData, setModelData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'chat' | 'scenario'>('upload');

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate parsing - in real app this would parse the Excel file
    setModelData({
      fileName: file.name,
      sheets: ['Assumptions', 'P&L', 'Metrics', 'Cash Flow'],
      keyMetrics: {
        revenue: 1200000,
        burn: 85000,
        runway: 14.1,
        cac: 120,
        arpu: 49
      }
    });
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinModel Whisperer</h1>
                <p className="text-sm text-gray-500">AI Copilot for Financial Models</p>
              </div>
            </div>
            {modelData && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span>{modelData.fileName}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!uploadedFile ? (
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Turn Your Excel Models Into 
                <span className="text-blue-600"> Conversational Insights</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Upload your financial model and ask questions in plain English. 
                Get instant answers, run scenarios, and understand your numbers like never before.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Natural Language Q&A</h3>
                <p className="text-gray-600 text-sm">Ask questions like "What's our runway?" and get instant, accurate answers</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Scenario Simulation</h3>
                <p className="text-gray-600 text-sm">Test "what-if" scenarios instantly without touching your spreadsheet</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
                <p className="text-gray-600 text-sm">Get insights on trends, metrics, and financial health automatically</p>
              </div>
            </div>

            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ModelOverview modelData={modelData} />
              
              {/* Navigation Tabs */}
              <div className="mt-6 bg-white rounded-lg border shadow-sm p-2">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'chat' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="inline h-4 w-4 mr-2" />
                  Ask Questions
                </button>
                <button
                  onClick={() => setActiveTab('scenario')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'scenario' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Zap className="inline h-4 w-4 mr-2" />
                  Run Scenarios
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'chat' && <ChatInterface modelData={modelData} />}
              {activeTab === 'scenario' && <ScenarioPanel modelData={modelData} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
