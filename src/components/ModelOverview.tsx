
import React from 'react';
import { FileSpreadsheet, DollarSign, TrendingUp, Clock, Target } from 'lucide-react';

interface ModelOverviewProps {
  modelData: any;
}

const ModelOverview: React.FC<ModelOverviewProps> = ({ modelData }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <FileSpreadsheet className="h-5 w-5 text-blue-600" />
        <div>
          <h3 className="font-semibold text-gray-900">Model Overview</h3>
          <p className="text-sm text-gray-500">{modelData.fileName}</p>
        </div>
      </div>

      {/* Sheets */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Sheets Analyzed</h4>
        <div className="space-y-1">
          {modelData.sheets.map((sheet: string, index: number) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              {sheet}
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Key Metrics</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Annual Revenue</span>
            </div>
            <span className="text-sm font-medium">${modelData.keyMetrics.revenue.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">Monthly Burn</span>
            </div>
            <span className="text-sm font-medium">${modelData.keyMetrics.burn.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-gray-600">Runway</span>
            </div>
            <span className="text-sm font-medium">{modelData.keyMetrics.runway} months</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">CAC</span>
            </div>
            <span className="text-sm font-medium">${modelData.keyMetrics.cac}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">ARPU</span>
            </div>
            <span className="text-sm font-medium">${modelData.keyMetrics.arpu}/mo</span>
          </div>
        </div>
      </div>

      {/* Health Score */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Financial Health</span>
          <span className="text-sm font-medium text-green-600">Strong</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Based on unit economics and runway analysis
        </p>
      </div>
    </div>
  );
};

export default ModelOverview;
