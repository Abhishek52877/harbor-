import { ReactNode } from 'react';
import { Card } from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export function StatCard({ title, value, icon, trend, trendUp, color = '#0066FF' }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-semibold mb-1">{value}</h3>
          {trend && (
            <p className={`text-xs ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </Card>
  );
}
