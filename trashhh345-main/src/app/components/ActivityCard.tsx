import { Calendar, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export type Activity = {
  id: string;
  wasteType: string;
  quantity: number;
  date: string;
  time: string;
  status: 'pending' | 'scheduled' | 'completed';
  earnings: number;
  icon?: string;
};

type ActivityCardProps = {
  activity: Activity;
  onViewDetails: (id: string) => void;
};

const wasteTypeColors: Record<string, string> = {
  plastic: 'bg-blue-500',
  metal: 'bg-slate-500',
  paper: 'bg-amber-500',
  glass: 'bg-teal-500',
  organic: 'bg-green-500',
  electronic: 'bg-purple-500',
};

export function ActivityCard({ activity, onViewDetails }: ActivityCardProps) {
  const bgColor = wasteTypeColors[activity.wasteType.toLowerCase()] || 'bg-gray-500';

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary/20 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={`${bgColor} p-3 rounded-lg text-white flex-shrink-0`}>
            <div className="w-6 h-6 flex items-center justify-center">
              {activity.icon || activity.wasteType[0].toUpperCase()}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-lg capitalize">{activity.wasteType}</h3>
                <p className="text-muted-foreground text-sm">
                  {activity.quantity} kg
                </p>
              </div>
              <StatusBadge status={activity.status} />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{activity.date}</span>
              </div>
              <span>{activity.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <p className="text-emerald-600 text-xl">₹{activity.earnings}</p>
          </div>

          <button
            onClick={() => onViewDetails(activity.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100"
          >
            <span className="text-sm">View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
