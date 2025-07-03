import React from 'react';
import { Activity, Users, Database, Zap, TrendingUp, Recycle, Leaf, DollarSign } from 'lucide-react';
import { NetworkData } from '../types/network';

interface NetworkStatsProps {
  data: NetworkData;
  isProcessing: boolean;
}

export const NetworkStats: React.FC<NetworkStatsProps> = ({ data, isProcessing }) => {
  const activeNodes = data.nodes.filter(n => n.isActive).length;
  const strongConnections = data.edges.filter(e => e.weight > 0.7).length;
  const companies = data.nodes.filter(n => n.type === 'company').length;
  const processes = data.nodes.filter(n => n.type === 'process').length;
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
      change: '+12%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Active Processes',
      value: `${activeNodes}/${data.nodes.length}`,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      change: '+8%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Symbiosis Flows',
      value: strongConnections,
      icon: <Recycle className="w-5 h-5" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      change: '+24%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Network Efficiency',
      value: `${Math.round(data.efficiency * 100)}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      change: '+15%',
      changeColor: 'text-green-400'
    },
    {
      label: 'CO₂ Reduction',
      value: '245K tons/yr',
      icon: <Leaf className="w-5 h-5" />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      change: '+31%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Cost Savings',
      value: '€45.2M/yr',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      change: '+28%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Material Volume',
      value: `${Math.round(totalVolume / 1000)}K tons`,
      icon: <Database className="w-5 h-5" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      change: '+19%',
      changeColor: 'text-green-400'
    },
    {
      label: 'Recycling Hubs',
      value: recyclingCompanies,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      change: '+22%',
      changeColor: 'text-green-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/80 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
              {stat.icon}
            </div>
            <div className={`text-xs font-medium ${stat.changeColor} flex items-center gap-1`}>
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
          
          {isProcessing && (
            <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full animate-pulse`}
                style={{
                  background: `linear-gradient(90deg, ${stat.color.replace('text-', '').replace('-400', '')}-500, ${stat.color.replace('text-', '').replace('-400', '')}-300)`,
                  width: `${60 + Math.sin(Date.now() * 0.001 + index) * 20}%`
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};