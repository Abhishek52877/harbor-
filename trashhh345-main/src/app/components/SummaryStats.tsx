import { TrendingUp, Leaf, DollarSign } from 'lucide-react';

type SummaryStatsProps = {
  totalEarnings: number;
  totalWaste: number;
  co2Saved: number;
};

export function SummaryStats({ totalEarnings, totalWaste, co2Saved }: SummaryStatsProps) {
  const stats = [
    {
      label: 'Total Earnings',
      value: `₹${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Waste Recycled',
      value: `${totalWaste} kg`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'CO₂ Saved',
      value: `${co2Saved} kg`,
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
