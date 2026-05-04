import { useState } from 'react';
import { SummaryStats } from './SummaryStats';
import { ActivityCard, Activity } from './ActivityCard';
import { TimelineView } from './TimelineView';

type FilterType = 'all' | 'pending' | 'completed';

const mockActivities: Activity[] = [
  {
    id: '1',
    wasteType: 'plastic',
    quantity: 15,
    date: 'May 3, 2026',
    time: '2:30 PM',
    status: 'completed',
    earnings: 450,
  },
  {
    id: '2',
    wasteType: 'metal',
    quantity: 8,
    date: 'May 2, 2026',
    time: '11:15 AM',
    status: 'completed',
    earnings: 320,
  },
  {
    id: '3',
    wasteType: 'paper',
    quantity: 25,
    date: 'May 1, 2026',
    time: '4:45 PM',
    status: 'scheduled',
    earnings: 200,
  },
  {
    id: '4',
    wasteType: 'glass',
    quantity: 12,
    date: 'Apr 30, 2026',
    time: '9:00 AM',
    status: 'pending',
    earnings: 180,
  },
  {
    id: '5',
    wasteType: 'electronic',
    quantity: 5,
    date: 'Apr 29, 2026',
    time: '3:20 PM',
    status: 'completed',
    earnings: 850,
  },
  {
    id: '6',
    wasteType: 'organic',
    quantity: 30,
    date: 'Apr 28, 2026',
    time: '1:10 PM',
    status: 'completed',
    earnings: 150,
  },
];

export function ActivityHistory() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredActivities = mockActivities.filter((activity) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return activity.status === 'pending' || activity.status === 'scheduled';
    return activity.status === 'completed';
  });

  const totalEarnings = mockActivities
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + a.earnings, 0);
  const totalWaste = mockActivities
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + a.quantity, 0);
  const co2Saved = Math.round(totalWaste * 2.1);

  const handleViewDetails = (id: string) => {
    console.log('View details for activity:', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="mb-2">Activity & History</h1>
        <p className="text-muted-foreground">Track your waste listings, pickups, and earnings</p>
      </div>

      <SummaryStats
        totalEarnings={totalEarnings}
        totalWaste={totalWaste}
        co2Saved={co2Saved}
      />

      <TimelineView currentStep={3} />

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2>Recent Activity</h2>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'pending'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'completed'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No activities found for this filter
          </div>
        )}
      </div>
    </div>
  );
}
