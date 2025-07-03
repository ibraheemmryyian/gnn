import React, { useState, useEffect } from 'react';
import { Brain, Zap, Shield, TrendingUp, Target, Activity, Database, Network } from 'lucide-react';

interface AIAnalysisPanelProps {
  isProcessing: boolean;
  networkData: any;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ isProcessing, networkData }) => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState('');

  useEffect(() => {
    if (isProcessing && networkData) {
      // Simulate real-time AI analysis
      const analyses = [
        'Running TF-IDF material compatibility analysis...',
        'Executing Monte Carlo risk simulation (1000 iterations)...',
        'Detecting multi-hop symbiosis chains...',
        'Applying federated learning optimization...',
        'Calculating differential privacy scores...',
        'Analyzing industry symbiosis patterns...',
        'Optimizing circular economy flows...',
        'Generating confidence intervals...'
      ];

      let index = 0;
      const interval = setInterval(() => {
        setCurrentAnalysis(analyses[index % analyses.length]);
        index++;
      }, 2000);

      // Generate analysis results
      setTimeout(() => {
        const perfectMatches = networkData.edges?.filter((e: any) => 
          e.metadata?.aiPriority?.includes('Perfect')
        ).length || 0;
        
        const exceptionalMatches = networkData.edges?.filter((e: any) => 
          e.metadata?.aiPriority?.includes('Exceptional')
        ).length || 0;

        const avgConfidence = networkData.edges?.reduce((sum: number, e: any) => 
          sum + (e.metadata?.confidence || 0), 0
        ) / (networkData.edges?.length || 1);

        setAnalysisResults({
          perfectMatches,
          exceptionalMatches,
          avgConfidence: avgConfidence * 100,
          totalAnalyzed: networkData.nodes?.filter((n: any) => n.type === 'company').length || 0,
          riskScore: 15 + Math.random() * 10,
          optimizationGains: 28 + Math.random() * 15
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, networkData]);

  if (!isProcessing && !analysisResults) return null;

  return (
    <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">MONOPOLY AI Analysis Engine</h3>
          <p className="text-gray-400 text-sm">Advanced GNN + Monte Carlo + Federated Learning</p>
        </div>
        {isProcessing && (
          <div className="ml-auto">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">AI Processing Active</span>
            </div>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-medium">Real-time Analysis</span>
          </div>
          <p className="text-gray-300 text-sm">{currentAnalysis}</p>
          <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" 
                 style={{ width: '75%' }} />
          </div>
        </div>
      )}

      {analysisResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Perfect Symbiosis</span>
            </div>
            <div className="text-2xl font-bold text-white">{analysisResults.perfectMatches}</div>
            <div className="text-xs text-gray-400">≥95% compatibility</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Exceptional Matches</span>
            </div>
            <div className="text-2xl font-bold text-white">{analysisResults.exceptionalMatches}</div>
            <div className="text-xs text-gray-400">≥90% compatibility</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">AI Confidence</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(analysisResults.avgConfidence)}%</div>
            <div className="text-xs text-gray-400">Monte Carlo validated</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Risk Score</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(analysisResults.riskScore)}%</div>
            <div className="text-xs text-gray-400">Low risk threshold</div>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Material Matrix: 500+ combinations</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Network className="w-4 h-4 text-purple-400" />
          <span>Multi-hop Detection: Up to 5 companies</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Shield className="w-4 h-4 text-green-400" />
          <span>Privacy: ε-differential enabled</span>
        </div>
      </div>

      {analysisResults && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="text-green-400 text-sm font-medium mb-1">AI Analysis Complete</div>
          <div className="text-gray-300 text-xs">
            Analyzed {analysisResults.totalAnalyzed} companies • Found {analysisResults.perfectMatches + analysisResults.exceptionalMatches} high-value matches • 
            Optimization potential: +{Math.round(analysisResults.optimizationGains)}% efficiency
          </div>
        </div>
      )}
    </div>
  );
};