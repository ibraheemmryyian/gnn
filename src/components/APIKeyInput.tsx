import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle, Play, Zap, Users, Recycle, Building2 } from 'lucide-react';

interface APIKeyInputProps {
  onSubmit: (apiKey: string) => void;
  onDemoMode: () => void;
  isConnecting: boolean;
  isConnected: boolean;
}

export const APIKeyInput: React.FC<APIKeyInputProps> = ({ 
  onSubmit, 
  onDemoMode,
  isConnecting, 
  isConnected 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  const features = [
    { icon: <Building2 className="w-4 h-4" />, text: 'Analyze 100+ real European companies' },
    { icon: <Recycle className="w-4 h-4" />, text: 'Track circular economy flows' },
    { icon: <Users className="w-4 h-4" />, text: 'Industrial symbiosis matching' },
    { icon: <Zap className="w-4 h-4" />, text: 'AI-powered optimization engine' }
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
              <Key className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Industrial Symbiosis GNN</h3>
              <p className="text-gray-400 text-sm">Connect to European circular economy network</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="text-cyan-400">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your GNN API key (e.g., gnnapi2025200710240120)"
              className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur-sm"
              disabled={isConnecting || isConnected}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              disabled={isConnecting || isConnected}
            >
              {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim() || isConnecting || isConnected}
            className="w-full px-4 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isConnecting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting to Real Network...
              </div>
            ) : isConnected ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Connected to Industrial Network
              </div>
            ) : (
              'Connect to Real Network'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700/50">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm">
              Want to explore with real company data?
            </p>
            <p className="text-gray-500 text-xs mt-1">
              View 100 European companies with simulated AI analysis
            </p>
          </div>
          
          <button
            onClick={onDemoMode}
            disabled={isConnecting || isConnected}
            className="w-full px-4 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Explore Real Company Data
            </div>
          </button>
        </div>

        {isConnected && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Successfully connected to European industrial symbiosis network
            </p>
          </div>
        )}
      </div>
    </div>
  );
};