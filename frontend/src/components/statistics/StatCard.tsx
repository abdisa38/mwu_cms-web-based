import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  colorScheme?: 'blue' | 'green' | 'red' | 'orange' | 'indigo' | 'yellow';
}

const colorMaps = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
};

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  colorScheme = 'blue'
}) => {
  const colors = colorMaps[colorScheme];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`${colors.bg} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${colors.text}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
      </div>
      
      {trend && (
        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend.isPositive ? '+' : '-'}{trend.value}%
        </div>
      )}
    </div>
  );
};
