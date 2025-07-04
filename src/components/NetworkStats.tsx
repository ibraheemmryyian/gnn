import React from 'react';
import { Activity, Users, Database, Zap, TrendingUp, Recycle, Leaf, DollarSign, Globe, Network } from 'lucide-react';
import { NetworkData } from '../types/network';

interface NetworkStatsProps {
  data: NetworkData;
  isProcessing: boolean;
}

export const NetworkStats: React.FC<NetworkStatsProps> = ({ data, isProcessing }) => {
  const activeNodes = data.nodes.filter(n => n.isActive).length;
  const strongConnections = data.edges.filter(e => e.weight > 0.7).length;
  const companies = data.nodes.filter(n => n.type === 'company').length;
  const perfectMatches = data.edges.filter(e => e.metadata?.aiPriority?.includes('Perfect')).length;
  const multiHopConnections = data.edges.filter(e => e.metadata?.multiHop).length;
  const gulfConnections = data.edges.filter(e => e.metadata?.geographicBonus && e.metadata.geographicBonus > 0.15).length;
  const recyclingCompanies = data.nodes.filter(n => n.metadata?.industry?.includes('Recycling')).length;
  const totalVolume = data.nodes
    .filter(n => n.metadata?.volume)
    .reduce((sum, n) => {
      const volumeStr = n.metadata?.volume as string;
      const volumeNum = parseInt(volumeStr?.replace(/[^\d]/g, '') || '0');
      return sum + volumeNum;
    }, 0);

  const stats = [
    {
      label: 'Industrial Partners',
      value: companies,
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      change: '+12%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Active Connections',
      value: data.edges.length,
      icon: <Network className="w-5 h-5" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      change: '+45%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Perfect Matches',
      value: perfectMatches,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      change: '+28%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Network Efficiency',
      value: `${Math.round(data.efficiency * 100)}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      change: '+15%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Multi-hop Chains',
      value: multiHopConnections,
      icon: <Globe className="w-5 h-5" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      change: '+35%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Regional Clusters',
      value: gulfConnections,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      change: '+22%',
      changeColor: 'text-green-400'
    },
    {
      label: 'CO₂ Reduction',
      value: '245K tons/yr',
      icon: <Leaf className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      change: '+31%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Cost Savings',
      value: '€45.2M/yr',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      change: '+28%',
      changeColor: 'text-green-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`bg-gray-900/90 backdrop-blur-sm border ${stat.borderColor} rounded-xl p-4 hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} ring-1 ring-white/10`}>
              {stat.icon}
            </div>
            <div className={`text-xs font-medium ${stat.changeColor} flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10`}>
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          </div>
          
          {isProcessing && (
            <div className="mt-3 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full animate-pulse transition-all duration-1000`}
                style={{
                  background: `linear-gradient(90deg, ${stat.color.replace('text-', '').replace('-400', '')}-500, ${stat.color.replace('text-', '').replace('-400', '')}-300)`,
                  width: `${60 + Math.sin(Date.now() * 0.001 + index) * 25}%`
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};