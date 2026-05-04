type StatusBadgeProps = {
  status: 'pending' | 'scheduled' | 'completed';
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const labels = {
    pending: 'Pending',
    scheduled: 'Scheduled',
    completed: 'Completed',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border ${styles[status]}`}
    >
      <span className="text-sm">{labels[status]}</span>
    </span>
  );
}
