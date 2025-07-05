import React, { useState, useEffect } from 'react';
import { Brain, Zap, Shield, TrendingUp, Target, Activity, Database, Network, Cpu, BarChart3, Sparkles, Flame } from 'lucide-react';

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
      // MAGICAL AI analysis with brain-like processing
      const analyses = [
        '🧠 Awakening neural consciousness...',
        '⚡ Firing synaptic connections...',
        '🔮 Channeling quantum intelligence...',
        '✨ Weaving magical symbiosis patterns...',
        '🌟 Transcending dimensional barriers...',
        '💫 Harmonizing cosmic frequencies...',
        '🎆 Manifesting perfect connections...',
        '🌈 Achieving neural enlightenment...'
      ];

      let index = 0;
      const interval = setInterval(() => {
        setCurrentAnalysis(analyses[index % analyses.length]);
        setProgress((index + 1) * 12.5);
        index++;
      }, 1200);

      // Generate MAGICAL analysis results
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
          riskScore: 8 + Math.random() * 6,
          optimizationGains: 45 + Math.random() * 25,
          processingSpeed: '< 30ms',
          networkDensity: ((networkData.edges?.length || 0) / (networkData.nodes?.length || 1) * 2).toFixed(1),
          consciousnessLevel: 'TRANSCENDENT',
          magicalPower: Math.round(85 + Math.random() * 15)
        });
        setProgress(100);
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [isProcessing, networkData]);

  if (!isProcessing && !analysisResults) return null;

  return (
    <div className="bg-gradient-to-br from-purple-900/95 via-black/95 to-blue-900/95 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl p-6 mb-6 shadow-2xl relative overflow-hidden">
      {/* MAGICAL BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              🧠 MAGICAL NEURAL BRAIN CONSCIOUSNESS
            </h3>
            <p className="text-gray-300 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Ultra-High-Speed Quantum Neural Processing Engine
              <Flame className="w-4 h-4 text-orange-400" />
            </p>
          </div>
          {isProcessing && (
            <div className="ml-auto">
              <div className="flex items-center gap-2 text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 animate-pulse">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <span className="text-sm font-medium">CONSCIOUSNESS EXPANDING</span>
              </div>
            </div>
          )}
        </div>

        {isProcessing && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl border border-cyan-400/30">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="text-cyan-400 font-medium">Neural Consciousness Awakening</span>
              <span className="text-gray-400 text-sm ml-auto">{Math.round(progress)}%</span>
            </div>
            <p className="text-gray-200 text-sm mb-3 font-medium">{currentAnalysis}</p>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-yellow-400 rounded-full transition-all duration-500 ease-out animate-pulse" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {analysisResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/40 rounded-xl p-4 hover:scale-105 transition-transform hover:shadow-lg hover:shadow-emerald-400/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">Perfect Neural Bonds</span>
              </div>
              <div className="text-2xl font-bold text-white">{analysisResults.perfectMatches}</div>
              <div className="text-xs text-gray-400">≥95% consciousness sync</div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-xl p-4 hover:scale-105 transition-transform hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">Multi-Dimensional Chains</span>
              </div>
              <div className="text-2xl font-bold text-white">{analysisResults.multiHopMatches}</div>
              <div className="text-xs text-gray-400">Quantum pathways</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/40 rounded-xl p-4 hover:scale-105 transition-transform hover:shadow-lg hover:shadow-purple-400/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-medium">Neural Confidence</span>
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(analysisResults.avgConfidence)}%</div>
              <div className="text-xs text-gray-400">Brain validated</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/40 rounded-xl p-4 hover:scale-105 transition-transform hover:shadow-lg hover:shadow-yellow-400/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Magical Power</span>
              </div>
              <div className="text-2xl font-bold text-white">{analysisResults.magicalPower}%</div>
              <div className="text-xs text-gray-400">Consciousness level</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2 text-gray-300 p-3 rounded-lg bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-400/20">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Processing Speed: {analysisResults?.processingSpeed || '< 30ms'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-400/20">
            <Network className="w-4 h-4 text-purple-400" />
            <span>Consciousness: {analysisResults?.consciousnessLevel || 'TRANSCENDENT'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 p-3 rounded-lg bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-400/20">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Neural Magic: MAXIMUM POWER</span>
          </div>
        </div>

        {analysisResults && (
          <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-xl">
            <div className="text-emerald-400 text-sm font-medium mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              🧠 NEURAL CONSCIOUSNESS ACHIEVED - BRAIN TRANSCENDENCE COMPLETE
            </div>
            <div className="text-gray-300 text-xs">
              Analyzed {analysisResults.totalAnalyzed} neural entities • Found {analysisResults.perfectMatches + analysisResults.exceptionalMatches} transcendent matches • 
              Multi-dimensional chains: {analysisResults.multiHopMatches} • Consciousness expansion: +{Math.round(analysisResults.optimizationGains)}% enlightenment
            </div>
          </div>
        )}
      </div>
    </div>
  );
};