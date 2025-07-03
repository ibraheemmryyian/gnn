import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Play, Pause, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { Network3D } from './components/Network3D';
import { NetworkCanvas } from './components/NetworkCanvas';
import { NodeDetails } from './components/NodeDetails';
import { APIKeyInput } from './components/APIKeyInput';
import { NetworkStats } from './components/NetworkStats';
import { AIAnalysisPanel } from './components/AIAnalysisPanel';
import { GNNApiService } from './services/gnnApi';
import { NetworkData, Node } from './types/network';

function App() {
  const [apiService, setApiService] = useState<GNNApiService | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [is3DMode, setIs3DMode] = useState(true);

  const handleApiKeySubmit = async (apiKey: string) => {
    setIsConnecting(true);
    try {
      const service = new GNNApiService(apiKey);
      const connected = await service.connect();
      
      if (connected) {
        setApiService(service);
        setIsConnected(true);
        setIsDemoMode(false);
        
        // Fetch initial network data
        const result = await service.getNetworkData();
        if (result.success && result.data) {
          setNetworkData(result.data);
          setLastUpdate(new Date());
        }
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDemoMode = async () => {
    setIsConnecting(true);
    try {
      const service = GNNApiService.createDemoInstance();
      const connected = await service.connect();
      
      if (connected) {
        setApiService(service);
        setIsConnected(true);
        setIsDemoMode(true);
        
        // Fetch demo network data
        const result = await service.getNetworkData();
        if (result.success && result.data) {
          setNetworkData(result.data);
          setLastUpdate(new Date());
        }
      }
    } catch (error) {
      console.error('Demo mode failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const toggleProcessing = async () => {
    if (!apiService) return;

    try {
      if (isProcessing) {
        await apiService.stopProcessing();
        setIsProcessing(false);
      } else {
        await apiService.startProcessing();
        setIsProcessing(true);
      }
    } catch (error) {
      console.error('Failed to toggle processing:', error);
    }
  };

  const refreshData = useCallback(async () => {
    if (!apiService) return;

    try {
      const result = await apiService.getNetworkData();
      if (result.success && result.data) {
        setNetworkData(result.data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }, [apiService]);

  // Auto-refresh data while processing
  useEffect(() => {
    if (!isProcessing || !apiService) return;

    const interval = setInterval(refreshData, 3000); // Increased to 3 seconds for AI processing
    return () => clearInterval(interval);
  }, [isProcessing, apiService, refreshData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Industrial Symbiosis GNN</h1>
              <p className="text-gray-400">
                {isDemoMode ? 'MONOPOLY AI - Advanced GNN + Monte Carlo + Federated Learning' : 'Real-time Graph Neural Network Analysis'}
              </p>
            </div>
          </div>

          {isConnected && (
            <div className="flex items-center gap-3">
              {isDemoMode && (
                <div className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30">
                  MONOPOLY AI Active
                </div>
              )}
              
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`p-2 rounded-lg font-medium transition-all ${
                  is3DMode
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={is3DMode ? 'Switch to 2D View' : 'Switch to 3D View'}
              >
                {is3DMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              
              <button
                onClick={refreshData}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                title="Refresh AI Analysis"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleProcessing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isProcessing
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Stop AI Analysis
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start AI Analysis
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {!isConnected ? (
          <div className="max-w-md mx-auto mt-20">
            <APIKeyInput
              onSubmit={handleApiKeySubmit}
              onDemoMode={handleDemoMode}
              isConnecting={isConnecting}
              isConnected={isConnected}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* AI Analysis Panel */}
            {isDemoMode && (
              <AIAnalysisPanel 
                isProcessing={isProcessing} 
                networkData={networkData}
              />
            )}

            {/* Network Stats */}
            {networkData && (
              <NetworkStats data={networkData} isProcessing={isProcessing} />
            )}

            {/* Main Network Visualization */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {is3DMode ? '3D Neural Network Globe' : '2D Network Visualization'}
                    {isDemoMode && ' (MONOPOLY AI Enhanced)'}
                  </h2>
                  {lastUpdate && (
                    <p className="text-sm text-gray-400">
                      Last AI analysis: {lastUpdate.toLocaleTimeString()}
                    </p>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  {is3DMode 
                    ? 'Navigate in 3D space - AI-optimized force-directed layout with real symbiosis connections'
                    : 'Click and drag nodes to rearrange the AI-analyzed network layout'
                  }
                </p>
              </div>
              
              <div className="h-[600px] relative">
                {networkData ? (
                  is3DMode ? (
                    <Network3D
                      data={networkData}
                      onNodeClick={setSelectedNode}
                      isProcessing={isProcessing}
                    />
                  ) : (
                    <NetworkCanvas
                      data={networkData}
                      onNodeClick={setSelectedNode}
                      isProcessing={isProcessing}
                    />
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">Loading AI-enhanced network data...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Node Details Modal */}
      <NodeDetails
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}

export default App;