
import React, { useState } from 'react';
import { Play, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

interface ScenarioPanelProps {
  modelData: any;
}

interface ScenarioResult {
  metric: string;
  current: number;
  projected: number;
  change: number;
  unit: string;
}

const ScenarioPanel: React.FC<ScenarioPanelProps> = ({ modelData }) => {
  const [scenarios, setScenarios] = useState({
    priceChange: 0,
    churnChange: 0,
    cacChange: 0,
    burnChange: 0,
  });
  
  const [results, setResults] = useState<ScenarioResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: number) => {
    setScenarios(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const runScenario = async () => {
    setIsCalculating(true);
    
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate scenario results
    const currentARPU = modelData.keyMetrics.arpu;
    const currentChurn = 5; // Assuming 5% monthly churn
    const currentCAC = modelData.keyMetrics.cac;
    const currentBurn = modelData.keyMetrics.burn;
    const currentRunway = modelData.keyMetrics.runway;
    
    const newARPU = currentARPU * (1 + scenarios.priceChange / 100);
    const newChurn = currentChurn * (1 + scenarios.churnChange / 100);
    const newCAC = currentCAC * (1 + scenarios.cacChange / 100);
    const newBurn = currentBurn * (1 + scenarios.burnChange / 100);
    
    // Calculate LTV and runway impact
    const currentLTV = currentARPU / (currentChurn / 100);
    const newLTV = newARPU / (newChurn / 100);
    
    const newRunway = currentRunway * (currentBurn / newBurn) * (newARPU / currentARPU);
    
    const scenarioResults: ScenarioResult[] = [
      {
        metric: 'ARPU',
        current: currentARPU,
        projected: newARPU,
        change: ((newARPU - currentARPU) / currentARPU) * 100,
        unit: '$'
      },
      {
        metric: 'LTV',
        current: currentLTV,
        projected: newLTV,
        change: ((newLTV - currentLTV) / currentLTV) * 100,
        unit: '$'
      },
      {
        metric: 'CAC',
        current: currentCAC,
        projected: newCAC,
        change: ((newCAC - currentCAC) / currentCAC) * 100,
        unit: '$'
      },
      {
        metric: 'Monthly Burn',
        current: currentBurn,
        projected: newBurn,
        change: ((newBurn - currentBurn) / currentBurn) * 100,
        unit: '$'
      },
      {
        metric: 'Runway',
        current: currentRunway,
        projected: newRunway,
        change: ((newRunway - currentRunway) / currentRunway) * 100,
        unit: ' months'
      }
    ];
    
    setResults(scenarioResults);
    setIsCalculating(false);
  };

  const resetScenarios = () => {
    setScenarios({
      priceChange: 0,
      churnChange: 0,
      cacChange: 0,
      burnChange: 0,
    });
    setResults([]);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Scenario Simulator</h3>
        <p className="text-gray-600">Adjust the parameters below to see how changes would impact your key metrics.</p>
      </div>

      {/* Scenario Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Change
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-50"
                max="100"
                value={scenarios.priceChange}
                onChange={(e) => handleInputChange('priceChange', parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="w-16 text-sm font-medium text-right">
                {scenarios.priceChange > 0 ? '+' : ''}{scenarios.priceChange}%
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Churn Change
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-80"
                max="100"
                value={scenarios.churnChange}
                onChange={(e) => handleInputChange('churnChange', parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="w-16 text-sm font-medium text-right">
                {scenarios.churnChange > 0 ? '+' : ''}{scenarios.churnChange}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CAC Change
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-50"
                max="200"
                value={scenarios.cacChange}
                onChange={(e) => handleInputChange('cacChange', parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="w-16 text-sm font-medium text-right">
                {scenarios.cacChange > 0 ? '+' : ''}{scenarios.cacChange}%
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Burn Rate Change
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-30"
                max="100"
                value={scenarios.burnChange}
                onChange={(e) => handleInputChange('burnChange', parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="w-16 text-sm font-medium text-right">
                {scenarios.burnChange > 0 ? '+' : ''}{scenarios.burnChange}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mb-8">
        <button
          onClick={runScenario}
          disabled={isCalculating}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <Play className="h-4 w-4" />
          <span>{isCalculating ? 'Calculating...' : 'Run Scenario'}</span>
        </button>
        <button
          onClick={resetScenarios}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Results */}
      {isCalculating && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="text-gray-600">Calculating scenario impact...</p>
        </div>
      )}

      {results.length > 0 && !isCalculating && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Scenario Results</h4>
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{result.metric}</h5>
                  <div className={`flex items-center space-x-1 ${
                    result.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {result.change >= 0 ? '+' : ''}{result.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Current: {result.unit}{result.current.toLocaleString()}
                  </span>
                  <span>
                    Projected: {result.unit}{result.projected.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioPanel;
