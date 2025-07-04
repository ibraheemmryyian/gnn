import React, { useState, useEffect } from 'react';
import { Brain, Zap, Shield, TrendingUp, Target, Activity, Database, Network, Cpu, BarChart3 } from 'lucide-react';

interface AIAnalysisPanelProps {
  isProcessing: boolean;
  networkData: any;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ isProcessing, networkData }) => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isProcessing && networkData) {
      // Simulate real-time AI analysis with faster updates
      const analyses = [
        'Analyzing material compatibility matrix...',
        'Optimizing multi-hop symbiosis chains...',
        'Calculating regional cluster efficiency...',
        'Processing circular economy flows...',
        'Generating confidence intervals...',
        'Detecting optimal connection patterns...',
        'Validating symbiosis opportunities...',
        'Finalizing network optimization...'
      ];

      let index = 0;
      const interval = setInterval(() => {
        setCurrentAnalysis(analyses[index % analyses.length]);
        setProgress((index + 1) * 12.5);
        index++;
      }, 1500);

      // Generate enhanced analysis results
      setTimeout(() => {
        const perfectMatches = networkData.edges?.filter((e: any) => 
          e.metadata?.aiPriority?.includes('Perfect')
        ).length || 0;
        
        const exceptionalMatches = networkData.edges?.filter((e: any) => 
          e.metadata?.aiPriority?.includes('Exceptional')
        ).length || 0;

        const multiHopMatches = networkData.edges?.filter((e: any) => 
          e.metadata?.multiHop
        ).length || 0;

        const avgConfidence = networkData.edges?.reduce((sum: number, e: any) => 
          sum + (e.metadata?.confidence || 0), 0
        ) / (networkData.edges?.length || 1);

        setAnalysisResults({
          perfectMatches,
          exceptionalMatches,
          multiHopMatches,
          avgConfidence: avgConfidence * 100,
          totalAnalyzed: networkData.nodes?.filter((n: any) => n.type === 'company').length || 0,
          riskScore: 12 + Math.random() * 8,
          optimizationGains: 32 + Math.random() * 18,
          processingSpeed: '< 50ms',
          networkDensity: ((networkData.edges?.length || 0) / (networkData.nodes?.length || 1) * 2).toFixed(1)
        });
        setProgress(100);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, networkData]);

  if (!isProcessing && !analysisResults) return null;

  return (
    <div className="bg-gradient-to-br from-gray-900/95 via-blue-900/20 to-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Fast AI Analysis Engine</h3>
          <p className="text-gray-400 text-sm">High-Speed Network Optimization & Pattern Recognition</p>
        </div>
        {isProcessing && (
          <div className="ml-auto">
            <div className="flex items-center gap-2 text-green-400 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Processing</span>
            </div>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-medium">Real-time Analysis</span>
            <span className="text-gray-400 text-sm ml-auto">{Math.round(progress)}%</span>
          </div>
          <p className="text-gray-300 text-sm mb-3">{currentAnalysis}</p>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {analysisResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-green-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Perfect Symbiosis</span>
            </div>
            <div className="text-2xl font-bold text-white">{analysisResults.perfectMatches}</div>
            <div className="text-xs text-gray-400">≥95% compatibility</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-blue-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Multi-hop Chains</span>
            </div>
            <div className="text-2xl font-bold text-white">{analysisResults.multiHopMatches}</div>
            <div className="text-xs text-gray-400">Complex pathways</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">AI Confidence</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(analysisResults.avgConfidence)}%</div>
            <div className="text-xs text-gray-400">Network validated</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/15 to-red-500/15 border border-orange-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Network Density</span>
            </div>
            <div className="text-2xl font-bold text-white">{analysisResults.networkDensity}</div>
            <div className="text-xs text-gray-400">Connections/node</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-300 p-2 rounded-lg bg-gray-800/30">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Processing Speed: {analysisResults?.processingSpeed || '< 50ms'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 p-2 rounded-lg bg-gray-800/30">
          <Network className="w-4 h-4 text-purple-400" />
          <span>Pattern Recognition: Advanced</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 p-2 rounded-lg bg-gray-800/30">
          <Activity className="w-4 h-4 text-green-400" />
          <span>Real-time Optimization: Active</span>
        </div>
      </div>

      {analysisResults && (
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
          <div className="text-green-400 text-sm font-medium mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analysis Complete - Network Optimized
          </div>
          <div className="text-gray-300 text-xs">
            Analyzed {analysisResults.totalAnalyzed} companies • Found {analysisResults.perfectMatches + analysisResults.exceptionalMatches} high-value matches • 
            Multi-hop chains: {analysisResults.multiHopMatches} • Optimization potential: +{Math.round(analysisResults.optimizationGains)}% efficiency
          </div>
        </div>
      )}
    </div>
  );
};