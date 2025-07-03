import React from 'react';
import { X, Activity, Users, Database, Zap, MapPin, Calendar, TrendingUp, Leaf, DollarSign } from 'lucide-react';
import { Node } from '../types/network';

interface NodeDetailsProps {
  node: Node | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NodeDetails: React.FC<NodeDetailsProps> = ({ node, isOpen, onClose }) => {
  if (!isOpen || !node) return null;

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'company': return <Users className="w-6 h-6" />;
      case 'process': return <Activity className="w-6 h-6" />;
      case 'data': return <Database className="w-6 h-6" />;
      case 'output': return <Zap className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'process': return 'text-teal-400 bg-teal-400/10 border-teal-400/20';
      case 'data': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'output': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getImpactMetrics = (node: Node) => {
    if (node.type === 'company') {
      return [
        { label: 'CO₂ Emissions', value: node.metadata?.co2Emissions || 'N/A', icon: <Leaf className="w-4 h-4" />, color: 'text-red-400' },
        { label: 'Employees', value: node.metadata?.employees || 'N/A', icon: <Users className="w-4 h-4" />, color: 'text-blue-400' },
        { label: 'Location', value: node.metadata?.location || 'N/A', icon: <MapPin className="w-4 h-4" />, color: 'text-green-400' }
      ];
    } else if (node.type === 'process') {
      return [
        { label: 'Efficiency', value: node.metadata?.efficiency || 'N/A', icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-400' },
        { label: 'Energy Saved', value: node.metadata?.energySaved || 'N/A', icon: <Zap className="w-4 h-4" />, color: 'text-yellow-400' },
        { label: 'Cost Savings', value: node.metadata?.costSavings || 'N/A', icon: <DollarSign className="w-4 h-4" />, color: 'text-purple-400' }
      ];
    }
    return [];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl border ${getTypeColor(node.type)}`}>
                {getNodeIcon(node.type)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{node.label}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-400 capitalize">{node.type} Node</span>
                  <div className={`w-2 h-2 rounded-full ${node.isActive ? 'bg-green-400' : 'bg-gray-500'}`} />
                  <span className="text-sm text-gray-400">{node.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Description */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
              <p className="text-white leading-relaxed">{node.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Network Importance</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${node.importance * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-bold text-lg">{Math.round(node.importance * 100)}%</span>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Connections</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-bold text-lg">{node.connections || 0}</span>
                  <span className="text-gray-400">active links</span>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            {getImpactMetrics(node).length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Impact Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {getImpactMetrics(node).map((metric, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={metric.color}>{metric.icon}</span>
                        <span className="text-gray-400 text-sm">{metric.label}</span>
                      </div>
                      <span className="text-white font-semibold">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Information */}
            {node.metadata && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Technical Details</h3>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(node.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 px-3 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-300 capitalize text-sm">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-white font-medium text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-700">
              <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                View Details
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};